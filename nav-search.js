// nav-search.js
document.addEventListener("DOMContentLoaded", function () {
  const navSearchForm = document.querySelector(".search-box");
  const navSearchInput = document.getElementById("searchInput");

  if (!navSearchForm || !navSearchInput) return;

  navSearchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const keyword = navSearchInput.value.trim();
    if (!keyword) {
      alert("검색어를 입력해주세요!");
      return;
    }

    // 입력값 그대로 넘기고, 분류는 search.js가 처리
    location.href = `search.html?q=${encodeURIComponent(keyword)}`;
  });
  // ─── 드롭다운 버튼 클릭 ───
  document.querySelectorAll(".drop-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      location.href = `search.html?q=${encodeURIComponent(btn.textContent.trim())}`;
    });
  });
});
