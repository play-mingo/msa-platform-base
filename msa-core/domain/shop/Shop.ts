import { AggregateRoot } from "@nestjs/cqrs";
import { Orders } from "./Orders";
import { Reviews } from "./Reviews";
import { BasicInfo, ShopInfo } from "./ShopInfo";
import { CategoryShopProduct, SampleShopProduct } from "./ShopProduct";
import { ShopProducts } from "./ShopProducts";
import { ShopUsers } from "./ShopUsers";
import { ShopKey } from "./key";
import { StoreType } from "./vo/ShopInfoType";

export interface IShop {
  shopKey: ShopKey;
  shopInfo: ShopInfo;
  loadProducts(products: ShopProduct[]): ShopProducts;
  saveShopLink(link: string): Shop;
  saveBasicInfo(info: BasicInfo): Shop;
  changeStoreType(shopType: StoreType): Shop;
}

export type ShopProduct = SampleShopProduct | CategoryShopProduct;

export class Shop extends AggregateRoot implements IShop {
  readonly shopKey: ShopKey;
  readonly shopInfo: ShopInfo;
  private shopProducts?: ShopProducts = undefined;
  private users?: ShopUsers = undefined;
  private orders?: Orders = undefined;
  private reviews?: Reviews = undefined;

  constructor(shopKey: ShopKey, shopInfo: ShopInfo) {
    super();
    this.shopKey = shopKey;
    this.shopInfo = shopInfo;
  }

  public static create(): Shop {
    const shopKey = ShopKey.create();
    return new Shop(shopKey, ShopInfo.create(shopKey));
  }

  public loadProducts(products: ShopProduct[]): ShopProducts {
    this.shopProducts = new ShopProducts(this.shopKey, products);
    // this.merge(this.shopProducts);
    return this.shopProducts;
  }

  public get getShopKey() {
    return this.shopKey;
  }

  public get products() {
    return this.shopProducts;
  }

  public saveShopLink(link: string): Shop {
    this.shopInfo.shopLinkUpdate(link);
    return this;
  }

  public saveBasicInfo(info: BasicInfo): Shop {
    this.shopInfo.basicInfoUpdate(info);
    return this;
  }

  public changeStoreType(shopType: StoreType): Shop {
    this.shopInfo.storeTypeUpdate(shopType);
    return this;
  }
}
