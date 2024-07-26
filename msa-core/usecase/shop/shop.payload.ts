import { CategoryProductTarget, SampleProductTarget } from "domain/shop/ShopProduct";
import { ShopProductTargets } from "domain/shop/ShopProducts";

export type IFloristSummaryPayload = {
  shopKey: string;
};
export type IFloristShopDetailPayload = {
  shopKey: string;
};
export type IFloristShopProductPayload = {
  shopKey: string;
};
export type IFloristShopReviewPayload = {
  shopKey: string;
};
export type IFloristShopUserListPayload = {
  shopKey: string;
};
export type IFloristMypagePayload = {
  shopKey: string;
  authId: string;
};
export type IUpdateFloristMypagePayload = {
  shopKey: string;
};
export type IUpdateFloristShopProductMsaPayload = {
  smapleProductTargets: Array<SampleProductTarget>;
  categoryProductTargets: Array<CategoryProductTarget>;
};
export type IUpdateFloristShopProductPayload = {
  shopKey: string;
  shopProductTargets: ShopProductTargets;
};
export type IFloristOrderOptionPayload = {
  shopKey: string;
};
export type IUpdateFloristOrderOptionPayload = {
  shopKey: string;
};
export type IFloristShopUserPayload = {
  shopKey: string;
};
export type IFloristShopUserDetailPayload = {
  shopKey: string;
};
export type IUpdateFloristShopUserPayload = {
  shopKey: string;
};
export type IUserShopDetailPayload = {
  shopKey: string;
};
export type IUserShopProductPayload = {
  shopKey: string;
};
export type IUserShopReviewPayload = {
  shopKey: string;
};
