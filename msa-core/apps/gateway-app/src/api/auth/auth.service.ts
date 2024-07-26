import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka, Payload } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AUTH_TOPIC } from "core/constant/auth.msa.topic";
import { firstValueFrom, lastValueFrom } from "rxjs";
import {
  IFloristAppleLoginPayload,
  IFloristFindIdPayload,
  IFloristKakaoLoginPayload,
  IFloristNormalJoinPayload,
  IFloristNormalLoginPayload,
  IUserNormalJoinPayload,
  IUserNormalLoginPayload,
} from "usecase/auth/auth.payload";
import {
  IFloristAppleLoginResult,
  IFloristFindIdResult,
  IFloristKakaoLoginResult,
  IFloristNormalJoinResult,
  IFloristNormalLoginResult,
  UserNormalJoinResult,
  UserNormalLoginResult,
} from "usecase/auth/auth.result";
// import { AUTH_TOPIC } from "usecase/common/config/KafkaMsaTopic";

@Injectable()
export class AuthService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  async floristLogin(payload: IFloristNormalLoginPayload): Promise<IFloristNormalLoginResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.FLORIST.NORMAL_LOGIN, payload));
  }

  async floristJoin(payload: IFloristNormalJoinPayload): Promise<IFloristNormalJoinResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.FLORIST.NORMAL_JOIN, payload));
  }

  async floristKakaoLogin(payload: IFloristKakaoLoginPayload): Promise<IFloristAppleLoginResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.FLORIST.KAKAO_LOGIN, payload));
  }

  async floristAppleLogin(payload: IFloristAppleLoginPayload): Promise<IFloristKakaoLoginResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.FLORIST.APPLE_LOGIN, payload));
  }

  async floristFindId(payload: IFloristFindIdPayload): Promise<IFloristFindIdResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.FLORIST.FIND_ID, payload));
  }

  async userLogin(payload: IUserNormalLoginPayload): Promise<UserNormalLoginResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.USER.NORMAL_LOGIN, payload));
  }

  async userJoin(payload: IUserNormalJoinPayload): Promise<UserNormalJoinResult> {
    return await lastValueFrom(this.client.send(AUTH_TOPIC.USER.NORMAL_JOIN, payload));
  }
}
