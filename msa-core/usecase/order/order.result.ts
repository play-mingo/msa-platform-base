/* eslint-disable @typescript-eslint/no-empty-interface */
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { OrderStatus } from "core/database/typerom/entities";
import { OrderChannel } from "domain/order/vo/OrderChannel";
import { OrderType, OrderTypeValues } from "domain/order/vo/OrderStatus";
import { OrderStatusTypeValues } from "./order.payload";

export class OrderResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "회원키" })
  shopUserKey!: string;

  @ApiProperty({ example: "이충환", description: "고객명" })
  shopUserName!: string;

  @ApiProperty({ example: "01012341234", description: "고객명" })
  shopUserPhone!: string;

  @ApiProperty({ example: "20", description: "연령대" })
  shopUserAge!: string;

  @ApiProperty({ example: "0", description: "성별(0: 남성, 1: 여성)" })
  shopUserGender!: string;

  @ApiProperty({ example: 1, description: "예약횟수" })
  orderCnt!: number;

  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문키" })
  orderKey!: string;

  @ApiProperty({ example: OrderType.OFFLINE, description: "수령방법 ('0: 방문수령, '1: 배달수령)", enum: OrderTypeValues })
  orderType!: OrderType;

  @ApiProperty({
    example: OrderStatus.PRUDUCT_CREATING,
    description:
      "예약상태 (-1: 문의대기, 0: 상담문의, 1: 바로예약, 2: 예약거절, 3: 예약승인완료 및 결제대기, 4: 결제안됨, 5: 결제확인 요청, 6: 결제완료 및 제작중, 7: 방문수령 픽업대기중, 8: 배달 픽업대기중, 9: 배달중, 10: 수령완료, 11: 예약취소)",
    enum: OrderStatusTypeValues,
  })
  orderStatus!: OrderStatus;

  @ApiProperty({ example: "테스트 상품명", description: "상품명" })
  orderProductName!: string;

  @ApiProperty({ example: "https://test.com/test.jpg", description: "상품 이미지" })
  orderProductImg!: string;

  @ApiProperty({ example: 10000, description: "상품 최소 가격" })
  orderProductStartPrice!: number;

  @ApiProperty({ example: 20000, description: "상품 최대 가격" })
  orderProductEndPrice!: number;

  @ApiProperty({ example: 15000, description: "제작 요청 가격" })
  orderPrice!: number;

  @ApiProperty({ example: "고객 요청사항", description: "고객 요청사항" })
  userMemo!: string;

  @ApiProperty({ example: "꽃집 메모", description: "꽃집 메모" })
  shopMemo!: string;

  @ApiProperty({ example: OrderChannel.KAKAO, description: "예약 진입 채널", enum: OrderChannel })
  orderChannel!: OrderChannel;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "목표 일시" })
  orderTargetDate!: Date;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "예약 문의 일시" })
  requestDate!: Date | null;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "예약 승인 일시" })
  acceptDate!: Date | null;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "예약 확정 일시" })
  confirmDate!: Date | null;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "픽업 요청 일시" })
  pickupRequestDate!: Date | null;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "수령 완료 일시" })
  completeDate!: Date | null;

  @ApiProperty({ example: true, description: "현재 예약 여부" })
  isExistCurrentOrder!: boolean;
}

export class ReviewResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "리뷰키" })
  reviewKey!: string;

  @ApiProperty({ example: "https://test.com/test.jpg", description: "리뷰 이미지", type: [String] })
  reviewImgs!: string[];

  @ApiProperty({ example: "리뷰 내용", description: "리뷰 내용" })
  contents!: string;

  @ApiProperty({ example: 4.5, description: "평점" })
  reviewStar!: number;

  @ApiProperty({ example: 1, description: "꽃 조합이 예뻐요 리뷰 수" })
  reviewCnt1!: number;

  @ApiProperty({ example: 1, description: "새벽 배송이 편리해요 리뷰 수" })
  reviewCnt2!: number;

  @ApiProperty({ example: 1, description: "공간이 화사해졌어요 리뷰 수" })
  reviewCnt3!: number;

  @ApiProperty({ example: 1, description: "꽃이 싱싱해요 리뷰 수" })
  reviewCnt4!: number;

  @ApiProperty({ example: 1, description: "감각적이에요 리뷰 수" })
  reviewCnt5!: number;

  @ApiProperty({ example: 1, description: "하루의 시작에 힘이 돼요 리뷰 수" })
  reviewCnt6!: number;

  @ApiProperty({ example: 1, description: "향기가 좋아요 리뷰 수" })
  reviewCnt7!: number;

  @ApiProperty({ example: 1, description: "다음 꽃이 기대돼요 리뷰 수" })
  reviewCnt8!: number;

  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문키" })
  orderKey!: string;
}

export class ChatRoomResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "채팅방 키" })
  chatRoomKey!: string;
}

export interface IOrderInfoResult {
  orderType: string;
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

/**
 * 예약현황_목록
 */
export interface IFloristOrderListEachResult {
  orderKey: string;
  orderType: OrderType;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export interface IFloristOrderListResult {
  pageNum: number;
  totalCount: number;
  list: IFloristOrderListEachResult[];
}
export class FloristOrderListEachResult implements IFloristOrderListEachResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문키" })
  orderKey!: string;

  @ApiProperty({ example: OrderType.OFFLINE, description: "주문유형", enum: OrderTypeValues })
  orderType!: OrderType;

  @ApiProperty({ example: "이충환", description: "회원명" })
  shopUserName!: string;

  @ApiProperty({ example: 1, description: "주문횟수" })
  orderCnt!: number;

  @ApiProperty({ example: 15000, description: "주문금액" })
  orderPrice!: number;

  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  orderProductName!: string;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "목표 일시" })
  orderTargetDate!: Date;
}
export class FloristOrderListResult implements IFloristOrderListResult {
  @ApiProperty({ example: 1, description: "주문횟수" })
  pageNum!: number;

  @ApiProperty({ example: 15000, description: "주문금액" })
  totalCount!: number;

  @ApiProperty({ description: "주문목록", type: [FloristOrderListEachResult] })
  list!: FloristOrderListEachResult[];
}
export class FloristOrderListResponse extends BaseResponse<FloristOrderListResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristOrderListResult })
  data!: FloristOrderListResult;
}
export const FloristOrderListApiResponse = {
  status: 200,
  type: FloristOrderListResponse,
};

/**
 * 월별 주문내역(캘린더)
 */
export interface IFloristOrderListByMonthEachResult {
  orderKey: string;
  orderType: OrderType;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export type IFloristOrderListByMonthEachGroupResult = {
  date: string;
  groups: IFloristOrderListByMonthEachResult[];
};

export interface IFloristOrderListByMonthResult {
  count: number;
  list: IFloristOrderListByMonthEachGroupResult[];
}
export class FloristOrderListByMonthEachResult implements IFloristOrderListByMonthEachResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문키" })
  orderKey!: string;

  @ApiProperty({ example: OrderType.OFFLINE, description: "주문유형", enum: OrderTypeValues })
  orderType!: OrderType;

  @ApiProperty({ example: "이충환", description: "회원명" })
  shopUserName!: string;

  @ApiProperty({ example: 1, description: "주문횟수" })
  orderCnt!: number;

  @ApiProperty({ example: 15000, description: "주문금액" })
  orderPrice!: number;

  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  orderProductName!: string;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "목표 일시" })
  orderTargetDate!: Date;
}
export class FloristOrderListByMonthEachGroupResult implements IFloristOrderListByMonthEachGroupResult {
  @ApiProperty({ example: "05", description: "일자" })
  date!: string;

  @ApiProperty({ type: [FloristOrderListByMonthEachResult], description: "일자별 주문 배열" })
  groups!: FloristOrderListByMonthEachResult[];
}

export class FloristOrderListByMonthResult implements IFloristOrderListByMonthResult {
  @ApiProperty({ example: 1, description: "주문횟수" })
  count!: number;

  @ApiProperty({ description: "주문목록", type: [FloristOrderListByMonthEachGroupResult] })
  list!: FloristOrderListByMonthEachGroupResult[];
}
export class FloristOrderListByMonthResponse extends BaseResponse<FloristOrderListByMonthResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristOrderListByMonthResult })
  data!: FloristOrderListByMonthResult;
}
export const FloristOrderListByMonthApiResponse = {
  status: 200,
  type: FloristOrderListByMonthResponse,
};

/**
 * 내 고객 예약진행 여부 조회
 */
export interface ICheckShopUserOrderStatusResult {
  isExistOrder: boolean;
}
export class CheckShopUserOrderStatusResult implements ICheckShopUserOrderStatusResult {
  @ApiProperty({ example: true, description: "주문 존재 여부" })
  isExistOrder!: boolean;
}
export class CheckShopUserOrderStatusResponse extends BaseResponse<CheckShopUserOrderStatusResult> {
  @ApiProperty({ description: "응답 데이터", type: CheckShopUserOrderStatusResult })
  data!: CheckShopUserOrderStatusResult;
}
export const CheckShopUserOrderStatusApiResponse = {
  status: 200,
  type: CheckShopUserOrderStatusResponse,
};

/**
 * 예약 등록
 */
export interface IFloristOrderRegInResult {}
export class FloristOrderRegInResult implements IFloristOrderRegInResult {}
export class FloristOrderRegInResponse extends BaseResponse<FloristOrderRegInResult> {}
export const FloristOrderRegInApiResponse = {
  status: 200,
  type: FloristOrderRegInResponse,
};

/**
 * 예약 상세
 */
export interface IFloristOrderDetailResult {
  shopUserKey: string;
  shopUserName: string;
  shopUserPhone: string;
  shopUserAge: string;
  shopUserGender: string;
  orderCnt: number;
  orderKey: string;
  orderType: OrderType;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: OrderChannel;
  orderTargetDate: Date;
  requestDate: Date | null;
  acceptDate: Date | null;
  confirmDate: Date | null;
  pickupRequestDate: Date | null;
  completeDate: Date | null;
}
export class FloristOrderDetailResult
  extends PickType(OrderResult, [
    "shopUserKey",
    "shopUserName",
    "shopUserPhone",
    "shopUserAge",
    "shopUserGender",
    "orderCnt",
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
    "requestDate",
    "acceptDate",
    "confirmDate",
    "pickupRequestDate",
    "completeDate",
  ] as const)
  implements IFloristOrderDetailResult {}
export class FloristOrderDetailResponse extends BaseResponse<FloristOrderDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristOrderDetailResult })
  data!: FloristOrderDetailResult;
}
export const FloristOrderDetailApiResponse = {
  status: 200,
  type: FloristOrderDetailResponse,
};

/**
 * 예약 수정
 */
export interface IFloristOrderModifyResult {}
export class FloristOrderModifyResult implements IFloristOrderModifyResult {}
export class FloristOrderModifyResponse extends BaseResponse<FloristOrderModifyResult> {}
export const FloristOrderModifyApiResponse = {
  status: 200,
  type: FloristOrderModifyResponse,
};

/**
 * 예약 승인
 */
export interface IFloristOrderAcceptResult {}
export class FloristOrderAcceptResult implements IFloristOrderAcceptResult {}
export class FloristOrderAcceptResponse extends BaseResponse<FloristOrderAcceptResult> {}
export const FloristOrderAcceptApiResponse = {
  status: 200,
  type: FloristOrderAcceptResponse,
};

/**
 * 예약 거절
 */
export interface IFloristOrderRejectResult {}
export class FloristOrderRejectResult implements IFloristOrderRejectResult {}
export class FloristOrderRejectResponse extends BaseResponse<FloristOrderRejectResult> {}
export const FloristOrderRejectApiResponse = {
  status: 200,
  type: FloristOrderRejectResponse,
};

/**
 * 예약 확정
 */
export interface IFloristOrderConfirmResult {}
export class FloristOrderConfirmResult implements IFloristOrderConfirmResult {}
export class FloristOrderConfirmResponse extends BaseResponse<FloristOrderConfirmResult> {}
export const FloristOrderConfirmApiResponse = {
  status: 200,
  type: FloristOrderConfirmResponse,
};

/**
 * 예약 픽업요청
 */
export interface IFloristOrderPickupRequestResult {}
export class FloristOrderPickupRequestResult implements IFloristOrderPickupRequestResult {}
export class FloristOrderPickupRequestResponse extends BaseResponse<FloristOrderPickupRequestResult> {}
export const FloristOrderPickupRequestApiResponse = {
  status: 200,
  type: FloristOrderPickupRequestResponse,
};

/**
 * 예약 수령완료
 */
export interface IFloristOrderCompleteResult {}
export class FloristOrderCompleteResult implements IFloristOrderCompleteResult {}
export class FloristOrderCompleteResponse extends BaseResponse<FloristOrderCompleteResult> {}
export const FloristOrderCompleteApiResponse = {
  status: 200,
  type: FloristOrderCompleteResponse,
};

/**
 * 예약 취소
 */
export interface IFloristOrderCencelResult {}
export class FloristOrderCencelResult implements IFloristOrderCencelResult {}
export class FloristOrderCencelResponse extends BaseResponse<FloristOrderCencelResult> {}
export const FloristOrderCencelApiResponse = {
  status: 200,
  type: FloristOrderCencelResponse,
};

/**
 * 채팅 내 예약 정보 조회
 */
export type IFloristOrderInfoResult = IOrderInfoResult;
export class FloristOrderInfoResult
  extends PickType(OrderResult, [
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
  implements IFloristOrderInfoResult {}
export class FloristOrderInfoResponse extends BaseResponse<FloristOrderInfoResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristOrderInfoResult })
  data!: FloristOrderInfoResult;
}
export const FloristOrderInfoApiResponse = {
  status: 200,
  type: FloristOrderInfoResponse,
};

/**
 * 현재 예약정보 조회
 */
export interface IUserOrderCurrent {
  orderKey: string;
  orderStatus: OrderStatus;
  orderType: OrderType;
  orderProductName: string;
  orderTargetDate: Date;
  chatRoomKey: string;
}
export interface IUserOrderCurrentResult {
  isExistCurrentOrder: boolean;
  detail?: IUserOrderCurrent;
}
export class UserOrderCurrent
  extends IntersectionType(
    PickType(OrderResult, ["orderKey", "orderType", "orderStatus", "orderProductName", "orderTargetDate"] as const),
    PickType(ChatRoomResult, ["chatRoomKey"] as const),
  )
  implements IUserOrderCurrent {}
export class UserOrderCurrentResult implements IUserOrderCurrentResult {
  @ApiProperty({ example: true, description: "현재 예약 여부" })
  isExistCurrentOrder!: boolean;

  @ApiProperty({ description: "현재 예약 정보", type: UserOrderCurrent })
  detail?: UserOrderCurrent;
}
export class UserOrderCurrentResponse extends BaseResponse<UserOrderCurrentResult> {}
export const UserOrderCurrentApiResponse = {
  status: 200,
  type: UserOrderCurrentResponse,
};

/**
 * 예약 상세
 */
export interface IUserOrderDetailResult {
  orderKey: string;
  orderType: OrderType;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: OrderChannel;
  orderTargetDate: Date;
  requestDate: Date | null;
  acceptDate: Date | null;
  confirmDate: Date | null;
  pickupRequestDate: Date | null;
  completeDate: Date | null;
}
export class UserOrderDetailResult
  extends PickType(OrderResult, [
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
    "requestDate",
    "acceptDate",
    "confirmDate",
    "pickupRequestDate",
    "completeDate",
  ] as const)
  implements IUserOrderDetailResult {}
export class UserOrderDetailResponse extends BaseResponse<UserOrderDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: UserOrderDetailResult })
  data!: UserOrderDetailResult;
}
export const UserOrderDetailApiResponse = {
  status: 200,
  type: UserOrderDetailResponse,
};

/**
 * 예약 문의하기
 */
export interface IUserOrderRegInResult {}
export class UserOrderRegInResult implements IUserOrderRegInResult {}
export class UserOrderRegInResponse extends BaseResponse<UserOrderRegInResult> {}
export const UserOrderRegInApiResponse = {
  status: 200,
  type: UserOrderRegInResponse,
};

/**
 * 예약 취소
 */
export interface IUserOrderCencelResult {}
export class UserOrderCencelResult implements IUserOrderCencelResult {}
export class UserOrderCencelResponse extends BaseResponse<UserOrderCencelResult> {}
export const UserOrderCencelApiResponse = {
  status: 200,
  type: UserOrderCencelResponse,
};

/**
 * 입금확인 요청하기
 */
export interface IUserOrderRequestPaymentResult {}
export class UserOrderRequestPaymentResult implements IUserOrderRequestPaymentResult {}
export class UserOrderRequestPaymentResponse extends BaseResponse<UserOrderRequestPaymentResult> {}
export const UserOrderRequestPaymentApiResponse = {
  status: 200,
  type: UserOrderRequestPaymentResponse,
};

/**
 * 채팅 내 예약 정보 조회
 */
export type IUserOrderInfoResult = IOrderInfoResult;
export class UserOrderInfoResult
  extends PickType(OrderResult, [
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
  implements IUserOrderInfoResult {}
export class UserOrderInfoResponse extends BaseResponse<UserOrderInfoResult> {
  @ApiProperty({ description: "응답 데이터", type: UserOrderInfoResult })
  data!: UserOrderInfoResult;
}
export const orderUserOrderInfoApiResponse = {
  status: 200,
  type: UserOrderInfoResponse,
};

export interface IUserOrderListEachResult {
  orderKey: string;
  orderType: OrderType;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export interface IUserOrderListResult {
  pageNum: number;
  totalCount: number;
  list: IUserOrderListEachResult[];
}

/**
 * 예약 목록
 */
export class UserOrderListEachResult implements IUserOrderListEachResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "주문키" })
  orderKey!: string;

  @ApiProperty({ example: OrderType.OFFLINE, description: "주문유형", enum: OrderTypeValues })
  orderType!: OrderType;

  @ApiProperty({ example: "이충환", description: "회원명" })
  shopUserName!: string;

  @ApiProperty({ example: 1, description: "주문횟수" })
  orderCnt!: number;

  @ApiProperty({ example: 15000, description: "주문금액" })
  orderPrice!: number;

  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  orderProductName!: string;

  @ApiProperty({ example: "2024-04-22 07:24:19", description: "목표 일시" })
  orderTargetDate!: Date;
}
export class UserOrderListResult implements IUserOrderListResult {
  @ApiProperty({ example: 1, description: "현재 페이지" })
  pageNum!: number;

  @ApiProperty({ example: 15000, description: "총 페이지 수" })
  totalCount!: number;

  @ApiProperty({ description: "주문목록", type: [UserOrderListEachResult] })
  list!: UserOrderListEachResult[];
}
export class UserOrderListResponse extends BaseResponse<UserOrderListResult> {
  @ApiProperty({ description: "응답 데이터", type: UserOrderListResult })
  data!: UserOrderListResult;
}
export const UserOrderListApiResponse = {
  status: 200,
  type: FloristOrderListResponse,
};

/**
 * 리뷰 목록
 */
export type IUserOrderReviewListEachResult = Pick<ReviewResult, "reviewKey" | "reviewImgs" | "contents" | "reviewStar" | "orderKey">;
export class UserOrderReviewListEachResult extends PickType(ReviewResult, [
  "reviewKey",
  "reviewImgs",
  "contents",
  "reviewStar",
  "orderKey",
] as const) {}

export type IUserOrderReviewListResult = {
  pageNum: number;
  totalCount: number;
  list: IUserOrderReviewListEachResult[];
};
export class UserOrderReviewListResult {
  @ApiProperty({ example: 1, description: "현재 페이지" })
  pageNum!: number;

  @ApiProperty({ example: 15000, description: "총 페이지 수" })
  totalCount!: number;

  @ApiProperty({ description: "리뷰목록", type: [UserOrderListEachResult] })
  list!: UserOrderListEachResult[];
}
export class UserOrderReviewListResponse extends BaseResponse<UserOrderReviewListResult> {
  @ApiProperty({ description: "응답 데이터", type: [UserOrderReviewListEachResult] })
  data!: UserOrderReviewListResult;
}
export const UserOrderReviewListApiResponse = {
  status: 200,
  type: UserOrderReviewListResponse,
};

/**
 * 리뷰 상세
 */
export interface IUserOrderReviewDetailResult {
  reviewKey: string;
  reviewImgs: string[];
  contents: string;
  reviewStar: number;
  reviewCnt1: number;
  reviewCnt2: number;
  reviewCnt3: number;
  reviewCnt4: number;
  reviewCnt5: number;
  reviewCnt6: number;
  reviewCnt7: number;
  reviewCnt8: number;
  orderKey: string;
}
export class UserOrderReviewDetailResult
  extends PickType(ReviewResult, [
    "reviewKey",
    "reviewImgs",
    "contents",
    "reviewStar",
    "reviewCnt1",
    "reviewCnt2",
    "reviewCnt3",
    "reviewCnt4",
    "reviewCnt5",
    "reviewCnt6",
    "reviewCnt7",
    "reviewCnt8",
    "orderKey",
  ] as const)
  implements IUserOrderReviewDetailResult {}
export class UserOrderReviewDetailResponse extends BaseResponse<UserOrderReviewDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: UserOrderReviewDetailResult })
  data!: UserOrderReviewDetailResult;
}
export const UserOrderReviewDetailApiResponse = {
  status: 200,
  type: UserOrderReviewDetailResponse,
};

/**
 * 리뷰 등록
 */
export interface IUserOrderReviewRegInResult {}
export class UserOrderReviewRegInResult implements IUserOrderReviewRegInResult {}
export class UserOrderReviewRegInResponse extends BaseResponse<UserOrderReviewRegInResult> {}
export const UserOrderReviewRegInApiResponse = {
  status: 200,
  type: UserOrderReviewRegInResponse,
};
