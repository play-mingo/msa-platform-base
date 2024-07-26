import { BaseCqrsDomainFactory } from "domain/_base";
import { OrderStatus } from "./vo/OrderStatus";
import { OrderDates } from "./vo/OrderDate";

export type OrderProcessTypeOption = OfflineOrderProcess | DeliveryOrderProcess;
export abstract class OrderProcess extends BaseCqrsDomainFactory {
  private orderStatus: OrderStatus;
  private orderDates: OrderDates;

  constructor(orderStatus: OrderStatus, orderDates: OrderDates) {
    super();
    this.orderStatus = orderStatus;
    this.orderDates = orderDates;
  }

  get status() {
    return this.orderStatus;
  }

  get dates() {
    return this.orderDates;
  }

  public updateOrderTatgetDate(orderTargetDate: Date): void {
    this.orderDates.orderTargetDate = orderTargetDate;
  }

  protected _requestConsult() {
    if (this.status !== OrderStatus.NONE) throw new Error("invalid status");
    this.orderStatus = OrderStatus.CONSULTING;
    this.orderDates.requestDate = new Date();
  }

  protected _requestQuickOrder() {
    if (this.status !== OrderStatus.NONE) throw new Error("invalid status");
    this.orderStatus = OrderStatus.QUICK_ORDER;
    this.orderDates.requestDate = new Date();
  }

  protected _accept() {
    if (!(this.status === OrderStatus.QUICK_ORDER || this.status === OrderStatus.PAYMENT_READY)) throw new Error("invalid status");
    this.orderStatus = OrderStatus.PAYMENT_READY;
    this.orderDates.acceptDate = new Date();
  }

  protected _reject() {
    if (!(this.status === OrderStatus.QUICK_ORDER || this.status === OrderStatus.PAYMENT_READY)) throw new Error("invalid status");
    this.orderStatus = OrderStatus.REJECTED;
    this.orderDates.rejectDate = new Date();
  }

  protected _requestPaymentConfirm() {
    if (this.status !== OrderStatus.PAYMENT_READY) throw new Error("invalid status");
    this.orderStatus = OrderStatus.PAYMENT_CONFIRM_REQUESTED;
    this.orderDates.paymentConfirmRequestedDate = new Date();
  }

  protected _confirmPayment() {
    if (this.status !== OrderStatus.PAYMENT_CONFIRM_REQUESTED) throw new Error("invalid status");
    this.orderStatus = OrderStatus.PRUDUCT_CREATING;
    this.orderDates.confirmDate = new Date();
  }

  protected _notFoundPayment() {
    if (this.status !== OrderStatus.PAYMENT_CONFIRM_REQUESTED) throw new Error("invalid status");
    this.orderStatus = OrderStatus.PAYMENT_NOT_FOUND;
    this.orderDates.rollbackCheckPaymentDate = new Date();
  }

  protected _requestOfflinePickup() {
    if (this.status !== OrderStatus.PRUDUCT_CREATING) throw new Error("invalid status");
    this.orderStatus = OrderStatus.OFFLINE_PICKUP_READY;
    this.orderDates.pickupRequestDate = new Date();
  }

  protected _requestDeliveryPickup() {
    if (this.status !== OrderStatus.PRUDUCT_CREATING) throw new Error("invalid status");
    this.orderStatus = OrderStatus.DELIVERY_PICKUP_READY;
    this.orderDates.pickupRequestDate = new Date();
  }

  protected _deliver() {
    if (this.status !== OrderStatus.DELIVERY_PICKUP_READY) throw new Error("invalid status");
    this.orderStatus = OrderStatus.DELIVERY;
    this.orderDates.startDeliveryDate = new Date();
  }

  protected _complete() {
    if (!(this.status === OrderStatus.OFFLINE_PICKUP_READY || this.status === OrderStatus.DELIVERY)) throw new Error("invalid status");
    this.orderStatus = OrderStatus.COMPLETED;
    this.orderDates.completeDate = new Date();
  }

  protected _cancel() {
    this.orderStatus = OrderStatus.CANCELED;
    this.orderDates.cancelDate = new Date();
  }
}

export class OfflineOrderProcess extends OrderProcess {
  constructor(orderStatus: OrderStatus, orderDates: OrderDates) {
    super(orderStatus, orderDates);
  }

  static create(orderStatus: OrderStatus, orderDates: OrderDates) {
    return new OfflineOrderProcess(orderStatus, orderDates);
  }

  public requestConsult(): OfflineOrderProcess {
    this._requestConsult();
    return this;
  }

  public requestQuickOrder(): OfflineOrderProcess {
    this._requestQuickOrder();
    return this;
  }

  public accept(): OfflineOrderProcess {
    this._accept();
    return this;
  }

  public reject(): OfflineOrderProcess {
    this._reject();
    return this;
  }

  public requestPaymentConfirm(): OfflineOrderProcess {
    this._requestPaymentConfirm();
    return this;
  }

  public confirmPayment(): OfflineOrderProcess {
    this._confirmPayment();
    return this;
  }

  public notFoundPayment(): OfflineOrderProcess {
    this._notFoundPayment();
    return this;
  }

  public requestOfflinePickup(): OfflineOrderProcess {
    this._requestOfflinePickup();
    return this;
  }

  public complete(): OfflineOrderProcess {
    this._complete();
    return this;
  }

  public cancel(): OfflineOrderProcess {
    this._cancel();
    return this;
  }
}

export class DeliveryOrderProcess extends OrderProcess {
  constructor(orderStatus: OrderStatus, orderDates: OrderDates) {
    super(orderStatus, orderDates);
  }

  static create(orderStatus: OrderStatus, orderDates: OrderDates) {
    return new DeliveryOrderProcess(orderStatus, orderDates);
  }

  public requestConsult(): DeliveryOrderProcess {
    this._requestConsult();
    return this;
  }

  public requestQuickOrder(): DeliveryOrderProcess {
    this._requestQuickOrder();
    return this;
  }

  public accept(): DeliveryOrderProcess {
    this._accept();
    return this;
  }

  public reject(): DeliveryOrderProcess {
    this._reject();
    return this;
  }

  public requestPaymentConfirm(): DeliveryOrderProcess {
    this._requestPaymentConfirm();
    return this;
  }

  public confirmPayment(): DeliveryOrderProcess {
    this._confirmPayment();
    return this;
  }

  public notFoundPayment(): DeliveryOrderProcess {
    this._notFoundPayment();
    return this;
  }

  public requestDeliveryPickup(): DeliveryOrderProcess {
    this._requestDeliveryPickup();
    return this;
  }

  public deliver(): DeliveryOrderProcess {
    this._deliver();
    return this;
  }

  public complete(): DeliveryOrderProcess {
    this._complete();
    return this;
  }

  public cancel(): DeliveryOrderProcess {
    this._cancel();
    return this;
  }
}
