export const ShopProductType = { SAMPLE: 0, CATEGORY: 1, CLASS: 2, BUSSINESS: 3 } as const;
export type ShopProductType = (typeof ShopProductType)[keyof typeof ShopProductType];
export const ShopProductTypeValues = Object.values(ShopProductType).map((value) => value);

export const ShopProductCategory = { TODAY_FLOWER: 0, TODAY_LINEUP: 1, S_BOUQUE: 2, M_BOUQUE: 3, B_BOUQUE: 4 } as const;
export type ShopProductCategory = (typeof ShopProductCategory)[keyof typeof ShopProductCategory];
export const ShopProductCategoryValues = Object.values(ShopProductCategory).map((value) => value);

export const ShopAutoUpdateType = { NONE: 0, WINDTER: 1, SPRING: 2, SUMMER: 3, FALL: 4 } as const;
export type ShopAutoUpdateType = (typeof ShopAutoUpdateType)[keyof typeof ShopAutoUpdateType];
export const ShopAutoUpdateTypeValues = Object.values(ShopAutoUpdateType).map((value) => value);

export const ShopProductPriceType = { ONE_PRICE: 0, RANGE_PRICE: 1 } as const;
export type ShopProductPriceType = (typeof ShopProductPriceType)[keyof typeof ShopProductPriceType];
export const ShopProductPriceTypeValues = Object.values(ShopProductPriceType).map((value) => value);

export const ToggleYn = { Y: "Y", N: "N" } as const;
export type ToggleYn = (typeof ToggleYn)[keyof typeof ToggleYn];
export const ToggleYnValues = Object.values(ToggleYn).map((value) => value);

export interface ShopProductItem {
  no: number;
  productName: string;
  productPrice: number;
  productImgPath: string;
}
