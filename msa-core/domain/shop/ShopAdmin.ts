import { BaseCqrsDomainFactory } from "domain/_base/BaseCqrsDomainFactory";
import { ShopAdminLoginInfo } from "./ShopAdminLoginInfo";
import { ShopAdminJoinEvent } from "./event/ShopAdminJoinEvent";
import { ShopAdminKey } from "./key/ShopAdminKey";
import { AgentInfo } from "./vo/AgentInfo";
import { Shop } from "./Shop";

export interface ShopAdminInfo {
  shopAdminNormalAuthId: string | null;
  shopAdminKakaoAuthId: string | null;
  shopAdminAppleAuthId: string | null;
  shopAdminPw: string | null;
  shopAdminName: string;
  shopAdminPhone: string;
  marketingYn: "Y" | "N";
  delYn: "Y" | "N";
}

export const shopAdminInfoInitialValue: ShopAdminInfo = {
  shopAdminNormalAuthId: null,
  shopAdminKakaoAuthId: null,
  shopAdminAppleAuthId: null,
  shopAdminPw: null,
  shopAdminName: "",
  shopAdminPhone: "",
  marketingYn: "N",
  delYn: "N",
};

export interface NormalJoinParam {
  shopAdminNormalAuthId: string;
  shopAdminPw: string;
  shopAdminName: string;
  shopAdminPhone: string;
  marketingYn: "Y" | "N";
}

export interface KakaoJoinParam {
  shopAdminKakaoAuthId: string;
  shopAdminName: string;
  shopAdminPhone: string;
  marketingYn: "Y" | "N";
}

export interface AppleJoinParam {
  shopAdminAppleAuthId: string;
  shopAdminName: string;
  shopAdminPhone: string;
  marketingYn: "Y" | "N";
}

export interface IShopAdmin {
  join(param: NormalJoinParam): ShopAdmin;
  login(agentInfo: AgentInfo): ShopAdmin;
  logout(agentInfo: AgentInfo): ShopAdmin;
  withdraw(agentInfo: AgentInfo): ShopAdmin;
  commit(): void;
}

export interface ShopAdminProps {
  shopAdminKey: ShopAdminKey;
  shopAdminInfo: ShopAdminInfo;
  shopAdminLoginInfoes: ShopAdminLoginInfo[];
  agentInfo?: AgentInfo;
  shop?: Shop;
}

export class ShopAdmin extends BaseCqrsDomainFactory implements IShopAdmin {
  private _shopAdminKey: ShopAdminKey;
  private _shopAdminInfo: ShopAdminInfo;
  private _shopAdminLoginInfoes: ShopAdminLoginInfo[];
  private _currentShopAdminLoginInfo: ShopAdminLoginInfo | undefined;
  private token: string | undefined;
  private _shop?: Shop;

  constructor(props: ShopAdminProps) {
    super();
    this._shopAdminKey = props.shopAdminKey;
    this._shopAdminInfo = props.shopAdminInfo;
    this._shopAdminLoginInfoes = props.shopAdminLoginInfoes;
    props.agentInfo && this.setCurrentShopAdminLoginInfo(props.agentInfo);
    props.shop && (this._shop = props.shop);
  }

  get shopAdminKey(): ShopAdminKey {
    return this._shopAdminKey;
  }

  get shopAdminInfo(): ShopAdminInfo {
    return this._shopAdminInfo;
  }

  get shopAdminLoginInfoes(): ShopAdminLoginInfo[] {
    return this._shopAdminLoginInfoes;
  }

  private get accessToken(): string {
    return this.token as string;
  }

  public signAccessToken(token: string): string {
    this.token = token;
    return this.token;
  }

  // 플로리스트 관리자 생성
  public static create(): ShopAdmin {
    return new ShopAdmin({
      shopAdminKey: ShopAdminKey.create(),
      shopAdminInfo: shopAdminInfoInitialValue,
      shopAdminLoginInfoes: [],
    });
  }

  public createShop(): ShopAdmin {
    this._shop = Shop.create();
    return this;
  }

  public get shop(): Shop {
    if (!this._shop) throw new Error("꽃집 정보가 없습니다. 꽃집 정보를 먼저 생성해주세요.");
    return this._shop as Shop;
  }

  public loadShop(shop: Shop): ShopAdmin {
    this._shop = shop;
    return this;
  }

  public mergeContext(): ShopAdmin {
    return this.merge(this);
  }

  setCurrentShopAdminLoginInfo(agentInfo: AgentInfo): void {
    this._shopAdminLoginInfoes.map((loginInfo) => {
      if (loginInfo.compareAgentInfo(agentInfo.device, agentInfo.osType)) {
        this._currentShopAdminLoginInfo = loginInfo;
      }
    });
  }

  // 회원가입
  public join(param: NormalJoinParam | KakaoJoinParam | AppleJoinParam): ShopAdmin {
    this._shopAdminInfo = {
      ...(this._shopAdminInfo as ShopAdminInfo),
      ...param,
    };
    this.createShop();
    this.apply(new ShopAdminJoinEvent(this._shopAdminKey, this._shopAdminInfo));
    return this;
  }

  // 일반 로그인
  public login(agentInfo: AgentInfo): ShopAdmin {
    const logined: ShopAdminLoginInfo | undefined = this._shopAdminLoginInfoes.find((loginInfo) =>
      loginInfo.compareAgentInfo(agentInfo.device, agentInfo.osType),
    );
    console.log(logined);
    if (logined) {
      console.log("--- logined ---");
      logined.updateLoginAndExpDate();
      this._currentShopAdminLoginInfo = logined;
    } else {
      console.log("--- not logined ---");
      const loginInfo = ShopAdminLoginInfo.create({
        device: agentInfo.device,
        osType: agentInfo.osType,
        fcmToken: agentInfo.fcmToken,
        expDate: agentInfo.expDate,
        delYn: "N",
      });
      loginInfo.updateLoginAndExpDate();
      this._shopAdminLoginInfoes.push(loginInfo);
      this._currentShopAdminLoginInfo = loginInfo;
    }
    // this.apply(new ShopAdminLoginEvent(this._shopAdminKey, agentInfo));
    return this;
  }

  // 로그아웃
  public logout() {
    this._currentShopAdminLoginInfo?.delete();
    // this.apply(
    //   new ShopAdminLogoutEvent(this._shopAdminKey, this._shopAdminInfo),
    // );
    return this;
  }

  // 회워탈퇴
  public withdraw() {
    this._currentShopAdminLoginInfo?.delete();
    // this.apply(
    //   new ShopAdminWithdrawEvent(this._shopAdminKey, this._shopAdminInfo),
    // );
    return this;
  }
}
