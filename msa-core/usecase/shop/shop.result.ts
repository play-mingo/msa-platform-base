/* eslint-disable @typescript-eslint/no-empty-interface */

import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { ToggleYn, ToggleYnValues } from "domain/_base";
import { OrderType, OrderTypeValues } from "domain/order/vo/OrderStatus";
import { ShopAutoUpdateType, ShopProductCategory, ShopProductPriceType, ShopProductType } from "domain/shop/vo";

/**
 * 내 고객정보 조회_통계정보 포함
 */
export class SummeryToday {
  @ApiProperty({ example: 1, description: "상품준비" })
  productCreatingCnt!: number;
  @ApiProperty({ example: 1, description: "픽업대기" })
  pickupReadyCnt!: number;
  @ApiProperty({ example: 1, description: "수령완료" })
  completedCnt!: number;
  @ApiProperty({ example: 1, description: "링크클릭" })
  todayViewCnt!: number;
  @ApiProperty({ example: 1, description: "예약문의" })
  consultingCnt!: number;
  @ApiProperty({ example: 1, description: "예약완료" })
  quickOrderCnt!: number;
}

export class SummeryMonth {
  @ApiProperty({ example: 1, description: "카카오톡" })
  kakaoChannelCnt!: number;
  @ApiProperty({ example: 1, description: "인스타그램" })
  instagramChannelCnt!: number;
  @ApiProperty({ example: 1, description: "네이버" })
  naverChannelCnt!: number;
  @ApiProperty({ example: 1, description: "기타" })
  otherChannelCnt!: number;
  @ApiProperty({ example: 1, description: "예약대기" })
  paymentReadyCnt!: number;
  @ApiProperty({ example: 1, description: "예약확정" })
  paymentConfirmCnt!: number;
}
export interface IFloristSummaryResult {
  shopName: string;
  shopLink: string;
  userCnt: number;
  today: SummeryToday;
  month: SummeryMonth;
}
export class FloristSummaryResult implements IFloristSummaryResult {
  @ApiProperty({ example: "플라워밍고", description: "꽃집명" })
  shopName!: string;
  @ApiProperty({ example: "https://example.com", description: "나의 홈페이지" })
  shopLink!: string;
  @ApiProperty({ example: 54, description: "전체고객" })
  userCnt!: number;
  @ApiProperty({ description: "today", type: SummeryToday })
  today!: SummeryToday;
  @ApiProperty({ description: "이번달 예약현황", type: SummeryMonth })
  month!: SummeryMonth;
}
export class FloristSummaryResponse extends BaseResponse<FloristSummaryResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristSummaryResult })
  data!: FloristSummaryResult;
}
export const FloristSummaryApiResponse = {
  status: 200,
  type: FloristSummaryResponse,
};

/**
 * 내 고객정보 조회_통계정보 미포함
 */
export interface IFloristMypageResult {
  authId: string;
  shopAdminName: string;
  shopName: string;
  shopLink: string;
}
export class FloristMypageResult implements IFloristMypageResult {
  @ApiProperty({ example: "test@example.com", description: "아이디" })
  authId!: string;
  @ApiProperty({ example: "도밍고", description: "이름" })
  shopAdminName!: string;
  @ApiProperty({ example: "플라워밍고", description: "꽃집명" })
  shopName!: string;
  @ApiProperty({ example: "https://example.com", description: "나의 홈페이지" })
  shopLink!: string;
}
export class FloristMypageResponse extends BaseResponse<FloristMypageResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristMypageResult })
  data!: FloristMypageResult;
}
export const FloristMypageApiResponse = {
  status: 200,
  type: FloristMypageResponse,
};

/**
 * 미리보기_꽃집 정보
 */
export interface IFloristShopDetailResult {
  shopImgPath: string;
  shopName: string;
  shopPhone: string;
  shopAddr: string;
  shopAddrDetail: string;
  shopAddrPostCode: string;
  shopLat: number;
  shopLng: number;
  openWeek: string[];
  shopInfoDesc: string;
  shopStartTime: string;
  shopEndTime: string;
}
export class FloristShopDetailResult implements IFloristShopDetailResult {
  @ApiProperty({ example: "/common/2134124314.png", description: "꽃집 로고" })
  shopImgPath!: string;
  @ApiProperty({ example: "플라워밍고", description: "꽃집명" })
  shopName!: string;
  @ApiProperty({ example: "01012341234", description: "꽃집 전화번호" })
  shopPhone!: string;
  @ApiProperty({ example: "서울특별시 마포구 양화로 186", description: "주소" })
  shopAddr!: string;
  @ApiProperty({ example: "602호", description: "상세주소" })
  shopAddrDetail!: string;
  @ApiProperty({ example: "12345", description: "우편번호" })
  shopAddrPostCode!: string;
  @ApiProperty({ example: "37.12341234", description: "위도" })
  shopLat!: number;
  @ApiProperty({ example: "127.12342134", description: "경도" })
  shopLng!: number;
  @ApiProperty({ example: "[1,2,3]", description: "영업 요일" })
  openWeek!: string[];
  @ApiProperty({ example: "1", description: "안내 사항" })
  shopInfoDesc!: string;
  @ApiProperty({ example: "10:00", description: "영업 시작 시간" })
  shopStartTime!: string;
  @ApiProperty({ example: "17:00", description: "영업 종료 시간" })
  shopEndTime!: string;
}
export class FloristShopDetailResponse extends BaseResponse<FloristShopDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopDetailResult })
  data!: FloristShopDetailResult;
}
export const FloristShopDetailApiResponse = {
  status: 200,
  type: FloristShopDetailResponse,
};

/**
 * 상품 목록 / 미리보기_STORE / 내 상품정보 조회
 */
export class SampleProduct {
  @ApiProperty({ example: 0, description: "꽃 상품 유형" })
  productCategory!: ShopProductCategory;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
  @ApiProperty({ example: "오늘의 밍고 설명입니다.", description: "설명" })
  contents!: string;
  @ApiProperty({ example: "['/common/2134124314.png', '/common/2134124314.png']", description: "이미지" })
  productImgPaths!: string[];
  @ApiProperty({ example: 12000, description: "고정가격" })
  productPrice!: number;
  @ApiProperty({ example: "Y", description: "기간별 자동 업데이트 여부 (Y/N)" })
  autoUpdateType!: ShopAutoUpdateType;
  @ApiProperty({ example: "aaa", description: "가격 유형" })
  productPriceType!: ShopProductPriceType;
  @ApiProperty({ example: 11000, description: "최소가격" })
  productPriceStart!: number;
  @ApiProperty({ example: 19000, description: "최대가격" })
  productPriceEnd!: number;
  @ApiProperty({ example: "Y", description: "바로구매 여부 (Y/N)", enum: ToggleYnValues })
  quickPurchaseYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "상담구매 여부 (Y/N)", enum: ToggleYnValues })
  consultingYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "배송설정 여부 (Y/N)", enum: ToggleYnValues })
  deliveryYn!: ToggleYn;
}

export class ProductItem {
  @ApiProperty({ example: "/common/2134124314.png", description: "이미지" })
  productImgPath!: string;
  @ApiProperty({ example: 12000, description: "고정가격" })
  productPrice!: number;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
}

export class CategoryProduct {
  @ApiProperty({ example: 0, description: "꽃 상품 유형" })
  productCategory!: ShopProductCategory;
  @ApiProperty({ description: "꽃집", type: [ProductItem] })
  productItems!: ProductItem[];
  @ApiProperty({ example: "Y", description: "바로구매 여부 (Y/N)", enum: ToggleYnValues })
  quickPurchaseYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "상담구매 여부 (Y/N)", enum: ToggleYnValues })
  consultingYn!: ToggleYn;
  @ApiProperty({ example: "Y", description: "배송설정 여부 (Y/N)", enum: ToggleYnValues })
  deliveryYn!: ToggleYn;
}

export interface ISampleProductResult {
  key: string;
  no: number;
  productType: typeof ShopProductType.SAMPLE;
  product: SampleProduct;
}
export interface ICategoryProductResult {
  key: string;
  no: number;
  productType: typeof ShopProductType.CATEGORY;
  product: CategoryProduct;
}

export type IFloristShopProductResult = Array<ISampleProductResult | ICategoryProductResult>;
export class FloristShopProductResultEach {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "상품키" })
  key!: string;
  @ApiProperty({ example: 1, description: "순서" })
  no!: number;
  @ApiProperty({ example: ShopProductType.SAMPLE, description: "상품유형", enum: [ShopProductType.SAMPLE, ShopProductType.CATEGORY] })
  productType!: typeof ShopProductType.SAMPLE | typeof ShopProductType.CATEGORY;
  @ApiProperty({ description: "이번달 예약현황", type: Object, enum: [SampleProduct, CategoryProduct] })
  product!: CategoryProduct | SampleProduct;
}
export class FloristShopProductResponse extends BaseResponse<Array<FloristShopProductResultEach>> {
  @ApiProperty({ description: "응답 데이터", type: [FloristShopProductResultEach] })
  data!: FloristShopProductResultEach[];
}
export const FloristShopProductApiResponse = {
  status: 200,
  type: FloristShopProductResponse,
};

/**
 * 미리보기_REVIEW
 */
export interface IReviewItem {
  reviewImg: string;
  insDate: string;
  reviewStar: number;
  contents: string;
  productName: string;
}
export type IFloristShopReviewResult = IReviewItem[];
export class FloristShopReviewResultEach {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "리뷰이미지" })
  reviewImg!: string;
  @ApiProperty({ example: "2021.05.01", description: "등록일" })
  insDate!: string;
  @ApiProperty({ example: 4, description: "별점" })
  reviewStar!: number;
  @ApiProperty({ example: "꽃이 너무 예뻐요", description: "내용" })
  contents!: string;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
}
export class FloristShopReviewResult {}
export class FloristShopReviewResponse extends BaseResponse<Array<FloristShopReviewResultEach>> {
  @ApiProperty({ description: "응답 데이터", type: [FloristShopReviewResultEach] })
  data!: FloristShopReviewResultEach[];
}
export const FloristShopReviewApiResponse = {
  status: 200,
  type: FloristShopReviewResponse,
};

/**
 * 내 고객정보 조회
 * @deprecated
 */
export interface IFloristShopUserListResult {}
export class FloristShopUserListResult implements IFloristShopUserListResult {}
export class FloristShopUserListResponse extends BaseResponse<FloristShopUserListResult> {}
export const FloristShopUserListApiResponse = {
  status: 200,
  type: FloristShopUserListResponse,
};

/**
 * 꽃집 기본정보 수정
 */
export interface IUpdateFloristMypageResult {}
export class UpdateFloristMypageResult implements IUpdateFloristMypageResult {}
export class UpdateFloristMypageResponse extends BaseResponse<UpdateFloristMypageResult> {
  @ApiProperty({ description: "응답 데이터", type: UpdateFloristMypageResult })
  data!: UpdateFloristMypageResult;
}
export const UpdateFloristMypageApiResponse = {
  status: 200,
  type: UpdateFloristMypageResponse,
};

/**
 * 상품 수정
 */
export interface IUpdateFloristShopProductResult {}
export class UpdateFloristShopProductResult {}
export class UpdateFloristShopProductResponse extends BaseResponse<UpdateFloristShopProductResult> {
  @ApiProperty({ description: "응답 데이터", type: UpdateFloristShopProductResult })
  data!: UpdateFloristShopProductResult;
}
export const UpdateFloristShopProductApiResponse = {
  status: 200,
  type: UpdateFloristShopProductResponse,
};

/**
 * TODO: 자세한 사항 확인 필요
 * 예약설정 조회
 */
export interface IFloristOrderOptionResult {}
export class FloristOrderOptionResult implements IFloristOrderOptionResult {}
export class FloristOrderOptionResponse extends BaseResponse<FloristOrderOptionResult> {}
export const FloristOrderOptionApiResponse = {
  status: 200,
  type: FloristOrderOptionResponse,
};

/**
 * TODO: 자세한 사항 확인 필요
 * 예약설정 수정
 */
export interface IUpdateFloristOrderOptionResult {}
export class UpdateFloristOrderOptionResult implements IUpdateFloristOrderOptionResult {}
export class UpdateFloristOrderOptionResponse extends BaseResponse<UpdateFloristOrderOptionResult> {}
export const UpdateFloristOrderOptionApiResponse = {
  status: 200,
  type: UpdateFloristOrderOptionResponse,
};

/**
 * 고객정보 목록
 */
export interface ShopUser {
  key: string;
  shopUserName: string;
  shopUserPhone: string;
  shopUserAge: string;
  shopUserGender: string;
  orderCnt: number;
}
export type IFloristShopUserResult = ShopUser[];
export class FloristShopUserResultEach implements ShopUser {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "고객키" })
  key!: string;
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
}
export class FloristShopUserResult {}
export class FloristShopUserResponse extends BaseResponse<Array<FloristShopUserResultEach>> {
  @ApiProperty({ description: "응답 데이터", type: [FloristShopUserResultEach] })
  data!: FloristShopUserResultEach[];
}
export const FloristShopUserApiResponse = {
  status: 200,
  type: FloristShopUserResponse,
};

/**
 * 고객정보 성세
 */
export class OrderEach {
  @ApiProperty({ example: "2021-05-01(월) 14~15시", description: "예약일" })
  orderTargetDate!: string;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
  @ApiProperty({ example: 12000, description: "가격" })
  productPrice!: number;
  @ApiProperty({ description: "주문유형", type: OrderType, enum: OrderTypeValues })
  orderType!: OrderType;
}
export interface IFloristShopUserDetailResult {
  key: string;
  shopUserName: string;
  shopUserPhone: string;
  shopUserAge: string;
  shopUserGender: string;
  orderCnt: number;
  totalOrderPrice: number;
  orders: OrderEach[];
}
export class FloristShopUserDetailResult implements IFloristShopUserDetailResult {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "고객키" })
  key!: string;
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
  @ApiProperty({ example: 12000, description: "총액" })
  totalOrderPrice!: number;
  @ApiProperty({ description: "총주문건수", type: [OrderEach] })
  orders!: OrderEach[];
}
export class FloristShopUserDetailResponse extends BaseResponse<FloristShopUserDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopUserDetailResult })
  data!: FloristShopUserDetailResult;
}
export const FloristShopUserDetailApiResponse = {
  status: 200,
  type: FloristShopUserDetailResponse,
};

/**
 * 고객정보 상세 수정
 */
export interface IUpdateFloristShopUserResult {}
export class UpdateFloristShopUserResult implements IUpdateFloristShopUserResult {}
export class UpdateFloristShopUserResponse extends BaseResponse<UpdateFloristShopUserResult> {
  @ApiProperty({ description: "응답 데이터", type: UpdateFloristShopUserResult })
  data!: UpdateFloristShopUserResult;
}
export const UpdateFloristShopUserApiResponse = {
  status: 200,
  type: UpdateFloristShopUserResponse,
};

/**
 * 꽃집 메인정보 상세
 */
export interface IUserShopDetailResult {
  shopImgPath: string;
  shopName: string;
  shopPhone: string;
  shopAddr: string;
  shopAddrDetail: string;
  shopAddrPostCode: string;
  shopLat: number;
  shopLng: number;
  openWeek: string[];
  shopInfoDesc: string;
  shopStartTime: string;
  shopEndTime: string;
}
export class UserShopDetailResult implements IUserShopDetailResult {
  @ApiProperty({ example: "/common/2134124314.png", description: "꽃집 로고" })
  shopImgPath!: string;
  @ApiProperty({ example: "플라워밍고", description: "꽃집명" })
  shopName!: string;
  @ApiProperty({ example: "01012341234", description: "꽃집 전화번호" })
  shopPhone!: string;
  @ApiProperty({ example: "서울특별시 마포구 양화로 186", description: "주소" })
  shopAddr!: string;
  @ApiProperty({ example: "602호", description: "상세주소" })
  shopAddrDetail!: string;
  @ApiProperty({ example: "12345", description: "우편번호" })
  shopAddrPostCode!: string;
  @ApiProperty({ example: "37.12341234", description: "위도" })
  shopLat!: number;
  @ApiProperty({ example: "127.12342134", description: "경도" })
  shopLng!: number;
  @ApiProperty({ example: "[1,2,3]", description: "영업 요일" })
  openWeek!: string[];
  @ApiProperty({ example: "1", description: "안내 사항" })
  shopInfoDesc!: string;
  @ApiProperty({ example: "10:00", description: "영업 시작 시간" })
  shopStartTime!: string;
  @ApiProperty({ example: "17:00", description: "영업 종료 시간" })
  shopEndTime!: string;
}
export class UserShopDetailResponse extends BaseResponse<UserShopDetailResult> {
  @ApiProperty({ description: "응답 데이터", type: UserShopDetailResult })
  data!: UserShopDetailResult;
}
export const UserShopDetailApiResponse = {
  status: 200,
  type: UserShopDetailResponse,
};

/**
 * 상품 목록
 */
export type IUserShopProductResult = Array<ISampleProductResult | ICategoryProductResult>;
export class UserShopProductResultEach {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "상품키" })
  key!: string;
  @ApiProperty({ example: 1, description: "순서" })
  no!: number;
  @ApiProperty({ example: ShopProductType.SAMPLE, description: "상품유형", enum: [ShopProductType.SAMPLE, ShopProductType.CATEGORY] })
  productType!: typeof ShopProductType.SAMPLE | typeof ShopProductType.CATEGORY;
  @ApiProperty({ description: "이번달 예약현황", type: Object, enum: [SampleProduct, CategoryProduct] })
  product!: CategoryProduct | SampleProduct;
}
export class UserShopProductResult {}
export class UserShopProductResponse extends BaseResponse<Array<UserShopProductResultEach>> {
  @ApiProperty({ description: "응답 데이터", type: [UserShopProductResultEach] })
  data!: UserShopProductResultEach[];
}
export const UserShopProductApiResponse = {
  status: 200,
  type: UserShopProductResponse,
};

/**
 * 리뷰 목록
 */
export type IUserShopReviewResult = IReviewItem[];
export class UserShopReviewResultEach {
  @ApiProperty({ example: "6b757136aa664e3f9faa4e2535b39a38", description: "리뷰이미지" })
  reviewImg!: string;
  @ApiProperty({ example: "2021.05.01", description: "등록일" })
  insDate!: string;
  @ApiProperty({ example: 4, description: "별점" })
  reviewStar!: number;
  @ApiProperty({ example: "꽃이 너무 예뻐요", description: "내용" })
  contents!: string;
  @ApiProperty({ example: "오늘의 밍고", description: "상품명" })
  productName!: string;
}
export class UserShopReviewResponse extends BaseResponse<Array<UserShopReviewResultEach>> {
  @ApiProperty({ description: "응답 데이터", type: [UserShopReviewResultEach] })
  data!: UserShopReviewResultEach[];
}
export const UserShopReviewApiResponse = {
  status: 200,
  type: UserShopReviewResponse,
};
