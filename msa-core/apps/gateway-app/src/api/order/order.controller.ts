import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { FloristJwtAuthGuard, FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";
import { Florist } from "core/jwt/florist.request.data.decorator";
import { UserSessionLoginedAuthGuard } from "core/jwt/user-session-logined-auth.guard";
import { User, UserSessionAuthPayload } from "core/jwt/user.request.data.decorator";
import { orderBy, orderStatusType } from "usecase/order/order.payload";
import {
  CheckShopUserOrderStatusApiResponse,
  FloristOrderAcceptApiResponse,
  FloristOrderCencelApiResponse,
  FloristOrderCompleteApiResponse,
  FloristOrderConfirmApiResponse,
  FloristOrderDetailApiResponse,
  FloristOrderInfoApiResponse,
  FloristOrderListApiResponse,
  FloristOrderListByMonthApiResponse,
  FloristOrderModifyApiResponse,
  FloristOrderPickupRequestApiResponse,
  FloristOrderRegInApiResponse,
  FloristOrderRejectApiResponse,
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
  orderUserOrderInfoApiResponse,
  UserOrderCencelApiResponse,
  UserOrderCurrentApiResponse,
  UserOrderDetailApiResponse,
  UserOrderListApiResponse,
  UserOrderRegInApiResponse,
  UserOrderRequestPaymentApiResponse,
  UserOrderReviewDetailApiResponse,
  UserOrderReviewListApiResponse,
  UserOrderReviewRegInApiResponse,
} from "usecase/order/order.result";
import {
  CheckShopUserOrderStatusPayload,
  FloristOrderAcceptPayload,
  FloristOrderCencelPayload,
  FloristOrderCompletePayload,
  FloristOrderConfirmPayload,
  FloristOrderDetailPayload,
  FloristOrderInfoPayload,
  FloristOrderListByMonthPayload,
  FloristOrderListPayload,
  FloristOrderModifyPayload,
  FloristOrderPickupRequestPayload,
  FloristOrderRegInPayload,
  FloristOrderRejectPayload,
  UserOrderCencelPayload,
  UserOrderCurrentPayload,
  UserOrderDetailPayload,
  UserOrderInfoPayload,
  UserOrderListPayload,
  UserOrderRegInWithConsultingPayload,
  UserOrderRegInWithQuickOrderPayload,
  UserOrderRequestPaymentPayload,
  UserOrderReviewDetailPayload,
  UserOrderReviewListPayload,
  UserOrderReviewRegInPayload,
} from "./dto/order.dto";
import { OrderService } from "./order.service";

@ApiTags("order")
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 예약현황_목록
   */
  @Get("florist/orderList/:orderStatusTypeKey/:orderByKey/:pageNum")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: "orderStatusTypeKey",
    required: true,
    type: "string",
    example: "ORDER_READY",
    description: "주문 상태 (ORDER_READY: 예약대기, PRODUCT_READY: 상품준비, PICKUP_READY: 픽업대기, COMPLETE: 수령완료)",
  })
  @ApiParam({
    name: "orderByKey",
    required: true,
    type: "string",
    example: "0",
    description: `정렬순서 ("0": 예약일순, "1": 문의일순)`,
  })
  @ApiParam({ name: "pageNum", required: true, type: "number", example: 1 })
  @ApiOkResponse(FloristOrderListApiResponse)
  async floristOrderList(@Florist() shop: FloristJwtAuthPayload, @Param() payload: FloristOrderListPayload): Promise<IFloristOrderListResult> {
    return await this.orderService.floristOrderList({
      shopId: shop.shopId,
      orderStatusType: orderStatusType[payload.orderStatusTypeKey],
      orderBy: orderBy[payload.orderByKey],
      pageNum: payload.pageNum,
    });
  }

  /**
   * 월별 주문내역(캘린더)
   */
  @Get("florist/orderListByMonth/:orderYear/:orderMonth")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: "orderYear", type: "string", example: "2024", description: "년" })
  @ApiParam({ name: "orderMonth", type: "string", example: "06", description: "월" })
  @ApiOkResponse(FloristOrderListByMonthApiResponse)
  async floristOrderListByMonth(
    @Florist() shop: FloristJwtAuthPayload,
    @Param() payload: FloristOrderListByMonthPayload,
  ): Promise<IFloristOrderListByMonthResult> {
    return await this.orderService.floristOrderListByMonth({
      shopId: shop.shopId,
      orderYear: payload.orderYear,
      orderMonth: payload.orderMonth,
    });
  }

  /**
   * 내 고객 예약진행 여부 조회
   */
  @Post("florist/checkShopUserOrderStatus")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(CheckShopUserOrderStatusApiResponse)
  async checkShopUserOrderStatus(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: CheckShopUserOrderStatusPayload,
  ): Promise<ICheckShopUserOrderStatusResult> {
    return await this.orderService.checkShopUserOrderStatus({
      shopUserKey: payload.shopUserKey,
      shopId: shop.shopId,
    });
  }

  /**
   * 예약 등록
   */
  @Post("florist")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderRegInApiResponse)
  async floristOrderOrderRegIn(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristOrderRegInPayload): Promise<IFloristOrderRegInResult> {
    return await this.orderService.floristOrderOrderRegIn({
      shopId: shop.shopId,
      shopUserKey: payload.shopUserKey,
      orderType: payload.orderType,
      orderProductName: payload.orderProductName,
      orderProductImg: payload.orderProductImg,
      orderProductStartPrice: payload.orderProductStartPrice,
      orderProductEndPrice: payload.orderProductEndPrice,
      orderPrice: payload.orderPrice,
      userMemo: payload.userMemo,
      shopMemo: payload.shopMemo,
      orderChannel: payload.orderChannel,
      orderTargetDate: payload.orderTargetDate,
    });
  }

  /**
   * 예약 상세
   */
  @Get("florist/:orderKey")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderDetailApiResponse)
  async floristOrderDetail(@Florist() shop: FloristJwtAuthPayload, @Param() payload: FloristOrderDetailPayload): Promise<IFloristOrderDetailResult> {
    return await this.orderService.floristOrderDetail(payload);
  }

  /**
   * 예약 수정
   */
  @Post("florist/modify")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderModifyApiResponse)
  async floristOrderModify(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristOrderModifyPayload): Promise<IFloristOrderModifyResult> {
    return await this.orderService.floristOrderModify(payload);
  }

  /**
   * 예약 승인
   */
  @Patch("florist/accept")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderAcceptApiResponse)
  async floristOrderAccept(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristOrderAcceptPayload): Promise<IFloristOrderAcceptResult> {
    return await this.orderService.floristOrderAccept(payload);
  }

  /**
   * 예약 거절
   */
  @Patch("florist/reject")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderRejectApiResponse)
  async floristOrderReject(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristOrderRejectPayload): Promise<IFloristOrderRejectResult> {
    return await this.orderService.floristOrderReject(payload);
  }

  /**
   * 예약 확정
   */
  @Patch("florist/confirm")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderConfirmApiResponse)
  async floristOrderConfirm(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: FloristOrderConfirmPayload,
  ): Promise<IFloristOrderConfirmResult> {
    return await this.orderService.floristOrderConfirm(payload);
  }

  /**
   * 예약 픽업요청
   */
  @Patch("florist/pickupRequest")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderPickupRequestApiResponse)
  async floristOrderPickupRequest(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: FloristOrderPickupRequestPayload,
  ): Promise<IFloristOrderPickupRequestResult> {
    return await this.orderService.floristOrderPickupRequest(payload);
  }

  /**
   * 예약 수령완료
   */
  @Patch("florist/complete")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderCompleteApiResponse)
  async floristOrderComplete(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: FloristOrderCompletePayload,
  ): Promise<IFloristOrderCompleteResult> {
    return await this.orderService.floristOrderComplete(payload);
  }

  /**
   * 예약 취소
   */
  @Patch("florist/cencel")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderCencelApiResponse)
  async floristOrderCencel(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristOrderCencelPayload): Promise<IFloristOrderCencelResult> {
    return await this.orderService.floristOrderCencel(payload);
  }

  /**
   * 채팅 내 예약 정보 조회
   */
  @Get("florist/orderInfo/:orderInfoKey")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: "orderInfoKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문정보키" })
  @ApiOkResponse(FloristOrderInfoApiResponse)
  async floristOrderInfo(@Florist() shop: FloristJwtAuthPayload, @Param() payload: FloristOrderInfoPayload): Promise<IFloristOrderInfoResult> {
    return await this.orderService.floristOrderInfo(payload);
  }

  /**
   * 현재 예약정보 조회
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/current/:shopKey")
  @ApiParam({ name: "shopKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "상점키" })
  @ApiOkResponse(UserOrderCurrentApiResponse)
  async userOrderCurrent(@User() user: UserSessionAuthPayload, @Param() payload: UserOrderCurrentPayload): Promise<IUserOrderCurrentResult> {
    return await this.orderService.userOrderCurrent({
      shopKey: payload.shopKey,
      shopUserId: user.shopUserId,
    });
  }

  /**
   * 예약 상세
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/:orderKey")
  @ApiParam({ name: "orderKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8" })
  @ApiOkResponse(UserOrderDetailApiResponse)
  async userOrderDetail(@User() user: UserSessionAuthPayload, @Param() payload: UserOrderDetailPayload): Promise<IUserOrderDetailResult> {
    return await this.orderService.userOrderDetail(payload);
  }

  /**
   * 예약 상담하기
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Post("user/consulting")
  @ApiOkResponse(UserOrderRegInApiResponse)
  async userOrderRegInWithConsulting(
    @User() user: UserSessionAuthPayload,
    @Body() payload: UserOrderRegInWithConsultingPayload,
  ): Promise<IUserOrderRegInResult> {
    return await this.orderService.userOrderRegInWithConsulting({
      shopUserId: user.shopUserId,
      ...payload,
    });
  }

  /**
   * 바로예약
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Post("user/quickOrder")
  @ApiOkResponse(UserOrderRegInApiResponse)
  async userOrderRegInWithQuickOrder(
    @User() user: UserSessionAuthPayload,
    @Body() payload: UserOrderRegInWithQuickOrderPayload,
  ): Promise<IUserOrderRegInResult> {
    return await this.orderService.userOrderRegInWithQuickOrder({
      shopUserId: user.shopUserId,
      ...payload,
    });
  }

  /**
   * 예약 등록
   */
  // @UseGuards(UserSessionLoginedAuthGuard)
  // @Post("user")
  // @ApiOkResponse(UserOrderRegInApiResponse)
  // async userOrderRegIn(@User() user: UserSessionAuthPayload, @Body() payload: UserOrderRegInPayload): Promise<IUserOrderRegInResult> {
  //   return await this.orderService.userOrderRegIn({
  //     shopUserId: user.shopUserId,
  //     shopKey: payload.shopKey,
  //     orderType: payload.orderType,
  //     orderProductName: payload.orderProductName,
  //     orderProductImg: payload.orderProductImg,
  //     orderProductStartPrice: payload.orderProductStartPrice,
  //     orderProductEndPrice: payload.orderProductEndPrice,
  //     orderPrice: payload.orderPrice,
  //     userMemo: payload.userMemo,
  //     shopMemo: payload.shopMemo,
  //     orderChannel: payload.orderChannel,
  //     orderTargetDate: payload.orderTargetDate,
  //   });
  // }

  /**
   * 예약 취소
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Patch("user/cencel")
  @ApiOkResponse(UserOrderCencelApiResponse)
  async userOrderCencel(@User() user: UserSessionAuthPayload, @Body() payload: UserOrderCencelPayload): Promise<IUserOrderCencelResult> {
    return await this.orderService.userOrderCencel(payload);
  }

  /**
   * 입금확인 요청하기
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Patch("user/requestPayment")
  @ApiOkResponse(UserOrderRequestPaymentApiResponse)
  async userOrderRequestPayment(
    @User() user: UserSessionAuthPayload,
    @Body() payload: UserOrderRequestPaymentPayload,
  ): Promise<IUserOrderRequestPaymentResult> {
    return await this.orderService.userOrderRequestPayment(payload);
  }

  /**
   * 채팅 내 예약 정보 조회
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/orderInfo/:orderInfoKey")
  @ApiParam({ name: "orderInfoKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문정보키" })
  @ApiOkResponse(orderUserOrderInfoApiResponse)
  async userOrderInfo(@User() user: UserSessionAuthPayload, @Param() payload: UserOrderInfoPayload): Promise<IUserOrderInfoResult> {
    return await this.orderService.userOrderInfo(payload);
  }

  /**
   * 예약 목록
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/orderList/:pageNum")
  @ApiParam({ name: "pageNum", type: "number", example: 1, description: "페이지번호" })
  @ApiOkResponse(UserOrderListApiResponse)
  async userOrderList(@User() user: UserSessionAuthPayload, @Param() payload: UserOrderListPayload): Promise<IUserOrderListResult> {
    return await this.orderService.userOrderList({
      shopUserId: user.shopUserId,
      pageNum: payload.pageNum,
    });
  }

  /**
   * 리뷰 목록
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/review/list/:pageNum")
  @ApiParam({ name: "pageNum", type: "number", example: 1, description: "페이지번호" })
  @ApiOkResponse(UserOrderReviewListApiResponse)
  async userOrderReviewList(@User() user: UserSessionAuthPayload, @Param() payload: UserOrderReviewListPayload): Promise<IUserOrderReviewListResult> {
    return await this.orderService.userOrderReviewList({
      shopUserId: user.shopUserId,
      pageNum: payload.pageNum,
    });
  }

  /**
   * 리뷰 상세
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Get("user/review/:reviewKey")
  @ApiParam({ name: "reviewKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "리뷰키" })
  @ApiOkResponse(UserOrderReviewDetailApiResponse)
  async userOrderReviewDetail(
    @User() user: UserSessionAuthPayload,
    @Param() payload: UserOrderReviewDetailPayload,
  ): Promise<IUserOrderReviewDetailResult> {
    return await this.orderService.userOrderReviewDetail(payload);
  }

  /**
   * 리뷰 등록
   * TODO 해당 리뷰가 회원의 주문인지 확인해야함
   */
  @UseGuards(UserSessionLoginedAuthGuard)
  @Post("user/review")
  @ApiOkResponse(UserOrderReviewRegInApiResponse)
  async userOrderReviewRegIn(
    @User() user: UserSessionAuthPayload,
    @Body() payload: UserOrderReviewRegInPayload,
  ): Promise<IUserOrderReviewRegInResult> {
    return await this.orderService.userOrderReviewRegIn(payload);
  }
}
