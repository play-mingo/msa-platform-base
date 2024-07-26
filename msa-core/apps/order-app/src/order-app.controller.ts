import { Controller, Get } from "@nestjs/common";
import { OrderAppService } from "./order-app.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ORDER_TOPIC } from "core/constant/order.msa.topic";
import {
  IFloristOrderListResult,
  IFloristOrderListByMonthResult,
  ICheckShopUserOrderStatusResult,
  IFloristOrderRegInResult,
  IFloristOrderDetailResult,
  IFloristOrderModifyResult,
  IFloristOrderAcceptResult,
  IFloristOrderRejectResult,
  IFloristOrderConfirmResult,
  IFloristOrderPickupRequestResult,
  IFloristOrderCompleteResult,
  IFloristOrderCencelResult,
  IFloristOrderInfoResult,
  IUserOrderCurrentResult,
  IUserOrderDetailResult,
  IUserOrderRegInResult,
  IUserOrderCencelResult,
  IUserOrderRequestPaymentResult,
  IUserOrderInfoResult,
  IUserOrderListResult,
  IUserOrderReviewListResult,
  IUserOrderReviewDetailResult,
  IUserOrderReviewRegInResult,
} from "usecase/order/order.result";
import {
  IFloristOrderListPayload,
  IFloristOrderListByMonthPayload,
  ICheckShopUserOrderStatusPayload,
  IFloristOrderRegInPayload,
  IFloristOrderDetailPayload,
  IFloristOrderModifyPayload,
  IFloristOrderAcceptPayload,
  IFloristOrderRejectPayload,
  IFloristOrderConfirmPayload,
  IFloristOrderPickupRequestPayload,
  IFloristOrderCompletePayload,
  IFloristOrderCencelPayload,
  IFloristOrderInfoPayload,
  IUserOrderCurrentPayload,
  IUserOrderDetailPayload,
  IUserOrderRegInPayload,
  IUserOrderCencelPayload,
  IUserOrderRequestPaymentPayload,
  IUserOrderInfoPayload,
  IUserOrderListPayload,
  IUserOrderReviewListPayload,
  IUserOrderReviewDetailPayload,
  IUserOrderReviewRegInPayload,
  IUserOrderRegInWithConsultingPayload,
  IUserOrderRegInWithQuickOrderPayload,
} from "usecase/order/order.payload";

@Controller()
export class OrderAppController {
  constructor(private readonly orderAppService: OrderAppService) {}

  /**
   * 예약현황_목록
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.LSIT)
  async floristOrderList(@Payload() payload: IFloristOrderListPayload): Promise<IFloristOrderListResult> {
    return await this.orderAppService.floristOrderList(payload);
  }

  /**
   * 월별 주문내역(캘린더)
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.LIST_BY_MONTH)
  async floristOrderListByMonth(@Payload() payload: IFloristOrderListByMonthPayload): Promise<IFloristOrderListByMonthResult> {
    return await this.orderAppService.floristOrderListByMonth(payload);
  }

  /**
   * 내 고객 예약진행 여부 조회
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.SHOP_USER_ORDER_STATUS)
  async checkShopUserOrderStatus(@Payload() payload: ICheckShopUserOrderStatusPayload): Promise<ICheckShopUserOrderStatusResult> {
    return await this.orderAppService.checkShopUserOrderStatus(payload);
  }

  /**
   * 예약 등록
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.REG_IN)
  async floristOrderOrderRegIn(@Payload() payload: IFloristOrderRegInPayload): Promise<IFloristOrderRegInResult> {
    return await this.orderAppService.floristOrderRegIn(payload);
  }

  /**
   * 예약 상세
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.DETAIL)
  async floristOrderDetail(@Payload() payload: IFloristOrderDetailPayload): Promise<IFloristOrderDetailResult> {
    return await this.orderAppService.floristOrderDetail(payload);
  }

  /**
   * 예약 수정
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.MODIFY)
  async floristOrderModify(@Payload() payload: IFloristOrderModifyPayload): Promise<IFloristOrderModifyResult> {
    return await this.orderAppService.floristOrderModify(payload);
  }

  /**
   * 예약 승인
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.ACCEPT)
  async floristOrderAccept(@Payload() payload: IFloristOrderAcceptPayload): Promise<IFloristOrderAcceptResult> {
    return await this.orderAppService.floristOrderAccept(payload);
  }

  /**
   * 예약 거절
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.REJECT)
  async floristOrderReject(@Payload() payload: IFloristOrderRejectPayload): Promise<IFloristOrderRejectResult> {
    return await this.orderAppService.floristOrderReject(payload);
  }

  /**
   * 예약 확정
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.CONFIRM)
  async floristOrderConfirm(@Payload() payload: IFloristOrderConfirmPayload): Promise<IFloristOrderConfirmResult> {
    return await this.orderAppService.floristOrderConfirm(payload);
  }

  /**
   * 예약 픽업요청
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.PICKUP_REQUEST)
  async floristOrderPickupRequest(@Payload() payload: IFloristOrderPickupRequestPayload): Promise<IFloristOrderPickupRequestResult> {
    return await this.orderAppService.floristOrderPickupRequest(payload);
  }

  /**
   * 예약 수령완료
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.COMPLETE)
  async floristOrderComplete(@Payload() payload: IFloristOrderCompletePayload): Promise<IFloristOrderCompleteResult> {
    return await this.orderAppService.floristOrderComplete(payload);
  }

  /**
   * 예약 취소
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.CANCEL)
  async floristOrderCencel(@Payload() payload: IFloristOrderCencelPayload): Promise<IFloristOrderCencelResult> {
    return await this.orderAppService.floristOrderCencel(payload);
  }

  /**
   * 채팅 내 예약 정보 조회
   */
  @MessagePattern(ORDER_TOPIC.FLORIST.INFO)
  async floristOrderInfo(@Payload() payload: IFloristOrderInfoPayload): Promise<IFloristOrderInfoResult> {
    return await this.orderAppService.floristOrderInfo(payload);
  }

  /**
   * 현재 예약정보 조회
   */
  @MessagePattern(ORDER_TOPIC.USER.CURRENT)
  async userOrderCurrent(@Payload() payload: IUserOrderCurrentPayload): Promise<IUserOrderCurrentResult> {
    return await this.orderAppService.userOrderCurrent(payload);
  }

  /**
   * 예약 상세
   */
  @MessagePattern(ORDER_TOPIC.USER.DETAIL)
  async userOrderDetail(@Payload() payload: IUserOrderDetailPayload): Promise<IUserOrderDetailResult> {
    return await this.orderAppService.userOrderDetail(payload);
  }

  /**
   * 예약 문의하기
   */
  @MessagePattern(ORDER_TOPIC.USER.CONSULTING)
  async userOrderRegInWithConsulting(@Payload() payload: IUserOrderRegInWithConsultingPayload): Promise<IUserOrderRegInResult> {
    return await this.orderAppService.userOrderRegInWithConsulting(payload);
  }

  /**
   * 예약 문의하기
   */
  @MessagePattern(ORDER_TOPIC.USER.QUICK_ORDER)
  async userOrderRegInWithQuickOrder(@Payload() payload: IUserOrderRegInWithQuickOrderPayload): Promise<IUserOrderRegInResult> {
    return await this.orderAppService.userOrderRegInWithQuickOrder(payload);
  }

  /**
   * 예약 문의하기
   */
  @MessagePattern(ORDER_TOPIC.USER.REG_IN)
  async userOrderRegIn(@Payload() payload: IUserOrderRegInPayload): Promise<IUserOrderRegInResult> {
    return await this.orderAppService.userOrderRegIn(payload);
  }

  /**
   * 예약 취소
   */
  @MessagePattern(ORDER_TOPIC.USER.CANCEL)
  async userOrderCencel(@Payload() payload: IUserOrderCencelPayload): Promise<IUserOrderCencelResult> {
    return await this.orderAppService.userOrderCencel(payload);
  }

  /**
   * 입금확인 요청하기
   */
  @MessagePattern(ORDER_TOPIC.USER.REQUEST_PAYMENT)
  async userOrderRequestPayment(@Payload() payload: IUserOrderRequestPaymentPayload): Promise<IUserOrderRequestPaymentResult> {
    return await this.orderAppService.userOrderRequestPayment(payload);
  }

  /**
   * 채팅 내 예약 정보 조회
   */
  @MessagePattern(ORDER_TOPIC.USER.INFO)
  async userOrderInfo(@Payload() payload: IUserOrderInfoPayload): Promise<IUserOrderInfoResult> {
    return await this.orderAppService.userOrderInfo(payload);
  }

  /**
   * 예약 목록
   */
  @MessagePattern(ORDER_TOPIC.USER.LIST)
  async userOrderList(@Payload() payload: IUserOrderListPayload): Promise<IUserOrderListResult> {
    return await this.orderAppService.userOrderList(payload);
  }

  /**
   * 리뷰 목록
   */
  @MessagePattern(ORDER_TOPIC.USER.REVIEW_LIST)
  async userOrderReviewList(@Payload() payload: IUserOrderReviewListPayload): Promise<IUserOrderReviewListResult> {
    return await this.orderAppService.userOrderReviewList(payload);
  }

  /**
   * 리뷰 상세
   */
  @MessagePattern(ORDER_TOPIC.USER.REVIEW_DETAIL)
  async userOrderReviewDetail(@Payload() payload: IUserOrderReviewDetailPayload): Promise<IUserOrderReviewDetailResult> {
    return await this.orderAppService.userOrderReviewDetail(payload);
  }

  /**
   * 리뷰 등록
   */
  @MessagePattern(ORDER_TOPIC.USER.REVIEW_REG_IN)
  async userOrderReviewRegIn(@Payload() payload: IUserOrderReviewRegInPayload): Promise<IUserOrderReviewRegInResult> {
    return await this.orderAppService.userOrderReviewRegIn(payload);
  }
}
