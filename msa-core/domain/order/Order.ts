import { BaseCqrsDomainFactory } from "domain/_base";
import { OrderKey, ReviewKey } from "./key";
import { OrderInfo, OrderInfoDetail, OrderInfoWithoutKey } from "./OrderInfo";
import { OrderInfoHistoryOrNever, OrderInfoHistory } from "./OrderInfoHIstory";
import { OrderProcessTypeOption } from "./OrderProcess";
import { Review, ReviewDetail, ReviewTypeOption } from "./Review";

export interface IOrder {
  key: OrderKey;
  process: OrderProcessTypeOption;
  info: OrderInfo;
  history: OrderInfoHistory;
}

export interface IOrderWithoutReview {
  key: OrderKey;
  process: OrderProcessTypeOption;
  info: OrderInfo;
  history: OrderInfoHistory;
}
export interface IOrderWithReview {
  key: OrderKey;
  process: OrderProcessTypeOption;
  info: OrderInfo;
  history: OrderInfoHistory;
  review: Review;
}

export class Order<ProcessType extends OrderProcessTypeOption> extends BaseCqrsDomainFactory {
  readonly orderKey: OrderKey;
  private orderInfo: OrderInfoWithoutKey;
  private readonly orderOrocess: ProcessType;
  private orderHistory: OrderInfoHistory;
  private orderReview?: Review;

  constructor(orderKey: OrderKey, process: ProcessType, info: OrderInfoWithoutKey, history: OrderInfoHistory, review: Review) {
    super();
    this.orderKey = orderKey;
    this.orderOrocess = process;
    this.orderInfo = info;
    this.orderHistory = history;
    this.orderReview = review;
    // this.merge(this);
  }

  public static create(process: OrderProcessTypeOption, info: OrderInfoWithoutKey, history: OrderInfoHistoryOrNever, review: ReviewTypeOption) {
    const orderKey: OrderKey = OrderKey.create();
    return new Order(orderKey, process, info, history, review);
  }

  get key(): OrderKey {
    return this.orderKey;
  }

  get process(): ProcessType {
    return this.orderOrocess;
  }

  get review(): Review | undefined {
    return this.orderReview;
  }

  get info(): OrderInfo {
    return this.orderInfo;
  }

  public mergeHistory(history: OrderInfoHistory): Order<ProcessType> {
    this.orderHistory = history as OrderInfoHistory;
    return this;
  }

  get history(): OrderInfoHistory {
    return this.orderHistory;
  }

  public createOrder(detail: OrderInfoDetail): this {
    this.orderInfo = OrderInfo.create(this.orderKey, detail);
    this.history.add(this.orderInfo);
    this.process.updateOrderTatgetDate(detail.orderTargetDate);
    // this.process.requestQuickOrder();
    return this;
  }

  public updateInfo(detail: OrderInfoDetail): this {
    this.orderInfo = OrderInfo.create(this.orderKey, detail);
    this.history.add(this.orderInfo);
    this.process.updateOrderTatgetDate(detail.orderTargetDate);
    return this;
  }

  public createReview(reviewKey: ReviewKey, reviewDetail: ReviewDetail): IOrderWithReview {
    this.orderReview = new Review(this.orderKey, reviewKey, reviewDetail) as Review;
    return this as IOrderWithReview;
  }
}

export class OrderWithReview extends Order<OrderProcessTypeOption> {
  constructor(order: Order<OrderProcessTypeOption>, review: Review) {
    super(order.orderKey, order.process, order.info, order.history, review);
  }
}
