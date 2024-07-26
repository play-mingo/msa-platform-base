import { BaseCqrsDomainFactory } from "domain/_base";
import { ShopKey } from "./key";
import { StoreType } from "./vo/ShopInfoType";

export interface IShopInfoProps {
  storeType: StoreType | null;
  id: number;
  shopName: string;
  shopLink: string;
  shopPhone: string;
  shopAddr: string;
  shopAddrDetail: string;
  shopAddrPostCode: string;
  shopLat: number;
  shopLng: number;
  shopRegNo: string | null;
  shopImgPath: string | null;
  shopAccountOwner: string | null;
  shopAccountBankName: string | null;
  shopAccountBankNumber: string | null;
  shopStartTime: string | null;
  shopEndTime: string | null;
  holidayWeek: string | null;
  shopInfoDesc: string | null;
  reviewStarAvg: string | null;
  reviewCnt: number | null;
  reviewCnt1: number | null;
  reviewCnt2: number | null;
  reviewCnt3: number | null;
  reviewCnt4: number | null;
  reviewCnt5: number | null;
  reviewCnt6: number | null;
  reviewCnt7: number | null;
  reviewCnt8: number | null;
}

export type IShopInfo = {
  id: number;
  shopKey: ShopKey;
} & IShopInfoProps;

export type BasicInfo = Pick<
  IShopInfoProps,
  | "shopName"
  | "shopPhone"
  | "shopAddr"
  | "shopAddrDetail"
  | "shopAddrPostCode"
  | "shopLat"
  | "shopLng"
  | "holidayWeek"
  | "shopInfoDesc"
  | "shopStartTime"
  | "shopEndTime"
>;

export class ShopInfo extends BaseCqrsDomainFactory implements IShopInfo {
  public shopKey: ShopKey;
  id: number;
  storeType: StoreType | null;
  shopName: string;
  shopLink: string;
  shopPhone: string;
  shopAddr: string;
  shopAddrDetail: string;
  shopAddrPostCode: string;
  shopLat: number;
  shopLng: number;
  shopRegNo: string | null;
  shopImgPath: string | null;
  shopAccountOwner: string | null;
  shopAccountBankName: string | null;
  shopAccountBankNumber: string | null;
  shopStartTime: string | null;
  shopEndTime: string | null;
  holidayWeek: string | null;
  shopInfoDesc: string | null;
  reviewStarAvg: string | null;
  reviewCnt: number | null;
  reviewCnt1: number | null;
  reviewCnt2: number | null;
  reviewCnt3: number | null;
  reviewCnt4: number | null;
  reviewCnt5: number | null;
  reviewCnt6: number | null;
  reviewCnt7: number | null;
  reviewCnt8: number | null;

  constructor(shopKey: ShopKey, props: IShopInfoProps) {
    super();
    this.shopKey = shopKey;
    this.id = props.id;
    this.storeType = props.storeType;
    this.shopName = props.shopName;
    this.shopLink = props.shopLink;
    this.shopPhone = props.shopPhone;
    this.shopAddr = props.shopAddr;
    this.shopAddrDetail = props.shopAddrDetail;
    this.shopAddrPostCode = props.shopAddrPostCode;
    this.shopLat = props.shopLat;
    this.shopLng = props.shopLng;
    this.shopRegNo = props.shopRegNo;
    this.shopImgPath = props.shopImgPath;
    this.shopAccountOwner = props.shopAccountOwner;
    this.shopAccountBankName = props.shopAccountBankName;
    this.shopAccountBankNumber = props.shopAccountBankNumber;
    this.shopStartTime = props.shopStartTime;
    this.shopEndTime = props.shopEndTime;
    this.holidayWeek = props.holidayWeek;
    this.shopInfoDesc = props.shopInfoDesc;
    this.reviewStarAvg = props.reviewStarAvg;
    this.reviewCnt = props.reviewCnt;
    this.reviewCnt1 = props.reviewCnt1;
    this.reviewCnt2 = props.reviewCnt2;
    this.reviewCnt3 = props.reviewCnt3;
    this.reviewCnt4 = props.reviewCnt4;
    this.reviewCnt5 = props.reviewCnt5;
    this.reviewCnt6 = props.reviewCnt6;
    this.reviewCnt7 = props.reviewCnt7;
    this.reviewCnt8 = props.reviewCnt8;
  }

  static create(shopKey: ShopKey) {
    return new ShopInfo(shopKey, {
      storeType: null,
      id: 0,
      shopName: "",
      shopLink: "",
      shopPhone: "",
      shopAddr: "",
      shopAddrDetail: "",
      shopAddrPostCode: "",
      shopLat: 0,
      shopLng: 0,
      shopRegNo: null,
      shopImgPath: null,
      shopAccountOwner: null,
      shopAccountBankName: null,
      shopAccountBankNumber: null,
      shopStartTime: null,
      shopEndTime: null,
      holidayWeek: null,
      shopInfoDesc: null,
      reviewStarAvg: null,
      reviewCnt: null,
      reviewCnt1: null,
      reviewCnt2: null,
      reviewCnt3: null,
      reviewCnt4: null,
      reviewCnt5: null,
      reviewCnt6: null,
      reviewCnt7: null,
      reviewCnt8: null,
    });
  }

  shopLinkUpdate(shopLink: string) {
    this.shopLink = shopLink;
    return this;
  }

  basicInfoUpdate(basicInfo: BasicInfo) {
    this.shopName = basicInfo.shopName;
    this.shopPhone = basicInfo.shopPhone;
    this.shopAddr = basicInfo.shopAddr;
    this.shopAddrDetail = basicInfo.shopAddrDetail;
    this.shopAddrPostCode = basicInfo.shopAddrPostCode;
    this.shopLat = basicInfo.shopLat;
    this.shopLng = basicInfo.shopLng;
    this.holidayWeek = basicInfo.holidayWeek;
    this.shopInfoDesc = basicInfo.shopInfoDesc;
    this.shopStartTime = basicInfo.shopStartTime;
    this.shopEndTime = basicInfo.shopEndTime;
    return this;
  }

  storeTypeUpdate(storeType: StoreType) {
    this.storeType = storeType;
    return this;
  }
}
