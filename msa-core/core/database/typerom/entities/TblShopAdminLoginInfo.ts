import { Column, Entity, ManyToOne } from "typeorm";
import { TblShopAdmin } from "./TblShopAdmin";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblShopAdminLoginInfo", { schema: "project_base_DB" })
export class TblShopAdminLoginInfo extends _BaseEntity {
  @Column("varchar", {
    name: "device",
    nullable: true,
    comment: "로그인 기기",
    length: 200,
  })
  device!: string;

  @Column("varchar", {
    name: "osType",
    nullable: true,
    comment: "os 유형",
    length: 20,
  })
  osType!: string;

  @Column("varchar", {
    name: "fcmToken",
    nullable: true,
    comment: "fcmKey",
    length: 200,
  })
  fcmToken!: string | null;

  @Column("varchar", {
    name: "sessionInfo",
    nullable: true,
    comment: "세션 정보",
    length: 200,
  })
  sessionInfo!: string;

  @Column("datetime", {
    name: "loginDate",
    nullable: true,
    comment: "로그인 시각",
    default: () => "CURRENT_TIMESTAMP",
  })
  loginDate!: Date;

  @Column("datetime", {
    name: "expDate",
    nullable: true,
    comment: "만료 시각",
    default: () => "CURRENT_TIMESTAMP",
  })
  expDate!: Date;

  @ManyToOne(() => TblShopAdmin)
  shopAdmin!: TblShopAdmin;
}
