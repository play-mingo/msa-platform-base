import { Column, Entity, ManyToOne } from "typeorm";
import { TblOrder } from "./TblOrder";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblOrderInfo", { schema: "project_base_DB" })
export class TblOrderInfo extends _BaseEntity {
  @Column("char", {
    name: "orderType",
    nullable: true,
    comment: "수령방법",
    length: 1,
  })
  orderType!: string | null;

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

  @ManyToOne((type) => TblOrder)
  order!: TblOrder;

  toEntity(props: OrderInfoProps): TblOrderInfo {
    return Object.assign(this, props);
  }
}

export interface OrderInfoProps {
  key: string;
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
  order: TblOrder;
}
