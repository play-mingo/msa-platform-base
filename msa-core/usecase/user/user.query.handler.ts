import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { calculateAgeRange, ShopUserRepository } from "core/database/typerom/repositories";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";
import { parseUserGender } from "domain/shopUser/vo/ShopUserInfo";
import { FloristShopUserInfoQuery, FloristShopUserListQuery, UserInfoQuery } from "./user.query";
import { IFloristShopUserInfoResult, IFloristShopUserListResult, IUserInfoResult } from "./user.result";

@QueryHandler(FloristShopUserInfoQuery)
export class FloristShopUserInfoQueryHandler implements IQueryHandler<FloristShopUserInfoQuery, IFloristShopUserInfoResult> {
  constructor(private readonly shopUserRepository: ShopUserRepository) {}
  async execute(query: FloristShopUserInfoQuery): Promise<IFloristShopUserInfoResult> {
    const shopUser = await this.shopUserRepository.findOneByKey(new ShopUserKey(query.data.shopUserKey));
    if (!shopUser) throw new Error("ShopUser not found");
    return {
      shopUserKey: shopUser.key,
      userName: shopUser.shopUserName as string,
      userPhone: shopUser.shopUserPhone as string,
      userAge: !!shopUser.shopUserBirth ? calculateAgeRange(shopUser.shopUserBirth).toString() : undefined,
      userGender: !!shopUser.shopUserGender ? parseUserGender(shopUser.shopUserGender) : undefined,
      orderCnt: shopUser.orderCnt ?? 0,
    };
  }
}

@QueryHandler(FloristShopUserListQuery)
export class FloristShopUserListQueryHandler implements IQueryHandler<FloristShopUserListQuery, IFloristShopUserListResult> {
  constructor(private readonly shopUserRepository: ShopUserRepository) {}
  async execute(query: FloristShopUserListQuery): Promise<IFloristShopUserListResult> {
    const [shopUsers, total] = await this.shopUserRepository.findAndCountByShopId(query.data.shopId);
    return {
      totalCount: total,
      list:
        shopUsers?.map((shopUser) => ({
          shopUserKey: shopUser.key,
          userName: shopUser.shopUserName as string,
          userPhone: shopUser.shopUserPhone as string,
          userAge: !!shopUser.shopUserBirth ? calculateAgeRange(shopUser.shopUserBirth).toString() : undefined,
          userGender: !!shopUser.shopUserGender ? parseUserGender(shopUser.shopUserGender) : undefined,
          orderCnt: shopUser.orderCnt ?? 0,
        })) ?? [],
    };
  }
}

@QueryHandler(UserInfoQuery)
export class UserInfoQueryHandler implements IQueryHandler<UserInfoQuery, IUserInfoResult> {
  constructor(private readonly shopUserRepository: ShopUserRepository) {}
  async execute(query: UserInfoQuery): Promise<IUserInfoResult> {
    const shopUser = await this.shopUserRepository.findOneById(query.data.shopUserId);
    if (!shopUser) throw new Error("ShopUser not found");
    return {
      shopUserKey: shopUser.key,
      userName: shopUser.shopUserName as string,
      userPhone: shopUser.shopUserPhone as string,
      userAge: !!shopUser.shopUserBirth ? calculateAgeRange(shopUser.shopUserBirth).toString() : undefined,
      userGender: !!shopUser.shopUserGender ? parseUserGender(shopUser.shopUserGender) : undefined,
    };
  }
}

export const UserQueryHandlers = [FloristShopUserInfoQueryHandler, FloristShopUserListQueryHandler, UserInfoQueryHandler];
