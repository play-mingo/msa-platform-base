import { Column, Entity } from "typeorm";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblVerify", { schema: "project_base_DB" })
export class TblVerify extends _BaseEntity {
  @Column("varchar", {
    name: "verifyCode",
    nullable: true,
    comment: "인증코드",
    length: 20,
  })
  verifyCode!: string | null;

  @Column("varchar", {
    name: "verifyPhone",
    nullable: true,
    comment: "인증 요청 전화번호",
    length: 200,
  })
  verifyPhone!: string | null;

  @Column("int", { name: "type", nullable: true, comment: "인증 유형" })
  type!: number | null;

  @Column("datetime", {
    name: "verifyExpDate",
    nullable: true,
    comment: "인증 만료 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  verifyExpDate!: Date | null;

  @Column("datetime", {
    name: "expDate",
    nullable: true,
    comment: "인증완료 조회 가능 일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  confirmExpDate!: Date | null;

  @Column("char", {
    name: "verifyYn",
    nullable: true,
    comment: "인증여부",
    length: 1,
    default: () => "'N'",
  })
  verifyYn!: string | null;
}
