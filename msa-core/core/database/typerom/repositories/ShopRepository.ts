import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblShop } from "../entities/TblShop";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";

@Injectable()
export class ShopRepository extends TypeormBaseRepository<TblShop, Key<TblShop>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblShop, dataDource.manager);
  }
}
