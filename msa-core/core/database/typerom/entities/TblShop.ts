import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { TblOrder } from "./TblOrder";
import { TblReview } from "./TblReview";
import { TblShopProduct } from "./TblShopProduct";
import { TblShopUser } from "./TblShopUser";
import { _BaseEntity } from "./_BaseEntity";
import { TblShopAdmin } from "./TblShopAdmin";

@Entity("TblShop", { schema: "project_base_DB" })
export class TblShop extends _BaseEntity {
  @Column("varchar", {
    name: "shopLink",
    nullable: true,
    comment: "꽃집 대표 링크",
    length: 200,
  })
  shopLink!: string | null;

  @Column("varchar", {
    name: "shopName",
    nullable: true,
    comment: "꽃집명",
    length: 50,
  })
  shopName!: string | null;

  @Column("varchar", {
    name: "storeType",
    nullable: true,
    comment: "스토어 스타일 (0: 스토어형, 1: 브랜딩형)",
    length: 2,
    default: () => "'0'",
  })
  storeType!: string | null;

  @Column("varchar", {
    name: "shopPhone",
    nullable: true,
    comment: "꽃집 전화번호",
    length: 200,
  })
  shopPhone!: string | null;

  @Column("varchar", {
    name: "shopRegNo",
    nullable: true,
    comment: "꽃집 사업자번호",
    length: 50,
  })
  shopRegNo!: string | null;

  @Column("varchar", {
    name: "shopImgPath",
    nullable: true,
    comment: "대표이미지",
    length: 200,
  })
  shopImgPath!: string | null;

  @Column("varchar", {
    name: "shopAddr",
    nullable: true,
    comment: "꽃집 주소",
    length: 200,
  })
  shopAddr!: string | null;

  @Column("varchar", {
    name: "shopAddrDetail",
    nullable: true,
    comment: "꽃집 주소 상세",
    length: 200,
  })
  shopAddrDetail!: string | null;

  @Column("varchar", {
    name: "shopAddrPostCode",
    nullable: true,
    comment: "꽃집 우편 번호",
    length: 50,
  })
  shopAddrPostCode!: string | null;

  @Column("decimal", {
    name: "shopLat",
    nullable: true,
    comment: "위도",
    precision: 16,
    scale: 13,
  })
  shopLat!: number | null;

  @Column("decimal", {
    name: "shopLng",
    nullable: true,
    comment: "경도",
    precision: 16,
    scale: 13,
  })
  shopLng!: number | null;

  @Column("varchar", {
    name: "shopAccountOwner",
    nullable: true,
    comment: "예금주",
    length: 30,
  })
  shopAccountOwner!: string | null;

  @Column("varchar", {
    name: "shopAccountBankName",
    nullable: true,
    comment: "정산입금은행",
    length: 50,
  })
  shopAccountBankName!: string | null;

  @Column("varchar", {
    name: "shopAccountBankNumber",
    nullable: true,
    comment: "정산계좌번호",
    length: 50,
  })
  shopAccountBankNumber!: string | null;

  @Column("varchar", {
    name: "shopStartTime",
    nullable: true,
    comment: "영업 시작시간(09:00)",
    length: 10,
  })
  shopStartTime!: string | null;

  @Column("varchar", {
    name: "shopEndTime",
    nullable: true,
    comment: "영업 종료시간(19:30)",
    length: 10,
  })
  shopEndTime!: string | null;

  @Column("varchar", {
    name: "holidayWeek",
    nullable: true,
    comment: "휴무요일 (요일 - 일요일 : 0, ..., 토요일 : 6)",
  })
  holidayWeek!: string | null;

  @Column("mediumtext", {
    name: "shopInfoDesc",
    nullable: true,
    comment: "안내 사항",
  })
  shopInfoDesc!: string | null;

  @Column("int", {
    name: "todayViewCnt",
    nullable: true,
    comment: "링크 클릭 수",
    default: () => "'0'",
  })
  todayViewCnt!: number | null;

  @Column("decimal", {
    name: "reviewStarAvg",
    nullable: true,
    comment: "평점",
    precision: 3,
    scale: 1,
    default: () => "'0.0'",
  })
  reviewStarAvg!: string | null;

  @Column("int", {
    name: "reviewCnt",
    nullable: true,
    comment: "리뷰 수",
    default: () => "'0'",
  })
  reviewCnt!: number | null;

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

  @Column("varchar", {
    name: "membershipType",
    nullable: true,
    comment: "맴버십 유형(FREE: 일반, PRO: 프로)",
    length: 20,
    default: () => "'FREE'",
  })
  membershipType!: string | null;

  @Column("int", {
    name: "point",
    nullable: true,
    comment: "포인트",
    default: () => "'0'",
  })
  point!: number | null;

  @Column("char", {
    name: "all_alarm_yn",
    nullable: true,
    comment: "알림 수신 여부",
    length: 1,
    default: () => "'Y'",
  })
  allAlarmYn!: string | null;

  @OneToOne(() => TblShopAdmin)
  @JoinColumn()
  shopAdmin!: TblShopAdmin;

  @OneToMany(() => TblShopUser, (shopUser) => shopUser.shop)
  shopUsers!: TblShopUser[];

  @OneToMany(() => TblShopProduct, (shopProduct) => shopProduct.shop)
  shopProducts!: TblShopProduct[];

  @OneToMany(() => TblOrder, (order) => order.shop)
  orders!: TblOrder[];

  @OneToMany(() => TblReview, (review) => review.shop)
  reviews!: TblReview[];
}
