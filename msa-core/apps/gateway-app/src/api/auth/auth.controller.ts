import { Body, Controller, Get, Post, Redirect, Req, Res, Session, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserSessionAuthGuard } from "core/jwt/user-session-auth.guard";
import { UserSessionLoginedAuthGuard } from "core/jwt/user-session-logined-auth.guard";
import { User, UserSessionAuthPayload } from "core/jwt/user.request.data.decorator";
import { Request, Response } from "express";
import {
  FloristAppleLoginApiResponse,
  FloristFindIdApiResponse,
  FloristKakaoLoginApiResponse,
  FloristNormalJoinApiResponse,
  FloristNormalLoginApiResponse,
  IFloristAppleLoginResult,
  IFloristFindIdResult,
  IFloristKakaoLoginResult,
  IFloristNormalJoinResult,
  IFloristNormalLoginResult,
  UserNormalJoinApiResponse,
} from "usecase/auth/auth.result";
import { AuthService } from "./auth.service";
import {
  FloristAppleLoginPayload,
  FloristFindIdPayload,
  FloristKakaoLoginPayload,
  FloristNormalJoinPayload,
  FloristNormalLoginPayload,
  UserNormalJoinPayload,
  UserNormalLoginMsaPayload,
} from "./dto/florist.auth.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 플로리스트 일반 로그인
   * @returns 로그인 토큰
   */
  @Post("florist/login")
  @ApiCreatedResponse(FloristNormalLoginApiResponse)
  async floristLogin(@Body() payload: FloristNormalLoginPayload): Promise<IFloristNormalLoginResult> {
    return await this.authService.floristLogin(payload);
  }

  /**
   * 플로리스트 일반 회원가입
   * @returns 로그인 토큰
   */
  @Post("florist/join")
  @ApiCreatedResponse(FloristNormalJoinApiResponse)
  async floristJoin(@Body() payload: FloristNormalJoinPayload): Promise<IFloristNormalJoinResult> {
    return await this.authService.floristJoin(payload);
  }

  /**
   * 플로리스트 카카오 로그인
   * @returns 로그인 토큰
   */
  @Post("florist/kakaoLogin")
  @ApiCreatedResponse(FloristKakaoLoginApiResponse)
  async floristKakaoLogin(@Body() payload: FloristKakaoLoginPayload): Promise<IFloristAppleLoginResult> {
    return await this.authService.floristKakaoLogin(payload);
  }

  /**
   * 플로리스트 애플 로그인
   * @returns 로그인 토큰
   */
  @Post("florist/appleLogin")
  @ApiCreatedResponse(FloristAppleLoginApiResponse)
  async floristAppleLogin(@Body() payload: FloristAppleLoginPayload): Promise<IFloristKakaoLoginResult> {
    return await this.authService.floristAppleLogin(payload);
  }

  /**
   * 플로리스트 아이디 찾기
   * @returns 이메일
   */
  @Post("florist/findId")
  @ApiCreatedResponse(FloristFindIdApiResponse)
  async floristFindId(@Body() payload: FloristFindIdPayload): Promise<IFloristFindIdResult> {
    return await this.authService.floristFindId(payload);
  }

  /**
   * 꽃집 - 사용자 정보 등록
   */
  @Post("user/join")
  @Redirect("/auth/user/login", 308)
  @ApiCreatedResponse(UserNormalJoinApiResponse)
  async userJoin(
    @Session() session: Record<string, any>,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() payload: UserNormalJoinPayload,
  ): Promise<void> {
    await this.authService.userJoin(payload);
  }

  /**
   * 사용자 일반 로그인
   * @returns 로그인 토큰
   */
  @Post("user/login")
  @UseGuards(UserSessionAuthGuard)
  async userLogin(
    @Session() session: Record<string, any>,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() payload: UserNormalLoginMsaPayload,
  ): Promise<void> {
    return;
  }

  /**
   * 사용자 일반 로그인 protected
   * @returns 로그인 토큰
   */
  @Get("user/protected")
  // @ApiCookieAuth()
  @UseGuards(UserSessionLoginedAuthGuard)
  async protected(@User() user: UserSessionAuthPayload, @Req() req: Request, @Session() session: Record<string, any>) {
    return user;
  }

  /**
   * 사용자 일반 로그인 test
   * @returns 로그인 토큰
   */
  @Post("user/test")
  test(@Req() req: Request) {
    console.log("session");
    console.log(req.session);
    return req.user;
  }
}
