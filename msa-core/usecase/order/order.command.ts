import { OrderKey } from "domain/order/key";
import {
  IFloristOrderModifyPayload,
  IFloristOrderRegInPayload,
  IUserOrderRegInPayload,
  IUserOrderRegInWithConsultingPayload,
  IUserOrderRegInWithQuickOrderPayload,
  IUserOrderReviewRegInPayload,
} from "./order.payload";

export class OrderFloristOrderRegInCommand {
  constructor(public readonly data: IFloristOrderRegInPayload) {}
}

export class OrderFloristOrderModifyCommand {
  constructor(public readonly data: IFloristOrderModifyPayload) {}
}

export class OrderFloristOrderAcceptCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderRejectCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderConfirmCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderPickupRequestCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderCompleteCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderFloristOrderCencelCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderUserOrderRegInWithConsultingCommand {
  constructor(public readonly data: IUserOrderRegInWithConsultingPayload) {}
}

export class OrderUserOrderRegInWithQuickOrderCommand {
  constructor(public readonly data: IUserOrderRegInWithQuickOrderPayload) {}
}

export class OrderUserOrderRegInCommand {
  constructor(public readonly data: IUserOrderRegInPayload) {}
}

export class OrderUserOrderCencelCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderUserOrderRequestPaymentCommand {
  constructor(public readonly orderKey: OrderKey) {}
}

export class OrderUserOrderReviewRegInCommand {
  constructor(public readonly data: IUserOrderReviewRegInPayload) {}
}

export const OrderCommands = [
  OrderFloristOrderRegInCommand,
  OrderFloristOrderModifyCommand,
  OrderFloristOrderAcceptCommand,
  OrderFloristOrderRejectCommand,
  OrderFloristOrderConfirmCommand,
  OrderFloristOrderPickupRequestCommand,
  OrderFloristOrderCompleteCommand,
  OrderFloristOrderCencelCommand,
  OrderUserOrderRegInCommand,
  OrderUserOrderCencelCommand,
  OrderUserOrderRequestPaymentCommand,
  OrderUserOrderReviewRegInCommand,
];
