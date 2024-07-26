import { PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { OrderChannelValues, OrderTypeValues } from "core/database/typerom/entities";
import { OrderChannel } from "domain/order/vo/OrderChannel";
import { OrderType } from "domain/order/vo/OrderStatus";
import { ReviewCategory } from "domain/order/vo/ReviewCategory";
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
  IUserOrderReviewRegInMsaPayload,
  OrderByKey,
  OrderByValues,
  OrderStatusType,
  OrderStatusTypeKey,
  OrderStatusTypeKeys,
  OrderStatusTypeValues,
} from "usecase/order/order.payload";

export class OrderPayload {
  /**
   * 꽃집 아이디
   * @example 1
   * @description 꽃집 아이디
   */
  @IsNumber()
  shopId!: number;

  /**
   * 주문 키
   * @example "a319f947cb894a6f8f26868cfb8c5516"
   * @description 주문 키
   */
  @IsString()
  orderKey!: string;

  /**
   * 주문 상태
   * @example "0"
   * @enum ["0", "1", "2", "3"]
   * @description 주문 상태 (0: 예약대기, 1: 상품준비, 2: 픽업대기, 3: 수령완료)
   */
  @IsEnum(OrderStatusTypeValues)
  @IsString()
  orderStatusType!: OrderStatusType;

  /**
   * 주문 상태
   * @example "ORDER_READY"
   * @enum ["ORDER_READY", "PRODUCT_READY", "PICKUP_READY", "COMPLETE"]
   * @description 주문 상태 (ORDER_READY: 예약대기, PRODUCT_READY: 상품준비, PICKUP_READY: 픽업대기, COMPLETE: 수령완료)
   */
  @IsEnum(OrderStatusTypeKeys)
  orderStatusTypeKey!: OrderStatusTypeKey;

  /**
   * 정렬순서
   * @example "0"
   * @enum ["0", "1"]
   * @description 정렬순서 ("0": 예약일순, "1": 문의일순)
   */
  @IsString()
  orderBy!: string;

  /**
   * 정렬순서
   * @example "ORDER_DATE"
   * @enum ["ORDER_DATE", "REQUEST_DATE"]
   * @description 정렬순서 ("ORDER_DATE": 예약일순, "REQUEST_DATE": 문의일순)
   */
  @IsEnum(OrderByValues)
  orderByKey!: OrderByKey;

  /**
   * 페이지 번호
   * @example 1
   * @description 페이지 번호
   */
  @Type(() => Number)
  @IsNumber()
  pageNum!: number;

  /**
   * 예약일 연도
   * @example "2024"
   */
  @IsString()
  orderYear!: string;

  /**
   * 예약일 월
   * @example "05"
   */
  @IsString()
  orderMonth!: string;

  /**
   * 꽃집키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   */
  shopKey!: string;

  /**
   * 회원키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   */
  shopUserKey!: string;

  /**
   * 수령방법 ("0": 방문수령, "1": 배달수령)
   * @example "0"
   * @enum ["0", "1"]
   */
  @IsEnum(OrderTypeValues)
  orderType!: OrderType;

  /**
   * 상품명
   * @example "테스트 상품명"
   */
  @IsString()
  orderProductName!: string;

  /**
   * 상품 이미지
   * @example "https://test.com/test.jpg"
   */
  @IsString()
  orderProductImg!: string;

  /**
   * 상품 최소 가격
   * @example 10000
   */
  @Type(() => Number)
  @IsNumber()
  orderProductStartPrice!: number;

  /**
   * 상품 최대 가격 (고졍가격일 경우 동일한 값으로 설정)
   * @example 20000
   */
  @Type(() => Number)
  @IsNumber()
  orderProductEndPrice!: number;

  /**
   * 제작 요청 가격
   * @example 15000
   */
  @Type(() => Number)
  @IsNumber()
  orderPrice!: number;

  /**
   * 고객 요청사항
   * @example "테스트 고객 요청사항"
   * @description 고객 요청사항
   */
  userMemo!: string;

  /**
   * 꽃집 메모
   * @example "테스트 꽃집 메모"
   * @description 꽃집 메모
   */
  shopMemo!: string;

  /**
   * 예약 진입 채널
   * @example "0"
   * @enum ["0", "1"]
   */
  @IsEnum(OrderChannelValues)
  orderChannel!: OrderChannel;

  /**
   * 주문일
   */
  @Type(() => Date)
  @IsDate()
  orderTargetDate!: Date;
}

export class ReviewPayload {
  /**
   * 페이지 번호
   * @example 1
   * @description 페이지 번호
   */
  @Type(() => Number)
  @IsNumber()
  pageNum!: number;

  /**
   * 리뷰 키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   * @description 리뷰 키
   */
  reviewKey!: string;

  /**
   * 리뷰 이미지
   * @example [ "/test.jpg", "/test.jpg", "/test.jpg" ]
   * @type [string]
   * @description 리뷰 이미지
   */
  @IsString({ each: true })
  reviewImgs!: string[];

  /**
   * 리뷰 내용
   * @example "테스트 리뷰 내용"
   * @description 리뷰 내용
   */
  @IsString()
  contents!: string;

  /**
   * 평점
   * @example 3.4
   * @description 평점
   */
  @Type(() => Number)
  @IsNumber()
  reviewStar!: number;

  /**
   * 꽃 조합이 예뻐요 리뷰 수
   * @example 1
   * @description 꽃 조합이 예뻐요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt1!: number;

  /**
   * 새벽 배송이 편리해요 리뷰 수
   * @example 2
   * @description 새벽 배송이 편리해요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt2!: number;

  /**
   * 공간이 화사해졌어요 리뷰 수
   * @example 3
   * @description 공간이 화사해졌어요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt3!: number;

  /**
   * 꽃이 싱싱해요 리뷰 수
   * @example 4
   * @description 꽃이 싱싱해요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt4!: number;

  /**
   * 감각적이에요 리뷰 수
   * @example 5
   * @description 감각적이에요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt5!: number;

  /**
   * 하루의 시작에 힘이 돼요 리뷰 수
   * @example 6
   * @description 하루의 시작에 힘이 돼요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt6!: number;

  /**
   * 다음 꽃이 기대돼요 리뷰 수
   * @example 7
   * @description 다음 꽃이 기대돼요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt7!: number;

  /**
   * 가격이 합리적이에요 리뷰 수
   * @example 8
   * @description 가격이 합리적이에요 리뷰 수
   */
  @Type(() => Number)
  @IsNumber()
  reviewCnt8!: number;

  /**
   * 주문키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   * @description 주문키
   */
  @IsString()
  orderKey!: string;

  /**
   * 리뷰
   * @example [1, 2, 3, 4]
   * @enum [1, 2, 3, 4, 5, 6, 7, 8]
   * @description 리뷰 카테고리 (1: 꽃 조합이 예뻐요, 2: 새벽 배송이 편리해요, 3: 공간이 화사해졌어요, 4: 꽃이 싱싱해요, 5: 감각적이에요, 6: 하루의 시작에 힘이 돼요, 7: 다음 꽃이 기대돼요, 8: 가격이 합리적이에요)
   */
  @IsEnum(ReviewCategory, { each: true })
  reviewCategories!: ReviewCategory[];
}

export class OrderInfoPayload {
  /**
   * 주문 정보 키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   * @description 주문 정보 키
   */
  @IsString()
  orderInfoKey!: string;
}

export class FloristOrderListPayload
  extends PickType(OrderPayload, ["orderStatusTypeKey", "orderByKey", "pageNum"] as const)
  implements Omit<IFloristOrderListPayload, "shopId" | "orderStatusType" | "orderBy"> {}
export class FloristOrderListByMonthPayload
  extends PickType(OrderPayload, ["orderYear", "orderMonth"] as const)
  implements Omit<IFloristOrderListByMonthPayload, "shopId"> {}
export class CheckShopUserOrderStatusPayload
  extends PickType(OrderPayload, ["shopUserKey"] as const)
  implements Omit<ICheckShopUserOrderStatusPayload, "shopId"> {}
export class FloristOrderRegInPayload
  extends PickType(OrderPayload, [
    "shopId",
    "shopUserKey",
    "orderType",
    "orderProductName",
    "orderProductImg",
    "orderProductStartPrice",
    "orderProductEndPrice",
    "orderPrice",
    "userMemo",
    "shopMemo",
    "orderChannel",
    "orderTargetDate",
  ] as const)
  implements IFloristOrderRegInPayload {}
export class FloristOrderDetailPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderDetailPayload {}
export class FloristOrderModifyPayload
  extends PickType(OrderPayload, [
    "orderKey",
    "orderType",
    "orderProductName",
    "orderProductImg",
    "orderProductStartPrice",
    "orderProductEndPrice",
    "orderPrice",
    "userMemo",
    "shopMemo",
    "orderChannel",
    "orderTargetDate",
  ] as const)
  implements IFloristOrderModifyPayload {}
export class FloristOrderAcceptPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderAcceptPayload {}
export class FloristOrderRejectPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderRejectPayload {}
export class FloristOrderConfirmPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderConfirmPayload {}
export class FloristOrderPickupRequestPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderPickupRequestPayload {}
export class FloristOrderCompletePayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderCompletePayload {}
export class FloristOrderCencelPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IFloristOrderCencelPayload {}
export class FloristOrderInfoPayload extends PickType(OrderInfoPayload, ["orderInfoKey"] as const) implements IFloristOrderInfoPayload {}
export class UserOrderCurrentPayload extends PickType(OrderPayload, ["shopKey"] as const) implements Omit<IUserOrderCurrentPayload, "shopUserId"> {}
export class UserOrderDetailPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IUserOrderDetailPayload {}
export class UserOrderRegInWithConsultingPayload
  extends PickType(OrderPayload, [
    "shopKey",
    "orderType",
    "orderProductName",
    "orderProductImg",
    "orderProductStartPrice",
    "orderProductEndPrice",
    "orderPrice",
    "userMemo",
    "shopMemo",
    "orderChannel",
    "orderTargetDate",
  ] as const)
  implements Omit<IUserOrderRegInWithConsultingPayload, "shopUserId"> {}
export class UserOrderRegInWithQuickOrderPayload
  extends PickType(OrderPayload, [
    "shopKey",
    "orderType",
    "orderProductName",
    "orderProductImg",
    "orderProductStartPrice",
    "orderProductEndPrice",
    "orderPrice",
    "userMemo",
    "shopMemo",
    "orderChannel",
    "orderTargetDate",
  ] as const)
  implements Omit<IUserOrderRegInWithQuickOrderPayload, "shopUserId"> {}
export class UserOrderRegInPayload
  extends PickType(OrderPayload, [
    "shopKey",
    "orderType",
    "orderProductName",
    "orderProductImg",
    "orderProductStartPrice",
    "orderProductEndPrice",
    "orderPrice",
    "userMemo",
    "shopMemo",
    "orderChannel",
    "orderTargetDate",
  ] as const)
  implements Omit<IUserOrderRegInPayload, "shopUserId"> {}
export class UserOrderCencelPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IUserOrderCencelPayload {}
export class UserOrderRequestPaymentPayload extends PickType(OrderPayload, ["orderKey"] as const) implements IUserOrderRequestPaymentPayload {}
export class UserOrderInfoPayload extends PickType(OrderInfoPayload, ["orderInfoKey"] as const) implements IUserOrderInfoPayload {}
export class UserOrderListPayload extends PickType(OrderPayload, ["pageNum"]) implements Omit<IUserOrderListPayload, "shopUserId"> {}
export class UserOrderReviewListPayload extends PickType(OrderPayload, ["pageNum"]) implements Omit<IUserOrderReviewListPayload, "shopUserId"> {}
export class UserOrderReviewDetailPayload extends PickType(ReviewPayload, ["reviewKey"] as const) implements IUserOrderReviewDetailPayload {}

export class UserOrderReviewRegInPayload
  extends PickType(ReviewPayload, ["reviewImgs", "contents", "reviewStar", "reviewCategories", "orderKey"] as const)
  implements IUserOrderReviewRegInMsaPayload {}
