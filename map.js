const container = document.getElementById("map");

// 지도 생성 (한 번만!)
const map = new kakao.maps.Map(container, {
  center: new kakao.maps.LatLng(37.570964, 126.983188),
  level: 4,
});

// 8개 마커 좌표
const markers = []; // ✅ 추가

const stores = [
  {
    name: "안래홍",
    type: "중식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.571687,
    lng: 126.982666,
    rating: 4.1,
    img: "store/store_01.jpg",
    address: "서울 종로구 종로7길 43",
    phone: "02-739-8013",
  },
  {
    name: "한양중식",
    type: "중식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.570751,
    lng: 126.983609,
    rating: 4.4,
    img: "store/store_02.jpg",
    address: "서울 종로구 종로 51 종로타워 지하 2층",
    phone: "070-4647-0230",
  },
  {
    name: "일심",
    type: "일식",
    ingredient: "해물",
    carb: "",
    lat: 37.571827,
    lng: 126.982225,
    rating: 4.3,
    img: "store/store_03.png",
    address: "서울 종로구 삼봉로 94 94빌딩 2층 204호",
    phone: "0507-1339-8470",
  },
  {
    name: "참치공방",
    type: "일식",
    ingredient: "해물",
    carb: "",
    lat: 37.570703,
    lng: 126.984243,
    rating: 3.6,
    img: "store/store_04.jpg",
    address: "서울 종로구 종로 9길 8 1층",
    phone: "02-732-8014",
  },
  {
    name: "장인닭갈비",
    type: "한식",
    ingredient: "닭고기",
    carb: "밥",
    lat: 37.568602,
    lng: 126.985864,
    rating: 4.4,
    img: "store/store_05.jpg",
    address: "서울 종로구 청계천로 73 1층",
    phone: "02-735-4468",
  },
  {
    name: "심경희라라랜드",
    type: "한식",
    ingredient: "돼지고기",
    carb: "밥",
    lat: 37.572595,
    lng: 126.982468,
    rating: 4.4,
    img: "store/store_06.jpg",
    address: "서울 종로구 삼봉로 95 대성스카이렉스 1층 113-6호",
    phone: "02-730-8673",
  },
  {
    name: "스케줄오스테리아",
    type: "양식",
    ingredient: "해물",
    carb: "면",
    lat: 37.568358,
    lng: 126.982279,
    rating: 4.0,
    img: "store/store_07.jpg",
    address: "서울 중구 남대문로 125 iM금융센터 2층 202호",
    phone: "0507-1456-0300",
    placeId: 255438897,
  },
  {
    name: "미도인 종로점",
    type: "일식",
    ingredient: "닭고기",
    carb: "밥",
    lat: 37.570757,
    lng: 126.983668,
    rating: 4.3,
    img: "store/store_08.png",
    address: "서울 종로구 종로 51 지하2층",
    phone: "02-720-5097",
  },
  {
    name: "뚝배기집",
    type: "한식",
    ingredient: "",
    carb: "밥",
    lat: 37.569551,
    lng: 126.988507,
    rating: 4.2,
    img: "store/store_09.png",
    address: "서울 종로구 종로16길 12 1층",
    phone: "02-2265-5744",
  },
  {
    name: "르브와 종로점",
    type: "양식",
    ingredient: "해물",
    carb: "면",
    lat: 37.56944,
    lng: 126.985397,
    rating: 3.9,
    img: "store/store_10.png",
    address: "서울 종로구 우정국로2길 42 4층 ",
    phone: "02-739-8208",
  },
  {
    name: "온도 센터원점",
    type: "일식",
    ingredient: "돼지고기",
    carb: "밥",
    lat: 37.568769,
    lng: 126.986244,
    rating: 4.2,
    img: "store/store_11.jpg",
    address: "서울 종로구 삼일대로15길 21 1층",
    phone: "010-9136-8908",
  },
  {
    name: "서호장",
    type: "중식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.569447,
    lng: 126.989359,
    rating: 3.1,
    img: "store/store_12.png",
    address: "서울 종로구 수표로 91-1 1층",
    phone: "02-2265-5329",
  },
  {
    name: "짬뽕타임24 종로3가점",
    type: "중식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.570819,
    lng: 126.99001,
    rating: 4.3,
    img: "store/store_13.png",
    address: "서울 종로구 돈화문로5길 34-3 1층",
    phone: "010-6441-1795",
  },
  {
    name: "버거옥 종로점",
    type: "양식",
    ingredient: "소고기",
    carb: "빵",
    lat: 37.569866,
    lng: 126.987987,
    rating: 2.2,
    img: "store/store_14.jpg",
    address: "서울 종로구 삼일대로 396 1-4층",
    phone: "0507-1458-9337",
  },
  {
    name: "더피자필",
    type: "양식",
    ingredient: "",
    carb: "빵",
    lat: 37.569264,
    lng: 126.983111,
    rating: 3.7,
    img: "store/store_15.jpg",
    address: "서울 종로구 우정국로 4 1층",
    phone: "02-795-3283",
  },
  {
    name: "프레퍼스 종각역점",
    type: "양식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.56996,
    lng: 126.985618,
    rating: 3.8,
    img: "store/store_16.png",
    address: "서울 종로구 종로 74 1층",
    phone: "02-720-0622",
  },
  {
    name: "오로지라멘",
    type: "일식",
    ingredient: "돼지고기",
    carb: "면",
    lat: 37.568922,
    lng: 126.986999,
    rating: 3.2,
    img: "store/store_17.png",
    address: "서울 종로구 삼일대로15길 8 1층",
    phone: "02-722-7123",
  },
  {
    name: "후니도니",
    type: "일식",
    ingredient: "돼지고기",
    carb: "밥",
    lat: 37.570932,
    lng: 126.980122,
    rating: 4.5,
    img: "store/store_18.png",
    address: "서울 종로구 종로 19 르메이에르종로타운 지하1층 B113-5호",
    phone: "02-722-5402",
  },
  {
    name: "계동치킨 낙원점",
    type: "양식",
    ingredient: "닭고기",
    carb: "",
    lat: 37.570886,
    lng: 126.989464,
    rating: 3.0,
    img: "store/store_19.jpg",
    address: "서울 종로구 수표로 108 1층 ",
    phone: "02-765-1056",
  },
  {
    name: "나주소머리국밥",
    type: "한식",
    ingredient: "돼지고기",
    carb: "밥",
    lat: 37.572051,
    lng: 126.987969,
    rating: 4.0,
    img: "store/store_20.png",
    address: "서울 종로구 삼일대로 418-3",
  },
  {
    name: "에그라상",
    type: "양식",
    ingredient: "",
    carb: "빵",
    lat: 37.568944,
    lng: 126.984048,
    rating: 4.3,
    img: "store/store_21.jpg",
    address: "서울 종로구 청계천로 57 2층",
    phone: "010-2491-8475",
  },
  {
    name: "손정보쌈 종로점",
    type: "한식",
    ingredient: "돼지고기",
    carb: "",
    lat: 37.568938,
    lng: 126.986181,
    rating: 3.9,
    img: "store/store_22.jpg",
    address: "서울 종로구 삼일대로15길 24 1층",
    phone: "02-735-3952",
  },
];

// ✅ 오버레이 1개만 만들고 재사용
const overlayEl = document.createElement("div");
overlayEl.className = "placeOverlay";

const overlay = new kakao.maps.CustomOverlay({
  content: overlayEl,
  position: map.getCenter(),
  xAnchor: 0.5,
  yAnchor: 1.35, // 마커 위로 뜨게 조절 (필요하면 1.2~1.6 사이로 조정)
});

function renderOverlay(store) {
  overlayEl.innerHTML = `
  <div class="head">
    <button class="closeBtn" type="button">×</button>
      <div class="title">${store.name ?? ""}</div>
      ${(() => {
        const r = store.rating != null ? Number(store.rating) : null;
        const pct = r != null ? Math.max(0, Math.min(100, (r / 5) * 100)) : 0;

        return `
    <div class="rating">
      <span class="score">★ ${r != null ? r.toFixed(1) : "-"}</span>
      <span class="stars">
        <span class="stars-fill" style="width:${pct}%">★★★★★</span>
        <span class="stars-base">★★★★★</span>
      </span>
    </div>
  `;
      })()}
    <div class="body">
      ${
        store.img
          ? `<div class="thumb">
               <img src="${store.img}" alt="${store.name}">
             </div>`
          : ""
      }
      <div class="meta">
        <div class="addr">${store.address ?? ""}</div>
        <div class="phone">${store.phone ?? ""}</div>
      </div>
    </div>
  `;

  const closeBtn = overlayEl.querySelector(".closeBtn");
  if (closeBtn) closeBtn.onclick = () => overlay.setMap(null);
}

stores.forEach((store) => {
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(store.lat, store.lng),
  });
  marker.setMap(map);

  markers.push({ marker, store }); // ✅ 추가

  kakao.maps.event.addListener(marker, "click", () => {
    renderOverlay(store);

    const pos = new kakao.maps.LatLng(store.lat, store.lng);
    overlay.setPosition(pos);
    overlay.setMap(map);
  });
});
function setTagActive(rowSelector, dataAttr, value) {
  const row = document.querySelector(rowSelector);
  if (!row) return;

  // 같은 줄의 active 제거
  row.querySelectorAll(".tag").forEach((b) => b.classList.remove("active"));

  // value에 맞는 버튼 찾기
  const btn = row.querySelector(`.tag[${dataAttr}="${value}"]`);
  if (btn) btn.classList.add("active");
}
// ===========================
// ✅ 필터(태그) 기능 추가
// ===========================

// 1) 현재 선택된 필터 값 저장
let selectedCuisine = "all";
let selectedIngredient = "all";
let selectedCarb = "all";

// 2) active 클래스 처리 (같은 줄(row) 안에서만 active 유지)
function updateActive(clickedBtn) {
  const row = clickedBtn.parentElement; // .filter-row
  row.querySelectorAll(".tag").forEach((btn) => btn.classList.remove("active"));
  clickedBtn.classList.add("active");
}

// 3) 실제로 마커를 필터링해서 보여주는 함수
function applyFilters() {
  markers.forEach(({ marker, store }) => {
    const matchCuisine =
      selectedCuisine === "all" || store.type === selectedCuisine;

    const matchIngredient =
      selectedIngredient === "all" ||
      (store.ingredient ?? "") === selectedIngredient;

    const matchCarb =
      selectedCarb === "all" || (store.carb ?? "") === selectedCarb;

    marker.setMap(matchCuisine && matchIngredient && matchCarb ? map : null);
  });

  // 필터 바뀌면 열려있던 오버레이 닫기
  overlay.setMap(null);
}

// 4) 버튼 클릭 이벤트 연결
document.querySelectorAll(".filter-section .tag").forEach((btn) => {
  btn.addEventListener("click", () => {
    // 어떤 종류의 버튼인지 dataset으로 구분
    if (btn.dataset.cuisine !== undefined) {
      selectedCuisine = btn.dataset.cuisine;
      updateActive(btn);
    }

    if (btn.dataset.ingredient !== undefined) {
      selectedIngredient = btn.dataset.ingredient;
      updateActive(btn);
    }

    if (btn.dataset.carb !== undefined) {
      selectedCarb = btn.dataset.carb;
      updateActive(btn);
    }

    applyFilters();
  });
});

const searchForm = document.querySelector(".main-search-box");
const searchInput = document.getElementById("mainSearchInput");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const raw = searchInput.value.trim();

  // 0) 두 단어 이상 입력 방지 (공백 기준)
  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    alert("검색어는 한 단어만 입력해주세요.");
    return;
  }

  const keyword = (words[0] ?? "").toLowerCase();

  const rows = document.querySelectorAll(".filter-section .filter-row");
  const cuisineRow = rows[0];
  const ingredientRow = rows[1];
  const carbRow = rows[2];

  function setTagActiveLocal(rowEl, attrName, value) {
    if (!rowEl) return;
    rowEl.querySelectorAll(".tag").forEach((b) => b.classList.remove("active"));
    const btn = rowEl.querySelector(`.tag[${attrName}="${value}"]`);
    if (btn) btn.classList.add("active");
  }

  // 1) 비었으면 전체 초기화
  if (!keyword) {
    selectedCuisine = "all";
    selectedIngredient = "all";
    selectedCarb = "all";

    setTagActiveLocal(cuisineRow, "data-cuisine", "all");
    setTagActiveLocal(ingredientRow, "data-ingredient", "all");
    setTagActiveLocal(carbRow, "data-carb", "all");

    applyFilters();
    overlay.setMap(null);
    return;
  }

  // 2) 정확히 일치하면: 해당 줄만 선택, 나머지 줄은 all로
  const cuisineList = ["한식", "양식", "중식", "일식"];
  const ingredientList = ["돼지고기", "소고기", "닭고기", "해물"];
  const carbList = ["밥", "면", "빵"];

  if (cuisineList.includes(raw)) {
    selectedCuisine = raw;
    selectedIngredient = "all";
    selectedCarb = "all";

    setTagActiveLocal(cuisineRow, "data-cuisine", selectedCuisine);
    setTagActiveLocal(ingredientRow, "data-ingredient", "all");
    setTagActiveLocal(carbRow, "data-carb", "all");

    applyFilters();
    overlay.setMap(null);
    return;
  }

  if (ingredientList.includes(raw)) {
    selectedCuisine = "all";
    selectedIngredient = raw;
    selectedCarb = "all";

    setTagActiveLocal(cuisineRow, "data-cuisine", "all");
    setTagActiveLocal(ingredientRow, "data-ingredient", selectedIngredient);
    setTagActiveLocal(carbRow, "data-carb", "all");

    applyFilters();
    overlay.setMap(null);
    return;
  }

  if (carbList.includes(raw)) {
    selectedCuisine = "all";
    selectedIngredient = "all";
    selectedCarb = raw;

    setTagActiveLocal(cuisineRow, "data-cuisine", "all");
    setTagActiveLocal(ingredientRow, "data-ingredient", "all");
    setTagActiveLocal(carbRow, "data-carb", selectedCarb);

    applyFilters();
    overlay.setMap(null);
    return;
  }

  // 3) 그 외는: 태그 전체로 초기화 + 텍스트 포함검색
  selectedCuisine = "all";
  selectedIngredient = "all";
  selectedCarb = "all";
  setTagActiveLocal(cuisineRow, "data-cuisine", "all");
  setTagActiveLocal(ingredientRow, "data-ingredient", "all");
  setTagActiveLocal(carbRow, "data-carb", "all");

  markers.forEach(({ marker, store }) => {
    const type = (store.type ?? "").toLowerCase();
    const ing = (store.ingredient ?? "").toLowerCase();
    const carb = (store.carb ?? "").toLowerCase();
    const name = (store.name ?? "").toLowerCase();
    const addr = (store.address ?? "").toLowerCase();

    const match =
      type.includes(keyword) ||
      ing.includes(keyword) ||
      carb.includes(keyword) ||
      name.includes(keyword) ||
      addr.includes(keyword);

    marker.setMap(match ? map : null);
  });

  overlay.setMap(null);
});

// (선택) 지도 빈 곳 클릭 시 닫기
kakao.maps.event.addListener(map, "click", () => overlay.setMap(null));
// 마커 찍기
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  const latlng = mouseEvent.latLng;

  console.log("위도:", latlng.getLat());
  console.log("경도:", latlng.getLng());
});
