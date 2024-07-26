import { OrderKey } from "domain/order/key";
import {
  ICheckShopUserOrderStatusPayload,
  IFloristOrderListByMonthPayload,
  IFloristOrderListPayload,
  IUserOrderCurrentPayload,
  IUserOrderListPayload,
  IUserOrderReviewDetailPayload,
  IUserOrderReviewListPayload,
} from "./order.payload";
import { OrderInfoKey } from "domain/order/key/OrderInfoKey";

export class OrderFloristOrderListQuery {
  constructor(public readonly data: IFloristOrderListPayload) {}
}

export class OrderFloristOrderListByMonthQuery {
  constructor(public readonly data: IFloristOrderListByMonthPayload) {}
}

export class OrderCheckShopUserOrderStatusQuery {
  constructor(public readonly data: ICheckShopUserOrderStatusPayload) {}
}

export class OrderFloristOrderDetailQuery {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderInfoQuery {
  constructor(public readonly orderInfoKey: OrderInfoKey) {}
}

export class OrderUserOrderCurrentQuery {
  constructor(public readonly data: IUserOrderCurrentPayload) {}
}

export class OrderUserOrderDetailQuery {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderUserOrderInfoQuery {
  constructor(public readonly orderInfoKey: OrderInfoKey) {}
}

export class OrderUserOrderListQuery {
  constructor(public readonly data: IUserOrderListPayload) {}
}

export class OrderUserOrderReviewListQuery {
  constructor(public readonly data: IUserOrderReviewListPayload) {}
}

export class OrderUserOrderReviewDetailQuery {
  constructor(public readonly data: IUserOrderReviewDetailPayload) {}
}

export const OrderQueries = [
  OrderFloristOrderListQuery,
  OrderFloristOrderListByMonthQuery,
  OrderCheckShopUserOrderStatusQuery,
  OrderFloristOrderDetailQuery,
  OrderFloristOrderInfoQuery,
  OrderUserOrderCurrentQuery,
  OrderUserOrderDetailQuery,
  OrderUserOrderInfoQuery,
  OrderUserOrderListQuery,
  OrderUserOrderReviewListQuery,
  OrderUserOrderReviewDetailQuery,
];
