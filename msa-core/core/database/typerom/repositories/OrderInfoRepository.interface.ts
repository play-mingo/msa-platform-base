export interface IOrderInfoResult {
  orderType: string;
  orderProductName: string;
  orderProductImg: string;
  orderProductStartPrice: number;
  orderProductEndPrice: number;
  orderPrice: number;
  userMemo: string;
  shopMemo: string;
  orderChannel: string;
  orderTargetDate: Date;
}
