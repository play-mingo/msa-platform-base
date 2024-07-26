/* eslint-disable @typescript-eslint/no-empty-interface */
import { ApiProperty, ApiResponseOptions, PickType } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { ShopUserInfo, UserGender } from "domain/shopUser/vo/ShopUserInfo";

export class ShopUserResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "회원키" })
  shopUserKey!: string;

  @ApiProperty({ example: "이충환", description: "회원명" })
  userName!: string;

  @ApiProperty({ example: "01012345678", description: "회원전화번호" })
  userPhone!: string;

  @ApiProperty({ example: "19900101", description: "회원생년월일" })
  userBirth!: string;

  @ApiProperty({ example: "30", description: "연령대" })
  userAge!: string;

  @ApiProperty({ example: "0", description: "회원성별", enum: UserGender })
  userGender!: UserGender;

  @ApiProperty({ example: 1, description: "주문횟수" })
  orderCnt!: number;
}

type IShopUserInfoResultWithOptional = Partial<Pick<ShopUserInfo, "userAge" | "userGender">> &
  Pick<ShopUserInfo, "shopUserKey" | "userName" | "userPhone">;

/**
 * 꽃집 - 사용자 정보 등록
 */
export interface IFloristShopUserRegInResult {}
export class FloristShopUserRegInResult implements IFloristShopUserRegInResult {}
export class FloristShopUserRegInResponse extends BaseResponse<FloristShopUserRegInResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopUserRegInResult })
  data!: FloristShopUserRegInResult;
}
export const FloristShopUserRegInApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristShopUserRegInResponse,
};

/**
 * 꽃집 - 사용자 정보 등록
 */
export interface IFloristShopUserUpdateResult {}
export class FloristShopUserUpdateResult implements IFloristShopUserUpdateResult {}
export class FloristShopUserUpdateResponse extends BaseResponse<FloristShopUserUpdateResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopUserUpdateResult })
  data!: FloristShopUserUpdateResult;
}
export const FloristShopUserUpdateApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristShopUserUpdateResponse,
};

/**
 * 꽃집 - 사용자 정보 전체목록 조회
 */
export interface IFloristShopUserListEachResult extends IShopUserInfoResultWithOptional {
  orderCnt: number;
}
/**
 * 꽃집 - 사용자 정보 전체목록 조회
 * @property {number} totalCount - 고객수
 * @property {FloristShopUserListEachResult[]} list - 고객 전체 목록
 * @example
 * {
 *     "totalCount": 55,
 *     "list": [
 *         {
 *             "shopUserKey": "04f2742f4e5c49e38587cca28023ccf8",
 *             "userName": "이충환",
 *             "userPhone": "01012345678",
 *             "userAge": "30",
 *             "userGender": "0",
 *             "orderCnt": 1
 *         },
 *         {
 *             "shopUserKey": "04f2742f4e5c49e38587cca28023ccf8",
 *             "userName": "이충환",
 *             "userPhone": "01012345678",
 *             "userAge": "30",
 *             "userGender": "0",
 *             "orderCnt": 1
 *         }
 *     ]
 * }
 */
export interface IFloristShopUserListResult {
  totalCount: number;
  list: IFloristShopUserListEachResult[];
}
export class FloristShopUserListEachResult
  extends PickType(ShopUserResult, [
    "shopUserKey",
    "userName",
    "userPhone",
    "userAge", // "userBirth",
    "userGender",
    "orderCnt",
  ] as const)
  implements IFloristShopUserListEachResult {}
export class FloristShopUserListResult implements IFloristShopUserListResult {
  @ApiProperty({ example: 55, description: "고객수" })
  totalCount!: number;

  @ApiProperty({ description: "고객 전체 목록", type: [FloristShopUserListEachResult] })
  list!: FloristShopUserListEachResult[];
}
export class FloristShopUserListResponse extends BaseResponse<FloristShopUserListResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopUserListResult })
  data!: FloristShopUserListResult;
}
export const FloristShopUserListApiResponse = {
  status: 200,
  type: FloristShopUserListResponse,
};

/**
 * 꽃집 - 사용자 정보 조회
 */
export interface IFloristShopUserInfoResult extends IShopUserInfoResultWithOptional {
  orderCnt: number;
}
/**
 * 꽃집 - 사용자 정보 조회
 * @property {string} shopUserKey - 회원키
 * @property {string} userName - 회원명
 * @property {string} userPhone - 회원전화번호
 * @property {string} userAge - 연령대
 * @property {string} userGender - 회원성별
 * @property {number} orderCnt - 주문횟수
 */
export class FloristShopUserInfoResult
  extends PickType(ShopUserResult, [
    "shopUserKey",
    "userName",
    "userPhone",
    "userAge", // "userBirth",
    "userGender",
    "orderCnt",
  ] as const)
  implements IFloristShopUserInfoResult {}
export class FloristShopUserInfoResponse extends BaseResponse<FloristShopUserInfoResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristShopUserInfoResult })
  data!: FloristShopUserInfoResult;
}
export const FloristShopUserInfoApiResponse: ApiResponseOptions = {
  status: 200,
  type: FloristShopUserInfoResponse,
};

/**
 * 사용자 - 마이페이지 정보 수정
 */
export interface IUserUpdateResult {}
export class UserUpdateResult implements IUserUpdateResult {}
export class UserUpdateResponse extends BaseResponse<UserUpdateResult> {
  @ApiProperty({ description: "응답 데이터", type: UserUpdateResult })
  data!: UserUpdateResult;
}
export const UserUpdateApiResponse: ApiResponseOptions = {
  status: 201,
  type: UserUpdateResponse,
};

/**
 * 사용자 - 마이페이지 사용자 정보 조회
 */
export interface IUserInfoResult extends IShopUserInfoResultWithOptional {}
export class UserInfoResult
  extends PickType(ShopUserResult, [
    "shopUserKey",
    "userName",
    "userPhone",
    "userAge", // "userBirth",
    "userGender",
  ] as const)
  implements IUserInfoResult {}
export class UserInfoResultResponse extends BaseResponse<UserInfoResult> {
  @ApiProperty({ description: "응답 데이터", type: UserInfoResult })
  data!: UserInfoResult;
}
export const UserInfoApiResponse: ApiResponseOptions = {
  status: 200,
  type: UserInfoResultResponse,
};
