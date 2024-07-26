import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblOrderInfo } from "../entities/TblOrderInfo";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";
import { IOrderInfoResult } from "./OrderInfoRepository.interface";

@Injectable()
export class OrderInfoRepository extends TypeormBaseRepository<TblOrderInfo, Key<TblOrderInfo>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblOrderInfo, dataDource.manager);
  }

  async findOrderInfoDetailByKey(orderInfoKey: string): Promise<IOrderInfoResult> {
    const orderInfo = await this.findOneByKey({ key: orderInfoKey });
    if (!orderInfo) throw new Error("OrderInfo not found");
    return {
      orderType: orderInfo.orderType as string,
      orderProductName: orderInfo.orderProductName as string,
      orderProductImg: orderInfo.orderProductImg as string,
      orderProductStartPrice: orderInfo.orderProductStartPrice as number,
      orderProductEndPrice: orderInfo.orderProductEndPrice as number,
      orderPrice: orderInfo.orderPrice as number,
      userMemo: orderInfo.userMemo as string,
      shopMemo: orderInfo.shopMemo as string,
      orderChannel: orderInfo.orderChannel as string,
      orderTargetDate: orderInfo.orderTargetDate as Date,
    };
  }
}
