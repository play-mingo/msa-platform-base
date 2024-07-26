import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import {
  OrderCheckShopUserOrderStatusQuery,
  OrderFloristOrderDetailQuery,
  OrderFloristOrderInfoQuery,
  OrderFloristOrderListByMonthQuery,
  OrderFloristOrderListQuery,
  OrderUserOrderCurrentQuery,
  OrderUserOrderDetailQuery,
  OrderUserOrderInfoQuery,
  OrderUserOrderListQuery,
  OrderUserOrderReviewDetailQuery,
  OrderUserOrderReviewListQuery,
} from "usecase/order/order.query";
import {
  ICheckShopUserOrderStatusResult,
  IFloristOrderDetailResult,
  IFloristOrderInfoResult,
  IFloristOrderListByMonthResult,
  IFloristOrderListResult,
  IUserOrderCurrentResult,
  IUserOrderDetailResult,
  IUserOrderInfoResult,
  IUserOrderListResult,
  IUserOrderReviewDetailResult,
  IUserOrderReviewListResult,
} from "usecase/order/order.result";
import { orderStatusType, OrderStatusType } from "./order.payload";
import { OrderStatus, OrderType } from "domain/order/vo/OrderStatus";
import { OrderInfoRepository, OrderRepository, ReviewRepository, ShopRepository, ShopUserRepository } from "core/database/typerom/repositories";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";

@QueryHandler(OrderFloristOrderListQuery)
export class OrderFloristOrderListQueryHandler implements IQueryHandler<OrderFloristOrderListQuery, IFloristOrderListResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderFloristOrderListQuery): Promise<IFloristOrderListResult> {
    const result = await this.orderRepository.findFloristOrderList({
      shopId: query.data.shopId,
      orderBy: query.data.orderBy,
      orderStatusType: this.toOrderStatus(query.data.orderStatusType),
      pageNum: query.data.pageNum,
    });
    return {
      ...result,
      list: result.list.map((each) => ({
        ...each,
        orderType: each.orderType as OrderType,
      })),
    };
  }

  toOrderStatus = (type: OrderStatusType): OrderStatus[] => {
    switch (type) {
      case orderStatusType.ORDER_READY:
        return [
          OrderStatus.CONSULTING,
          OrderStatus.QUICK_ORDER,
          OrderStatus.REJECTED,
          OrderStatus.PAYMENT_READY,
          OrderStatus.PAYMENT_NOT_FOUND,
          OrderStatus.PAYMENT_CONFIRM_REQUESTED,
        ];
      case orderStatusType.PRODUCT_READY:
        return [OrderStatus.PRUDUCT_CREATING];
      case orderStatusType.PICKUP_READY:
        return [OrderStatus.OFFLINE_PICKUP_READY, OrderStatus.DELIVERY_PICKUP_READY, OrderStatus.DELIVERY];
      case orderStatusType.COMPLETE:
        return [OrderStatus.COMPLETED];
      default:
        throw new Error("Invalid orderStatusType");
    }
  };
}

@QueryHandler(OrderFloristOrderListByMonthQuery)
export class OrderFloristOrderListByMonthQueryHandler implements IQueryHandler<OrderFloristOrderListByMonthQuery, IFloristOrderListByMonthResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderFloristOrderListByMonthQuery): Promise<IFloristOrderListByMonthResult> {
    return await this.orderRepository.findFloristOrderListByMonth(query.data);
  }
}

@QueryHandler(OrderCheckShopUserOrderStatusQuery)
export class OrderCheckShopUserOrderStatusQueryHandler implements IQueryHandler<OrderCheckShopUserOrderStatusQuery, ICheckShopUserOrderStatusResult> {
  constructor(private readonly orderRepository: OrderRepository, private readonly shopUserRepository: ShopUserRepository) {}
  async execute(query: OrderCheckShopUserOrderStatusQuery): Promise<ICheckShopUserOrderStatusResult> {
    const shopUser = await this.shopUserRepository.findOneByKey(new ShopUserKey(query.data.shopUserKey));
    if (!shopUser) throw new Error("ShopUser not found");
    return {
      isExistOrder: await this.orderRepository.isExistActiveOrder(query.data.shopId, shopUser.id),
    };
  }
}

@QueryHandler(OrderFloristOrderDetailQuery)
export class OrderFloristOrderDetailQueryHandler implements IQueryHandler<OrderFloristOrderDetailQuery, IFloristOrderDetailResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderFloristOrderDetailQuery): Promise<IFloristOrderDetailResult> {
    return await this.orderRepository.findOrderDetailByKey(query.orderKey.key);
  }
}

@QueryHandler(OrderFloristOrderInfoQuery)
export class OrderFloristOrderInfoQueryHandler implements IQueryHandler<OrderFloristOrderInfoQuery, IFloristOrderInfoResult> {
  constructor(private readonly orderInfoRepository: OrderInfoRepository) {}
  async execute(query: OrderFloristOrderInfoQuery): Promise<IFloristOrderInfoResult> {
    return await this.orderInfoRepository.findOrderInfoDetailByKey(query.orderInfoKey.key);
  }
}

@QueryHandler(OrderUserOrderCurrentQuery)
export class OrderUserOrderCurrentQueryHandler implements IQueryHandler<OrderUserOrderCurrentQuery, IUserOrderCurrentResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderUserOrderCurrentQuery): Promise<IUserOrderCurrentResult> {
    return await this.orderRepository.findUserOrderCurrent(query.data.shopKey, query.data.shopUserId);
  }
}

@QueryHandler(OrderUserOrderDetailQuery)
export class OrderUserOrderDetailQueryHandler implements IQueryHandler<OrderUserOrderDetailQuery, IUserOrderDetailResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderUserOrderDetailQuery): Promise<IUserOrderDetailResult> {
    return await this.orderRepository.findOrderDetailByKey(query.orderKey.key);
  }
}

@QueryHandler(OrderUserOrderInfoQuery)
export class OrderUserOrderInfoQueryHandler implements IQueryHandler<OrderUserOrderInfoQuery, IUserOrderInfoResult> {
  constructor(private readonly orderInfoRepository: OrderInfoRepository) {}
  async execute(query: OrderUserOrderInfoQuery): Promise<IUserOrderInfoResult> {
    return await this.orderInfoRepository.findOrderInfoDetailByKey(query.orderInfoKey.key);
  }
}

@QueryHandler(OrderUserOrderListQuery)
export class OrderUserOrderListQueryHandler implements IQueryHandler<OrderUserOrderListQuery, IUserOrderListResult> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute(query: OrderUserOrderListQuery): Promise<IUserOrderListResult> {
    return await this.orderRepository.findUserOrderList(query.data);
  }
}

@QueryHandler(OrderUserOrderReviewListQuery)
export class OrderUserOrderReviewListQueryHandler implements IQueryHandler<OrderUserOrderReviewListQuery, IUserOrderReviewListResult> {
  constructor(private readonly reviewRepository: ReviewRepository) {}
  async execute(query: OrderUserOrderReviewListQuery): Promise<IUserOrderReviewListResult> {
    return await this.reviewRepository.findUserOrderReviewList(query.data);
  }
}

@QueryHandler(OrderUserOrderReviewDetailQuery)
export class OrderUserOrderReviewDetailQueryHandler implements IQueryHandler<OrderUserOrderReviewDetailQuery, IUserOrderReviewDetailResult> {
  constructor(private readonly reviewRepository: ReviewRepository) {}
  async execute(query: OrderUserOrderReviewDetailQuery): Promise<IUserOrderReviewDetailResult> {
    return await this.reviewRepository.findDetailByKey(query.data.reviewKey);
  }
}

export const OrderQueryHandlers = [
  OrderFloristOrderListQueryHandler,
  OrderFloristOrderListByMonthQueryHandler,
  OrderCheckShopUserOrderStatusQueryHandler,
  OrderFloristOrderDetailQueryHandler,
  OrderFloristOrderInfoQueryHandler,
  OrderUserOrderCurrentQueryHandler,
  OrderUserOrderDetailQueryHandler,
  OrderUserOrderInfoQueryHandler,
  OrderUserOrderListQueryHandler,
  OrderUserOrderReviewListQueryHandler,
  OrderUserOrderReviewDetailQueryHandler,
];
