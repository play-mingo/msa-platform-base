import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { ORDER_TOPIC } from "core/constant/order.msa.topic";
import { ReviewCategory } from "domain/order/vo/ReviewCategory";
import { lastValueFrom } from "rxjs";
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
import { FloristOrderRegInPayload, UserOrderReviewRegInPayload } from "./dto/order.dto";

@Injectable()
export class OrderService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  async floristOrderList(payload: IFloristOrderListPayload): Promise<IFloristOrderListResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.LSIT, payload));
  }

  async floristOrderListByMonth(payload: IFloristOrderListByMonthPayload): Promise<IFloristOrderListByMonthResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.LIST_BY_MONTH, payload));
  }

  async checkShopUserOrderStatus(payload: ICheckShopUserOrderStatusPayload): Promise<ICheckShopUserOrderStatusResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.SHOP_USER_ORDER_STATUS, payload));
  }

  async floristOrderOrderRegIn(payload: FloristOrderRegInPayload): Promise<IFloristOrderRegInResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.REG_IN, payload));
  }

  async floristOrderDetail(payload: IFloristOrderDetailPayload): Promise<IFloristOrderDetailResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.DETAIL, payload));
  }

  async floristOrderModify(payload: IFloristOrderModifyPayload): Promise<IFloristOrderModifyResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.MODIFY, payload));
  }

  async floristOrderAccept(payload: IFloristOrderAcceptPayload): Promise<IFloristOrderAcceptResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.ACCEPT, payload));
  }

  async floristOrderReject(payload: IFloristOrderRejectPayload): Promise<IFloristOrderRejectResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.REJECT, payload));
  }

  async floristOrderConfirm(payload: IFloristOrderConfirmPayload): Promise<IFloristOrderConfirmResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.CONFIRM, payload));
  }

  async floristOrderPickupRequest(payload: IFloristOrderPickupRequestPayload): Promise<IFloristOrderPickupRequestResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.PICKUP_REQUEST, payload));
  }

  async floristOrderComplete(payload: IFloristOrderCompletePayload): Promise<IFloristOrderCompleteResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.COMPLETE, payload));
  }

  async floristOrderCencel(payload: IFloristOrderCencelPayload): Promise<IFloristOrderCencelResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.CANCEL, payload));
  }

  async floristOrderInfo(payload: IFloristOrderInfoPayload): Promise<IFloristOrderInfoResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.FLORIST.INFO, payload));
  }

  async userOrderCurrent(payload: IUserOrderCurrentPayload): Promise<IUserOrderCurrentResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.CURRENT, payload));
  }

  async userOrderDetail(payload: IUserOrderDetailPayload): Promise<IUserOrderDetailResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.DETAIL, payload));
  }

  async userOrderRegInWithConsulting(payload: IUserOrderRegInWithConsultingPayload): Promise<IUserOrderRegInResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.CONSULTING, payload));
  }

  async userOrderRegInWithQuickOrder(payload: IUserOrderRegInWithQuickOrderPayload): Promise<IUserOrderRegInResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.QUICK_ORDER, payload));
  }

  async userOrderRegIn(payload: IUserOrderRegInPayload): Promise<IUserOrderRegInResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.REG_IN, payload));
  }

  async userOrderCencel(payload: IUserOrderCencelPayload): Promise<IUserOrderCencelResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.CANCEL, payload));
  }

  async userOrderRequestPayment(payload: IUserOrderRequestPaymentPayload): Promise<IUserOrderRequestPaymentResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.REQUEST_PAYMENT, payload));
  }

  async userOrderInfo(payload: IUserOrderInfoPayload): Promise<IUserOrderInfoResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.INFO, payload));
  }

  async userOrderList(payload: IUserOrderListPayload): Promise<IUserOrderListResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.LIST, payload));
  }

  async userOrderReviewList(payload: IUserOrderReviewListPayload): Promise<IUserOrderReviewListResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.REVIEW_LIST, payload));
  }

  async userOrderReviewDetail(payload: IUserOrderReviewDetailPayload): Promise<IUserOrderReviewDetailResult> {
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.REVIEW_DETAIL, payload));
  }

  async userOrderReviewRegIn(dto: UserOrderReviewRegInPayload): Promise<IUserOrderReviewRegInResult> {
    const payload: IUserOrderReviewRegInPayload = {
      orderKey: dto.orderKey,
      contents: dto.contents,
      reviewImgs: dto.reviewImgs,
      reviewStar: dto.reviewStar,
      reviewCnt1: dto.reviewCategories.includes(ReviewCategory.BEAUTY) ? 1 : 0,
      reviewCnt2: dto.reviewCategories.includes(ReviewCategory.DELIVERY) ? 1 : 0,
      reviewCnt3: dto.reviewCategories.includes(ReviewCategory.BRIGHTNESS) ? 1 : 0,
      reviewCnt4: dto.reviewCategories.includes(ReviewCategory.FRESHNESS) ? 1 : 0,
      reviewCnt5: dto.reviewCategories.includes(ReviewCategory.STYLE) ? 1 : 0,
      reviewCnt6: dto.reviewCategories.includes(ReviewCategory.ENERGY) ? 1 : 0,
      reviewCnt7: dto.reviewCategories.includes(ReviewCategory.ANTICIPATION) ? 1 : 0,
      reviewCnt8: dto.reviewCategories.includes(ReviewCategory.AFFORDABILITY) ? 1 : 0,
    };
    return lastValueFrom(this.client.send(ORDER_TOPIC.USER.REVIEW_REG_IN, payload));
  }
}
