import { Injectable } from "@nestjs/common";
import { TblShop, TblShopAdmin } from "core/database/typerom/entities";
import { ShopRepository } from "core/database/typerom/repositories/ShopRepository";
import { Shop } from "domain/shop/Shop";
import { ShopInfo } from "domain/shop/ShopInfo";
import { ShopAdminKey, ShopKey } from "domain/shop/key";
import { StoreType } from "domain/shop/vo/ShopInfoType";
import { BaseEntityMapper } from "./_IBaseEntityMapper";
import { EventPublisher } from "@nestjs/cqrs";

@Injectable()
export class ShopEntityMapper extends BaseEntityMapper<TblShop, Shop> {
  constructor(private readonly shopRepository: ShopRepository, private readonly publisher: EventPublisher, originalEntities: Map<string, TblShop>) {
    super();
    this.originalEntities = originalEntities;
  }

  private relationEntity?: TblShopAdmin = undefined;
  private relationAggregateKey?: ShopAdminKey = undefined;

  public setRelationEntity(relationEntity: TblShopAdmin): ShopEntityMapper {
    this.relationEntity = relationEntity;
    return this;
  }

  public setRelationAggregateKey(relationAggregateKey: ShopAdminKey): { toAggregate: (entity: TblShop) => Shop } {
    this.relationAggregateKey = relationAggregateKey;
    return {
      toAggregate: this.toAggregate,
    };
  }

  public toAggregate(entity: TblShop): Shop {
    const shopKey: ShopKey = new ShopKey(entity.key);
    this.setOriginalEntity(shopKey.key, entity);
    return new Shop(new ShopKey(entity.key), this.toShopInfo(shopKey, entity));
  }

  public toEntity(aggregate: Shop): TblShop {
    let entity: TblShop | undefined = this.originalEntities.get(aggregate.shopKey.key);
    if (!entity) {
      entity = new TblShop();
    }
    // const admin: CopiedShop = aggregate.admin.copyAdmin();
    entity.key = aggregate.shopKey.key;
    entity.storeType = aggregate.shopInfo.storeType as unknown as string;
    entity.shopName = aggregate.shopInfo.shopName;
    entity.shopLink = aggregate.shopInfo.shopLink;
    entity.shopPhone = aggregate.shopInfo.shopPhone;
    entity.shopAddr = aggregate.shopInfo.shopAddr;
    entity.shopAddrDetail = aggregate.shopInfo.shopAddrDetail;
    entity.shopAddrPostCode = aggregate.shopInfo.shopAddrPostCode;
    entity.shopLat = aggregate.shopInfo.shopLat;
    entity.shopLng = aggregate.shopInfo.shopLng;
    entity.shopRegNo = aggregate.shopInfo.shopRegNo;
    entity.shopImgPath = aggregate.shopInfo.shopImgPath;
    entity.shopAccountOwner = aggregate.shopInfo.shopAccountOwner;
    entity.shopAccountBankName = aggregate.shopInfo.shopAccountBankName;
    entity.shopAccountBankNumber = aggregate.shopInfo.shopAccountBankNumber;
    entity.shopStartTime = aggregate.shopInfo.shopStartTime;
    entity.shopEndTime = aggregate.shopInfo.shopEndTime;
    entity.holidayWeek = aggregate.shopInfo.holidayWeek;
    entity.shopInfoDesc = aggregate.shopInfo.shopInfoDesc;
    entity.reviewStarAvg = aggregate.shopInfo.reviewStarAvg;
    entity.reviewCnt = aggregate.shopInfo.reviewCnt;
    entity.reviewCnt1 = aggregate.shopInfo.reviewCnt1;
    entity.reviewCnt2 = aggregate.shopInfo.reviewCnt2;
    entity.reviewCnt3 = aggregate.shopInfo.reviewCnt3;
    entity.reviewCnt4 = aggregate.shopInfo.reviewCnt4;
    entity.reviewCnt5 = aggregate.shopInfo.reviewCnt5;
    entity.reviewCnt6 = aggregate.shopInfo.reviewCnt6;
    entity.reviewCnt7 = aggregate.shopInfo.reviewCnt7;
    entity.reviewCnt8 = aggregate.shopInfo.reviewCnt8;
    return entity;
  }

  // TODO: empty fields check!!
  private toShopInfo(shopKey: ShopKey, entity: TblShop): ShopInfo {
    return new ShopInfo(shopKey, {
      id: entity.id,
      storeType: entity.storeType as unknown as StoreType,
      shopName: entity.shopName as string,
      shopLink: entity.shopLink as string,
      shopPhone: entity.shopPhone as string,
      shopAddr: entity.shopAddr as string,
      shopAddrDetail: entity.shopAddrDetail as string,
      shopAddrPostCode: entity.shopAddrPostCode as string,
      shopLat: entity.shopLat as number,
      shopLng: entity.shopLng as number,
      shopRegNo: entity.shopRegNo,
      shopImgPath: entity.shopImgPath,
      shopAccountOwner: entity.shopAccountOwner,
      shopAccountBankName: entity.shopAccountBankName,
      shopAccountBankNumber: entity.shopAccountBankNumber,
      shopStartTime: entity.shopStartTime,
      shopEndTime: entity.shopEndTime,
      holidayWeek: entity.holidayWeek,
      shopInfoDesc: entity.shopInfoDesc,
      reviewStarAvg: entity.reviewStarAvg,
      reviewCnt: entity.reviewCnt,
      reviewCnt1: entity.reviewCnt1,
      reviewCnt2: entity.reviewCnt2,
      reviewCnt3: entity.reviewCnt3,
      reviewCnt4: entity.reviewCnt4,
      reviewCnt5: entity.reviewCnt5,
      reviewCnt6: entity.reviewCnt6,
      reviewCnt7: entity.reviewCnt7,
      reviewCnt8: entity.reviewCnt8,
    });
  }

  public async load(key: ShopKey): Promise<Shop> {
    const entity: TblShop | null = await this.shopRepository.findOneByKey(key);
    if (!entity) throw new Error("ShopEntityMapper.load: entity not found");
    return this.publisher.mergeObjectContext(this.toAggregate(entity));
  }

  public async save(aggregate: Shop): Promise<void> {
    const entity = this.toEntity(aggregate);
    if (this.relationEntity) entity.shopAdmin = this.relationEntity;
    await this.shopRepository.save(entity);
  }
}

export const openWeeks = (holidays: string): string[] => {
  const totalWeeks = ["0", "1", "2", "3", "4", "5", "6"];
  const holidayWeeks = holidays.split(",").filter((day) => day !== "");
  const openWeeks = totalWeeks.filter((day) => !holidayWeeks.includes(day));
  return openWeeks;
};
