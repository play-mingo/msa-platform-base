import { Controller, Get } from "@nestjs/common";
import { UserAppService } from "./user-app.service";
import { MessagePattern } from "@nestjs/microservices";
import { USER_TOPIC } from "core/constant/user.msa.topic";
import {
  IFloristShopUserInfoPayload,
  IFloristShopUserListPayload,
  IFloristShopUserRegInPayload,
  IFloristShopUserUpdatePayload,
  IUserInfoPayload,
  IUserUpdatePayload,
} from "usecase/user/user.payload";
import {
  IFloristShopUserInfoResult,
  IFloristShopUserListResult,
  IFloristShopUserRegInResult,
  IFloristShopUserUpdateResult,
  IUserInfoResult,
  IUserUpdateResult,
} from "usecase/user/user.result";

@Controller()
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}

  @Get()
  getHello(): string {
    return this.userAppService.getHello();
  }

  /**
   * 꽃집 - 사용자 정보 등록
   */
  @MessagePattern(USER_TOPIC.FLORIST.REG_IN)
  async floristShopUserRegIn(payload: IFloristShopUserRegInPayload): Promise<IFloristShopUserRegInResult> {
    return await this.userAppService.floristShopUserRegIn(payload);
  }

  /**
   * 꽃집 - 사용자 정보 수정
   */
  @MessagePattern(USER_TOPIC.FLORIST.UPDATE)
  async floristShopUserUpdate(payload: IFloristShopUserUpdatePayload): Promise<IFloristShopUserUpdateResult> {
    return await this.userAppService.floristShopUserUpdate(payload);
  }

  /**
   * 꽃집 - 사용자 정보 조회
   */
  @MessagePattern(USER_TOPIC.FLORIST.DETAIL)
  async floristShopUserInfo(payload: IFloristShopUserInfoPayload): Promise<IFloristShopUserInfoResult> {
    return await this.userAppService.floristShopUserInfo(payload);
  }

  /**
   * 꽃집 - 사용자 정보 전체목록 조회
   */
  @MessagePattern(USER_TOPIC.FLORIST.LIST)
  async floristShopUserList(payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return await this.userAppService.floristShopUserList(payload);
  }

  /**
   * 사용자 정보 수정
   */
  @MessagePattern(USER_TOPIC.USER.UPDATE)
  async shopUserUpdate(payload: IUserUpdatePayload): Promise<IUserUpdateResult> {
    return await this.userAppService.shopUserUpdate(payload);
  }

  /**
   * 사용자 정보 조회
   */
  @MessagePattern(USER_TOPIC.USER.INFO)
  async shopUserInfo(payload: IUserInfoPayload): Promise<IUserInfoResult> {
    return await this.userAppService.shopUserInfo(payload);
  }
}
