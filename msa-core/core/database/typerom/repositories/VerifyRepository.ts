import { Injectable } from "@nestjs/common";
import { DelYn } from "domain/_base";
import { DataSource } from "typeorm";
import { TblVerify } from "../entities";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";

@Injectable()
export class VerifyRepository extends TypeormBaseRepository<TblVerify, Key<TblVerify>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblVerify, dataDource.manager);
  }

  async findOneById(id: number): Promise<TblVerify | null> {
    return await this.findOneByWhere({ id, delYn: DelYn.ACTIVE });
  }

  async prevVerifyDelete(verifyPhone: string): Promise<void> {
    await this.update({ verifyPhone, delYn: DelYn.ACTIVE }, { delYn: DelYn.DELETED });
    return;
  }
}
