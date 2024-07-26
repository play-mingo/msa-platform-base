import { IShopUserInfo } from "domain/shopUser/vo/ShopUserInfo";

export type IFloristShopUserRegInPayload = Partial<Pick<IShopUserInfo, "userBirth" | "userGender">> &
  Pick<IShopUserInfo, "userName" | "userPhone" | "shopId">;
export type IFloristShopUserUpdatePayload = Partial<Pick<IShopUserInfo, "userBirth" | "userGender">> &
  Pick<IShopUserInfo, "userName" | "userPhone" | "shopUserKey">;
export type IFloristShopUserListPayload = Pick<IShopUserInfo, "shopId">;
export type IFloristShopUserInfoPayload = Pick<IShopUserInfo, "shopUserKey">;
export type IUserUpdatePayload = Partial<Pick<IShopUserInfo, "userBirth" | "userGender">> &
  Pick<IShopUserInfo, "userName" | "userPhone" | "shopUserId">;
export type IUserInfoPayload = Pick<IShopUserInfo, "shopUserId">;
