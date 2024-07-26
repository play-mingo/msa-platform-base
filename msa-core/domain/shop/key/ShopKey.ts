import { IBaseKey, MysqlBaseKey } from "domain/_base";

export class ShopKey extends MysqlBaseKey implements IBaseKey {
  public static create() {
    return new ShopKey(this.uuid());
  }
}
