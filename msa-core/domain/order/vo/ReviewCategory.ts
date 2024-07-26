export const ReviewCategory = {
  BEAUTY: 1, // 꽃 조합이 예뻐요
  DELIVERY: 2, // 새벽 배송이 편리해요
  BRIGHTNESS: 3, // 공간이 화사해졌어요
  FRESHNESS: 4, // 꽃이 싱싱해요
  STYLE: 5, // 감각적이에요
  ENERGY: 6, // 하루의 시작에 힘이 돼요
  ANTICIPATION: 7, // 다음 꽃이 기대돼요
  AFFORDABILITY: 8, // 가격이 합리적이에요
} as const;
export type ReviewCategory = (typeof ReviewCategory)[keyof typeof ReviewCategory];
export const ReviewCategoryValues = Object.values(ReviewCategory).map((value) => value);
