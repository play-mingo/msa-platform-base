import { Injectable } from "@nestjs/common";
import { default as dayjs } from "dayjs";
import { DelYn } from "domain/_base";
import { OrderChannel } from "domain/order/vo/OrderChannel";
import { OrderStatus } from "domain/order/vo/OrderStatus";
import { Between, DataSource, FindOptionsOrder, In, MoreThan } from "typeorm";
import { OrderType, TblOrder } from "../entities/TblOrder";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";
import {
  IFloristOrderDetailResult,
  IFloristOrderListByMonthEachResult,
  IFloristOrderListByMonthPayload,
  IFloristOrderListByMonthResult,
  IFloristOrderListPayload,
  IFloristOrderListResult,
  IUserOrderCurrentResult,
  IUserOrderListPayload,
  IUserOrderListResult,
} from "./OrderRepository.interface";
import { calculateAgeRange } from "./ShopUserRepository";

@Injectable()
export class OrderRepository extends TypeormBaseRepository<TblOrder, Key<TblOrder>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblOrder, dataDource.manager);
  }

  async getShopOrderTodaySummery(shopId: number) {
    const orders =
      (await this.findByWhere({
        shop: { id: shopId },
        orderTargetDate: MoreThan(new Date()),
        delYn: DelYn.ACTIVE,
      })) ?? [];
    return {
      productCreatingCnt: orders.filter((order) => order.orderStatus === OrderStatus.PRUDUCT_CREATING).length,
      pickupReadyCnt: orders.filter(
        (order) => order.orderStatus === OrderStatus.OFFLINE_PICKUP_READY || order.orderStatus === OrderStatus.DELIVERY_PICKUP_READY,
      ).length,
      completedCnt: orders.filter((order) => order.orderStatus === OrderStatus.COMPLETED).length,
      consultingCnt: orders.filter((order) => order.orderStatus === OrderStatus.CONSULTING).length,
      quickOrderCnt: orders.filter((order) => order.orderStatus === OrderStatus.QUICK_ORDER).length,
    };
  }

  async getShopOrderThisMonthSummery(shopId: number) {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();
    const orders =
      (await this.findByWhere({
        shop: { id: shopId },
        orderTargetDate: Between(startOfMonth, endOfMonth),
        delYn: DelYn.ACTIVE,
      })) ?? [];
    return {
      kakaoChannelCnt: orders.filter((order) => order.orderChannel === OrderChannel.KAKAO).length,
      instagramChannelCnt: orders.filter((order) => order.orderChannel === OrderChannel.INSTAGRAM).length,
      naverChannelCnt: orders.filter((order) => order.orderChannel === OrderChannel.NAVER).length,
      otherChannelCnt: orders.filter((order) => order.orderChannel === OrderChannel.OTHER).length,
      paymentReadyCnt: orders.filter((order) => order.orderStatus === OrderStatus.PAYMENT_READY).length,
      paymentConfirmCnt: orders.filter((order) => order.orderStatus === OrderStatus.PRUDUCT_CREATING).length,
    };
  }

  async findActiveByKey(key: string): Promise<TblOrder | null> {
    return await this.findOneBy({ where: { key, delYn: DelYn.ACTIVE } });
  }

  async findOrderDetailByKey(key: string): Promise<IFloristOrderDetailResult> {
    const order = await this.findOneBy({
      relations: ["shopUser"],
      where: { key, delYn: DelYn.ACTIVE },
    });
    if (!order) throw new Error("Order not found");
    return {
      shopUserKey: order.shopUser.key,
      shopUserName: order.shopUser.shopUserName as string,
      shopUserPhone: order.shopUser.shopUserPhone as string,
      shopUserAge: order.shopUser.shopUserBirth ? (calculateAgeRange(order.shopUser.shopUserBirth as string).toString() as string) : "",
      shopUserGender: order.shopUser.shopUserGender as string,
      orderCnt: order.orderInfoes?.length ?? 0,
      orderKey: order.key,
      orderType: order.orderType as OrderType,
      orderProductName: order.orderProductName as string,
      orderProductImg: order.orderProductImg as string,
      orderProductStartPrice: order.orderProductStartPrice as number,
      orderProductEndPrice: order.orderProductEndPrice as number,
      orderPrice: order.orderPrice as number,
      userMemo: order.userMemo as string,
      shopMemo: order.shopMemo as string,
      orderChannel: order.orderChannel as OrderChannel,
      orderTargetDate: order.orderTargetDate as Date,
      requestDate: order.requestDate,
      acceptDate: order.acceptDate,
      confirmDate: order.confirmDate,
      pickupRequestDate: order.pickupRequestDate,
      completeDate: order.completeDate,
    };
  }

  async findUserOrderCurrent(shopKey: string, shopUserId: number): Promise<IUserOrderCurrentResult> {
    const order = await this.findOneBy({
      relations: ["shopUser"],
      where: { shop: { key: shopKey }, shopUser: { id: shopUserId }, delYn: DelYn.ACTIVE },
    });
    return {
      isExistCurrentOrder: !!order,
      detail: !!order
        ? {
            orderKey: order.key,
            orderStatus: order.orderStatus as OrderStatus,
            orderType: order.orderType as OrderType,
            orderProductName: order.orderProductName as string,
            orderTargetDate: order.orderTargetDate as Date,
            chatRoomKey: "testChatRoomKey" as string,
          }
        : undefined,
    };
  }

  async findByShopUserId(id: number): Promise<TblOrder[]> {
    return await this.findByWhere({ shopUser: { id }, delYn: DelYn.ACTIVE });
  }

  async findByKeyWithHistory(key: string): Promise<TblOrder | null> {
    return await this.findOneBy({
      where: { key },
      relations: {
        orderInfoes: true,
      },
    });
  }

  async findByKeyWithHistoryAndReview(key: string): Promise<TblOrder | null> {
    return await this.findOneBy({
      where: { key },
      relations: {
        orderInfoes: true,
        review: true,
        shopUser: true,
        shop: true,
      },
    });
  }

  async findFloristOrderList(args: IFloristOrderListPayload): Promise<IFloristOrderListResult> {
    const orderBy: { [key: string]: FindOptionsOrder<TblOrder> } = {
      "0": { orderTargetDate: "DESC" },
      "1": { requestDate: "DESC" },
    };

    const [list, totalCount] = await this.findAndCount({
      relations: ["shopUser"],
      where: {
        shop: { id: args.shopId },
        orderStatus: In(args.orderStatusType),
        delYn: DelYn.ACTIVE,
      },
      order: orderBy[args.orderBy],
      skip: (args.pageNum - 1) * 10,
      take: 10,
    });
    return {
      pageNum: args.pageNum,
      totalCount,
      list:
        list?.map((order) => ({
          orderKey: order.key,
          orderType: order.orderType as string,
          shopUserName: order.shopUser.shopUserName as string,
          orderCnt: (order.orderInfoes?.length ?? 0) as number,
          orderPrice: order.orderPrice as number,
          orderProductName: order.orderProductName as string,
          orderTargetDate: order.orderTargetDate as Date,
        })) ?? [],
    };
  }

  async findUserOrderList(args: IUserOrderListPayload): Promise<IUserOrderListResult> {
    const [list, totalCount] = await this.findAndCount({
      relations: ["shopUser"],
      where: {
        shopUser: { id: args.shopUserId },
        delYn: DelYn.ACTIVE,
      },
      order: {
        orderTargetDate: "DESC",
      },
      skip: (args.pageNum - 1) * 10,
      take: 10,
    });
    return {
      pageNum: args.pageNum,
      totalCount,
      list:
        list?.map((order) => ({
          orderKey: order.key,
          orderType: order.orderType as OrderType,
          shopUserName: order.shopUser.shopUserName as string,
          orderCnt: (order.orderInfoes?.length ?? 0) as number,
          orderPrice: order.orderPrice as number,
          orderProductName: order.orderProductName as string,
          orderTargetDate: order.orderTargetDate as Date,
        })) ?? [],
    };
  }

  async findFloristOrderListByMonth(args: IFloristOrderListByMonthPayload): Promise<IFloristOrderListByMonthResult> {
    const { orderYear, orderMonth, shopId } = args;
    const startOfMonth = dayjs(`${orderYear}-${orderMonth}-01`).startOf("month").toDate();
    const endOfMonth = dayjs(`${orderYear}-${orderMonth}-01`).endOf("month").toDate();
    const orders = await this.findBy({
      relations: ["shopUser", "orderInfoes"],
      where: {
        orderTargetDate: Between(startOfMonth, endOfMonth),
        shop: { id: shopId },
        delYn: DelYn.ACTIVE,
      },
    });
    const count = orders.length;
    const orderGroupsByDate = orders.reduce((acc, order) => {
      const date = dayjs(order.orderTargetDate).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        orderKey: order.key,
        orderType: order.orderType as OrderType,
        shopUserName: order.shopUser.shopUserName as string,
        orderCnt: (order.orderInfoes?.length ?? 0) as number,
        orderPrice: order.orderPrice as number,
        orderProductName: order.orderProductName as string,
        orderTargetDate: order.orderTargetDate as Date,
      });
      return acc;
    }, {} as { [key: string]: IFloristOrderListByMonthEachResult[] });
    const list = Object.entries(orderGroupsByDate).map(([date, groups]) => ({ date, groups }));
    return { count, list };
  }

  async isExistActiveOrder(shopId: number, shopUserId: number): Promise<boolean> {
    return await this.existBy({ shop: { id: shopId }, shopUser: { id: shopUserId }, delYn: DelYn.ACTIVE });
  }

  async findByKeyWithShopAndShopUser(key: string): Promise<TblOrder> {
    const entity = await this.findOneBy({
      relations: ["shop", "shopUser"],
      where: { key, delYn: DelYn.ACTIVE },
    });
    if (!entity) throw new Error("Order not found");
    return entity;
  }
}
