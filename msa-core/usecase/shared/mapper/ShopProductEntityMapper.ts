import { Injectable } from "@nestjs/common";
import { TblShop, TblShopProduct } from "core/database/typerom/entities";
import { ShopProductRepository } from "core/database/typerom/repositories/ShopProductRepository";
import { ShopProduct } from "domain/shop/Shop";
import { CategoryShopProduct, SampleShopProduct } from "domain/shop/ShopProduct";
import { ShopKey } from "domain/shop/key";
import { ShopProductKey } from "domain/shop/key/ShopProductKey";
import { ShopAutoUpdateType, ShopProductCategory, ShopProductPriceType, ShopProductType, ToggleYn } from "domain/shop/vo/ShopProductType";
import { BaseEntityMapper } from "./_IBaseEntityMapper";
import { ProductItem } from "usecase/shop/shop.result";

@Injectable()
export class ShopProductEntityMapper extends BaseEntityMapper<TblShopProduct, ShopProduct> {
  constructor(private readonly shopProductRepository: ShopProductRepository, originalEntities: Map<string, TblShopProduct>) {
    super();
    this.originalEntities = originalEntities;
  }

  private relationEntity?: TblShop = undefined;
  private relationAggregateKey?: ShopKey = undefined;

  public setRelationEntity(relationEntity: TblShop): ShopProductEntityMapper {
    this.relationEntity = relationEntity;
    return this;
  }

  public setRelationAggregateKey(relationAggregateKey: ShopKey): { toAggregate: (entity: TblShopProduct) => ShopProduct } {
    this.relationAggregateKey = relationAggregateKey;
    return {
      toAggregate: this.toAggregate,
    };
  }

  public toAggregate(entity: TblShopProduct): ShopProduct {
    const shopProductKey: ShopProductKey = new ShopProductKey(entity.key);
    this.setOriginalEntity(shopProductKey.key, entity);
    if (entity.productType === ShopProductType.SAMPLE)
      return new SampleShopProduct(shopProductKey, new ShopKey(entity.key), entity.delYn, {
        key: entity.key,
        no: entity.no as number,
        productType: entity.productType,
        product: {
          productCategory: entity.productCategory as ShopProductCategory,
          productName: entity.productName as string,
          productImgPath: entity.productImgPath as string,
          contents: entity.contents as string,
          productPrice: entity.productPrice as number,
          autoUpdateType: entity.autoUpdateType as ShopAutoUpdateType,
          productPriceType: entity.productPriceType as ShopProductPriceType,
          productPriceStart: entity.productPriceStart as number,
          productPriceEnd: entity.productPriceEnd as number,
          quickPurchaseYn: entity.quickPurchaseYn as ToggleYn,
          consultingYn: entity.consultingYn as ToggleYn,
          deliveryYn: entity.deliveryYn as ToggleYn,
        },
      });

    if (entity.productType === ShopProductType.CATEGORY)
      return new CategoryShopProduct(shopProductKey, new ShopKey(entity.key), entity.delYn, {
        key: entity.key,
        no: entity.no as number,
        productType: entity.productType,
        product: {
          productCategory: entity.productCategory as ShopProductCategory,
          productItems: jsonToshopProductItem(entity.productItems),
          quickPurchaseYn: entity.quickPurchaseYn as ToggleYn,
          consultingYn: entity.consultingYn as ToggleYn,
          deliveryYn: entity.deliveryYn as ToggleYn,
        },
      });

    throw new Error("Invalid product type");
  }

  public toEntity(aggregate: ShopProduct): TblShopProduct {
    let entity: TblShopProduct | undefined = this.originalEntities.get(aggregate.shopProductKey.key);
    if (!entity) {
      entity = new TblShopProduct();
    }
    entity.key = aggregate.shopProductKey.key;
    entity.no = aggregate.detail.no;
    entity.productType = aggregate.detail.productType;
    entity.delYn = aggregate.delYn;
    entity.quickPurchaseYn = aggregate.detail.product.quickPurchaseYn;
    entity.consultingYn = aggregate.detail.product.consultingYn;
    entity.deliveryYn = aggregate.detail.product.deliveryYn;
    if (aggregate instanceof SampleShopProduct) {
      entity.productCategory = aggregate.detail.product.productCategory;
      entity.productName = aggregate.detail.product.productName;
      entity.productImgPath = aggregate.detail.product.productImgPath;
      entity.contents = aggregate.detail.product.contents;
      entity.productPrice = aggregate.detail.product.productPrice;
      entity.autoUpdateType = aggregate.detail.product.autoUpdateType;
      entity.productPriceType = aggregate.detail.product.productPriceType;
      entity.productPriceStart = aggregate.detail.product.productPriceStart;
      entity.productPriceEnd = aggregate.detail.product.productPriceEnd;
      return entity;
    }
    if (aggregate instanceof CategoryShopProduct) {
      entity.productItems = JSON.stringify(aggregate.detail.product.productItems);
      return entity;
    }
    throw new Error("Invalid product type");
  }

  public async loadAll(id: number): Promise<ShopProduct[]> {
    const entities: TblShopProduct[] = await this.shopProductRepository.findByWhere({
      id: id,
    });
    return entities.map((entity) => this.toAggregate(entity));
  }

  public async load(key: ShopProductKey): Promise<ShopProduct> {
    const entity: TblShopProduct | null = await this.shopProductRepository.findOneByKey(key);
    if (!entity) throw new Error("ShopProductEntityMapper.load: entity not found");
    return this.toAggregate(entity);
  }

  public async save(aggregate: ShopProduct): Promise<void> {
    const entity = this.toEntity(aggregate);
    await this.shopProductRepository.save(entity);
  }

  public async saveAll(aggregateArray: ShopProduct[]): Promise<void> {
    // const entities: TblShopProduct[] = aggregateArray.map((aggregate) => this.toEntity(aggregate));
    // await this.shopProductRepository.saveAll(entities);

    const entities: TblShopProduct[] = aggregateArray.map((aggregate) => {
      const entity: TblShopProduct = this.toEntity(aggregate);
      entity.shop = this.relationEntity as TblShop;
      return entity;
    });
    await this.shopProductRepository.saveAll(entities);
  }
}

export const jsonToshopProductItem = (json: string | undefined | null): ProductItem[] => {
  console.log("jsonToshopProductItem", json);
  if (!json) throw new Error("Invalid json :: 상품 정보가 없습니다.");
  const obj = JSON.parse(json);
  if (!Array.isArray(obj)) throw new Error("Invalid json :: 상품 정보가 배열이 아닙니다.");
  obj.map((item) => {
    if (!item || !item.productImgPath || !item.productPrice || !item.productName) throw new Error("Invalid json :: 개별 상품정보가 없습니다.");
  });
  return obj;
};
