import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblShopAdminLoginInfo } from "../entities";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";

@Injectable()
export class ShopAdminLoginInfoRepository extends TypeormBaseRepository<TblShopAdminLoginInfo, Key<TblShopAdminLoginInfo>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblShopAdminLoginInfo, dataDource.manager);
  }
}
