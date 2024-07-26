import { AggregateRoot } from "@nestjs/cqrs";
import { ShopUserKey } from "./key/ShopUserKey";

export interface ShopUserInfo {
  shopUserName: string;
  shopUserPhone: string;
  shopUserBirth: string | null;
  shopUserGender: string | null;
  orderCnt: number;
}
export class ShopUser extends AggregateRoot {
  private readonly _shopUserKey!: ShopUserKey;
  private _shopInfo!: ShopUserInfo;

  constructor(shopUserKey: ShopUserKey, shopInfo: ShopUserInfo) {
    super();
    this._shopUserKey = shopUserKey;
    this._shopInfo = shopInfo;
  }

  static create(shopUserKey: ShopUserKey, shopInfo: ShopUserInfo): ShopUser {
    return new ShopUser(shopUserKey, shopInfo);
  }

  public createInfo(shopInfo: ShopUserInfo): ShopUser {
    this._shopInfo = shopInfo;
    return this;
  }

  public updateInfo(shopInfo: ShopUserInfo): ShopUser {
    this._shopInfo = shopInfo;
    return this;
  }

  public get shopUserKey(): ShopUserKey {
    return this._shopUserKey;
  }

  public get shopInfo(): ShopUserInfo {
    return this._shopInfo;
  }

  public login(): ShopUser {
    console.log(`login :: ${new Date().toUTCString()}`);
    return this;
  }
}
