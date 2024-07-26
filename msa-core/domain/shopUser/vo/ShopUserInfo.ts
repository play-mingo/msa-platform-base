export const UserGender = {
  MALE: "0",
  FEMALE: "1",
} as const;
export type UserGender = (typeof UserGender)[keyof typeof UserGender];
export const UserGenderValues = Object.values(UserGender);

// string -> UserGender
export const parseUserGender = (gender: string): UserGender => {
  switch (gender) {
    case UserGender.MALE:
      return UserGender.MALE;
    case UserGender.FEMALE:
      return UserGender.FEMALE;
    default:
      throw new Error("Invalid UserGender");
  }
};

// 생년월일을 받아서 나이대를 계산하는 함수 ex) 19900701 -> 30
export const calculateAgeRange = (birth: string): number => {
  if (!/^\d{8}$/.test(birth)) throw new Error("Invalid birth format");
  const today = new Date();
  const birthDate = new Date(birth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return Math.floor(age / 10) * 10;
};

export interface ShopUserInfo {
  shopId: number;
  shopKey: string;
  shopUserId: number;
  shopUserKey: string;
  userName: string;
  userPhone: string;
  userBirth: string;
  userAge: string;
  userGender: UserGender;
  orderCnt: number;
  shopLink: string;
}

export interface IShopUserInfo {
  shopId: number;
  shopKey: string;
  shopUserId: number;
  shopUserKey: string;
  userName: string;
  userPhone: string;
  userBirth: string;
  userAge: string;
  userGender: UserGender;
  orderCnt: number;
  shopLink: string;
}
