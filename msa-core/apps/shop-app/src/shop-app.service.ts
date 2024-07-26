import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ShopKey } from "domain/shop/key";
import {
  ShopFloristUpdateOrderOptionCommand,
  ShopFloristUpdateShopProductCommand,
  ShopFloristUpdateShopUserCommand,
} from "usecase/shop/shop.command";
import {
  ShopFloristGetSummaryQuery,
  ShopFloristMypageQuery,
  ShopFloristOrderOptionQuery,
  ShopFloristShopDetailQuery,
  ShopFloristShopProductQuery,
  ShopFloristShopReviewQuery,
  ShopFloristShopUserDetailQuery,
  ShopFloristShopUserListQuery,
  ShopFloristShopUserQuery,
  ShopUserShopDetailQuery,
  ShopUserShopProductQuery,
  ShopUserShopReviewQuery,
} from "usecase/shop/shop.query";
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

@Injectable()
export class ShopAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  getHello() {
    return {
      message: "Hello World!",
      test: "test",
      array: [1, 2, 3],
    };
  }

  async updateFloristShopProduct(payload: IUpdateFloristShopProductPayload): Promise<IUpdateFloristShopProductResult> {
    return await this.commandBus.execute(new ShopFloristUpdateShopProductCommand(new ShopKey(payload.shopKey), payload.shopProductTargets));
  }

  async updateFloristOrderOption(payload: IUpdateFloristOrderOptionPayload): Promise<IUpdateFloristOrderOptionResult> {
    return await this.commandBus.execute(new ShopFloristUpdateOrderOptionCommand(new ShopKey(payload.shopKey)));
  }

  async updateFloristShopUser(payload: IUpdateFloristShopUserPayload): Promise<IUpdateFloristShopUserResult> {
    return await this.commandBus.execute(new ShopFloristUpdateShopUserCommand(new ShopKey(payload.shopKey)));
  }

  async getFloristSummary(payload: IFloristSummaryPayload): Promise<IFloristSummaryResult> {
    return await this.queryBus.execute(new ShopFloristGetSummaryQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopDetail(payload: IFloristShopDetailPayload): Promise<IFloristShopDetailResult> {
    return await this.queryBus.execute(new ShopFloristShopDetailQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopProduct(payload: IFloristShopProductPayload): Promise<IFloristShopProductResult> {
    return await this.queryBus.execute(new ShopFloristShopProductQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopReview(payload: IFloristShopReviewPayload): Promise<IFloristShopReviewResult> {
    return await this.queryBus.execute(new ShopFloristShopReviewQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopUserList(payload: IFloristShopUserListPayload): Promise<IFloristShopUserListResult> {
    return await this.queryBus.execute(new ShopFloristShopUserListQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristMypage(payload: IFloristMypagePayload): Promise<IFloristMypageResult> {
    return await this.queryBus.execute(new ShopFloristMypageQuery(new ShopKey(payload.shopKey), payload.authId));
  }

  async getFloristOrderOption(payload: IFloristOrderOptionPayload): Promise<IFloristOrderOptionResult> {
    return await this.queryBus.execute(new ShopFloristOrderOptionQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopUser(payload: IFloristShopUserPayload): Promise<IFloristShopUserResult> {
    return await this.queryBus.execute(new ShopFloristShopUserQuery(new ShopKey(payload.shopKey)));
  }

  async getFloristShopUserDetail(payload: IFloristShopUserDetailPayload): Promise<IFloristShopUserDetailResult> {
    return await this.queryBus.execute(new ShopFloristShopUserDetailQuery(new ShopKey(payload.shopKey)));
  }

  async getUserShopDetail(payload: IUserShopDetailPayload): Promise<IUserShopDetailResult> {
    return await this.queryBus.execute(new ShopUserShopDetailQuery(new ShopKey(payload.shopKey)));
  }

  async getUserShopProduct(payload: IUserShopProductPayload): Promise<IUserShopProductResult> {
    return await this.queryBus.execute(new ShopUserShopProductQuery(new ShopKey(payload.shopKey)));
  }

  async getUserShopReview(payload: IUserShopReviewPayload): Promise<IUserShopReviewResult> {
    return await this.queryBus.execute(new ShopUserShopReviewQuery(new ShopKey(payload.shopKey)));
  }
}
