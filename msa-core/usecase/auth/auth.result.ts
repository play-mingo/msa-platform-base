import { ApiProperty, ApiResponseOptions } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { ShopAdminInfo } from "domain/shop/ShopAdmin";

/**
 * 플로리스트 일반 로그인
 */
export interface IFloristNormalLoginResult {
  token: string;
}
export class FloristNormalLoginResult implements IFloristNormalLoginResult {
  @ApiProperty({ example: "token", description: "로그인 토큰" })
  token!: string;
}
export class FloristNormalLoginResponse extends BaseResponse<FloristNormalLoginResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristNormalLoginResult })
  data!: FloristNormalLoginResult;
}
export const FloristNormalLoginApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristNormalLoginResponse,
};

/**
 * 플로리스트 일반 회원가입
 */
export interface IFloristNormalJoinResult {
  token: string;
}
export class FloristNormalJoinResult implements IFloristNormalJoinResult {
  @ApiProperty({ example: "token", description: "로그인 토큰" })
  token!: string;
}
export class FloristNormalJoinResponse extends BaseResponse<FloristNormalJoinResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristNormalLoginResult })
  data!: FloristNormalLoginResult;
}
export const FloristNormalJoinApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristNormalJoinResponse,
};

/**
 * 플로리스트 애풀 로그인
 */
export interface IFloristAppleLoginResult {
  token: string;
}
export class FloristAppleLoginResult implements IFloristAppleLoginResult {
  @ApiProperty({ example: "token", description: "로그인 토큰" })
  token!: string;
}
export class FloristAppleLoginResponse extends BaseResponse<FloristNormalLoginResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristNormalLoginResult })
  data!: FloristNormalLoginResult;
}
export const FloristAppleLoginApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristAppleLoginResponse,
};

/**
 * 플로리스트 카카오 로그인
 */
export interface IFloristKakaoLoginResult {
  token: string;
}
export class FloristKakaoLoginResult implements IFloristKakaoLoginResult {
  @ApiProperty({ example: "token", description: "로그인 토큰" })
  token!: string;
}
export class FloristKakaoLoginResponse extends BaseResponse<FloristNormalLoginResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristNormalLoginResult })
  data!: FloristNormalLoginResult;
}
export const FloristKakaoLoginApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristKakaoLoginResponse,
};

/**
 * 플로리스트 아이디 찾기
 */
export type IFloristFindIdResult = Pick<ShopAdminInfo, "shopAdminNormalAuthId">;
export class FloristFindIdResult implements IFloristFindIdResult {
  @ApiProperty({ example: "test@example.com", description: "아이디" })
  shopAdminNormalAuthId!: string;
}
export class FloristFindIdResponse extends BaseResponse<FloristNormalLoginResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristNormalLoginResult })
  data!: FloristNormalLoginResult;
}
export const FloristFindIdApiResponse: ApiResponseOptions = {
  status: 201,
  type: FloristFindIdResponse,
};

/**
 * 플로리스트 비밀번호 찾기
 */
export type IFloristFindPwResult = void;

/**
 * 플로리스트 일반 로그인
 */
export interface IUserNormalLoginResult {
  shopUserkey: string;
  shopUserName: string;
  shopUserId: number;
  shopLink: string;
}
export class UserNormalLoginResult implements IUserNormalLoginResult {
  @ApiProperty({ example: "9a8sd7f9afg879sad87f9f7da9s", description: "키" })
  shopUserkey!: string;
  @ApiProperty({ example: "홍길동", description: "사용자 이름" })
  shopUserName!: string;
  @ApiProperty({ example: 1, description: "상점 사용자 ID" })
  shopUserId!: number;
  @ApiProperty({ example: "mingo", description: "상점 링크" })
  shopLink!: string;
}
export class UserNormalLoginResponse extends BaseResponse<UserNormalLoginResult> {
  @ApiProperty({ description: "응답 데이터", type: UserNormalLoginResult })
  data!: UserNormalLoginResult;
}
export const UserNormalLoginApiResponse: ApiResponseOptions = {
  status: 201,
  type: UserNormalLoginResponse,
};

export interface IUserNormalJoinResult {
  token: string;
}
export class UserNormalJoinResult implements IUserNormalJoinResult {
  @ApiProperty({ example: "token", description: "로그인 토큰" })
  token!: string;
}
export class UserNormalJoinResponse extends BaseResponse<UserNormalJoinResult> {
  @ApiProperty({ description: "응답 데이터", type: UserNormalJoinResult })
  data!: UserNormalJoinResult;
}
export const UserNormalJoinApiResponse: ApiResponseOptions = {
  status: 201,
  type: UserNormalJoinResponse,
};
