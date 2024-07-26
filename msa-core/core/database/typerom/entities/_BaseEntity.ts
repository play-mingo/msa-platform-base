import { CreateDateColumn, Entity, UpdateDateColumn, Index, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class _BaseEntity {
  @Index({ unique: true })
  @Column({ type: "varchar", length: 200, comment: "노출 suid" })
  // @Column({ type: "binary", length: 16, comment: "노출 suid" })
  key!: string;

  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "키",
  })
  id!: number;

  @CreateDateColumn({
    comment: "등록일",
  })
  insDate!: Date;

  @UpdateDateColumn({
    comment: "수정일",
  })
  updDate!: Date;

  @Column("char", {
    name: "delYn",
    nullable: false,
    comment: "삭제 여부",
    length: 1,
    default: () => "'N'",
  })
  delYn!: "Y" | "N";
}
