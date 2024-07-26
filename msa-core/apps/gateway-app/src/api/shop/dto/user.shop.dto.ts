import { PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ShopProductTargets } from "domain/shop/ShopProducts";
import {
  IFloristOrderOptionPayload,
  IFloristShopDetailPayload,
  IFloristShopProductPayload,
  IFloristShopReviewPayload,
  IFloristShopUserDetailPayload,
  IFloristShopUserListPayload,
  IFloristShopUserPayload,
  IFloristSummaryPayload,
  IUpdateFloristMypagePayload,
  IUpdateFloristOrderOptionPayload,
  IUpdateFloristShopProductPayload,
  IUpdateFloristShopUserPayload,
  IUserShopDetailPayload,
  IUserShopProductPayload,
  IUserShopReviewPayload,
} from "usecase/shop/shop.payload";

export class ShopPayload {
  /**
   * 상점 키
   */
  @IsString()
  shopKey!: string;

  shopProductTargets!: ShopProductTargets;
}

export class FloristSummaryPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristSummaryPayload {}
export class FloristShopDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopDetailPayload {}
export class FloristShopProductPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopProductPayload {}
export class FloristShopReviewPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopReviewPayload {}
export class FloristShopUserListPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserListPayload {}
// export class FloristMypagePayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristMypagePayload {}
export class UpdateFloristMypagePayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristMypagePayload {}
export class UpdateFloristShopProductPayload
  extends PickType(ShopPayload, ["shopKey", "shopProductTargets"] as const)
  implements IUpdateFloristShopProductPayload {}
export class FloristOrderOptionPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristOrderOptionPayload {}
export class UpdateFloristOrderOptionPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristOrderOptionPayload {}
export class FloristShopUserPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserPayload {}
export class FloristShopUserDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserDetailPayload {}
export class UpdateFloristShopUserPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristShopUserPayload {}
export class UserShopDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopDetailPayload {}
export class UserShopProductPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopProductPayload {}
export class UserShopReviewPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopReviewPayload {}
