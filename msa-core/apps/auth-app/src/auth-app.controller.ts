import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AUTH_TOPIC } from "core/constant/auth.msa.topic";
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
  IUserNormalJoinResult,
  IUserNormalLoginResult,
} from "usecase/auth/auth.result";
import { AuthAppService } from "./auth-app.service";

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  /**
   * 플로리스트 일반 로그인
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.FLORIST.NORMAL_LOGIN)
  async floristLogin(@Payload() payload: IFloristNormalLoginPayload): Promise<IFloristNormalLoginResult> {
    return await this.authAppService.floristLogin(payload);
  }

  /**
   * 플로리스트 일반 회원가입
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.FLORIST.NORMAL_JOIN)
  async floristJoin(@Payload() payload: IFloristNormalJoinPayload): Promise<IFloristNormalJoinResult> {
    return await this.authAppService.floristJoin(payload);
  }

  /**
   * 플로리스트 카카오 로그인
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.FLORIST.KAKAO_LOGIN)
  async floristKakaoLogin(@Payload() payload: IFloristKakaoLoginPayload): Promise<IFloristAppleLoginResult> {
    return await this.authAppService.floristKakaoLogin(payload);
  }

  /**
   * 플로리스트 애플 로그인
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.FLORIST.APPLE_LOGIN)
  async floristAppleLogin(@Payload() payload: IFloristAppleLoginPayload): Promise<IFloristKakaoLoginResult> {
    return await this.authAppService.floristAppleLogin(payload);
  }

  /**
   * 플로리스트 아이디 찾기
   * @returns 이메일
   */
  @MessagePattern(AUTH_TOPIC.FLORIST.FIND_ID)
  async floristFindId(@Payload() payload: IFloristFindIdPayload): Promise<IFloristFindIdResult> {
    return await this.authAppService.floristFindId(payload);
  }

  /**
   * 사용자 로그인
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.USER.NORMAL_LOGIN)
  async userLogin(@Payload() payload: IUserNormalLoginPayload): Promise<IUserNormalLoginResult> {
    return await this.authAppService.userLogin(payload);
  }

  /**
   * 사용자 회원가입
   * @returns 로그인 토큰
   */
  @MessagePattern(AUTH_TOPIC.USER.NORMAL_JOIN)
  async userJoin(@Payload() payload: IUserNormalJoinPayload): Promise<IUserNormalJoinResult> {
    return await this.authAppService.userJoin(payload);
  }
}
