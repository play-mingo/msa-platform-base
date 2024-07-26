import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { USER_TOPIC } from "core/constant/user.msa.topic";
import { lastValueFrom } from "rxjs";
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

@Injectable()
export class UserService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  /**
   * 꽃집 - 사용자 정보 등록
   */
  async floristShopUserRegIn(payload: IFloristShopUserRegInPayload): Promise<IFloristShopUserRegInResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.FLORIST.REG_IN, payload));
  }

  /**
   * 꽃집 - 사용자 정보 수정
   */
  async floristShopUserUpdate(payload: IFloristShopUserUpdatePayload): Promise<IFloristShopUserUpdateResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.FLORIST.UPDATE, payload));
  }

  /**
   * 꽃집 - 사용자 정보 조회
   */
  async floristShopUserInfo(payload: IFloristShopUserInfoPayload): Promise<IFloristShopUserInfoResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.FLORIST.DETAIL, payload));
  }

  /**
   * 꽃집 - 사용자 정보 전체목록 조회
   */
  async floristShopUserList(payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.FLORIST.LIST, payload));
  }

  /**
   * 사용자 정보 수정
   */
  async shopUserUpdate(payload: IUserUpdatePayload): Promise<IUserUpdateResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.USER.UPDATE, payload));
  }

  /**
   * 사용자 정보 조회
   */
  async shopUserInfo(payload: IUserInfoPayload): Promise<IUserInfoResult> {
    return lastValueFrom(this.client.send(USER_TOPIC.USER.INFO, payload));
  }
}
