import { BaseCqrsDomainFactory } from "domain/_base";
import { OrderKey } from "./key";
import { OrderInfo } from "./OrderInfo";

export type OrderInfoHistoryOrNever = OrderInfoHistory | never;
export class OrderInfoHistory extends BaseCqrsDomainFactory {
  orderKey: OrderKey;
  histories: OrderInfo[];

  constructor(orderKey: OrderKey, histories: OrderInfo[] = []) {
    super();
    this.orderKey = orderKey;
    this.histories = histories;
  }

  public static create(orderKey: OrderKey) {
    return new OrderInfoHistory(orderKey);
  }

  public add(orderInfo: OrderInfo) {
    this.histories.push(orderInfo);
  }

  public get list(): OrderInfo[] {
    return this.histories;
  }
}
