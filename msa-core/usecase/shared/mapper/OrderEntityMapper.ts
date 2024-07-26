import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { TblOrder, TblOrderInfo, TblShop, TblShopUser } from "core/database/typerom/entities";
import { OrderRepository } from "core/database/typerom/repositories/OrderRepository";
import { ReviewKey } from "domain/order/key";
import { OrderKey } from "domain/order/key/OrderKey";
import { Order, OrderWithReview } from "domain/order/Order";
import { OrderInfo, OrderInfoWithoutKey } from "domain/order/OrderInfo";
import { OrderInfoHistory } from "domain/order/OrderInfoHIstory";
import { DeliveryOrderProcess, OfflineOrderProcess, OrderProcessTypeOption } from "domain/order/OrderProcess";
import { Review } from "domain/order/Review";
import { OrderChannel } from "domain/order/vo/OrderChannel";
import { OrderDates } from "domain/order/vo/OrderDate";
import { OrderStatus, OrderType } from "domain/order/vo/OrderStatus";
import { BaseEntityMapper } from "./_IBaseEntityMapper";
import { IOrderInfoesMappedManager, OrderInfoEntityMapper, OrderInfoMaps } from "./OrderInfoEntityMapper";
import { ReviewEntityMapper, ReviewMappedManager } from "./ReviewEntityMapper";

export interface CreateOrderProps {
  orderType: OrderType;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: OrderChannel;
  orderTargetDate: Date;
}

interface RelationEntity {
  shopUser: TblShopUser;
  shop: TblShop;
}

interface OrderMapped {
  aggregate: Order<OrderProcessTypeOption> | OrderWithReview;
  entity: TblOrder;
}

interface OrderMappedCore {
  aggregate: Order<OrderProcessTypeOption>;
  entity: TblOrder;
  relationEntity: RelationEntity;
}
@Injectable()
export class OrderEntityMapper extends BaseEntityMapper<TblOrder, Order<OrderProcessTypeOption>> {
  constructor(
    private readonly orderInfoEntityMapper: OrderInfoEntityMapper,
    private readonly reviewEntityMapper: ReviewEntityMapper,
    private readonly orderRepository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {
    super();
  }

  private toAggregate(entity: TblOrder, histories: OrderInfo[], review: Review): Order<OrderProcessTypeOption> {
    const orderKey: OrderKey = new OrderKey(entity.key);
    const orderDates: OrderDates = {
      orderTargetDate: entity.orderTargetDate,
      requestDate: entity.requestDate,
      acceptDate: entity.acceptDate,
      rejectDate: entity.rejectDate,
      paymentLimitDate: entity.paymentLimitDate,
      paymentConfirmRequestedDate: entity.paymentConfirmRequestedDate,
      rollbackCheckPaymentDate: entity.rollbackCheckPaymentDate,
      confirmDate: entity.confirmDate,
      pickupRequestDate: entity.pickupRequestDate,
      startDeliveryDate: entity.startDeliveryDate,
      completeDate: entity.completeDate,
      cancelDate: entity.cancelDate,
      modifyDate: entity.modifyDate,
    };
    let orderProcess: OrderProcessTypeOption;
    switch (entity.orderType) {
      case OrderType.OFFLINE:
        orderProcess = new OfflineOrderProcess(entity.orderStatus as OrderStatus, orderDates);
        break;
      case OrderType.DELIVERY:
        orderProcess = new DeliveryOrderProcess(entity.orderStatus as OrderStatus, orderDates);
        break;
      default:
        throw new Error("Invalid orderType");
    }
    const orderInfo: OrderInfoWithoutKey = new OrderInfoWithoutKey(orderKey, {
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
    const orderHistory = new OrderInfoHistory(orderKey, histories);
    const orderReview = entity.reviewYn === "Y" ? review : ({} as never);
    return new Order(orderKey, orderProcess, orderInfo, orderHistory, orderReview);
  }

  public createAggregate(props: CreateOrderProps): Order<OrderProcessTypeOption> {
    const orderKey: OrderKey = OrderKey.create();
    const myNever: never = {} as never;
    let orderProcess: OrderProcessTypeOption;
    const orderDates: OrderDates = {
      orderTargetDate: null,
      requestDate: null,
      acceptDate: null,
      rejectDate: null,
      paymentLimitDate: null,
      paymentConfirmRequestedDate: null,
      rollbackCheckPaymentDate: null,
      confirmDate: null,
      pickupRequestDate: null,
      startDeliveryDate: null,
      completeDate: null,
      cancelDate: null,
      modifyDate: null,
    };
    switch (props.orderType) {
      case OrderType.OFFLINE:
        orderProcess = new OfflineOrderProcess(OrderStatus.NONE, orderDates);
        break;
      case OrderType.DELIVERY:
        orderProcess = new DeliveryOrderProcess(OrderStatus.NONE, orderDates);
        break;
      default:
        throw new Error("Invalid orderType");
    }
    return new Order(
      orderKey,
      orderProcess,
      new OrderInfoWithoutKey(orderKey, {
        orderType: props.orderType as OrderType,
        orderProductName: props.orderProductName as string,
        orderProductImg: props.orderProductImg as string,
        orderProductStartPrice: props.orderProductStartPrice as number,
        orderProductEndPrice: props.orderProductEndPrice as number,
        orderPrice: props.orderPrice as number,
        userMemo: props.userMemo as string,
        shopMemo: props.shopMemo as string,
        orderChannel: props.orderChannel as string,
        orderTargetDate: props.orderTargetDate as Date,
      }),
      OrderInfoHistory.create(orderKey),
      myNever,
    );
  }

  private createEntity(props: CreateOrderProps): TblOrder {
    const entity: TblOrder = new TblOrder();
    entity.key = OrderKey.create().key;
    entity.orderStatus = OrderStatus.NONE;
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
    return entity;
  }

  public create(props: CreateOrderProps, relationEntity: RelationEntity): IOrderWithoutReviewMappedManager {
    const entity = this.createEntity(props);
    const aggregate = this.publisher.mergeObjectContext(this.createAggregate(props));
    const orderInfoesMappedManager = this.orderInfoEntityMapper.connectAll(new Map(), { order: entity });
    return new OrderWithoutReviewMappedManager(this.orderRepository, orderInfoesMappedManager, aggregate, entity, relationEntity);
  }

  /**
   * 주어진 주문 키를 사용하여 주문 매퍼 매니저를 연결합니다.
   *
   * @param orderKey 주문 키
   * @returns 주문 매퍼 매니저의 프로미스
   * @throws 주문 엔티티를 찾을 수 없는 경우 에러를 throw합니다.
   */
  public async connectByKey(orderKey: OrderKey): Promise<IOrderWithoutReviewMappedManager | IOrderWithReviewMappedManager> {
    const entity: TblOrder | null = await this.orderRepository.findByKeyWithHistoryAndReview(orderKey.key);
    if (!entity) throw new Error("OrderEntityMapper.load: entity not found");
    const relationEntity: RelationEntity = {
      shopUser: entity.shopUser,
      shop: entity.shop,
    };
    const orderInfoMaps: OrderInfoMaps = new Map();
    const histories: OrderInfo[] =
      entity.orderInfoes?.map((orderInfoEntity) => {
        const orderInfoAggregate: OrderInfo = this.orderInfoEntityMapper.toAggregate(orderInfoEntity, orderKey);
        orderInfoMaps.set(orderInfoEntity.key, {
          aggregate: orderInfoAggregate,
          entity: orderInfoEntity,
        });
        return orderInfoAggregate;
      }) ?? [];
    const orderInfoesMappedManager = this.orderInfoEntityMapper.connectAll(orderInfoMaps, { order: entity });
    if (entity.reviewYn === "Y" && entity.review) {
      const reviewMappedManager = await this.reviewEntityMapper.connectByKey(new ReviewKey(entity.review.key), {
        order: entity,
        shop: entity.shop,
        shopUser: entity.shopUser,
      });
      const review: Review = reviewMappedManager.load();
      const orderWithReview: OrderWithReview = new OrderWithReview(this.toAggregate(entity, histories, review), review);
      const aggregate: OrderWithReview = this.publisher.mergeObjectContext(orderWithReview);
      return new OrderWithReviewMappedManager(this.orderRepository, orderInfoesMappedManager, reviewMappedManager, aggregate, entity, relationEntity);
    } else {
      const aggregate = this.publisher.mergeObjectContext(this.toAggregate(entity, histories, {} as never));
      return new OrderWithoutReviewMappedManager(this.orderRepository, orderInfoesMappedManager, aggregate, entity, relationEntity);
    }
  }

  public async connect(
    { aggregate, entity }: OrderMapped,
    relationEntity: RelationEntity,
  ): Promise<IOrderWithoutReviewMappedManager | IOrderWithReviewMappedManager> {
    const orderInfoMaps: OrderInfoMaps = new Map();
    const histories: OrderInfo[] =
      entity.orderInfoes?.map((orderInfoEntity) => {
        const orderInfoAggregate: OrderInfo = this.orderInfoEntityMapper.toAggregate(orderInfoEntity, aggregate.orderKey);
        orderInfoMaps.set(orderInfoEntity.key, {
          aggregate: orderInfoAggregate,
          entity: orderInfoEntity,
        });
        return orderInfoAggregate;
      }) ?? [];
    const orderInfoesMappedManager = this.orderInfoEntityMapper.connectAll(orderInfoMaps, { order: entity });
    const order = aggregate;
    if (entity.reviewYn === "Y" && entity.review && order.review) {
      const reviewMappedManager = this.reviewEntityMapper.connect(
        {
          aggregate: order.review,
          entity: entity.review,
        },
        {
          order: entity,
          shop: entity.shop,
          shopUser: entity.shopUser,
        },
      );
      const review: Review = reviewMappedManager.load();
      const orderWithReview: OrderWithReview = new OrderWithReview(this.toAggregate(entity, histories, review), review);
      const aggregate: OrderWithReview = this.publisher.mergeObjectContext(orderWithReview);
      return new OrderWithReviewMappedManager(this.orderRepository, orderInfoesMappedManager, reviewMappedManager, aggregate, entity, relationEntity);
    } else {
      const aggregate = this.publisher.mergeObjectContext(this.toAggregate(entity, histories, {} as never));
      return new OrderWithoutReviewMappedManager(this.orderRepository, orderInfoesMappedManager, aggregate, entity, relationEntity);
    }
  }
}

export interface IOrderWithoutReviewMappedManager {
  core(): OrderMappedCore;
  load(): Order<OrderProcessTypeOption>;
  persist(): Promise<void>;
  mergeRelation(relationEntity: RelationEntity): IOrderWithoutReviewMappedManager;
}

export interface IOrderWithReviewMappedManager {
  core(): OrderMappedCore;
  load(): OrderWithReview;
  persist(): Promise<void>;
  mergeRelation(relationEntity: RelationEntity): IOrderWithReviewMappedManager;
}
/**
 * OrderMapperManager 클래스는 Order 엔티티와 데이터베이스 간의 매핑을 담당합니다.
 */
export class OrderMappedManager {
  private orderRepository: OrderRepository;
  protected orderInfoesMappedManager: IOrderInfoesMappedManager;
  protected reviewMappedManager: ReviewMappedManager;
  protected aggregate: Order<OrderProcessTypeOption> | OrderWithReview;
  protected entity: TblOrder;
  protected relationEntity: RelationEntity;
  constructor(
    orderRepository: OrderRepository,
    orderInfoesMappedManager: IOrderInfoesMappedManager,
    reviewMappedManager: ReviewMappedManager,
    aggregate: Order<OrderProcessTypeOption> | OrderWithReview,
    entity: TblOrder,
    relationEntity: RelationEntity,
  ) {
    this.orderRepository = orderRepository;
    this.orderInfoesMappedManager = orderInfoesMappedManager;
    this.reviewMappedManager = reviewMappedManager;
    this.aggregate = aggregate;
    this.entity = entity;
    this.relationEntity = relationEntity;
  }

  protected toEntity(): TblOrder {
    this.entity.key = this.aggregate.orderKey.key;
    this.entity.orderStatus = this.aggregate.process.status;
    this.entity.orderType = this.aggregate.info.detail.orderType;
    this.entity.orderProductName = this.aggregate.info.detail.orderProductName;
    this.entity.orderProductImg = this.aggregate.info.detail.orderProductImg;
    this.entity.orderProductStartPrice = this.aggregate.info.detail.orderProductStartPrice;
    this.entity.orderProductEndPrice = this.aggregate.info.detail.orderProductEndPrice;
    this.entity.orderPrice = this.aggregate.info.detail.orderPrice;
    this.entity.userMemo = this.aggregate.info.detail.userMemo;
    this.entity.shopMemo = this.aggregate.info.detail.shopMemo;
    this.entity.orderTargetDate = this.aggregate.info.detail.orderTargetDate;
    this.entity.requestDate = this.aggregate.process.dates.requestDate;
    this.entity.acceptDate = this.aggregate.process.dates.acceptDate;
    this.entity.rejectDate = this.aggregate.process.dates.rejectDate;
    this.entity.paymentLimitDate = this.aggregate.process.dates.paymentLimitDate;
    this.entity.paymentConfirmRequestedDate = this.aggregate.process.dates.paymentConfirmRequestedDate;
    this.entity.rollbackCheckPaymentDate = this.aggregate.process.dates.rollbackCheckPaymentDate;
    this.entity.confirmDate = this.aggregate.process.dates.confirmDate;
    this.entity.pickupRequestDate = this.aggregate.process.dates.pickupRequestDate;
    this.entity.startDeliveryDate = this.aggregate.process.dates.startDeliveryDate;
    this.entity.completeDate = this.aggregate.process.dates.completeDate;
    this.entity.cancelDate = this.aggregate.process.dates.cancelDate;
    this.entity.modifyDate = this.aggregate.process.dates.modifyDate;
    this.entity.orderChannel = this.aggregate.info.detail.orderChannel;

    this.entity.shopUser = this.relationEntity.shopUser;
    this.entity.shop = this.relationEntity.shop;

    const { orderInfoMaps } = this.orderInfoesMappedManager.core();
    const orderInfoEntities: TblOrderInfo[] = this.aggregate.history.list.map((orderInfo: OrderInfo) => {
      let eachTblOrderInfoEntity: TblOrderInfo;
      const orderInfoMap = orderInfoMaps.get(orderInfo.orderInfoKey.key);
      if (!orderInfoMap) {
        const orderInfoEntity = new TblOrderInfo().toEntity({
          key: orderInfo.orderInfoKey.key,
          orderType: orderInfo.detail.orderType,
          orderProductName: orderInfo.detail.orderProductName,
          orderProductImg: orderInfo.detail.orderProductImg,
          orderProductStartPrice: orderInfo.detail.orderProductStartPrice,
          orderProductEndPrice: orderInfo.detail.orderProductEndPrice,
          orderPrice: orderInfo.detail.orderPrice,
          userMemo: orderInfo.detail.userMemo,
          shopMemo: orderInfo.detail.shopMemo,
          orderChannel: orderInfo.detail.orderChannel,
          orderTargetDate: orderInfo.detail.orderTargetDate,
          order: this.entity,
        });
        orderInfoMaps.set(orderInfo.orderInfoKey.key, {
          aggregate: orderInfo,
          entity: orderInfoEntity,
        });
        eachTblOrderInfoEntity = orderInfoEntity;
      } else {
        eachTblOrderInfoEntity = orderInfoMap.entity;
      }
      return eachTblOrderInfoEntity;
    });
    this.orderInfoesMappedManager.mergeAll(orderInfoMaps);
    this.entity.orderInfoes = orderInfoEntities;
    this.entity.review = this.aggregate.review ? this.reviewMappedManager.entity : null;

    return this.entity;
  }

  public core(): OrderMappedCore {
    return {
      aggregate: this.aggregate,
      entity: this.entity,
      relationEntity: this.relationEntity,
    };
  }

  public load(): Order<OrderProcessTypeOption> | OrderWithReview {
    return this.aggregate;
  }

  protected async saveWithoutReview(): Promise<void> {
    console.log("saveWithoutReview");
    this.toEntity();
    await this.orderInfoesMappedManager.persistAll();
    await this.orderRepository.save(this.entity);
  }

  protected async save(): Promise<void> {
    console.log("save");
    this.toEntity();
    await this.orderInfoesMappedManager.persistAll();
    if (this.aggregate?.review) {
      await this.reviewMappedManager.persist();
    }
    await this.orderRepository.save(this.entity);
  }
}

export class OrderWithoutReviewMappedManager extends OrderMappedManager implements IOrderWithoutReviewMappedManager {
  constructor(
    orderRepository: OrderRepository,
    orderInfoesMappedManager: IOrderInfoesMappedManager,
    aggregate: Order<OrderProcessTypeOption>,
    entity: TblOrder,
    relationEntity: RelationEntity,
  ) {
    super(orderRepository, orderInfoesMappedManager, {} as never, aggregate, entity, relationEntity);
  }

  public async persist(): Promise<void> {
    await this.saveWithoutReview();
  }

  public merge(aggregate: Order<OrderProcessTypeOption>, entity: TblOrder, relationEntity: RelationEntity) {
    this.aggregate = aggregate;
    this.entity = entity;
    this.relationEntity = relationEntity;
  }

  public mergeRelation(relationEntity: RelationEntity): IOrderWithoutReviewMappedManager {
    this.entity.shopUser = relationEntity.shopUser;
    this.entity.shop = relationEntity.shop;
    return this;
  }
}

export class OrderWithReviewMappedManager extends OrderMappedManager implements IOrderWithReviewMappedManager {
  constructor(
    orderRepository: OrderRepository,
    orderInfoesMappedManager: IOrderInfoesMappedManager,
    reviewMappedManager: ReviewMappedManager,
    aggregate: OrderWithReview,
    entity: TblOrder,
    relationEntity: RelationEntity,
  ) {
    super(orderRepository, orderInfoesMappedManager, reviewMappedManager, aggregate, entity, relationEntity);
  }

  public load(): OrderWithReview {
    return this.aggregate as OrderWithReview;
  }

  public async persist(): Promise<void> {
    await this.save();
  }

  public merge(aggregate: OrderWithReview, entity: TblOrder, relationEntity: RelationEntity) {
    this.aggregate = aggregate;
    this.entity = entity;
    this.relationEntity = relationEntity;
  }

  public mergeRelation(relationEntity: RelationEntity): IOrderWithReviewMappedManager {
    this.entity.shopUser = relationEntity.shopUser;
    this.entity.shop = relationEntity.shop;
    return this;
  }

  public mergeReview(reviewMappedManager: ReviewMappedManager): IOrderWithReviewMappedManager {
    this.reviewMappedManager = reviewMappedManager;
    return this;
  }
}
