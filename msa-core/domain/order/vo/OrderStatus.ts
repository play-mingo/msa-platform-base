export const OrderType = {
  OFFLINE: "0",
  DELIVERY: "1",
} as const;
export type OrderType = (typeof OrderType)[keyof typeof OrderType];
export const OrderTypeValues = Object.values(OrderType).map((value) => value);

export const OrderStatus = {
  NONE: -1,
  CONSULTING: 0,
  QUICK_ORDER: 1,
  REJECTED: 2,
  PAYMENT_READY: 3,
  PAYMENT_NOT_FOUND: 4,
  PAYMENT_CONFIRM_REQUESTED: 5,
  PRUDUCT_CREATING: 6,
  OFFLINE_PICKUP_READY: 7,
  DELIVERY_PICKUP_READY: 8,
  DELIVERY: 9,
  COMPLETED: 10,
  CANCELED: 11,
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export const OrderStatusValues = Object.values(OrderStatus).map((value) => value);
