import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { OrderKey } from "domain/order/key";
import { OrderInfoKey } from "domain/order/key/OrderInfoKey";
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
  ICheckShopUserOrderStatusPayload,
  IFloristOrderAcceptPayload,
  IFloristOrderCencelPayload,
  IFloristOrderCompletePayload,
  IFloristOrderConfirmPayload,
  IFloristOrderDetailPayload,
  IFloristOrderInfoPayload,
  IFloristOrderListByMonthPayload,
  IFloristOrderListPayload,
  IFloristOrderModifyPayload,
  IFloristOrderPickupRequestPayload,
  IFloristOrderRegInPayload,
  IFloristOrderRejectPayload,
  IUserOrderCencelPayload,
  IUserOrderCurrentPayload,
  IUserOrderDetailPayload,
  IUserOrderInfoPayload,
  IUserOrderListPayload,
  IUserOrderRegInPayload,
  IUserOrderRegInWithConsultingPayload,
  IUserOrderRegInWithQuickOrderPayload,
  IUserOrderRequestPaymentPayload,
  IUserOrderReviewDetailPayload,
  IUserOrderReviewListPayload,
  IUserOrderReviewRegInPayload,
} from "usecase/order/order.payload";
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
  IFloristOrderAcceptResult,
  IFloristOrderCencelResult,
  IFloristOrderCompleteResult,
  IFloristOrderConfirmResult,
  IFloristOrderDetailResult,
  IFloristOrderInfoResult,
  IFloristOrderListByMonthResult,
  IFloristOrderListResult,
  IFloristOrderModifyResult,
  IFloristOrderPickupRequestResult,
  IFloristOrderRegInResult,
  IFloristOrderRejectResult,
  IUserOrderCencelResult,
  IUserOrderCurrentResult,
  IUserOrderDetailResult,
  IUserOrderInfoResult,
  IUserOrderListResult,
  IUserOrderRegInResult,
  IUserOrderRequestPaymentResult,
  IUserOrderReviewDetailResult,
  IUserOrderReviewListResult,
  IUserOrderReviewRegInResult,
} from "usecase/order/order.result";

@Injectable()
export class OrderAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async floristOrderList(payload: IFloristOrderListPayload): Promise<IFloristOrderListResult> {
    return await this.queryBus.execute(new OrderFloristOrderListQuery(payload));
  }

  async floristOrderListByMonth(payload: IFloristOrderListByMonthPayload): Promise<IFloristOrderListByMonthResult> {
    return await this.queryBus.execute(new OrderFloristOrderListByMonthQuery(payload));
  }

  async checkShopUserOrderStatus(payload: ICheckShopUserOrderStatusPayload): Promise<ICheckShopUserOrderStatusResult> {
    return await this.queryBus.execute(new OrderCheckShopUserOrderStatusQuery(payload));
  }

  async floristOrderDetail(payload: IFloristOrderDetailPayload): Promise<IFloristOrderDetailResult> {
    return await this.queryBus.execute(new OrderFloristOrderDetailQuery(new OrderKey(payload.orderKey)));
  }

  async floristOrderInfo(payload: IFloristOrderInfoPayload): Promise<IFloristOrderInfoResult> {
    return await this.queryBus.execute(new OrderFloristOrderInfoQuery(new OrderInfoKey(payload.orderInfoKey)));
  }

  async userOrderCurrent(payload: IUserOrderCurrentPayload): Promise<IUserOrderCurrentResult> {
    return await this.queryBus.execute(new OrderUserOrderCurrentQuery(payload));
  }

  async userOrderDetail(payload: IUserOrderDetailPayload): Promise<IUserOrderDetailResult> {
    return await this.queryBus.execute(new OrderUserOrderDetailQuery(new OrderKey(payload.orderKey)));
  }

  async userOrderInfo(payload: IUserOrderInfoPayload): Promise<IUserOrderInfoResult> {
    return await this.queryBus.execute(new OrderUserOrderInfoQuery(new OrderInfoKey(payload.orderInfoKey)));
  }

  async userOrderList(payload: IUserOrderListPayload): Promise<IUserOrderListResult> {
    return await this.queryBus.execute(new OrderUserOrderListQuery(payload));
  }

  async userOrderReviewList(payload: IUserOrderReviewListPayload): Promise<IUserOrderReviewListResult> {
    return await this.queryBus.execute(new OrderUserOrderReviewListQuery(payload));
  }

  async userOrderReviewDetail(payload: IUserOrderReviewDetailPayload): Promise<IUserOrderReviewDetailResult> {
    return await this.queryBus.execute(new OrderUserOrderReviewDetailQuery(payload));
  }

  async floristOrderRegIn(payload: IFloristOrderRegInPayload): Promise<IFloristOrderRegInResult> {
    return await this.commandBus.execute(new OrderFloristOrderRegInCommand(payload));
  }

  async floristOrderModify(payload: IFloristOrderModifyPayload): Promise<IFloristOrderModifyResult> {
    return await this.commandBus.execute(new OrderFloristOrderModifyCommand(payload));
  }

  async floristOrderAccept(payload: IFloristOrderAcceptPayload): Promise<IFloristOrderAcceptResult> {
    return await this.commandBus.execute(new OrderFloristOrderAcceptCommand(new OrderKey(payload.orderKey)));
  }

  async floristOrderReject(payload: IFloristOrderRejectPayload): Promise<IFloristOrderRejectResult> {
    return await this.commandBus.execute(new OrderFloristOrderRejectCommand(new OrderKey(payload.orderKey)));
  }

  async floristOrderConfirm(payload: IFloristOrderConfirmPayload): Promise<IFloristOrderConfirmResult> {
    return await this.commandBus.execute(new OrderFloristOrderConfirmCommand(new OrderKey(payload.orderKey)));
  }

  async floristOrderPickupRequest(payload: IFloristOrderPickupRequestPayload): Promise<IFloristOrderPickupRequestResult> {
    return await this.commandBus.execute(new OrderFloristOrderPickupRequestCommand(new OrderKey(payload.orderKey)));
  }

  async floristOrderComplete(payload: IFloristOrderCompletePayload): Promise<IFloristOrderCompleteResult> {
    return await this.commandBus.execute(new OrderFloristOrderCompleteCommand(new OrderKey(payload.orderKey)));
  }

  async floristOrderCencel(payload: IFloristOrderCencelPayload): Promise<IFloristOrderCencelResult> {
    return await this.commandBus.execute(new OrderFloristOrderCencelCommand(new OrderKey(payload.orderKey)));
  }

  async userOrderRegInWithConsulting(payload: IUserOrderRegInWithConsultingPayload): Promise<IUserOrderRegInResult> {
    return await this.commandBus.execute(new OrderUserOrderRegInWithConsultingCommand(payload));
  }

  async userOrderRegInWithQuickOrder(payload: IUserOrderRegInWithQuickOrderPayload): Promise<IUserOrderRegInResult> {
    return await this.commandBus.execute(new OrderUserOrderRegInWithQuickOrderCommand(payload));
  }

  async userOrderRegIn(payload: IUserOrderRegInPayload): Promise<IUserOrderRegInResult> {
    return await this.commandBus.execute(new OrderUserOrderRegInCommand(payload));
  }

  async userOrderCencel(payload: IUserOrderCencelPayload): Promise<IUserOrderCencelResult> {
    return await this.commandBus.execute(new OrderUserOrderCencelCommand(new OrderKey(payload.orderKey)));
  }

  async userOrderRequestPayment(payload: IUserOrderRequestPaymentPayload): Promise<IUserOrderRequestPaymentResult> {
    return await this.commandBus.execute(new OrderUserOrderRequestPaymentCommand(new OrderKey(payload.orderKey)));
  }

  async userOrderReviewRegIn(payload: IUserOrderReviewRegInPayload): Promise<IUserOrderReviewRegInResult> {
    return await this.commandBus.execute(new OrderUserOrderReviewRegInCommand(payload));
  }
}
