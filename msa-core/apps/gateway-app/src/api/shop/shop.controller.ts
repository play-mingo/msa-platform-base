import { Body, Controller, Get, Param, Patch, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { FloristJwtAuthGuard, FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";
import { IUserShopDetailPayload, IUserShopProductPayload, IUserShopReviewPayload } from "usecase/shop/shop.payload";
import {
  FloristMypageApiResponse,
  FloristOrderOptionApiResponse,
  FloristShopDetailApiResponse,
  FloristShopProductApiResponse,
  FloristShopReviewApiResponse,
  FloristShopUserApiResponse,
  FloristShopUserDetailApiResponse,
  FloristSummaryApiResponse,
  IFloristMypageResult,
  IFloristOrderOptionResult,
  IFloristShopDetailResult,
  IFloristShopProductResult,
  IFloristShopReviewResult,
  IFloristShopUserDetailResult,
  IFloristShopUserResult,
  IFloristSummaryResult,
  IUpdateFloristMypageResult,
  IUpdateFloristOrderOptionResult,
  IUpdateFloristShopProductResult,
  IUpdateFloristShopUserResult,
  IUserShopDetailResult,
  IUserShopProductResult,
  IUserShopReviewResult,
  UpdateFloristMypageApiResponse,
  UpdateFloristOrderOptionApiResponse,
  UpdateFloristShopProductApiResponse,
  UpdateFloristShopUserApiResponse,
  UserShopDetailApiResponse,
  UserShopProductApiResponse,
  UserShopReviewApiResponse,
} from "usecase/shop/shop.result";
import { Florist } from "../../common/decorator/florist.request.data.decorator";
import { FloristMypagePayload, UpdateFloristShopProductPayload } from "./dto/florist.shop.dto";
import { ShopService } from "./shop.service";

@ApiTags("shop")
@Controller("shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  /**
   * 내 고객정보 조회_통계정보 포함
   * @returns
   */
  @Get("florist/summary")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristSummaryApiResponse)
  async getFloristSummary(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristSummaryResult> {
    if (!shop.key) throw new Error("shopKey is required");
    return await this.shopService.getFloristSummary({ shopKey: shop.shopKey });
  }

  /**
   * 미리보기_꽃집 정보
   * @returns
   */
  @Get("florist/shopDetail")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopDetailApiResponse)
  async getFloristShopDetail(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopDetailResult> {
    return await this.shopService.getFloristShopDetail({ shopKey: shop.shopKey });
  }

  /**
   * 상품 목록 / 미리보기_STORE / 내 상품정보 조회
   * @returns
   */
  @Get("florist/shopProduct")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopProductApiResponse)
  async getFloristShopProduct(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopProductResult> {
    return await this.shopService.getFloristShopProduct({ shopKey: shop.shopKey });
  }

  /**
   * 미리보기_REVIEW
   * @returns
   */
  @Get("florist/shopReview")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopReviewApiResponse)
  async getFloristShopReview(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopReviewResult> {
    return await this.shopService.getFloristShopReview({ shopKey: shop.shopKey });
  }

  /**
   * 내 고객정보 조회
   * @returns
   */
  // @Get("florist/shopUserList")
  // @ApiOkResponse(FloristShopUserListApiResponse)
  // async getFloristShopUserList(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopUserListResult> {
  //   return await this.shopService.getFloristShopUserList({ shopKey: shop.key });
  // }

  /**
   * 내 고객정보 조회_통계정보 미포함
   * @returns
   */
  @Get("florist/mypage")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristMypageApiResponse)
  async getFloristMypage(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristMypageResult> {
    const payload: FloristMypagePayload = {
      shopKey: shop.key,
      authId: shop.authId,
    };
    return await this.shopService.getFloristMypage(payload);
  }

  /**
   * 꽃집 기본정보 수정
   * @returns
   */
  @Patch("florist/mypage")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(UpdateFloristMypageApiResponse)
  async updateFloristMypage(@Florist() shop: FloristJwtAuthPayload): Promise<IUpdateFloristMypageResult> {
    return await this.shopService.updateFloristMypage({ shopKey: shop.shopKey });
  }

  /**
   * 상품 수정
   * @returns
   */
  @Put("florist/shopProduct")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(UpdateFloristShopProductApiResponse)
  async updateFloristShopProduct(
    @Florist() shop: FloristJwtAuthPayload,
    @Body() dto: UpdateFloristShopProductPayload,
  ): Promise<IUpdateFloristShopProductResult> {
    return await this.shopService.updateFloristShopProduct({
      shopKey: shop.shopKey,
      shopProductTargets: [...dto.smapleProductTargets, ...dto.categoryProductTargets],
    });
  }

  /**
   * 예약설정 조회
   * @returns
   */
  @Get("florist/orderOption")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristOrderOptionApiResponse)
  async getFloristOrderOption(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristOrderOptionResult> {
    return await this.shopService.getFloristOrderOption({ shopKey: shop.shopKey });
  }

  /**
   * 예약설정 수정
   * @returns
   */
  @Patch("florist/orderOption")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(UpdateFloristOrderOptionApiResponse)
  async updateFloristOrderOption(@Florist() shop: FloristJwtAuthPayload): Promise<IUpdateFloristOrderOptionResult> {
    return await this.shopService.updateFloristOrderOption({ shopKey: shop.shopKey });
  }

  /**
   * 고객정보 목록
   * @returns
   */
  @Get("florist/shopUser")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopUserApiResponse)
  async getFloristShopUser(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopUserResult> {
    return await this.shopService.getFloristShopUser({ shopKey: shop.shopKey });
  }

  /**
   * 고객정보 성세
   * @returns
   */
  @Get("florist/shopUser/:id")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristShopUserDetailApiResponse)
  async getFloristShopUserDetail(@Florist() shop: FloristJwtAuthPayload): Promise<IFloristShopUserDetailResult> {
    return await this.shopService.getFloristShopUserDetail({ shopKey: shop.shopKey });
  }

  /**
   * 고객정보 상세 수정
   * @returns
   */
  @Patch("florist/shopUser/:id")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(UpdateFloristShopUserApiResponse)
  async updateFloristShopUser(@Florist() shop: FloristJwtAuthPayload): Promise<IUpdateFloristShopUserResult> {
    return await this.shopService.updateFloristShopUser({ shopKey: shop.shopKey });
  }

  /**
   * 꽃집 메인정보 상세
   * @param payload
   * @returns
   */
  @Get("user/shopDetail/:id")
  @ApiParam({ name: "shopKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8" })
  @ApiOkResponse(UserShopDetailApiResponse)
  async getUserShopDetail(@Param() payload: IUserShopDetailPayload): Promise<IUserShopDetailResult> {
    console.log("======= payload =======");
    console.log(payload);
    return await this.shopService.getUserShopDetail(payload);
  }

  /**
   * 상품 목록
   * @returns
   */
  @Get("user/shopProduct/:id")
  @ApiParam({ name: "shopKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8" })
  @ApiOkResponse(UserShopProductApiResponse)
  async getUserShopProduct(@Param() payload: IUserShopProductPayload): Promise<IUserShopProductResult> {
    return await this.shopService.getUserShopProduct(payload);
  }

  /**
   * 리뷰 목록
   * @param payload
   * @returns
   */
  @Get("user/shopReview/:id")
  @ApiParam({ name: "shopKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8" })
  @ApiOkResponse(UserShopReviewApiResponse)
  async getUserShopReview(@Param() payload: IUserShopReviewPayload): Promise<IUserShopReviewResult> {
    return await this.shopService.getUserShopReview(payload);
  }
}
