import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { _BaseEntity } from "./_BaseEntity";
import { TblOrder } from "./TblOrder";
import { TblShop } from "./TblShop";
import { TblShopUser } from "./TblShopUser";

@Entity("TblReview", { schema: "project_base_DB" })
export class TblReview extends _BaseEntity {
  @Column("varchar", {
    name: "reviewImgs",
    nullable: true,
    comment: "리뷰이미지(구분자 쉼표)",
    length: 1000,
  })
  reviewImgs!: string | null;

  @Column("mediumtext", {
    name: "contents",
    nullable: true,
    comment: "리뷰내용",
  })
  contents!: string | null;

  @Column("decimal", {
    name: "reviewStar",
    nullable: true,
    comment: "평점",
    precision: 3,
    scale: 1,
    default: () => "'0.0'",
  })
  reviewStar!: number | null;

  @Column("int", {
    name: "reviewCnt1",
    nullable: true,
    comment: "꽃 조합이 예뻐요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt1!: number | null;

  @Column("int", {
    name: "reviewCnt2",
    nullable: true,
    comment: "새벽 배송이 편리해요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt2!: number | null;

  @Column("int", {
    name: "reviewCnt3",
    nullable: true,
    comment: "공간이 화사해졌어요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt3!: number | null;

  @Column("int", {
    name: "reviewCnt4",
    nullable: true,
    comment: "꽃이 싱싱해요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt4!: number | null;

  @Column("int", {
    name: "reviewCnt5",
    nullable: true,
    comment: "감각적이에요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt5!: number | null;

  @Column("int", {
    name: "reviewCnt6",
    nullable: true,
    comment: "하루의 시작에 힘이 돼요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt6!: number | null;

  @Column("int", {
    name: "reviewCnt7",
    nullable: true,
    comment: "다음 꽃이 기대돼요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt7!: number | null;

  @Column("int", {
    name: "reviewCnt8",
    nullable: true,
    comment: "가격이 합리적이에요 리뷰 수",
    default: () => "'0'",
  })
  reviewCnt8!: number | null;

  @OneToOne(() => TblOrder)
  @JoinColumn()
  order!: TblOrder;

  @ManyToOne(() => TblShopUser)
  shopUser!: TblShopUser;

  @ManyToOne(() => TblShop)
  shop!: TblShop;
}
