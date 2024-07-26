import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { TblShop, TblShopUser } from "core/database/typerom/entities";
import { ShopRepository, ShopUserRepository } from "core/database/typerom/repositories";
import { ShopUser } from "domain/shop/ShopUser";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";
import { BaseEntityMapper } from "./_IBaseEntityMapper";

@Injectable()
export class ShopUserEntityMapper extends BaseEntityMapper<TblShopUser, ShopUser> {
  protected aggregate?: ShopUser;
  protected entity?: TblShopUser;
  protected relationEntity!: RelationEntity;
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly shopRepository: ShopRepository,
    private readonly publisher: EventPublisher,
  ) {
    super();
  }

  protected toAggregate(entity: TblShopUser): ShopUser {
    const shopUserKey: ShopUserKey = new ShopUserKey(entity.key);
    return new ShopUser(shopUserKey, {
      shopUserName: entity.shopUserName as string,
      shopUserPhone: entity.shopUserPhone as string,
      shopUserBirth: entity.shopUserBirth,
      shopUserGender: entity.shopUserGender,
      orderCnt: entity.orderCnt ?? 0,
    });
  }

  protected toEntity(aggregate: ShopUser): TblShopUser {
    let entity: TblShopUser | undefined = this.entity;
    if (!entity) {
      entity = new TblShopUser();
    }
    entity.key = aggregate.shopUserKey.key;
    entity.shopUserName = aggregate.shopInfo.shopUserName;
    entity.shopUserPhone = aggregate.shopInfo.shopUserPhone;
    entity.shopUserBirth = aggregate.shopInfo.shopUserBirth;
    entity.shopUserGender = aggregate.shopInfo.shopUserGender;
    entity.orderCnt = aggregate.shopInfo.orderCnt;
    entity.shop = this.relationEntity.shop ? this.relationEntity.shop : entity.shop;
    return entity;
  }

  async contextByNameAndPhoneWithShop(shopKey: string, shopUserName: string, shopUserPhone: string): Promise<ShopUserMapContext> {
    const entity = await this.shopUserRepository.findOneByNameAndPhoneWithShop(shopKey, shopUserName, shopUserPhone);
    if (!entity) throw new Error("ShopUserEntityMapper.findContextByNameAndPhoneWithShop: entity not found");
    return {
      aggregate: this.publisher.mergeObjectContext(this.toAggregate(entity)),
      entity: entity,
      relationEntity: { shop: entity.shop },
    };
  }

  /**
   * 회원키 -> map context
   * @param shopUserKey 회워키
   * @returns ShopUserMapContext - { aggregate, entity, relationEntity }
   */
  async contextByKeyWithShop(shopUserKey: ShopUserKey): Promise<ShopUserMapContext> {
    const entity = await this.shopUserRepository.findOneByKeyWithShop(shopUserKey);
    if (!entity) throw new Error("ShopUserEntityMapper.findContextByKeyWithShop: entity not found");
    return {
      aggregate: this.publisher.mergeObjectContext(this.toAggregate(entity)),
      entity: entity,
      relationEntity: { shop: entity.shop },
    };
  }

  /**
   * 회원키 -> map context
   * @param shopUserId 회워키
   * @returns ShopUserMapContext - { aggregate, entity, relationEntity }
   */
  async contextByIdWithShop(shopUserId: number): Promise<ShopUserMapContext> {
    const entity = await this.shopUserRepository.findOneByIdWithShop(shopUserId);
    if (!entity) throw new Error("ShopUserEntityMapper.findContextByKeyWithShop: entity not found");
    return {
      aggregate: this.publisher.mergeObjectContext(this.toAggregate(entity)),
      entity: entity,
      relationEntity: { shop: entity.shop },
    };
  }

  async contextByShopKey(shopKey: ShopUserKey): Promise<ShopUserMapContext> {
    const shopUserKey: ShopUserKey = ShopUserKey.create();
    const shopUserEntity: TblShopUser = new TblShopUser();
    const shopUserAggregate = ShopUser.create(shopUserKey, {} as any);
    const shopEntity: TblShop | null = await this.shopRepository.findOneByKey(shopKey);
    if (!shopEntity) throw new Error("ShopUserEntityMapper.contextByShopKey: shopEntity not found");
    return {
      aggregate: this.publisher.mergeObjectContext(shopUserAggregate),
      entity: shopUserEntity,
      relationEntity: { shop: shopEntity },
    };
  }

  connect(context: ShopUserMapContext): IShopUserMappedManager {
    this.aggregate = this.publisher.mergeObjectContext(context.aggregate);
    this.entity = context.entity;
    this.relationEntity = context.relationEntity;
    return this;
  }

  async connectByKey(relationEntity: RelationEntity, shopUserKey?: ShopUserKey): Promise<IShopUserMappedManager> {
    let entity: TblShopUser | null = null;
    let aggregate: ShopUser;
    if (shopUserKey) {
      entity = await this.shopUserRepository.findOneByKeyWithShop(shopUserKey);
      if (!entity) throw new Error("ShopEntityMapper.load: entity not found");
      aggregate = this.publisher.mergeObjectContext(this.toAggregate(entity));
    } else {
      entity = new TblShopUser();
      aggregate = this.publisher.mergeObjectContext(
        new ShopUser(new ShopUserKey(entity.key), {
          shopUserName: entity.shopUserName as string,
          shopUserPhone: entity.shopUserPhone as string,
          shopUserBirth: entity.shopUserBirth,
          shopUserGender: entity.shopUserGender,
          orderCnt: entity.orderCnt ?? 0,
        }),
      );
    }
    this.aggregate = aggregate;
    this.entity = entity;
    this.relationEntity = relationEntity;
    return this;
  }

  public get context(): Readonly<ShopUserMapContext> {
    return {
      aggregate: this.aggregate as ShopUser,
      entity: this.entity as TblShopUser,
      relationEntity: this.relationEntity,
    };
  }

  load(): ShopUser {
    return this.aggregate as ShopUser;
  }

  async persist(): Promise<TblShopUser> {
    this.entity = this.toEntity(this.aggregate as ShopUser);
    return await this.shopUserRepository.save(this.entity);
  }
}

export interface IShopUserMappedManager {
  load(): ShopUser;
  persist(): Promise<TblShopUser>;
  context: Readonly<ShopUserMapContext>;
}

export interface RelationEntity {
  shop: TblShop;
}

export interface ShopUserMapContext {
  aggregate: ShopUser;
  entity: TblShopUser;
  relationEntity: RelationEntity;
}
