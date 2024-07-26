import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { FloristShopUserRegInCommand, FloristShopUserUpdateCommand, UserUpdateCommand } from "usecase/user/user.command";
import {
  IFloristShopUserInfoPayload,
  IFloristShopUserListPayload,
  IFloristShopUserRegInPayload,
  IFloristShopUserUpdatePayload,
  IUserInfoPayload,
  IUserUpdatePayload,
} from "usecase/user/user.payload";
import { FloristShopUserInfoQuery, FloristShopUserListQuery, UserInfoQuery } from "usecase/user/user.query";
import {
  IFloristShopUserInfoResult,
  IFloristShopUserListResult,
  IFloristShopUserRegInResult,
  IFloristShopUserUpdateResult,
  IUserInfoResult,
  IUserUpdateResult,
} from "usecase/user/user.result";

@Injectable()
export class UserAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  getHello(): string {
    return "Hello World!";
  }

  /**
   * 꽃집 - 사용자 정보 등록
   */
  async floristShopUserRegIn(payload: IFloristShopUserRegInPayload): Promise<IFloristShopUserRegInResult> {
    return await this.commandBus.execute(new FloristShopUserRegInCommand(payload));
  }

  /**
   * 꽃집 - 사용자 정보 수정
   */
  async floristShopUserUpdate(payload: IFloristShopUserUpdatePayload): Promise<IFloristShopUserUpdateResult> {
    return await this.commandBus.execute(new FloristShopUserUpdateCommand(payload));
  }

  /**
   * 꽃집 - 사용자 정보 조회
   */
  async floristShopUserInfo(payload: IFloristShopUserInfoPayload): Promise<IFloristShopUserInfoResult> {
    return await this.queryBus.execute(new FloristShopUserInfoQuery(payload));
  }

  /**
   * 꽃집 - 사용자 정보 전체목록 조회
   */
  async floristShopUserList(payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return await this.queryBus.execute(new FloristShopUserListQuery(payload));
  }

  /**
   * 사용자 정보 수정
   */
  async shopUserUpdate(payload: IUserUpdatePayload): Promise<IUserUpdateResult> {
    return await this.commandBus.execute(new UserUpdateCommand(payload));
  }

  /**
   * 사용자 정보 조회
   */
  async shopUserInfo(payload: IUserInfoPayload): Promise<IUserInfoResult> {
    return await this.queryBus.execute(new UserInfoQuery(payload));
  }
}
