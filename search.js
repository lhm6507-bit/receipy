document.addEventListener("DOMContentLoaded", function () {
  // 초기 사이드바 숨기기
  document.querySelector(".sidebar").style.display = "none";

  const cardGrid = document.getElementById("cardGrid");
  const detail = document.getElementById("recipeDetail"); // ✅ 여기 추가

  // 2️⃣ 필터 상태
  let filterCuisine = "all";
  let filterIngredient = "all";
  let filterCarb = "all";

  // 3️⃣ 메뉴 렌더링
  function renderMenus() {
    const filtered = menus.filter((menu) => {
      const cuisineMatch =
        filterCuisine === "all" || menu.cuisine === filterCuisine;
      const ingredientMatch =
        filterIngredient === "all" ||
        menu.mainIngredient.includes(filterIngredient);
      const carbMatch = filterCarb === "all" || menu.carb === filterCarb;
      return cuisineMatch && ingredientMatch && carbMatch;
    });

    cardGrid.innerHTML = "";

    if (filtered.length === 0) {
      cardGrid.innerHTML = "<p>조건에 맞는 메뉴가 없습니다.</p>";
      detail.innerHTML = "";
      return;
    }

    filtered.forEach((menu) => {
      cardGrid.innerHTML += `
        <div class="card" data-id="${menu.id}">
          <img src="${recipes.find((r) => r.id === menu.id)?.foodImage || ""}" alt="${menu.name}">
          <div class="card-body">
            <h3>${menu.name}</h3>
            <p>${menu.cuisine}</p>
          </div>
        </div>
      `;
    });
  }

  // 4️⃣ 필터 버튼 이벤트
  document.querySelectorAll(".tag").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.parentElement;
      group
        .querySelectorAll(".tag")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.dataset.cuisine !== undefined)
        filterCuisine = btn.dataset.cuisine;
      if (btn.dataset.ingredient !== undefined)
        filterIngredient = btn.dataset.ingredient;
      if (btn.dataset.carb !== undefined) filterCarb = btn.dataset.carb;

      renderMenus();
      detail.innerHTML = ""; // 필터 바뀌면 상세 초기화
    });
  });

  renderMenus();

  const params = new URLSearchParams(window.location.search);

  // 카드 클릭으로 넘어온 경우 (기존 유지)
  const idParam = Number(params.get("id"));
  if (idParam) {
    const selectedMenu = menus.find((menu) => menu.id === idParam);
    if (selectedMenu) showDetail(selectedMenu);
  }

  // 다른 페이지 검색창에서 넘어온 경우
  const q = params.get("q");
  if (q) {
    const kw = q.trim().toLowerCase();

    // 1) 분류 버튼 먼저 찾기
    const allTags = document.querySelectorAll(
      ".tag:not([data-cuisine='all']):not([data-ingredient='all']):not([data-carb='all'])",
    );
    const matchedBtn = [...allTags].find((btn) =>
      btn.textContent.trim().toLowerCase().includes(kw),
    );

    if (matchedBtn) {
      const group = matchedBtn.parentElement;
      group
        .querySelectorAll(".tag")
        .forEach((b) => b.classList.remove("active"));
      matchedBtn.classList.add("active");

      if (matchedBtn.dataset.cuisine !== undefined)
        filterCuisine = matchedBtn.dataset.cuisine;
      if (matchedBtn.dataset.ingredient !== undefined)
        filterIngredient = matchedBtn.dataset.ingredient;
      if (matchedBtn.dataset.carb !== undefined)
        filterCarb = matchedBtn.dataset.carb;

      renderMenus();

      // 2) 분류 없으면 음식명 매칭
    } else {
      const menuMatch = menus.find((m) => m.name.toLowerCase().includes(kw));
      if (menuMatch) {
        showDetail(menuMatch);
      } else {
        alert(`'${q}'에 해당하는 음식 또는 분류를 찾을 수 없습니다.`);
      }
    }
  }

  // 5️⃣ 카드 클릭 시 상세 출력
  cardGrid.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    if (!card) return;

    const id = Number(card.dataset.id);
    const selectedMenu = menus.find((menu) => menu.id === id);
    showDetail(selectedMenu);
  });

  function showDetail(menu) {
    document.querySelector(".sidebar").style.display = "block";
    // menu.name 기준으로 recipes에서 레시피 상세 찾기
    const recipeDetail = recipes.find((r) => r.name === menu.name);

    // 레시피가 없을 때도 화면 구조는 유지
    const recipeName = recipeDetail ? recipeDetail.recipeName : menu.name;
    const foodImage = recipeDetail?.foodImage || menu.img || "";
    const foodMeta = `종류: ${menu.name} · 분류: ${menu.cuisine}`;

    // 준비물/조리법/팁
    const ingredients = recipeDetail?.ingredients ?? [];
    const steps = recipeDetail?.steps ?? [];
    const tip = recipeDetail?.tip ?? "";

    // 맵기 표시(0이면 "안매움")
    const spicyText = menu.spicyLevel ? "🌶".repeat(menu.spicyLevel) : "안매움";

    // (옵션) 지도/비슷한 음식 — menu에 없으면 숨김 처리 가능
    const restaurant = recipeDetail?.restaurant; // { name, mapLink, mapImage } 형태라고 가정
    const similar = recipeDetail?.similar ?? []; // [id, id...]

    detail.innerHTML = `
    <main class="stage">
      <div class="detail-container">
        <!-- 음식 이름 -->
        <div class="detail-card title-card">
          <span id="food-name">${recipeName}</span>
          <div id="food-meta" class="food-meta">${foodMeta}</div>

          <!-- menu에만 있는 추가 정보도 메타 아래에 같이 배치 (원하면 제거 가능) -->
          <div class="food-meta" style="margin-top:8px;">
            주재료: ${(menu.mainIngredient || []).join(", ")}<br/>
            탄수화물: ${menu.carb || "없음"} · 조리방식: ${menu.cookStyle} · 맵기: ${spicyText}
          </div>
        </div>

        <!-- 이미지 -->
        <div class="detail-card image-card">
          ${
            foodImage
              ? `<img id="food-image" src="${foodImage}" alt="${recipeName}">`
              : `<div style="padding:24px;">이미지가 없습니다.</div>`
          }
        </div>

        <!-- 준비물 + 조리법 -->
        <div class="content-grid">
          <!-- 준비물 -->
          <section class="detail-card">
            <div class="section-title">준비물</div>
            ${
              ingredients.length
                ? `<ul id="ingredients-list" class="text-list">
                    ${ingredients.map((item) => `<li>${item}</li>`).join("")}
                  </ul>`
                : `<div id="ingredients-list" class="text-list">준비물 정보가 없습니다.</div>`
            }
          </section>

          <!-- 조리법 -->
          <section class="detail-card">
            <div class="section-title">조리법</div>
            ${
              steps.length
                ? `<ol id="steps-list" class="text-list">
                    ${steps.map((s) => `<li>${s}</li>`).join("")}
                  </ol>`
                : `<div id="steps-list" class="text-list">조리법 정보가 없습니다.</div>`
            }
            ${
              tip
                ? `<div id="tip-box" class="tip-box">TIP: ${tip}</div>`
                : `<div id="tip-box" class="tip-box">TIP: 없음</div>`
            }
          </section>
        </div>
      </div>
    </main>

  `;

    // 사이드바 - 지도
    if (restaurant) {
      const nameEl = document.getElementById("restaurant-name");
      nameEl.innerHTML = `<a href="${restaurant.mapLink}" target="_blank"
    style="text-decoration:none; color:inherit; cursor:pointer;">
    📍 ${restaurant.name}
  </a>`;

      const mapContainer = document.getElementById("map-container");
      mapContainer.innerHTML = "";

      if (restaurant.key && restaurant.timestamp) {
        const mapDiv = document.createElement("div");
        mapDiv.id = `daumRoughmapContainer${restaurant.timestamp}`;
        mapDiv.className = "root_daum_roughmap root_daum_roughmap_landing";
        mapDiv.style.width = "290px";
        // ❌ height, overflow 삭제
        mapContainer.appendChild(mapDiv);

        const script = document.createElement("script");
        script.charset = "UTF-8";
        script.textContent = `
      new daum.roughmap.Lander({
        "timestamp": "${restaurant.timestamp}",
        "key": "${restaurant.key}",
        "mapWidth": "290",
        "mapHeight": "260"
      }).render();
    `;
        mapContainer.appendChild(script);
      }
    }

    // 사이드바 - 비슷한 음식
    const similarList = document.getElementById("similar-list");
    similarList.innerHTML = "";
    similar.forEach((simId) => {
      const simRecipe = recipes.find((r) => r.id === simId);
      if (!simRecipe) return;
      const div = document.createElement("div");
      div.style.cssText =
        "border:1px solid rgba(0,0,0,0.14); border-radius:14px; padding:10px 12px; font-weight:800; cursor:pointer;";
      div.textContent = simRecipe.recipeName;
      div.onclick = () => {
        const simMenu = menus.find((m) => m.id === simId);
        if (simMenu) showDetail(simMenu);
      };
      similarList.appendChild(div);
    });

    detail.scrollIntoView({ behavior: "smooth" });
  }

  const searchForm = document.querySelector(".main-search-box");
  const searchInput = document.getElementById("mainSearchInput");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) {
      alert("검색어를 입력해주세요!");
      return;
    }

    // menus 배열에서 name 또는 recipeName과 매칭
    const menuMatch = menus.find((menu) => menu.name.toLowerCase() === keyword);
    const recipeMatch = recipes.find(
      (recipe) => recipe.recipeName.toLowerCase() === keyword,
    );

    if (menuMatch) {
      // 메뉴 이름으로 찾으면 카드 클릭과 동일하게 showDetail
      showDetail(menuMatch);
    } else if (recipeMatch) {
      // 메뉴가 없고 레시피만 있는 경우, 임시 메뉴 객체 만들어서 showDetail 호출
      const tempMenu = {
        id: recipeMatch.id,
        name: recipeMatch.name,
        img: "", // 이미지 없으면 빈 문자열
        cuisine: recipeMatch.cuisine,
        mainIngredient: recipeMatch.ingredients.slice(0, 3), // 재료 일부만 표시
        carb: "",
        cookStyle: "",
        spicyLevel: 0,
      };
      showDetail(tempMenu);
    } else {
      alert("해당 레시피를 찾을 수 없습니다.");
    }
  });
});
