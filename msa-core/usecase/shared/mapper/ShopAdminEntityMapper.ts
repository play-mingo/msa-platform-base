import { Injectable } from "@nestjs/common";
import { TblShop, TblShopAdmin } from "core/database/typerom/entities";
import { ShopRepository } from "core/database/typerom/repositories";
import { ShopAdminRepository } from "core/database/typerom/repositories/ShopAdminRepository";
import { DelYn } from "domain/_base";
import { ShopAdminKey } from "domain/shop/key";
import { ShopAdmin } from "domain/shop/ShopAdmin";
import { BaseEntityMapper } from "./_IBaseEntityMapper";
import { ShopAdminLoginInfoEntityMapper } from "./ShopAdminLoginInfoEntityMapper";
import { ShopEntityMapper } from "./ShopEntityMapper";

@Injectable()
export class ShopAdminEntityMapper extends BaseEntityMapper<TblShopAdmin, ShopAdmin> {
  constructor(
    private readonly shopAdminRepository: ShopAdminRepository,
    private readonly shopRepository: ShopRepository,
    private readonly shopAdminLoginInfoEntityMapper: ShopAdminLoginInfoEntityMapper,
    private readonly shopEntityMapper: ShopEntityMapper,
    originalEntities: Map<string, TblShopAdmin>,
  ) {
    super();
    this.originalEntities = originalEntities;
  }

  private toAggregate(entity: TblShopAdmin): ShopAdmin {
    this.setOriginalEntity(entity.key, entity);

    console.log("========= entity.shop ==========");
    console.log(entity.shop);
    return new ShopAdmin({
      shopAdminKey: new ShopAdminKey(entity.key),
      shopAdminInfo: {
        shopAdminNormalAuthId: entity.shopAdminNormalAuthId,
        shopAdminKakaoAuthId: entity.shopAdminKakaoAuthId,
        shopAdminAppleAuthId: entity.shopAdminAppleAuthId,
        shopAdminPw: entity.shopAdminPw,
        shopAdminName: entity.shopAdminName,
        shopAdminPhone: entity.shopAdminPhone,
        marketingYn: entity.marketingYn,
        delYn: entity.delYn,
      },
      shopAdminLoginInfoes: entity?.shopAdminLoginInfoes?.map((loginInfo) => {
        return this.shopAdminLoginInfoEntityMapper.toAggregate(loginInfo) ?? [];
      }),
      shop: entity?.shop && this.shopEntityMapper.toAggregate(entity.shop),
    });
  }

  private toEntity(aggregate: ShopAdmin): TblShopAdmin {
    let entity: TblShopAdmin | undefined = this.getOriginalEntity(aggregate.shopAdminKey.key);
    if (!entity) {
      entity = new TblShopAdmin();
    }

    entity.key = aggregate.shopAdminKey.key;
    entity.shopAdminNormalAuthId = aggregate.shopAdminInfo.shopAdminNormalAuthId;
    entity.shopAdminPw = aggregate.shopAdminInfo.shopAdminPw;
    entity.shopAdminKakaoAuthId = aggregate.shopAdminInfo.shopAdminKakaoAuthId;
    entity.shopAdminAppleAuthId = aggregate.shopAdminInfo.shopAdminAppleAuthId;
    entity.shopAdminName = aggregate.shopAdminInfo.shopAdminName;
    entity.shopAdminPhone = aggregate.shopAdminInfo.shopAdminPhone;
    entity.delYn = aggregate.shopAdminInfo.delYn;
    entity.shopAdminNormalAuthId = aggregate.shopAdminInfo.shopAdminNormalAuthId;
    entity.marketingYn = aggregate.shopAdminInfo.marketingYn;
    entity.shop = aggregate.shop && this.shopEntityMapper.toEntity(aggregate.shop);
    return entity;
  }

  public async loadWithNormalLogin(email: string, pw: string): Promise<ShopAdmin> {
    const entity: TblShopAdmin | null = await this.shopAdminRepository.findOneByEmailAndPwdWithShop(email, pw);
    if (!entity) throw new Error("ShopAdminEntityMapper.load: entity not found");
    const shopEntity: TblShop | null = await this.shopRepository.findOneByWhere({
      shopAdmin: {
        id: entity.id,
      },
      delYn: DelYn.ACTIVE,
    });
    if (!shopEntity) throw new Error("ShopAdminEntityMapper.load: shopEntity not found");
    entity.shop = shopEntity;
    return this.toAggregate(entity);
  }

  public async load(key: ShopAdminKey): Promise<ShopAdmin> {
    const entity: TblShopAdmin | null = await this.shopAdminRepository.findOneByKeyWithLoginInfo(key);
    if (!entity) throw new Error("ShopAdminEntityMapper.load: entity not found");
    return this.toAggregate(entity);
  }

  public async save(aggregate: ShopAdmin): Promise<void> {
    const entity = this.toEntity(aggregate);
    await this.shopAdminRepository.save(entity);
  }

  public async saveWithJoinInfo(aggregate: ShopAdmin): Promise<void> {
    const entity = this.toEntity(aggregate);
    await this.shopAdminRepository.save(entity);
    await this.shopAdminLoginInfoEntityMapper.setRelationEntity(entity).saveAll(aggregate.shopAdminLoginInfoes);
    await this.shopEntityMapper.setRelationEntity(entity).save(aggregate.shop);
  }

  public async saveWithLoginInfo(aggregate: ShopAdmin): Promise<void> {
    const entity = this.toEntity(aggregate);
    await this.shopAdminRepository.save(entity);
    await this.shopAdminLoginInfoEntityMapper.setRelationEntity(entity).saveAll(aggregate.shopAdminLoginInfoes);
  }

  public async isExistSameNormalAuthId(normalAuthId: string): Promise<boolean> {
    return await this.shopAdminRepository.existBy({
      shopAdminNormalAuthId: normalAuthId,
      delYn: "N",
    });
  }

  public async findAllWithSameNameAndPhone(data: { shopAdminName: string; shopAdminPhone: string }): Promise<ShopAdmin[]> {
    const entities = await this.shopAdminRepository.findByWhere({
      shopAdminName: data.shopAdminName,
      shopAdminPhone: data.shopAdminPhone,
      delYn: "N",
    });
    return entities.map((entity) => this.toAggregate(entity));
  }
}
