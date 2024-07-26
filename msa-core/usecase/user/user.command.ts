import { IFloristShopUserRegInPayload, IFloristShopUserUpdatePayload, IUserUpdatePayload } from "./user.payload";
/**
 * Represents a command to register a florist shop user.
 * @property {number} data.shopId - shopId
 * @property {string} data.userName - 이름
 * @property {string} data.userPhone - 전화번호
 * @property {string} [data.userBirth] - 생년월일 8자리. ex) 19900701
 * @property {UserGender} [data.userGender] - 성별 ex) 0: 남성, 1: 여성
 */
export class FloristShopUserRegInCommand {
  constructor(public readonly data: IFloristShopUserRegInPayload) {}
}

/**
 * Represents a command to update a florist shop user.
 * @property {ShopUserKey} data.shopUserKey - shopUserKey
 * @property {string} data.userName - 이름
 * @property {string} data.userPhone - 전화번호
 * @property {string} [data.userBirth] - 생년월일 8자리. ex) 19900701
 * @property {UserGender} [data.userGender] - 성별 ex) 0: 남성, 1: 여성
 */
export class FloristShopUserUpdateCommand {
  constructor(public readonly data: IFloristShopUserUpdatePayload) {}
}

/**
 * Represents a command to update a user.
 * @property {number} data.shopUserId - shopUserId
 * @property {string} data.userName - 이름
 * @property {string} data.userPhone - 전화번호
 * @property {string} [data.userBirth] - 생년월일 8자리. ex) 19900701
 * @property {UserGender} [data.userGender] - 성별 ex) 0: 남성, 1: 여성
 */
export class UserUpdateCommand {
  constructor(public readonly data: IUserUpdatePayload) {}
}

export const UserCommands = [FloristShopUserRegInCommand, FloristShopUserUpdateCommand, UserUpdateCommand];
