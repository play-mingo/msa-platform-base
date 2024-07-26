import { AggregateRoot } from "@nestjs/cqrs";
import { ShopAdminLoginInfoKey } from "./key/ShopAdminLoginInfoKey";

export type ShopAdminLoginInfoArgs = CreateShopAdminLoginInfoArgs & {
  shopAdminLoginInfoKey: ShopAdminLoginInfoKey;
  loginDate: Date;
  id: number;
};

export type CreateShopAdminLoginInfoArgs = {
  device: string;
  osType: string;
  fcmToken: string;
  expDate: Date;
  delYn: string;
};

export interface IShopAdminLoginInfo {
  compareAgentInfo(device: string, osType: string): boolean;
  updateLoginAndExpDate(): ShopAdminLoginInfo;
  delete(): ShopAdminLoginInfo;
}

export class ShopAdminLoginInfo extends AggregateRoot implements IShopAdminLoginInfo {
  private _shopAdminLoginInfoKey: ShopAdminLoginInfoKey;
  private _device: string;
  private _osType: string;
  private _fcmToken: string;
  private _loginDate: Date;
  private _expDate: Date;
  private _delYn: string;
  private id: number;

  constructor(args: ShopAdminLoginInfoArgs) {
    super();
    this._shopAdminLoginInfoKey = args.shopAdminLoginInfoKey;
    this._device = args.device;
    this._osType = args.osType;
    this._fcmToken = args.fcmToken;
    this._expDate = args.expDate;
    this._delYn = args.delYn;
    this._loginDate = args.loginDate;
    this.id = args.id;
  }

  get shopAdminLoginInfoKey(): ShopAdminLoginInfoKey {
    return this._shopAdminLoginInfoKey;
  }

  get info(): ShopAdminLoginInfoArgs {
    return {
      shopAdminLoginInfoKey: this._shopAdminLoginInfoKey,
      loginDate: this._loginDate,
      device: this._device,
      osType: this._osType,
      fcmToken: this._fcmToken,
      expDate: this._expDate,
      delYn: this._delYn,
      id: this.id,
    };
  }

  // 로그인 정보 추가 (회원가입, 로그인)
  public static create(param: CreateShopAdminLoginInfoArgs) {
    return new ShopAdminLoginInfo({
      shopAdminLoginInfoKey: ShopAdminLoginInfoKey.create(),
      device: param.device,
      osType: param.osType,
      fcmToken: param.fcmToken,
      expDate: param.expDate,
      delYn: "N",
      loginDate: new Date(),
      id: 0,
    });
  }

  // 현재 로그인 정보와 비교
  public compareAgentInfo(device: string, osType: string): boolean {
    return this._device === device && this._osType === osType;
  }

  // 로그인 시각과 만료 시각 업데이트
  public updateLoginAndExpDate(): ShopAdminLoginInfo {
    const today: Date = new Date();
    const expDate: Date = new Date(today.setDate(today.getDate() + 14));
    this._loginDate = today;
    this._expDate = expDate;
    return this;
  }

  // 로그인 정보 삭제 (로그아웃, 회원탈퇴)
  public delete() {
    this._delYn = "Y";
    return this;
  }
}
