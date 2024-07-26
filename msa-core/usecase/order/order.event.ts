import { IUserRegisteredOrderWithConsultingPayload, IUserRegisteredOrderWithQuickOrderPayload } from "./order.payload";

/**
 * 상담 주문 등록 이벤트
 * @property data.orderKey 주문키
 */
export class UserRegisteredOrderWithConsultingEvent {
  constructor(public readonly data: IUserRegisteredOrderWithConsultingPayload) {}
}

/**
 * 퀵 주문 등록 이벤트
 * @property data.orderKey 주문키
 */
export class UserRegisteredOrderWithQuickOrderEvent {
  constructor(public readonly data: IUserRegisteredOrderWithQuickOrderPayload) {}
}

export const OrderEvents = [UserRegisteredOrderWithConsultingEvent, UserRegisteredOrderWithQuickOrderEvent];
