import { OrderChannel, OrderStatus, OrderType } from "../entities";

export type IFloristOrderListPayload = {
  shopId: number;
  orderStatusType: number[];
  orderBy: string;
  pageNum: number;
};

export interface IFloristOrderListEachResult {
  orderKey: string;
  orderType: string;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export interface IFloristOrderListResult {
  pageNum: number;
  totalCount: number;
  list: IFloristOrderListEachResult[];
}

export type IFloristOrderListByMonthPayload = {
  shopId: number;
  orderYear: string;
  orderMonth: string;
};

export interface IFloristOrderListByMonthEachResult {
  orderKey: string;
  orderType: OrderType;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export type IFloristOrderListByMonthEachGroupResult = {
  date: string;
  groups: IFloristOrderListByMonthEachResult[];
};

export interface IFloristOrderListByMonthResult {
  count: number;
  list: IFloristOrderListByMonthEachGroupResult[];
}

export interface IFloristOrderDetailResult {
  shopUserKey: string;
  shopUserName: string;
  shopUserPhone: string;
  shopUserAge: string;
  shopUserGender: string;
  orderCnt: number;
  orderKey: string;
  orderType: OrderType;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: OrderChannel;
  orderTargetDate: Date;
  requestDate: Date | null;
  acceptDate: Date | null;
  confirmDate: Date | null;
  pickupRequestDate: Date | null;
  completeDate: Date | null;
}

export interface IUserOrderCurrent {
  orderKey: string;
  orderStatus: OrderStatus;
  orderType: OrderType;
  orderProductName: string;
  orderTargetDate: Date;
  chatRoomKey: string;
}
export interface IUserOrderCurrentResult {
  isExistCurrentOrder: boolean;
  detail?: IUserOrderCurrent;
}

export type IUserOrderListPayload = {
  shopUserId: number;
  pageNum: number;
};

export interface IUserOrderListEachResult {
  orderKey: string;
  orderType: OrderType;
  shopUserName: string;
  orderCnt: number;
  orderPrice: number;
  orderProductName: string;
  orderTargetDate: Date;
}
export interface IUserOrderListResult {
  pageNum: number;
  totalCount: number;
  list: IUserOrderListEachResult[];
}

export type IUserOrderReviewListPayload = {
  shopUserId: number;
  pageNum: number;
};

export type IUserOrderReviewListEachResult = {
  reviewKey: string;
  orderKey: string;
  reviewImgs: string[];
  contents: string;
  reviewStar: number;
};

export type IUserOrderReviewListResult = {
  pageNum: number;
  totalCount: number;
  list: IUserOrderReviewListEachResult[];
};

export interface IUserOrderReviewDetailResult {
  reviewKey: string;
  reviewImgs: string[];
  contents: string;
  reviewStar: number;
  reviewCnt1: number;
  reviewCnt2: number;
  reviewCnt3: number;
  reviewCnt4: number;
  reviewCnt5: number;
  reviewCnt6: number;
  reviewCnt7: number;
  reviewCnt8: number;
  orderKey: string;
}
