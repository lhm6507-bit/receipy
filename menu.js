const meat = ["돼지고기", "소고기", "닭고기"];
//spicyLevel = 0=안매움 1=칼칼함 2=얼큰함 3=많이 매움

const menus = [
  {
    id: 1,
    name: "찌개",
    cuisine: "한식",
    mainIngredient: meat,
    carb: "밥",
    cookStyle: "국물",
    spicyLevel: "2",
    img: "food/food_1.png",
  },
  {
    id: 2,
    name: "파스타",
    cuisine: "양식",
    mainIngredient: ["돼지고기"],
    carb: "면",
    cookStyle: "볶음",
    spicyLevel: "0",
    img: "food/food_2.png",
  },
  {
    id: 3,
    name: "덮밥",
    cuisine: "일식",
    mainIngredient: meat,
    carb: "밥",
    cookStyle: "",
    spicyLevel: "0",
    img: "food/food_3.png",
  },
  {
    id: 4,
    name: "짜장면",
    cuisine: "중식",
    mainIngredient: ["돼지고기"],
    carb: "면",
    cookStyle: "볶음",
    spicyLevel: "0",
    img: "food/food_4.png",
  },
  {
    id: 5,
    name: "짬뽕",
    cuisine: "중식",
    mainIngredient: ["돼지고기", "해물"],
    carb: "면",
    cookStyle: "국물",
    spicyLevel: "1",
    img: "food/food_5.png",
  },
  {
    id: 6,
    name: "버거",
    cuisine: "양식",
    mainIngredient: ["소고기", "닭고기"],
    carb: "빵",
    cookStyle: "",
    spicyLevel: "0",
    img: "food/food_6.png",
  },
  {
    id: 7,
    name: "피자",
    cuisine: "양식",
    mainIngredient: [meat, "치즈"],
    carb: "빵",
    cookStyle: "",
    spicyLevel: "0",
    img: "food/food_7.png",
  },
  {
    id: 8,
    name: "샐러드",
    cuisine: "양식",
    mainIngredient: ["야채"],
    carb: "빵",
    cookStyle: "",
    spicyLevel: "0",
    img: "food/food_8.png",
  },
  {
    id: 9,
    name: "라멘",
    cuisine: "일식",
    mainIngredient: ["돼지고기", "닭고기", "해물"],
    carb: "면",
    cookStyle: "국물",
    spicyLevel: "0",
    img: "food/food_9.png",
  },
  {
    id: 10,
    name: "우동",
    cuisine: "일식",
    mainIngredient: ["해물"],
    carb: "면",
    cookStyle: "국물",
    spicyLevel: "0",
    img: "food/food_10.png",
  },
  {
    id: 11,
    name: "치킨",
    cuisine: "양식",
    mainIngredient: ["닭고기"],
    carb: "",
    cookStyle: "튀김",
    spicyLevel: "0",
    img: "food/food_11.png",
  },
  {
    id: 12,
    name: "국밥",
    cuisine: "한식",
    mainIngredient: ["돼지고기", "소고기"],
    carb: "밥",
    cookStyle: "국물",
    spicyLevel: "0",
    img: "food/food_12.png",
  },
  {
    id: 13,
    name: "샌드위치",
    cuisine: "양식",
    mainIngredient: ["야채", "돼지고기"],
    carb: "빵",
    cookStyle: "",
    spicyLevel: "0",
    img: "food/food_13.png",
  },
  {
    id: 14,
    name: "족발/보쌈",
    cuisine: "한식",
    mainIngredient: ["돼지고기"],
    carb: "밥",
    cookStyle: "수육",
    spicyLevel: "0",
    img: "food/food_14.png",
  },
  // ...
];

// 예시: 네가 이미 가지고 있는 메뉴 배열
// const menus = [
//   { id: 11, name: "치킨", cuisine: "양식", mainIngredient: "닭고기", carb: "", cookStyle: "튀김", spicyLevel: "0" },
//   ...
// ];

/**
 * 설문 답안 객체 예시 형태:
 * {
 *   cuisine: "한식" | "중식" | "일식" | "양식" | "any",
 *   carb: "" | "밥" | "빵" | "면",
 *   mainIngredients: ["돼지고기","소고기", ...], // 체크박스로 복수 선택
 *   vegOnly: true | false,
 *   spicyLevel: 0 | 1 | 2 | 3
 * }
 */

// 메뉴가 설문 조건과 맞는지 체크
// 0,1 묶음 / 2,3 묶음으로 분류
function getSpicyGroup(level) {
  return Number(level) <= 1 ? "mild" : "hot";
}

// 맵기 오차 1 이내인지 체크
function isSpicyMatch(menuLevel, answerLevel) {
  return Math.abs(Number(menuLevel) - Number(answerLevel)) <= 1;
}

function isMenuMatch(menu, answer) {
  // 1) 한식/중식/일식/양식
  if (answer.cuisine !== "any" && menu.cuisine !== answer.cuisine) {
    return false;
  }

  // 2) 밥/빵/면 (carb) - "" 이면 상관없음
  if (answer.carb && menu.carb !== answer.carb) {
    return false;
  }

  // 3) 비건 필터
  if (answer.vegOnly) {
    const nonVegan = ["돼지고기", "소고기", "닭고기", "해물"];
    if (nonVegan.includes(menu.mainIngredient)) {
      return false;
    }
  }

  // 4) 메인 재료 (복수 선택)
  if (
    answer.mainIngredients.length > 0 &&
    !answer.mainIngredients.includes("any")
  ) {
    const menuIngredients = Array.isArray(menu.mainIngredient)
      ? menu.mainIngredient
      : [menu.mainIngredient];
    const hasMatch = answer.mainIngredients.some((ing) =>
      menuIngredients.includes(ing),
    );
    if (!hasMatch) return false;
  }

  // ✅ 5) 조리법 추가
  if (answer.cookStyle) {
    if (answer.cookStyle === "기타") {
      if (menu.cookStyle === "국물" || menu.cookStyle === "튀김") {
        return false;
      }
    } else {
      if (menu.cookStyle !== answer.cookStyle) {
        return false;
      }
    }
  }

  return true;
}

// pickMenuByAnswer 하나만 유지
function pickMenuByAnswer(answer) {
  const candidates = menus.filter((menu) => isMenuMatch(menu, answer));
  if (candidates.length === 0) return null;

  // 맵기 필터
  const exactSpicy = candidates.filter(
    (menu) => Number(menu.spicyLevel) === answer.spicyLevel,
  );
  const pool =
    exactSpicy.length > 0
      ? exactSpicy
      : candidates.filter(
          (menu) =>
            getSpicyGroup(menu.spicyLevel) === getSpicyGroup(answer.spicyLevel),
        );
  if (pool.length === 0) return null;

  // 재료 미선택이면 그냥 랜덤
  if (answer.mainIngredients.includes("any")) {
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // 1차: mainIngredient가 선택한 재료만 단독으로 있는 메뉴
  const exactOnly = pool.filter((menu) => {
    const menuIngredients = Array.isArray(menu.mainIngredient)
      ? menu.mainIngredient
      : [menu.mainIngredient];
    // 메뉴 재료가 선택한 재료랑 완전히 같을 때
    return menuIngredients.every((ing) => answer.mainIngredients.includes(ing));
  });
  if (exactOnly.length > 0)
    return exactOnly[Math.floor(Math.random() * exactOnly.length)];

  // 2차: 선택한 재료가 하나라도 포함된 메뉴
  const hasMatch = pool.filter((menu) => {
    const menuIngredients = Array.isArray(menu.mainIngredient)
      ? menu.mainIngredient
      : [menu.mainIngredient];
    return answer.mainIngredients.some((ing) => menuIngredients.includes(ing));
  });
  if (hasMatch.length > 0)
    return hasMatch[Math.floor(Math.random() * hasMatch.length)];

  return null;
}
