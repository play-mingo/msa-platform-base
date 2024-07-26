import { IFloristShopUserInfoPayload, IFloristShopUserListPayload, IUserInfoPayload } from "./user.payload";

/**
 * Represents a query to retrieve information about a florist shop user.
 * @property {ShopUerKey} data.shopUserKey - shopUserKey
 */
export class FloristShopUserInfoQuery {
  constructor(public readonly data: IFloristShopUserInfoPayload) {}
}
/**
 * Represents a query to retrieve a list of florist shop users.
 * @property {number} data.shopId - shopId
 */
export class FloristShopUserListQuery {
  constructor(public readonly data: IFloristShopUserListPayload) {}
}
/**
 * Represents a query to retrieve information about a user.
 * @property {number} data.shopUserId - shopUserId
 */
export class UserInfoQuery {
  constructor(public readonly data: IUserInfoPayload) {}
}

export const UserQueries = [FloristShopUserInfoQuery, FloristShopUserListQuery, UserInfoQuery];
