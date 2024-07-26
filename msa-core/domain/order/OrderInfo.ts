import { BaseCqrsDomainFactory } from "domain/_base";
import { OrderKey } from "./key";
import { OrderInfoKey } from "./key/OrderInfoKey";
import { OrderType } from "./vo/OrderStatus";

export interface OrderInfoDetail {
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

export class OrderInfo extends BaseCqrsDomainFactory {
  orderInfoKey: OrderInfoKey;
  orderKey: OrderKey;
  detail: OrderInfoDetail;

  constructor(orderInfoKey: OrderInfoKey, orderKey: OrderKey, detail: OrderInfoDetail) {
    super();
    this.orderInfoKey = orderInfoKey;
    this.orderKey = orderKey;
    this.detail = detail;
    // this.merge(this);
  }

  public static create(orderKey: OrderKey, detail: OrderInfoDetail) {
    return new OrderInfo(OrderInfoKey.create(), orderKey, detail);
  }
}

export class OrderInfoWithoutKey extends OrderInfo {
  constructor(orderKey: OrderKey, detail: OrderInfoDetail) {
    super(OrderInfoKey.create(), orderKey, detail);
  }
}
