import { Injectable } from "@nestjs/common";
import { TblShopAdmin, TblShopAdminLoginInfo } from "core/database/typerom/entities";
import { ShopAdminLoginInfoRepository } from "core/database/typerom/repositories/ShopAdminLoginInfoRepository";
import { ShopAdminLoginInfo } from "domain/shop/ShopAdminLoginInfo";
import { ShopAdminKey } from "domain/shop/key";
import { ShopAdminLoginInfoKey } from "domain/shop/key/ShopAdminLoginInfoKey";
import { BaseEntityMapper } from "./_IBaseEntityMapper";

@Injectable()
export class ShopAdminLoginInfoEntityMapper extends BaseEntityMapper<TblShopAdminLoginInfo, ShopAdminLoginInfo> {
  constructor(private readonly shopAdminLoginInfoRepository: ShopAdminLoginInfoRepository, originalEntities: Map<string, TblShopAdminLoginInfo>) {
    super();
    this.originalEntities = originalEntities;
  }

  private relationEntity?: TblShopAdmin = undefined;
  private relationAggregateKey?: ShopAdminKey = undefined;

  public setRelationEntity(relationEntity: TblShopAdmin): ShopAdminLoginInfoEntityMapper {
    this.relationEntity = relationEntity;
    return this;
  }

  public setRelationAggregateKey(relationAggregateKey: ShopAdminKey): { toAggregate: (entity: TblShopAdminLoginInfo) => ShopAdminLoginInfo } {
    this.relationAggregateKey = relationAggregateKey;
    return {
      toAggregate: this.toAggregate,
    };
  }

  public toAggregate(entity: TblShopAdminLoginInfo): ShopAdminLoginInfo {
    this.setOriginalEntity(entity.key, entity);
    return new ShopAdminLoginInfo({
      shopAdminLoginInfoKey: new ShopAdminLoginInfoKey(entity.key),
      id: entity.id,
      device: entity.device,
      osType: entity.osType,
      fcmToken: entity.fcmToken ?? "",
      expDate: entity.expDate,
      loginDate: entity.loginDate,
      delYn: entity.delYn,
    });
  }

  public toEntity(aggregate: ShopAdminLoginInfo): TblShopAdminLoginInfo {
    let entity: TblShopAdminLoginInfo | undefined = this.getOriginalEntity(aggregate.shopAdminLoginInfoKey.key);
    if (!entity) {
      entity = new TblShopAdminLoginInfo();
    }
    entity.key = aggregate.shopAdminLoginInfoKey.key;
    entity.device = aggregate.info.device;
    entity.osType = aggregate.info.osType;
    entity.fcmToken = aggregate.info.fcmToken;
    entity.expDate = aggregate.info.expDate;
    entity.loginDate = aggregate.info.loginDate;
    entity.delYn = aggregate.info.delYn as "Y" | "N";

    return entity;
  }

  public async load(key: ShopAdminLoginInfoKey): Promise<ShopAdminLoginInfo> {
    const entity: TblShopAdminLoginInfo | null = await this.shopAdminLoginInfoRepository.findOneByKey(key);
    if (!entity) throw new Error("ShopAdminLoginInfoEntityMapper.load: entity not found");
    return this.toAggregate(entity);
  }

  public async save(aggregate: ShopAdminLoginInfo): Promise<void> {
    const entity = this.toEntity(aggregate);
    await this.shopAdminLoginInfoRepository.save(entity);
  }

  public async saveAll(aggregates: ShopAdminLoginInfo[]): Promise<void> {
    const entities: TblShopAdminLoginInfo[] = aggregates.map((aggregate) => {
      const entity: TblShopAdminLoginInfo = this.toEntity(aggregate);
      entity.shopAdmin = this.relationEntity as TblShopAdmin;
      return entity;
    });
    await this.shopAdminLoginInfoRepository.saveAll(entities);
  }
}
