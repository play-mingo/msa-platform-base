import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TblOrder } from "./TblOrder";
import { TblReview } from "./TblReview";
import { TblShop } from "./TblShop";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblShopUser", { schema: "project_base_DB" })
export class TblShopUser extends _BaseEntity {
  @Column("varchar", {
    name: "shopUserName",
    nullable: true,
    comment: "이름",
    length: 200,
  })
  shopUserName!: string | null;

  @Column("varchar", {
    name: "shopUserPhone",
    nullable: true,
    comment: "전화번호",
    length: 200,
  })
  shopUserPhone!: string | null;

  @Column("varchar", {
    name: "shopUserBirth",
    nullable: true,
    comment: "생년월일",
    length: 200,
  })
  shopUserBirth!: string | null;

  @Column("char", {
    name: "shopUserGender",
    nullable: true,
    comment: "성별",
    length: 1,
  })
  shopUserGender!: string | null;

  @Column("int", {
    name: "orderCnt",
    nullable: true,
    comment: "주문 횟수",
    default: () => "'0'",
  })
  orderCnt!: number | null;

  @ManyToOne(() => TblShop)
  shop!: TblShop;

  @OneToMany(() => TblOrder, (order) => order.shopUser)
  orders!: TblOrder[];

  @OneToMany(() => TblReview, (review) => review.shopUser)
  reviews!: TblReview[];
}
