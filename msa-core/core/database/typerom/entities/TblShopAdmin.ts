import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { TblShop } from "./TblShop";
import { TblShopAdminLoginInfo } from "./TblShopAdminLoginInfo";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblShopAdmin", { schema: "project_base_DB" })
export class TblShopAdmin extends _BaseEntity {
  @Column("varchar", {
    name: "shopAdminNormalAuthId",
    nullable: true,
    comment: "아이디",
    length: 200,
  })
  shopAdminNormalAuthId!: string | null;

  @Column("varchar", {
    name: "shopAdminPw",
    nullable: true,
    comment: "패스워드",
    length: 200,
  })
  shopAdminPw!: string | null;

  @Column("varchar", {
    name: "shopAdminKakaoAuthId",
    nullable: true,
    comment: "아이디",
    length: 200,
  })
  shopAdminKakaoAuthId!: string | null;

  @Column("varchar", {
    name: "shopAdminAppleAuthId",
    nullable: true,
    comment: "아이디",
    length: 200,
  })
  shopAdminAppleAuthId!: string | null;

  @Column("varchar", {
    name: "shopAdminName",
    nullable: true,
    comment: "꽃집 대표 이름",
    length: 200,
  })
  shopAdminName!: string;

  @Column("varchar", {
    name: "shopAdminPhone",
    nullable: true,
    comment: "꽃집 대표 전화번호",
    length: 200,
  })
  shopAdminPhone!: string;

  @Column("varchar", {
    name: "shopAdminUniqueKey",
    nullable: true,
    comment: "자연인 고유 코드",
    length: 200,
  })
  shopAdminUniqueKey!: string | null;

  @Column("char", {
    name: "marketingYn",
    nullable: false,
    comment: "마케팅 수신 동의 여부",
    length: 1,
    default: () => "'N'",
  })
  marketingYn!: "Y" | "N";

  @OneToOne(() => TblShop)
  @JoinColumn()
  shop!: TblShop;

  @OneToMany(() => TblShopAdminLoginInfo, (shopAdminLoginInfo) => shopAdminLoginInfo.shopAdmin)
  shopAdminLoginInfoes!: TblShopAdminLoginInfo[];
}
