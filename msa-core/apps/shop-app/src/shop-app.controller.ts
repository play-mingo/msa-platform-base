import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { MAS_TOPIC } from "core/constant/mas-topic";
import { ShopAppService } from "./shop-app.service";
import {
  IFloristMypagePayload,
  IFloristOrderOptionPayload,
  IFloristShopDetailPayload,
  IFloristShopProductPayload,
  IFloristShopReviewPayload,
  IFloristShopUserDetailPayload,
  IFloristShopUserListPayload,
  IFloristShopUserPayload,
  IFloristSummaryPayload,
  IUpdateFloristOrderOptionPayload,
  IUpdateFloristShopProductPayload,
  IUpdateFloristShopUserPayload,
  IUserShopDetailPayload,
  IUserShopProductPayload,
  IUserShopReviewPayload,
} from "usecase/shop/shop.payload";
import {
  IFloristMypageResult,
  IFloristOrderOptionResult,
  IFloristShopDetailResult,
  IFloristShopProductResult,
  IFloristShopReviewResult,
  IFloristShopUserDetailResult,
  IFloristShopUserListResult,
  IFloristShopUserResult,
  IFloristSummaryResult,
  IUpdateFloristOrderOptionResult,
  IUpdateFloristShopProductResult,
  IUpdateFloristShopUserResult,
  IUserShopDetailResult,
  IUserShopProductResult,
  IUserShopReviewResult,
} from "usecase/shop/shop.result";

@Controller()
export class ShopAppController {
  constructor(private readonly shopAppService: ShopAppService) {}

  @MessagePattern("hero.kill.dragon123")
  getHello() {
    console.log("hero.kill.dragon123 error 🚀");
    // throw new RpcException("test");
    return this.shopAppService.getHello();
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.UPDATE_SHOP_PRODUCT)
  async updateFloristShopProduct(@Payload() payload: IUpdateFloristShopProductPayload): Promise<IUpdateFloristShopProductResult> {
    return await this.shopAppService.updateFloristShopProduct(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.UPDATE_ORDER_OPTION)
  async updateFloristOrderOption(@Payload() payload: IUpdateFloristOrderOptionPayload): Promise<IUpdateFloristOrderOptionResult> {
    return await this.shopAppService.updateFloristOrderOption(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.UPDATE_SHOP_USER)
  async updateFloristShopUser(@Payload() payload: IUpdateFloristShopUserPayload): Promise<IUpdateFloristShopUserResult> {
    return await this.shopAppService.updateFloristShopUser(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SUMMARY)
  async getFloristSummary(@Payload() payload: IFloristSummaryPayload): Promise<IFloristSummaryResult> {
    return await this.shopAppService.getFloristSummary(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_DETAIL)
  async getFloristShopDetail(@Payload() payload: IFloristShopDetailPayload): Promise<IFloristShopDetailResult> {
    return await this.shopAppService.getFloristShopDetail(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_PRODUCT)
  async getFloristShopProduct(@Payload() payload: IFloristShopProductPayload): Promise<IFloristShopProductResult> {
    return await this.shopAppService.getFloristShopProduct(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_REVIEW)
  async getFloristShopReview(@Payload() payload: IFloristShopReviewPayload): Promise<IFloristShopReviewResult> {
    return await this.shopAppService.getFloristShopReview(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_USER_LIST)
  async getFloristShopUserList(@Payload() payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return await this.shopAppService.getFloristShopUserList(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.MYPAGE)
  async getFloristMypage(@Payload() payload: IFloristMypagePayload): Promise<IFloristMypageResult> {
    return await this.shopAppService.getFloristMypage(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.ORDER_OPTION)
  async getFloristOrderOption(@Payload() payload: IFloristOrderOptionPayload): Promise<IFloristOrderOptionResult> {
    return await this.shopAppService.getFloristOrderOption(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_USER)
  async getFloristShopUser(@Payload() payload: IFloristShopUserPayload): Promise<IFloristShopUserResult> {
    return await this.shopAppService.getFloristShopUser(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.FLORIST.SHOP_USER_DETAIL)
  async getFloristShopUserDetail(@Payload() payload: IFloristShopUserDetailPayload): Promise<IFloristShopUserDetailResult> {
    return await this.shopAppService.getFloristShopUserDetail(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.USER.SHOP_DETAIL)
  async getUserShopDetail(@Payload() payload: IUserShopDetailPayload): Promise<IUserShopDetailResult> {
    return await this.shopAppService.getUserShopDetail(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.USER.SHOP_PRODUCT)
  async getUserShopProduct(@Payload() payload: IUserShopProductPayload): Promise<IUserShopProductResult> {
    return await this.shopAppService.getUserShopProduct(payload);
  }

  @MessagePattern(MAS_TOPIC.SHOP.USER.SHOP_REVIEW)
  async getUserShopReview(@Payload() payload: IUserShopReviewPayload): Promise<IUserShopReviewResult> {
    return await this.shopAppService.getUserShopReview(payload);
  }
}
