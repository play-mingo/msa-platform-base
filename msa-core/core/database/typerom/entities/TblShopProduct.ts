import { Column, Entity, ManyToOne } from "typeorm";
import { TblShop } from "./TblShop";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblShopProduct", { schema: "project_base_DB" })
export class TblShopProduct extends _BaseEntity {
  @Column("int", {
    name: "no",
    nullable: false,
    comment: "순서",
    default: () => "0",
  })
  no!: number | null;

  @Column("smallint", {
    name: "productType",
    nullable: true,
    comment: "소개 형식",
  })
  productType!: number | null;

  @Column("smallint", {
    name: "productCategory",
    nullable: true,
    comment: "꽃 상품 유형",
  })
  productCategory!: number | null;

  @Column("varchar", {
    name: "productName",
    nullable: true,
    comment: "상품명",
    length: 200,
  })
  productName!: string | null;

  @Column("varchar", {
    name: "productImgPath",
    nullable: true,
    comment: "이미지",
    length: 1000,
  })
  productImgPath!: string | null;

  @Column("mediumtext", { name: "contents", nullable: true, comment: "소개" })
  contents!: string | null;

  @Column("int", {
    name: "productPrice",
    nullable: true,
    comment: "판매가격",
    default: () => "'0'",
  })
  productPrice!: number | null;

  @Column("mediumtext", {
    name: "productItems",
    nullable: true,
    comment: "하위 상품 (JSON 형식)",
  })
  productItems!: string | null;

  @Column("smallint", {
    name: "autoUpdateType",
    nullable: true,
    comment: "자동 업데이트 유형 (0: 안함, 1: 12~2월, 2: 3~5월, 3: 6~8월, 4: 9~11월)",
  })
  autoUpdateType!: number | null;

  @Column("smallint", {
    name: "productPriceType",
    nullable: true,
    comment: "가격 유형 (0: 고정가격, 1:변동가격)",
  })
  productPriceType!: number | null;

  @Column("int", {
    name: "productPriceStart",
    nullable: true,
    comment: "판매가격 최소금액",
    default: () => "'0'",
  })
  productPriceStart!: number | null;

  @Column("int", {
    name: "productPriceEnd",
    nullable: true,
    comment: "판매가격 최대금액",
    default: () => "'0'",
  })
  productPriceEnd!: number | null;

  @Column("char", {
    name: "quickPurchaseYn",
    nullable: true,
    comment: "바로구매 여부(Y/N)",
    length: 1,
    default: () => "'N'",
  })
  quickPurchaseYn!: string | null;

  @Column("char", {
    name: "consultingYn",
    nullable: true,
    comment: "상담구매 여부(Y/N)",
    length: 1,
    default: () => "'N'",
  })
  consultingYn!: string | null;

  @Column("char", {
    name: "deliveryYn",
    nullable: true,
    comment: "배송설정 여부(Y/N)",
    length: 1,
    default: () => "'N'",
  })
  deliveryYn!: string | null;

  @ManyToOne(() => TblShop)
  shop!: TblShop;
}
