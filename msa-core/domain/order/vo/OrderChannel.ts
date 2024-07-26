export const OrderChannel = {
  KAKAO: "0",
  INSTAGRAM: "1",
  NAVER: "2",
  OTHER: "3",
} as const;
export type OrderChannel = (typeof OrderChannel)[keyof typeof OrderChannel];
export const OrderChannelValues = Object.values(OrderChannel).map((value) => value);
