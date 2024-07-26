export const LoginType = {
  NORMAL: "C",
  KAKAO: "K",
  APPLE: "A",
} as const;
export type LoginType = (typeof LoginType)[keyof typeof LoginType];
