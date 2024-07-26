import { PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { UserGender } from "domain/shopUser/vo/ShopUserInfo";
import {
  IFloristShopUserInfoPayload,
  IFloristShopUserListPayload,
  IFloristShopUserRegInPayload,
  IFloristShopUserUpdatePayload,
  IUserUpdatePayload,
} from "usecase/user/user.payload";

export class UserPayload {
  /**
   * 꽃집 DB 키
   * @example 1
   * @description 꽃집 DB 키
   */
  @Type(() => Number)
  @IsNumber()
  shopId!: number;

  /**
   * 회원 DB 키
   * @example 1
   * @description 회원 DB 키
   */
  @Type(() => Number)
  @IsNumber()
  shopUserId!: number;

  /**
   * 회원키
   * @example "04f2742f4e5c49e38587cca28023ccf8"
   */
  @IsString()
  shopUserKey!: string;
  /**
   * 회원명
   * @example "이충환"
   * @description 회원명
   */
  @IsString()
  userName!: string;

  /**
   * 회원전화번호
   * @example "01012345678"
   * @description 회원전화번호
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
   * @enum UserGender
   * @required false
   */
  @IsOptional()
  @IsString()
  userGender?: UserGender;
}

export class FloristShopUserRegInPayload
  extends PickType(UserPayload, ["userName", "userPhone", "userBirth", "userGender"] as const)
  implements Omit<IFloristShopUserRegInPayload, "shopId"> {}
export class FloristShopUserUpdatePayload
  extends PickType(UserPayload, ["shopUserKey", "userName", "userPhone"] as const)
  implements IFloristShopUserUpdatePayload {}
export class FloristShopUserListPayload implements Omit<IFloristShopUserListPayload, "shopId"> {}
export class FloristShopUserInfoPayload extends PickType(UserPayload, ["shopUserKey"] as const) implements IFloristShopUserInfoPayload {}
export class UserUpdatePayload
  extends PickType(UserPayload, ["userName", "userPhone", "userBirth", "userGender"] as const)
  implements Omit<IUserUpdatePayload, "shopUserId"> {}
