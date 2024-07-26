import { Column, Entity } from "typeorm";
import { _BaseEntity } from "./_BaseEntity";

@Entity("TblTerm", { schema: "project_base_DB" })
export class TblTerm extends _BaseEntity {
  @Column("int", { name: "type", nullable: true, comment: "약관 유형1" })
  type!: number | null;

  @Column("int", { name: "category", nullable: true, comment: "약관 유형2" })
  category!: number | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "약관명",
    length: 200,
  })
  title!: string | null;

  @Column("text", {
    name: "contents",
    nullable: true,
    comment: "약관 내용",
  })
  contents!: string | null;
}
