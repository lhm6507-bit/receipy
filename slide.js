const menuss = JSON.parse(localStorage.getItem("recipes"));
const [_, ...menulist] = menuss;
const shuffled = [...menulist].sort(() => Math.random() - 0.5);

const container = document.querySelector(".slides");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dotsWrap = document.querySelector(".dots");
let currentIndex = 3;

function createDots() {
  const slides = document.querySelectorAll(".slide");
  dotsWrap.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 3) dot.classList.add("active"); // 가운데 기준
    dotsWrap.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }
}

prev.addEventListener("click", () => {
  const slides = document.querySelectorAll(".slide");

  container.append(slides[0]);

  currentIndex--;
  if (currentIndex < 0) currentIndex = slides.length - 1;

  updateDots();
});

next.addEventListener("click", () => {
  const slides = document.querySelectorAll(".slide");

  container.prepend(slides[slides.length - 1]);

  currentIndex++;
  if (currentIndex >= slides.length) currentIndex = 0;

  updateDots();
});
function createDots() {
  const slides = document.querySelectorAll(".slide");
  dotsWrap.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.addEventListener("click", () => moveToSlide(i));

    dotsWrap.appendChild(dot);
  });
}

function moveToSlide(targetIndex) {
  const slides = document.querySelectorAll(".slide");
  const centerIndex = 3;

  let diff = targetIndex - currentIndex;

  // 최단 거리 이동 (선택)
  if (diff > slides.length / 2) diff -= slides.length;
  if (diff < -slides.length / 2) diff += slides.length;

  const move = () => {
    if (diff > 0) {
      next.click();
      diff--;
    } else if (diff < 0) {
      prev.click();
      diff++;
    }
  };

  const interval = setInterval(() => {
    if (diff === 0) {
      clearInterval(interval);
    } else {
      move();
    }
  }, 100); // 속도 조절 가능
}
const slidesContainer = document.querySelector(".slides");

// 원하는 개수만 출력 (예: 7개)
const selectedFoods = shuffled.slice(0, 7);

slidesContainer.innerHTML = selectedFoods
  .map(
    (food) => `
  <div class="slide">
    <img
      class="food-img"
      src="${food.foodImage}"
      onclick="location.href='search.html?id=${food.id}'"
    />
    <div class="overlay">
      <p>${food.name}</p>
    </div>
  </div>
`,
  )
  .join("");

// 초기 실행
createDots();
updateDots();
