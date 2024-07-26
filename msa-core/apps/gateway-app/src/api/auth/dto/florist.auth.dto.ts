import { PickType } from "@nestjs/swagger";
import { IsDate, IsIn, IsOptional, IsString } from "class-validator";
import { UserGender } from "domain/shopUser/vo/ShopUserInfo";
import {
  IFloristAppleLoginPayload,
  IFloristFindIdPayload,
  IFloristKakaoLoginPayload,
  IFloristNormalJoinPayload,
  IFloristNormalLoginPayload,
  IUserNormalJoinPayload,
  IUserNormalLoginMsaPayload,
} from "usecase/auth/auth.payload";

export class FloristAuthPayload {
  /**
   * 이메일 로그인 아이디
   * @example "test@example.com"
   */
  @IsString()
  shopAdminNormalAuthId!: string;

  /**
   * 카카오 소셜로그인 고유코드
   * @example 112313123123
   */
  @IsString()
  shopAdminKakaoAuthId!: string;

  /**
   * 애플 소셜로그인 고유코드
   * @example sdfgsdfgfsgdsfg
   */
  @IsString()
  shopAdminAppleAuthId!: string;

  /**
   * 이메일 로그인 비밀번호
   * @example "test1234"
   */
  @IsString()
  shopAdminPw!: string;

  /**
   * 이름
   * @example 도밍고
   */
  @IsString()
  shopAdminName!: string;

  /**
   * 전화번호
   * @example 01012345678
   */
  @IsString()
  shopAdminPhone!: string;

  /**
   * 마케팅 수신여부
   * @example "Y"
   */
  @IsIn(["Y", "N"])
  marketingYn!: "Y" | "N";

  /**
   * 에이전트 정보
   */
  agentInfo!: AgentInfo;
}

export class UserAuthPayload {
  /**
   * 꽃집키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   */
  @IsString()
  shopKey!: string;

  /**
   * 상점 링크
   * @example "mingo"
   */
  @IsString()
  shopLink!: string;

  /**
   * 회원명
   * @example "도밍고"
   */
  @IsString()
  userName!: string;

  /**
   * 전화번호
   * @example "01012341234"
   */
  @IsString()
  userPhone!: string;

  /**
   * 회원생년월일
   * @example "19900101"
   * @description 회원생년월일
   * @required false
   */
  @IsOptional()
  @IsString()
  userBirth?: string;

  /**
   * 성별
   * @example "0"
   * @description 회원성별 (0: 남성, 1: 여성)
   * @enum UserGenderValues
   * @required false
   */
  @IsOptional()
  @IsString()
  userGender?: UserGender;
}

export class AgentInfo {
  /**
   * 디바이스 정보
   * @example "iPhone 12"
   */
  @IsString()
  device!: string;

  /**
   * OS 타입
   * @example "iOS"
   */
  @IsString()
  osType!: string;

  /**
   * FCM 토큰
   * @example "sdfgsdfgfsgdsfg"
   */
  @IsString()
  fcmToken!: string;

  /**
   * 만료일자
   * @example 2021-12-31 23:59:59
   */
  @IsDate()
  expDate!: Date;
}

export class FloristNormalLoginPayload
  extends PickType(FloristAuthPayload, ["shopAdminNormalAuthId", "shopAdminPw", "agentInfo"])
  implements IFloristNormalLoginPayload {}

export class FloristNormalJoinPayload
  extends PickType(FloristAuthPayload, ["shopAdminNormalAuthId", "shopAdminPw", "shopAdminName", "shopAdminPhone", "marketingYn", "agentInfo"])
  implements IFloristNormalJoinPayload {}

export class FloristKakaoLoginPayload
  extends PickType(FloristAuthPayload, ["shopAdminKakaoAuthId", "shopAdminName", "shopAdminPhone"])
  implements IFloristKakaoLoginPayload {}

export class FloristAppleLoginPayload
  extends PickType(FloristAuthPayload, ["shopAdminAppleAuthId", "shopAdminName", "shopAdminPhone"])
  implements IFloristAppleLoginPayload {}

export class FloristFindIdPayload extends PickType(FloristAuthPayload, ["shopAdminName", "shopAdminPhone"]) implements IFloristFindIdPayload {}

export class UserNormalLoginMsaPayload
  extends PickType(UserAuthPayload, ["userName", "userPhone", "shopKey", "shopLink"])
  implements IUserNormalLoginMsaPayload {}

export class UserNormalJoinPayload
  extends PickType(UserAuthPayload, ["shopKey", "userName", "userPhone", "userBirth", "userGender", "shopLink"] as const)
  implements IUserNormalJoinPayload {}
