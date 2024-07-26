import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FloristJwtAuthGuard, FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";
import { Florist } from "core/jwt/florist.request.data.decorator";
import { UserSessionLoginedAuthGuard } from "core/jwt/user-session-logined-auth.guard";
import { User, UserSessionAuthPayload } from "core/jwt/user.request.data.decorator";
import {
  FloristShopUserInfoApiResponse,
  FloristShopUserListApiResponse,
  FloristShopUserRegInApiResponse,
  FloristShopUserUpdateApiResponse,
  IFloristShopUserInfoResult,
  IFloristShopUserListResult,
  IFloristShopUserRegInResult,
  IFloristShopUserUpdateResult,
  IUserInfoResult,
  IUserUpdateResult,
  UserInfoApiResponse,
  UserUpdateApiResponse,
} from "usecase/user/user.result";
import { FloristShopUserInfoPayload, FloristShopUserRegInPayload, FloristShopUserUpdatePayload, UserUpdatePayload } from "./dto/user.dto";

@ApiTags("shopUser")
@Controller("shoopUser")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 꽃집 - 사용자 정보 등록
   */
  @Post("florist")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse(FloristShopUserRegInApiResponse)
  async floristShopUserRegIn(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: FloristShopUserRegInPayload,
  ): Promise<IFloristShopUserRegInResult> {
    return await this.userService.floristShopUserRegIn({
      ...payload,
      shopId: shop.shopId,
    });
  }

  /**
   * 꽃집 - 사용자 정보 수정
   */
  @Patch("florist")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopUserUpdateApiResponse)
  async floristShopUserUpdate(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() payload: FloristShopUserUpdatePayload,
  ): Promise<IFloristShopUserUpdateResult> {
    return await this.userService.floristShopUserUpdate(payload);
  }

  /**
   * 꽃집 - 사용자 정보 전체목록 조회
   * TODO 나이대 및 성별 없을 시 반환결과 재조정해야
   */
  @Get("florist")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopUserListApiResponse)
  async floristShopUserList(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopUserListResult> {
    return await this.userService.floristShopUserList({
      shopId: shop.shopId,
    });
  }

  /**
   * 꽃집 - 사용자 정보 조회
   * TODO 나이대 및 성별 없을 시 반환결과 재조정해야
   */
  @Get("florist/:shopUserKey")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopUserInfoApiResponse)
  async floristShopUserInfo(
    @Florist() shop: FloristJwtAuthPayload,
    @Param() payload: FloristShopUserInfoPayload,
  ): Promise<IFloristShopUserInfoResult> {
    return await this.userService.floristShopUserInfo(payload);
  }

  /**
   * 사용자 - 사용자 정보 수정
   */
  @Patch("user")
  @UseGuards(UserSessionLoginedAuthGuard)
  @ApiOkResponse(UserUpdateApiResponse)
  async shopUserUpdate(@User() user: UserSessionAuthPayload, @Body() payload: UserUpdatePayload): Promise<IUserUpdateResult> {
    return await this.userService.shopUserUpdate({
      shopUserId: user.shopUserId,
      ...payload,
    });
  }

  /**
   * 사용자 - 마이페이지 사용자 정보 조회
   * TODO 나이대 및 성별 없을 시 반환결과 재조정해야
   */
  @Get("user")
  @UseGuards(UserSessionLoginedAuthGuard)
  @ApiOkResponse(UserInfoApiResponse)
  async shopUserInfo(@User() user: UserSessionAuthPayload): Promise<IUserInfoResult> {
    return await this.userService.shopUserInfo({
      shopUserId: user.shopUserId,
    });
  }
}
