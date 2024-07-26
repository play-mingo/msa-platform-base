import { BaseCqrsDomainFactory, DelYn } from "domain/_base";
import { CategoryProductTarget, CategoryShopProduct, SampleProductTarget, SampleShopProduct } from "./ShopProduct";
import { ShopKey } from "./key";
import { ShopProductType } from "./vo/ShopProductType";
import { ShopProductKey } from "./key/ShopProductKey";

export type ShopProductTargets = Array<SampleProductTarget | CategoryProductTarget>;
export interface IShopProducts {
  products: Array<SampleShopProduct | CategoryShopProduct>;
  save(targets: ShopProductTargets): IShopProducts;
}

export class ShopProducts extends BaseCqrsDomainFactory implements IShopProducts {
  readonly shopKey: ShopKey;
  private readonly shopProducts: Array<SampleShopProduct | CategoryShopProduct> = [];

  constructor(shopKey: ShopKey, shopProducts: Array<SampleShopProduct | CategoryShopProduct>) {
    super();
    this.shopKey = shopKey;
    this.shopProducts = shopProducts;
  }

  public get products() {
    return this.shopProducts;
  }

  public save(targets: ShopProductTargets): ShopProducts {
    this.deleteProducts();
    this.updateProducts(targets);
    this.addProducts(targets);
    console.log("------- this.shopProducts -------");
    this.shopProducts.forEach((product) => {
      console.log(product.detail);
      console.log(product.detail.product);
    });
    return this;
  }

  private deleteProducts() {
    this.shopProducts.map((product) => product.delete());
  }

  private addProducts(targets: ShopProductTargets) {
    targets
      .filter((target) => !target.key)
      .map((target) =>
        this.shopProducts.push(
          target.productType === ShopProductType.SAMPLE
            ? new SampleShopProduct(ShopProductKey.create(), this.shopKey, DelYn.ACTIVE, target)
            : new CategoryShopProduct(ShopProductKey.create(), this.shopKey, DelYn.ACTIVE, target),
        ),
      );
  }

  private updateProducts(targets: ShopProductTargets) {
    targets.forEach((target) => {
      if (target.productType === ShopProductType.SAMPLE) {
        const sampleTarget = target as SampleProductTarget;
        const product = this.getSampleProductSameWithTarget(sampleTarget);
        if (product) product.update(sampleTarget.product).active();
      } else if (target.productType === ShopProductType.CATEGORY) {
        const categoryTarget = target as CategoryProductTarget;
        const product = this.getCategoryProductSameWithTarget(categoryTarget);
        if (product) product.update(categoryTarget.product).active();
      }
    });
  }

  private getSampleProductSameWithTarget(target: SampleProductTarget): SampleShopProduct | undefined {
    return this.shopProducts.find((shopProduct) => shopProduct instanceof SampleShopProduct && shopProduct.shopProductKey.key === target.key) as
      | SampleShopProduct
      | undefined;
  }

  private getCategoryProductSameWithTarget(target: CategoryProductTarget): CategoryShopProduct | undefined {
    return this.shopProducts.find((shopProduct) => shopProduct instanceof CategoryShopProduct && shopProduct.shopProductKey.key === target.key) as
      | CategoryShopProduct
      | undefined;
  }
}
