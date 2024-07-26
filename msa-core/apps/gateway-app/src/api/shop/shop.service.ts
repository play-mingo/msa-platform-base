import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { MAS_TOPIC } from "core/constant/mas-topic";
import { lastValueFrom } from "rxjs";
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
  IUpdateFloristMypagePayload,
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
  IUpdateFloristMypageResult,
  IUpdateFloristOrderOptionResult,
  IUpdateFloristShopProductResult,
  IUpdateFloristShopUserResult,
  IUserShopDetailResult,
  IUserShopProductResult,
  IUserShopReviewResult,
} from "usecase/shop/shop.result";

@Injectable()
export class ShopService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  async getFloristSummary(payload: IFloristSummaryPayload): Promise<IFloristSummaryResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SUMMARY, payload));
  }

  async getFloristShopDetail(payload: IFloristShopDetailPayload): Promise<IFloristShopDetailResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_DETAIL, payload));
  }

  async getFloristShopProduct(payload: IFloristShopProductPayload): Promise<IFloristShopProductResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_PRODUCT, payload));
  }

  async getFloristShopReview(payload: IFloristShopReviewPayload): Promise<IFloristShopReviewResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_REVIEW, payload));
  }

  async getFloristShopUserList(payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_USER_LIST, payload));
  }

  async getFloristMypage(payload: IFloristMypagePayload): Promise<IFloristMypageResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.MYPAGE, payload));
  }

  async updateFloristMypage(payload: IUpdateFloristMypagePayload): Promise<IUpdateFloristMypageResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.UPDATE_MYPAGE, payload));
  }

  async updateFloristShopProduct(payload: IUpdateFloristShopProductPayload): Promise<IUpdateFloristShopProductResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.UPDATE_SHOP_PRODUCT, payload));
  }

  async getFloristOrderOption(payload: IFloristOrderOptionPayload): Promise<IFloristOrderOptionResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.ORDER_OPTION, payload));
  }

  async updateFloristOrderOption(payload: IUpdateFloristOrderOptionPayload): Promise<IUpdateFloristOrderOptionResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.UPDATE_ORDER_OPTION, payload));
  }

  async getFloristShopUser(payload: IFloristShopUserPayload): Promise<IFloristShopUserResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_USER, payload));
  }

  async getFloristShopUserDetail(payload: IFloristShopUserDetailPayload): Promise<IFloristShopUserDetailResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.SHOP_USER_DETAIL, payload));
  }

  async updateFloristShopUser(payload: IUpdateFloristShopUserPayload): Promise<IUpdateFloristShopUserResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.FLORIST.UPDATE_SHOP_USER, payload));
  }

  async getUserShopDetail(payload: IUserShopDetailPayload): Promise<IUserShopDetailResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.USER.SHOP_DETAIL, payload));
  }

  async getUserShopProduct(payload: IUserShopProductPayload): Promise<IUserShopProductResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.USER.SHOP_PRODUCT, payload));
  }

  async getUserShopReview(payload: IUserShopReviewPayload): Promise<IUserShopReviewResult> {
    return await lastValueFrom(this.client.send(MAS_TOPIC.SHOP.USER.SHOP_REVIEW, payload));
  }
}
