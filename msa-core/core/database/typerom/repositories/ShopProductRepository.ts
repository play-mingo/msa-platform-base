import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblShopProduct } from "../entities";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";
import { DelYn } from "domain/_base";

@Injectable()
export class ShopProductRepository extends TypeormBaseRepository<TblShopProduct, Key<TblShopProduct>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblShopProduct, dataDource.manager);
  }

  async findShopProductsByShopId(shopId: number): Promise<TblShopProduct[]> {
    return await this.findByWhere({ shop: { id: shopId }, delYn: DelYn.ACTIVE });
  }
}
