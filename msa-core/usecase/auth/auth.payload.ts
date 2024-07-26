import { ShopAdminInfo } from "domain/shop/ShopAdmin";
import { AgentInfoType } from "domain/shop/vo/AgentInfo";
import { IShopUserInfo, ShopUserInfo } from "domain/shopUser/vo/ShopUserInfo";

export interface IFloristNormalLoginPayload extends Pick<ShopAdminInfo, "shopAdminNormalAuthId" | "shopAdminPw"> {
  agentInfo: AgentInfoType;
}
export interface IFloristNormalJoinPayload
  extends Pick<ShopAdminInfo, "shopAdminNormalAuthId" | "shopAdminPw" | "shopAdminName" | "shopAdminPhone" | "marketingYn"> {
  agentInfo: AgentInfoType;
}
export type IFloristKakaoLoginPayload = Pick<ShopAdminInfo, "shopAdminKakaoAuthId" | "shopAdminName" | "shopAdminPhone">;
export type IFloristAppleLoginPayload = Pick<ShopAdminInfo, "shopAdminAppleAuthId" | "shopAdminName" | "shopAdminPhone">;
export type IFloristFindIdPayload = Pick<ShopAdminInfo, "shopAdminName" | "shopAdminPhone">;
export type IFloristFindPwPayload = Pick<ShopAdminInfo, "shopAdminName" | "shopAdminPhone">;

export type IUserNormalLoginMsaPayload = Pick<ShopUserInfo, "userName" | "userPhone" | "shopKey" | "shopLink">;

export type IUserNormalLoginPayload = Pick<ShopUserInfo, "userName" | "userPhone" | "shopKey" | "shopLink">;
export type IUserNormalJoinPayload = Partial<Pick<IShopUserInfo, "userBirth" | "userGender">> &
  Pick<ShopUserInfo, "shopKey" | "userName" | "userPhone">;
