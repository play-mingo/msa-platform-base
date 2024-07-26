import { Injectable } from "@nestjs/common";
import { DelYn } from "domain/_base";
import { DataSource } from "typeorm";
import { TblShopUser } from "../entities";
import { Key, TypeormBaseRepository } from "./_TypeormBase.repository";

@Injectable()
export class ShopUserRepository extends TypeormBaseRepository<TblShopUser, Key<TblShopUser>> {
  constructor(private readonly dataDource: DataSource) {
    super(TblShopUser, dataDource.manager);
  }

  async countByShopId(id: number): Promise<number> {
    return await this.countBy({ shop: { id }, delYn: DelYn.ACTIVE });
  }

  async findByShopId(id: number): Promise<TblShopUser[]> {
    return await this.findByWhere({ shop: { id }, delYn: DelYn.ACTIVE });
  }

  async findOneByShopId(id: number): Promise<TblShopUser | null> {
    return await this.findOneByWhere({ shop: { id }, delYn: DelYn.ACTIVE });
  }

  async findOneByKeyWithShop(key: Key<TblShopUser>): Promise<TblShopUser | null> {
    return await this.findOneByKeyWithRelation(key, { shop: true });
  }

  async findOneByIdWithShop(id: number): Promise<TblShopUser | null> {
    return await this.findOneByIdWithRelation(id, { shop: true });
  }

  async findOneByNameAndPhoneWithShop(shopKey: string, name: string, phone: string): Promise<TblShopUser | null> {
    return await this.findOneBy({
      where: {
        shopUserName: name,
        shopUserPhone: phone,
        delYn: DelYn.ACTIVE,
        shop: { key: shopKey },
      },
      relations: ["shop"],
    });
  }

  async findAndCountByShopId(id: number): Promise<[TblShopUser[], number]> {
    return await this.findAndCount({
      where: { shop: { id }, delYn: DelYn.ACTIVE },
      order: { id: "DESC" },
    });
  }
}

// 생년월일을 받아서 나이대를 계산하는 함수 ex) 19900701 -> 30
export const calculateAgeRange = (birth: string): number => {
  if (!/^\d{8}$/.test(birth)) throw new Error("Invalid birth format");
  const today = new Date();
  const birthDate = new Date(birth);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return Math.floor(age / 10) * 10;
};
