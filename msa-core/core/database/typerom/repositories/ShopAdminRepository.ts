import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { TblShopAdmin } from "../entities";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";
import { ShopAdminKey } from "domain/shop/key";

export interface IShopAdminRepository {
  test(): Promise<string>;
}

@Injectable()
export class ShopAdminRepository extends TypeormBaseRepository<TblShopAdmin, Key<TblShopAdmin>> implements IShopAdminRepository {
  constructor(private readonly dataDource: DataSource) {
    super(TblShopAdmin, dataDource.manager);
  }

  async findOneByShopId(shopId: number): Promise<TblShopAdmin | null> {
    return await this.findOneByWhere({ shop: { id: shopId } });
  }

  async findOneByKeyWithLoginInfo(key: ShopAdminKey) {
    return await this.manager.getRepository(this.entityTarget).findOne({
      where: key,
      relations: {
        shopAdminLoginInfoes: true,
      },
    });
  }

  async findOneByEmailAndPwdWithShop(email: string, pwd: string) {
    return await this.manager.getRepository(this.entityTarget).findOne({
      where: {
        shopAdminNormalAuthId: email,
        shopAdminPw: pwd,
        delYn: "N",
      },
      relations: {
        shopAdminLoginInfoes: true,
        shop: true,
      },
    });
  }

  async test(): Promise<string> {
    const rt: boolean = await this.existBy({
      id: 1,
    });
    return `userHero ${rt}`;
  }
}
