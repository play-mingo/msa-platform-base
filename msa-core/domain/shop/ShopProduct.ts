import { DelYn, ToggleYn } from "domain/_base/ValueObject";
import { ShopKey } from "./key";
import { ShopProductKey } from "./key/ShopProductKey";
import { ShopAutoUpdateType, ShopProductCategory, ShopProductPriceType, ShopProductType } from "./vo/ShopProductType";

export interface ProductItem {
  productImgPath: string;
  productPrice: number;
  productName: string;
}

export interface SampleProduct {
  productCategory: ShopProductCategory;
  productName: string;
  contents: string;
  productImgPath: string;
  productPrice: number;
  autoUpdateType: ShopAutoUpdateType;
  productPriceType: ShopProductPriceType;
  productPriceStart: number;
  productPriceEnd: number;
  quickPurchaseYn: ToggleYn;
  consultingYn: ToggleYn;
  deliveryYn: ToggleYn;
}

export interface CategoryProduct {
  productCategory: ShopProductCategory;
  productItems: ProductItem[];
  quickPurchaseYn: ToggleYn;
  consultingYn: ToggleYn;
  deliveryYn: ToggleYn;
}

export type SampleProductTarget = {
  key: string | null;
  no: number;
  // delYn: DelYn;
  productType: typeof ShopProductType.SAMPLE;
  product: SampleProduct;
};

export type CategoryProductTarget = {
  key: string | null;
  no: number;
  // delYn: DelYn;
  productType: typeof ShopProductType.CATEGORY;
  product: CategoryProduct;
};

export type ShopProductTarget = SampleProductTarget | CategoryProductTarget;

export interface IShopProductProps {
  no: number | null;
  productType: ShopProductType | null;
  productCategory: ShopProductCategory | null;
  productName: string | null;
  productImgPath: string | null;
  contents: string | null;
  productPrice: number | null;
  productItems: string | null;
  autoUpdateType: ShopAutoUpdateType | null;
  productPriceType: ShopProductPriceType | null;
  productPriceStart: number | null;
  productPriceEnd: number | null;
  quickPurchaseYn: ToggleYn | null;
  consultingYn: ToggleYn | null;
  deliveryYn: ToggleYn | null;
  delYn: DelYn;
}

export type IShopProduct = {
  shopProductKey: ShopProductKey;
  shopKey: ShopKey;
  delYn: DelYn;
} & IShopProductProps;

export abstract class BaseShopProduct {
  protected readonly _shopProductKey: ShopProductKey;
  protected readonly _shopKey: ShopKey;
  protected _delYn: DelYn;

  constructor(shopProductKey: ShopProductKey, shopKey: ShopKey, delYn: DelYn = DelYn.ACTIVE) {
    this._shopProductKey = shopProductKey;
    this._shopKey = shopKey;
    this._delYn = delYn;
  }

  get shopProductKey(): ShopProductKey {
    return this._shopProductKey;
  }

  get shopKey(): ShopKey {
    return this._shopKey;
  }

  get delYn(): DelYn {
    return this._delYn;
  }

  public delete() {
    this._delYn = DelYn.DELETED;
  }

  public active() {
    this._delYn = DelYn.ACTIVE;
  }

  abstract get detail(): any;
  abstract update(product: any): any;
}

export class SampleShopProduct extends BaseShopProduct {
  private target: SampleProductTarget;

  constructor(shopProductKey: ShopProductKey, shopKey: ShopKey, delYn: DelYn, target: SampleProductTarget) {
    super(shopProductKey, shopKey, delYn);
    this.target = target;
  }

  get detail(): SampleProductTarget {
    return this.target;
  }

  update(product: SampleProduct): SampleShopProduct {
    this.target.product = product;
    return this;
  }
}

export class CategoryShopProduct extends BaseShopProduct {
  private target: CategoryProductTarget;

  constructor(shopProductKey: ShopProductKey, shopKey: ShopKey, delYn: DelYn, target: CategoryProductTarget) {
    super(shopProductKey, shopKey, delYn);
    this.target = target;
  }

  get detail(): CategoryProductTarget {
    return this.target;
  }

  update(product: CategoryProduct): CategoryShopProduct {
    this.target.product = product;
    return this;
  }
}
