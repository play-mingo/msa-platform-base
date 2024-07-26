import { OrderChannel } from "domain/order/vo/OrderChannel";
import { OrderType } from "domain/order/vo/OrderStatus";
import { ReviewCategory } from "domain/order/vo/ReviewCategory";

export const orderStatusType = {
  ORDER_READY: "0",
  PRODUCT_READY: "1",
  PICKUP_READY: "2",
  COMPLETE: "3",
} as const;
export type OrderStatusType = (typeof orderStatusType)[keyof typeof orderStatusType];
export type OrderStatusTypeKey = keyof typeof orderStatusType;
export const OrderStatusTypeKeys = ["ORDER_READY", "PRODUCT_READY", "PICKUP_READY", "COMPLETE"] as const;
export const OrderStatusTypeValues = Object.values(orderStatusType).map((value) => value);

export const orderBy = {
  ORDER_DATE: "0",
  REQUEST_DATE: "1",
} as const;
export type OrderBy = (typeof orderBy)[keyof typeof orderBy];
export type OrderByKey = keyof typeof orderBy;
export const OrderByKeys = ["ORDER_DATE", "REQUEST_DATE"] as const;
export const OrderByValues = Object.values(orderBy);

export type IFloristOrderListPayload = {
  shopId: number;
  orderStatusType: OrderStatusType;
  orderBy: OrderBy;
  pageNum: number;
};

export type IFloristOrderListByMonthPayload = {
  shopId: number;
  orderYear: string;
  orderMonth: string;
};

export type ICheckShopUserOrderStatusPayload = {
  shopUserKey: string;
  shopId: number;
};

export type IFloristOrderRegInPayload = {
  shopId: number;
  shopUserKey: string;
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
};

export type IFloristOrderDetailPayload = {
  orderKey: string;
};

export type IFloristOrderModifyPayload = {
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
};

export type IFloristOrderAcceptPayload = {
  orderKey: string;
};

export type IFloristOrderRejectPayload = {
  orderKey: string;
};

export type IFloristOrderConfirmPayload = {
  orderKey: string;
};

export type IFloristOrderPickupRequestPayload = {
  orderKey: string;
};

export type IFloristOrderCompletePayload = {
  orderKey: string;
};

export type IFloristOrderCencelPayload = {
  orderKey: string;
};

export type IFloristOrderInfoPayload = {
  orderInfoKey: string;
};

export type IUserOrderCurrentPayload = {
  shopKey: string;
  shopUserId: number;
};

export type IUserOrderDetailPayload = {
  orderKey: string;
};

export type IUserOrderRegInWithConsultingPayload = {
  shopKey: string;
  shopUserId: number;
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
};

export type IUserOrderRegInWithQuickOrderPayload = {
  shopKey: string;
  shopUserId: number;
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
};

export type IUserOrderRegInPayload = {
  shopKey: string;
  shopUserId: number;
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
};

export type IUserOrderCencelPayload = {
  orderKey: string;
};

export type IUserOrderRequestPaymentPayload = {
  orderKey: string;
};

export type IUserOrderInfoPayload = {
  orderInfoKey: string;
};

export type IUserOrderListPayload = {
  shopUserId: number;
  pageNum: number;
};

export type IUserOrderReviewListPayload = {
  shopUserId: number;
  pageNum: number;
};

export type IUserOrderReviewDetailPayload = {
  reviewKey: string;
};

export type IUserOrderReviewRegInPayload = {
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
};

export type IUserOrderReviewRegInMsaPayload = Pick<IUserOrderReviewRegInPayload, "orderKey" | "contents" | "reviewImgs" | "reviewStar"> & {
  reviewCategories: ReviewCategory[];
};

export type IUserRegisteredOrderWithConsultingPayload = {
  orderKey: string;
};

export type IUserRegisteredOrderWithQuickOrderPayload = {
  orderKey: string;
};
