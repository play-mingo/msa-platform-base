import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ShopRepository, ShopUserRepository } from "core/database/typerom/repositories";
import { ToggleYn } from "domain/_base";
import { OrderKey, ReviewKey } from "domain/order/key";
import { Order } from "domain/order/Order";
import { DeliveryOrderProcess, OfflineOrderProcess, OrderProcessTypeOption } from "domain/order/OrderProcess";
import { ShopKey } from "domain/shop/key";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";
import { Transactional } from "typeorm-transactional";
import { IOrderWithoutReviewMappedManager, OrderEntityMapper, OrderInfoEntityMapper } from "usecase/shared/mapper";
import { ReviewEntityMapper } from "usecase/shared/mapper/ReviewEntityMapper";
import {
  OrderFloristOrderAcceptCommand,
  OrderFloristOrderCencelCommand,
  OrderFloristOrderCompleteCommand,
  OrderFloristOrderConfirmCommand,
  OrderFloristOrderModifyCommand,
  OrderFloristOrderPickupRequestCommand,
  OrderFloristOrderRegInCommand,
  OrderFloristOrderRejectCommand,
  OrderUserOrderCencelCommand,
  OrderUserOrderRegInCommand,
  OrderUserOrderRegInWithConsultingCommand,
  OrderUserOrderRegInWithQuickOrderCommand,
  OrderUserOrderRequestPaymentCommand,
  OrderUserOrderReviewRegInCommand,
} from "usecase/order/order.command";
import {
  IFloristOrderAcceptResult,
  IFloristOrderCencelResult,
  IFloristOrderCompleteResult,
  IFloristOrderConfirmResult,
  IFloristOrderModifyResult,
  IFloristOrderPickupRequestResult,
  IFloristOrderRegInResult,
  IFloristOrderRejectResult,
  IUserOrderCencelResult,
  IUserOrderRegInResult,
  IUserOrderRequestPaymentResult,
  IUserOrderReviewRegInResult,
} from "usecase/order/order.result";
import { UserRegisteredOrderWithConsultingEvent, UserRegisteredOrderWithQuickOrderEvent } from "./order.event";

@CommandHandler(OrderFloristOrderRegInCommand)
export class OrderFloristOrderRegInCommandHandler implements ICommandHandler<OrderFloristOrderRegInCommand, IFloristOrderRegInResult> {
  constructor(
    private readonly orderEntityMapper: OrderEntityMapper,
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
  ) {}
  @Transactional()
  async execute(command: OrderFloristOrderRegInCommand): Promise<IFloristOrderRegInResult> {
    const shopEntity = await this.shopRepository.findOneById(command.data.shopId);
    const shopUserEntity = await this.shopUserRepository.findOneByKey(new ShopUserKey(command.data.shopUserKey));
    if (!shopEntity || !shopUserEntity) throw new Error("Shop or ShopUser not found");
    const manager: IOrderWithoutReviewMappedManager = this.orderEntityMapper.create(command.data, {
      shop: shopEntity,
      shopUser: shopUserEntity,
    });
    const order = manager.load().createOrder(command.data);
    order.process.requestQuickOrder();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderModifyCommand)
export class OrderFloristOrderModifyCommandHandler implements ICommandHandler<OrderFloristOrderModifyCommand, IFloristOrderModifyResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderModifyCommand): Promise<IFloristOrderModifyResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(new OrderKey(command.data.orderKey));
    manager.load().updateInfo(command.data);
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderAcceptCommand)
export class OrderFloristOrderAcceptCommandHandler implements ICommandHandler<OrderFloristOrderAcceptCommand, IFloristOrderAcceptResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderAcceptCommand): Promise<IFloristOrderAcceptResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.accept();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderRejectCommand)
export class OrderFloristOrderRejectCommandHandler implements ICommandHandler<OrderFloristOrderRejectCommand, IFloristOrderRejectResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderRejectCommand): Promise<IFloristOrderRejectResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.reject();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderConfirmCommand)
export class OrderFloristOrderConfirmCommandHandler implements ICommandHandler<OrderFloristOrderConfirmCommand, IFloristOrderConfirmResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderConfirmCommand): Promise<IFloristOrderConfirmResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.confirmPayment();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderPickupRequestCommand)
export class OrderFloristOrderPickupRequestCommandHandler
  implements ICommandHandler<OrderFloristOrderPickupRequestCommand, IFloristOrderPickupRequestResult>
{
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderPickupRequestCommand): Promise<IFloristOrderPickupRequestResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    if (order.process instanceof OfflineOrderProcess) order.process.requestOfflinePickup();
    else if (order.process instanceof DeliveryOrderProcess) order.process.requestDeliveryPickup();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderCompleteCommand)
export class OrderFloristOrderCompleteCommandHandler implements ICommandHandler<OrderFloristOrderCompleteCommand, IFloristOrderCompleteResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderCompleteCommand): Promise<IFloristOrderCompleteResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.complete();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderFloristOrderCencelCommand)
export class OrderFloristOrderCencelCommandHandler implements ICommandHandler<OrderFloristOrderCencelCommand, IFloristOrderCencelResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderFloristOrderCencelCommand): Promise<IFloristOrderCencelResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.cancel();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderUserOrderRegInWithConsultingCommand)
export class OrderUserOrderRegInWithConsultingCommandHandler
  implements ICommandHandler<OrderUserOrderRegInWithConsultingCommand, IUserOrderRegInResult>
{
  constructor(
    private readonly orderEntityMapper: OrderEntityMapper,
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
  ) {}
  @Transactional()
  async execute(command: OrderUserOrderRegInWithConsultingCommand): Promise<IUserOrderRegInResult> {
    const shopEntity = await this.shopRepository.findOneByKey(new ShopKey(command.data.shopKey));
    const shopUserEntity = await this.shopUserRepository.findOneById(command.data.shopUserId);
    if (!shopEntity || !shopUserEntity) throw new Error("Shop or ShopUser not found");
    const manager: IOrderWithoutReviewMappedManager = this.orderEntityMapper.create(command.data, {
      shop: shopEntity,
      shopUser: shopUserEntity,
    });
    const order = manager.load().createOrder(command.data);
    order.process.requestConsult();
    await manager.persist();
    order.publish(new UserRegisteredOrderWithConsultingEvent({ orderKey: order.orderKey.key }));
    order.commit();
    return {};
  }
}

@CommandHandler(OrderUserOrderRegInWithQuickOrderCommand)
export class OrderUserOrderRegInWithQuickOrderCommandHandler
  implements ICommandHandler<OrderUserOrderRegInWithQuickOrderCommand, IUserOrderRegInResult>
{
  constructor(
    private readonly orderEntityMapper: OrderEntityMapper,
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
  ) {}
  @Transactional()
  async execute(command: OrderUserOrderRegInCommand): Promise<IUserOrderRegInResult> {
    const shopEntity = await this.shopRepository.findOneByKey(new ShopKey(command.data.shopKey));
    const shopUserEntity = await this.shopUserRepository.findOneById(command.data.shopUserId);
    if (!shopEntity || !shopUserEntity) throw new Error("Shop or ShopUser not found");
    const manager: IOrderWithoutReviewMappedManager = this.orderEntityMapper.create(command.data, {
      shop: shopEntity,
      shopUser: shopUserEntity,
    });
    const order = manager.load().createOrder(command.data);
    order.process.requestQuickOrder();
    await manager.persist();
    order.publish(new UserRegisteredOrderWithQuickOrderEvent({ orderKey: order.orderKey.key }));
    order.commit();
    return {};
  }
}
@CommandHandler(OrderUserOrderRegInCommand)
export class OrderUserOrderRegInCommandHandler implements ICommandHandler<OrderUserOrderRegInCommand, IUserOrderRegInResult> {
  constructor(
    private readonly orderEntityMapper: OrderEntityMapper,
    private readonly orderInfoEntityMapper: OrderInfoEntityMapper,
    private readonly shopRepository: ShopRepository,
    private readonly shopUserRepository: ShopUserRepository,
    private readonly publisher: EventPublisher,
  ) {}
  @Transactional()
  async execute(command: OrderUserOrderRegInCommand): Promise<IUserOrderRegInResult> {
    const shopEntity = await this.shopRepository.findOneByKey(new ShopKey(command.data.shopKey));
    const shopUserEntity = await this.shopUserRepository.findOneById(command.data.shopUserId);
    if (!shopEntity || !shopUserEntity) throw new Error("Shop or ShopUser not found");
    const manager: IOrderWithoutReviewMappedManager = this.orderEntityMapper.create(command.data, {
      shop: shopEntity,
      shopUser: shopUserEntity,
    });
    const order = manager.load().createOrder(command.data);
    order.process.requestQuickOrder();
    await manager.persist();
    order.publish(new UserRegisteredOrderWithQuickOrderEvent({ orderKey: order.orderKey.key }));
    order.commit();
    return {};
  }
}

@CommandHandler(OrderUserOrderCencelCommand)
export class OrderUserOrderCencelCommandHandler implements ICommandHandler<OrderUserOrderCencelCommand, IUserOrderCencelResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderUserOrderCencelCommand): Promise<IUserOrderCencelResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.cancel();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderUserOrderRequestPaymentCommand)
export class OrderUserOrderRequestPaymentCommandHandler
  implements ICommandHandler<OrderUserOrderRequestPaymentCommand, IUserOrderRequestPaymentResult>
{
  constructor(private readonly orderEntityMapper: OrderEntityMapper) {}
  @Transactional()
  async execute(command: OrderUserOrderRequestPaymentCommand): Promise<IUserOrderRequestPaymentResult> {
    const manager: IOrderWithoutReviewMappedManager = await this.orderEntityMapper.connectByKey(command.orderKey);
    const order: Order<OrderProcessTypeOption> = manager.load();
    order.process.requestPaymentConfirm();
    await manager.persist();
    return {};
  }
}

@CommandHandler(OrderUserOrderReviewRegInCommand)
export class OrderUserOrderReviewRegInCommandHandler implements ICommandHandler<OrderUserOrderReviewRegInCommand, IUserOrderReviewRegInResult> {
  constructor(private readonly orderEntityMapper: OrderEntityMapper, private readonly reivewEntityMapper: ReviewEntityMapper) {}
  @Transactional()
  async execute(command: OrderUserOrderReviewRegInCommand): Promise<IUserOrderReviewRegInResult> {
    const manager = await this.orderEntityMapper.connectByKey(new OrderKey(command.data.orderKey));
    const { aggregate, entity, relationEntity } = manager.core();
    if (aggregate.review?.detail || entity.reviewYn === ToggleYn.ACTIVE || entity.review) throw new Error("Review already exists");
    const reviewKey: ReviewKey = ReviewKey.create();
    aggregate.createReview(reviewKey, command.data);
    entity.reviewYn = ToggleYn.ACTIVE;
    entity.review = await this.reivewEntityMapper.createEntity(reviewKey, command.data, {
      ...relationEntity,
      order: entity,
      shop: relationEntity.shop,
      shopUser: relationEntity.shopUser,
    });
    const managerWithReview = await this.orderEntityMapper.connect({ aggregate, entity }, relationEntity);
    await managerWithReview.persist();
    return {};
  }
}

export const OrderCommandHandlers = [
  OrderFloristOrderRegInCommandHandler,
  OrderFloristOrderModifyCommandHandler,
  OrderFloristOrderAcceptCommandHandler,
  OrderFloristOrderRejectCommandHandler,
  OrderFloristOrderConfirmCommandHandler,
  OrderFloristOrderPickupRequestCommandHandler,
  OrderFloristOrderCompleteCommandHandler,
  OrderFloristOrderCencelCommandHandler,
  OrderUserOrderRegInCommandHandler,
  OrderUserOrderCencelCommandHandler,
  OrderUserOrderRequestPaymentCommandHandler,
  OrderUserOrderReviewRegInCommandHandler,
  OrderUserOrderRegInWithConsultingCommandHandler,
  OrderUserOrderRegInWithQuickOrderCommandHandler,
];
