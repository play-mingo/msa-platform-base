import { IBaseKey, MysqlBaseKey } from "domain/_base";

export class ShopProductKey extends MysqlBaseKey implements IBaseKey {
  public static create() {
    return new ShopProductKey(this.uuid());
  }
}
