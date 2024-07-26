import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { TblOrder, TblOrderInfo } from "core/database/typerom/entities";
import { OrderInfoRepository } from "core/database/typerom/repositories/OrderInfoRepository";
import { OrderInfo } from "domain/order/OrderInfo";
import { OrderKey } from "domain/order/key";
import { OrderInfoKey } from "domain/order/key/OrderInfoKey";
import { OrderType } from "domain/order/vo/OrderStatus";
import { BaseEntityMapper } from "./_IBaseEntityMapper";

interface RelationEntity {
  order: TblOrder;
}

export interface OrderInfoProps {
  orderType: OrderType;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: string;
  orderTargetDate: Date;
}
@Injectable()
export class OrderInfoEntityMapper extends BaseEntityMapper<TblOrderInfo, OrderInfo> {
  constructor(private readonly orderInfoRepository: OrderInfoRepository, private readonly publisher: EventPublisher) {
    super();
  }

  public toAggregate(entity: TblOrderInfo, orderKey: OrderKey): OrderInfo {
    return new OrderInfo(new OrderInfoKey(entity.key), orderKey, {
      orderType: entity.orderType as OrderType,
      orderProductName: entity.orderProductName as string,
      orderProductImg: entity.orderProductImg as string,
      orderProductStartPrice: entity.orderProductStartPrice as number,
      orderProductEndPrice: entity.orderProductEndPrice as number,
      orderPrice: entity.orderPrice as number,
      userMemo: entity.userMemo as string,
      shopMemo: entity.shopMemo as string,
      orderChannel: entity.orderChannel as string,
      orderTargetDate: entity.orderTargetDate as Date,
    });
  }

  public createEntity(orderInfoKey: OrderInfoKey, props: OrderInfoProps, relationEntity: RelationEntity): TblOrderInfo {
    const entity = new TblOrderInfo();
    entity.key = orderInfoKey.key;
    entity.orderType = props.orderType;
    entity.orderProductName = props.orderProductName;
    entity.orderProductImg = props.orderProductImg;
    entity.orderProductStartPrice = props.orderProductStartPrice;
    entity.orderProductEndPrice = props.orderProductEndPrice;
    entity.orderPrice = props.orderPrice;
    entity.userMemo = props.userMemo;
    entity.shopMemo = props.shopMemo;
    entity.orderChannel = props.orderChannel;
    entity.orderTargetDate = props.orderTargetDate;
    entity.order = relationEntity.order;
    return entity;
  }

  public async connectByKey(orderInfoKey: OrderInfoKey, relationEntity: RelationEntity): Promise<IOrderInfoMappedManager> {
    const entity: TblOrderInfo | null = await this.orderInfoRepository.findOneByKey(orderInfoKey);
    if (!entity) throw new Error("TblOrderInfo entity not found");
    const aggregate = this.publisher.mergeObjectContext(this.toAggregate(entity, new OrderKey(entity.order.key)));
    return new OrderInfoOneMappedManager(this.orderInfoRepository, relationEntity, aggregate, entity);
  }

  public connect({ aggregate, entity }: OrderInfoMapped, relationEntity: RelationEntity): IOrderInfoMappedManager {
    return new OrderInfoOneMappedManager(this.orderInfoRepository, relationEntity, aggregate, entity);
  }

  public connectAll(orderInfoMaps: OrderInfoMaps, relationEntity: RelationEntity): IOrderInfoesMappedManager {
    return new OrderInfoesMappedManager(this.orderInfoRepository, relationEntity, orderInfoMaps);
  }
}

interface OrderInfoMappedCore {
  aggregate?: OrderInfo;
  entity?: TblOrderInfo;
  relationEntity: RelationEntity;
  orderInfoMaps: OrderInfoMaps;
}

export type OrderInfoMapped = {
  aggregate: OrderInfo;
  entity: TblOrderInfo;
};
export type OrderInfoMaps = Map<string, OrderInfoMapped>;

export interface IOrderInfoMappedManager {
  load(): OrderInfo;
  persist(): Promise<void>;
  mergeAll(orderInfoMaps: OrderInfoMaps): IOrderInfoMappedManager;
  core(): OrderInfoMappedCore;
}
export interface IOrderInfoesMappedManager {
  loadAll(): OrderInfo[];
  persistAll(): Promise<void>;
  mergeAll(orderInfoMaps: OrderInfoMaps): IOrderInfoesMappedManager;
  core(): OrderInfoMappedCore;
}
@Injectable()
export class OrderInfoMappedManager {
  private readonly orderInfoRepository: OrderInfoRepository;
  private readonly relationEntity: RelationEntity;
  private readonly aggregate?: OrderInfo;
  private readonly entity?: TblOrderInfo;
  private orderInfoMaps?: OrderInfoMaps;

  constructor(
    orderInfoRepository: OrderInfoRepository,
    relationEntity: RelationEntity,
    aggregate?: OrderInfo,
    entity?: TblOrderInfo,
    orderInfoMaps?: OrderInfoMaps,
  ) {
    this.orderInfoRepository = orderInfoRepository;
    this.relationEntity = relationEntity;
    if (aggregate) this.aggregate = aggregate;
    if (entity) this.entity = entity;
    if (orderInfoMaps) this.orderInfoMaps = orderInfoMaps;
  }

  private toEntity(): TblOrderInfo {
    if (!this.entity || !this.aggregate) throw new Error("Aggregate Or Entity are undefined");
    this.entity.key = this.aggregate.orderInfoKey.key;
    this.entity.orderType = this.aggregate.detail.orderType;
    this.entity.orderPrice = this.aggregate.detail.orderPrice;
    this.entity.orderProductName = this.aggregate.detail.orderProductName;
    this.entity.orderProductImg = this.aggregate.detail.orderProductImg;
    this.entity.orderProductStartPrice = this.aggregate.detail.orderProductStartPrice;
    this.entity.orderProductEndPrice = this.aggregate.detail.orderProductEndPrice;
    this.entity.userMemo = this.aggregate.detail.userMemo;
    this.entity.shopMemo = this.aggregate.detail.shopMemo;
    this.entity.orderChannel = this.aggregate.detail.orderChannel;
    this.entity.orderTargetDate = this.aggregate.detail.orderTargetDate;
    this.entity.order = this.relationEntity.order;
    return this.entity;
  }

  private toEntities(): TblOrderInfo[] {
    if (!this.orderInfoMaps) throw new Error("OrderInfoMaps is undefined");
    return Array.from(this.orderInfoMaps.values()).map((orderInfoMapped) => {
      orderInfoMapped.entity.key = orderInfoMapped.aggregate.orderInfoKey.key;
      orderInfoMapped.entity.orderType = orderInfoMapped.aggregate.detail.orderType;
      orderInfoMapped.entity.orderPrice = orderInfoMapped.aggregate.detail.orderPrice;
      orderInfoMapped.entity.orderProductName = orderInfoMapped.aggregate.detail.orderProductName;
      orderInfoMapped.entity.orderProductImg = orderInfoMapped.aggregate.detail.orderProductImg;
      orderInfoMapped.entity.orderProductStartPrice = orderInfoMapped.aggregate.detail.orderProductStartPrice;
      orderInfoMapped.entity.orderProductEndPrice = orderInfoMapped.aggregate.detail.orderProductEndPrice;
      orderInfoMapped.entity.userMemo = orderInfoMapped.aggregate.detail.userMemo;
      orderInfoMapped.entity.shopMemo = orderInfoMapped.aggregate.detail.shopMemo;
      orderInfoMapped.entity.orderChannel = orderInfoMapped.aggregate.detail.orderChannel;
      orderInfoMapped.entity.orderTargetDate = orderInfoMapped.aggregate.detail.orderTargetDate;
      return orderInfoMapped.entity;
    });
  }

  public setRelationEntity(relationEntity: RelationEntity): { toEntity: (aggregate: OrderInfo) => TblOrderInfo } {
    if (!this.entity) throw new Error("Entity is undefined");
    this.entity.order = relationEntity.order;
    return {
      toEntity: this.toEntity,
    };
  }

  public core(): OrderInfoMappedCore {
    return {
      aggregate: this.aggregate,
      entity: this.entity,
      relationEntity: this.relationEntity,
      orderInfoMaps: this.orderInfoMaps ?? new Map<string, OrderInfoMapped>(),
    };
  }

  public load(): OrderInfo {
    if (!this.aggregate) throw new Error("Aggregate is undefined");
    return this.aggregate;
  }

  public mergeAll(orderInfoMaps: OrderInfoMaps): this {
    if (!this.orderInfoMaps) throw new Error("OrderInfoMaps is undefined");
    this.orderInfoMaps = orderInfoMaps;
    return this;
  }

  public async persist(): Promise<void> {
    if (!this.entity || !this.aggregate) throw new Error("Aggregate is undefined");
    this.toEntity();
    await this.orderInfoRepository.save(this.entity);
  }

  public loadAll(): OrderInfo[] {
    return this.orderInfoMaps ? Array.from(this.orderInfoMaps.values()).map((orderInfoMapped) => orderInfoMapped.aggregate) : [];
  }

  public async persistAll(): Promise<void> {
    if (this.orderInfoMaps) {
      const entities: TblOrderInfo[] = this.toEntities();
      console.log("entities.length");
      console.log(entities.length);
      await this.orderInfoRepository.saveAll(entities);
    }
    return;
  }
}

export class OrderInfoOneMappedManager extends OrderInfoMappedManager implements IOrderInfoMappedManager {
  constructor(orderInfoRepository: OrderInfoRepository, relationEntity: RelationEntity, aggregate: OrderInfo, entity: TblOrderInfo) {
    super(orderInfoRepository, relationEntity, aggregate, entity);
  }
}

export class OrderInfoesMappedManager extends OrderInfoMappedManager implements IOrderInfoesMappedManager {
  constructor(orderInfoRepository: OrderInfoRepository, relationEntity: RelationEntity, orderInfoMaps: OrderInfoMaps) {
    super(orderInfoRepository, relationEntity, undefined, undefined, orderInfoMaps);
  }
}
