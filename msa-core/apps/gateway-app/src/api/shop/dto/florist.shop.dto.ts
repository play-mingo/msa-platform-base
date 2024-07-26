import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
// import { ShopProductTargets } from "domain/shop/ShopProducts";
import { ShopAutoUpdateType, ShopProductCategory, ShopProductPriceType, ShopProductType, ToggleYn, ToggleYnValues } from "domain/shop/vo";
import {
  IFloristMypagePayload,
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
  IUpdateFloristShopProductMsaPayload,
  IUpdateFloristShopUserPayload,
  IUserShopDetailPayload,
  IUserShopProductPayload,
  IUserShopReviewPayload,
} from "usecase/shop/shop.payload";

export class SampleProduct {
  @ApiProperty({ example: ShopProductCategory.M_BOUQUE, description: "꽃 상품 유형" })
  productCategory!: ShopProductCategory;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
  @ApiProperty({ example: "오늘의 밍고 설명입니다.", description: "설명" })
  contents!: string;
  @ApiProperty({ example: "/common/2134124314.png", description: "이미지" })
  productImgPath!: string;
  @ApiProperty({ example: 12000, description: "고정가격" })
  productPrice!: number;
  @ApiProperty({ example: ShopAutoUpdateType.SPRING, description: "기간별 자동 업데이트 유형 (0: 안함, 1: 12~2월, 2: 3~5월, 3: 6~8월, 4: 9~11월)" })
  autoUpdateType!: ShopAutoUpdateType;
  @ApiProperty({ example: ShopProductPriceType.RANGE_PRICE, description: "가격 유형" })
  productPriceType!: ShopProductPriceType;
  @ApiProperty({ example: 11000, description: "최소가격" })
  productPriceStart!: number;
  @ApiProperty({ example: 19000, description: "최대가격" })
  productPriceEnd!: number;
  @ApiProperty({ example: "Y", description: "바로구매 여부 (Y/N)", enum: ToggleYnValues })
  quickPurchaseYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "상담구매 여부 (Y/N)", enum: ToggleYnValues })
  consultingYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "배송설정 여부 (Y/N)", enum: ToggleYnValues })
  deliveryYn!: ToggleYn;
}

export class ProductItem {
  @ApiProperty({ example: "/common/2134124314.png", description: "이미지" })
  productImgPath!: string;
  @ApiProperty({ example: 12000, description: "고정가격" })
  productPrice!: number;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
}

export class CategoryProduct {
  @ApiProperty({ example: ShopProductCategory.B_BOUQUE, description: "꽃 상품 유형" })
  productCategory!: ShopProductCategory;
  @ApiProperty({ description: "상품목록O", type: () => [ProductItem] })
  productItems!: ProductItem[];
  @ApiProperty({ example: "Y", description: "바로구매 여부 (Y/N)", enum: ToggleYnValues })
  quickPurchaseYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "상담구매 여부 (Y/N)", enum: ToggleYnValues })
  consultingYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "배송설정 여부 (Y/N)", enum: ToggleYnValues })
  deliveryYn!: ToggleYn;
}

export class SampleProductTarget {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a37", description: "상품키" })
  key!: string | null;
  @ApiProperty({ example: 0, description: "순서" })
  no!: number;
  @ApiProperty({ example: ShopProductType.SAMPLE, description: "상품 유형" })
  productType!: typeof ShopProductType.SAMPLE;
  @ApiProperty({ type: () => SampleProduct, description: "상품 정보" })
  product!: SampleProduct;
}

export class CategoryProductTarget {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a39", description: "상품키" })
  key!: string | null;
  @ApiProperty({ example: 1, description: "순서" })
  no!: number;
  @ApiProperty({ example: ShopProductType.CATEGORY, description: "상품 유형" })
  productType!: typeof ShopProductType.CATEGORY;
  @ApiProperty({ type: () => CategoryProduct, description: "상품 정보" })
  product!: CategoryProduct;
}

// export type ShopProductTargets = Array<SampleProductTarget | CategoryProductTarget>;
export class ShopPayload {
  /**
   * 상점 키
   */
  @IsString()
  shopKey!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SampleProductTarget)
  @ApiProperty({
    type: () => [SampleProductTarget],
    description: "변경된 상품 목록",
  })
  smapleProductTargets!: Array<SampleProductTarget>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryProductTarget)
  @ApiProperty({
    type: () => [CategoryProductTarget],
    description: "변경된 상품 목록",
  })
  categoryProductTargets!: Array<CategoryProductTarget>;
}

export class FloristSummaryPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristSummaryPayload {}
export class FloristShopDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopDetailPayload {}
export class FloristShopProductPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopProductPayload {}
export class FloristShopReviewPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopReviewPayload {}
export class FloristShopUserListPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserListPayload {}

export class FloristMypagePayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristMypagePayload {
  authId!: string;
}
export class UpdateFloristMypagePayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristMypagePayload {}

export class UpdateFloristShopProductPayload
  extends PickType(ShopPayload, ["smapleProductTargets", "categoryProductTargets"] as const)
  implements IUpdateFloristShopProductMsaPayload {}
export class FloristOrderOptionPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristOrderOptionPayload {}
export class UpdateFloristOrderOptionPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristOrderOptionPayload {}
export class FloristShopUserPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserPayload {}
export class FloristShopUserDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IFloristShopUserDetailPayload {}
export class UpdateFloristShopUserPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUpdateFloristShopUserPayload {}
export class UserShopDetailPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopDetailPayload {}
export class UserShopProductPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopProductPayload {}
export class UserShopReviewPayload extends PickType(ShopPayload, ["shopKey"] as const) implements IUserShopReviewPayload {}
