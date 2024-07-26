import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { TblOrderInfo } from "./TblOrderInfo";
import { TblReview } from "./TblReview";
import { TblShop } from "./TblShop";
import { TblShopUser } from "./TblShopUser";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblOrder", { schema: "project_base_DB" })
export class TblOrder extends _BaseEntity {
  @Column("int", {
    name: "orderStatus",
    nullable: true,
    comment:
      "예약상태 (-1: 문의대기, 0: 상담문의, 1: 바로예약, 2: 예약거절, 3: 예약승인완료 및 결제대기, 4: 결제안됨, 5: 결제확인 요청, 6: 결제완료 및 제작중, 7: 방문수령 픽업대기중, 8: 배달 픽업대기중, 9: 배달중, 10: 수령완료, 11: 예약취소)",
  })
  orderStatus!: number | null;

  @Column("char", {
    name: "orderType",
    nullable: true,
    comment: "수령방법",
    length: 1,
  })
  orderType!: string | null;

  @Column("int", {
    name: "orderInfoId",
    nullable: true,
    comment: "현재 주문정보 id",
    default: () => "'0'",
  })
  orderInfoId!: number | null;

  @Column("varchar", {
    name: "orderProductName",
    nullable: true,
    comment: "상품명",
    length: 100,
  })
  orderProductName!: string | null;

  @Column("varchar", {
    name: "orderProductImg",
    nullable: true,
    comment: "상품 이미지",
    length: 200,
  })
  orderProductImg!: string | null;

  @Column("int", {
    name: "orderProductStartPrice",
    nullable: true,
    comment: "상품 최소 가격",
    default: () => "'0'",
  })
  orderProductStartPrice!: number | null;

  @Column("int", {
    name: "orderProductEndPrice",
    nullable: true,
    comment: "상품 최대 가격",
    default: () => "'0'",
  })
  orderProductEndPrice!: number | null;

  @Column("int", {
    name: "orderPrice",
    nullable: true,
    comment: "제작 요청 가격",
    default: () => "'0'",
  })
  orderPrice!: number | null;

  @Column("mediumtext", {
    name: "userMemo",
    nullable: true,
    comment: "고객 요청사항",
  })
  userMemo!: string | null;

  @Column("mediumtext", {
    name: "shopMemo",
    nullable: true,
    comment: "꽃집 메모",
  })
  shopMemo!: string | null;

  @Column("varchar", {
    name: "orderChannel",
    nullable: true,
    comment: "예약 진입 채널",
    length: 1,
  })
  orderChannel!: string | null;

  @Column("datetime", {
    name: "orderTargetDate",
    nullable: true,
    comment: "예약 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  orderTargetDate!: Date | null;

  @Column("datetime", {
    name: "requestDate",
    nullable: true,
    comment: "예약문의 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  requestDate!: Date | null;

  @Column("datetime", {
    name: "acceptDate",
    nullable: true,
    comment: "예약승인 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  acceptDate!: Date | null;

  @Column("datetime", {
    name: "rejectDate",
    nullable: true,
    comment: "예약거절 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  rejectDate!: Date | null;

  @Column("datetime", {
    name: "paymentLimitDate",
    nullable: true,
    comment: "입금가능 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  paymentLimitDate!: Date | null;

  @Column("datetime", {
    name: "paymentConfirmRequestedDate",
    nullable: true,
    comment: "입금확인요청 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  paymentConfirmRequestedDate!: Date | null;

  @Column("datetime", {
    name: "rejectPaymentDate",
    nullable: true,
    comment: "입금반려( ex. 입금안됨 ) 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  rollbackCheckPaymentDate!: Date | null;

  @Column("datetime", {
    name: "confirmDate",
    nullable: true,
    comment: "예약확정 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  confirmDate!: Date | null;

  @Column("datetime", {
    name: "pickupRequestDate",
    nullable: true,
    comment: "픽업요청 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  pickupRequestDate!: Date | null;

  @Column("datetime", {
    name: "startDeliveryDate",
    nullable: true,
    comment: "배달 시작 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  startDeliveryDate!: Date | null;

  @Column("datetime", {
    name: "completeDate",
    nullable: true,
    comment: "수령완료 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  completeDate!: Date | null;

  @Column("datetime", {
    name: "cancelDate",
    nullable: true,
    comment: "예약취소 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  cancelDate!: Date | null;

  @Column("datetime", {
    name: "modifyDate",
    nullable: true,
    comment: "마지막 예약수정 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  modifyDate!: Date | null;

  @Column("char", {
    name: "reviewYn",
    nullable: true,
    comment: "리뷰 작성 여부(N:작성안함, Y:작성완료)",
    length: 1,
    default: () => "'N'",
  })
  reviewYn!: string | null;

  @ManyToOne(() => TblShopUser)
  shopUser!: TblShopUser;

  @ManyToOne(() => TblShop)
  shop!: TblShop;

  @OneToMany(() => TblOrderInfo, (orderInfo) => orderInfo.order)
  orderInfoes?: TblOrderInfo[];

  @OneToOne(() => TblReview)
  @JoinColumn()
  review?: TblReview | null;
}

export const OrderType = {
  OFFLINE: "0",
  DELIVERY: "1",
} as const;
export type OrderType = (typeof OrderType)[keyof typeof OrderType];
export const OrderTypeValues = Object.values(OrderType).map((value) => value);

export const OrderStatus = {
  NONE: -1,
  CONSULTING: 0,
  QUICK_ORDER: 1,
  REJECTED: 2,
  PAYMENT_READY: 3,
  PAYMENT_NOT_FOUND: 4,
  PAYMENT_CONFIRM_REQUESTED: 5,
  PRUDUCT_CREATING: 6,
  OFFLINE_PICKUP_READY: 7,
  DELIVERY_PICKUP_READY: 8,
  DELIVERY: 9,
  COMPLETED: 10,
  CANCELED: 11,
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export const OrderStatusValues = Object.values(OrderStatus).map((value) => value);

export const OrderChannel = {
  KAKAO: "0",
  INSTAGRAM: "1",
  NAVER: "2",
  OTHER: "3",
} as const;
export type OrderChannel = (typeof OrderChannel)[keyof typeof OrderChannel];
export const OrderChannelValues = Object.values(OrderChannel).map((value) => value);
