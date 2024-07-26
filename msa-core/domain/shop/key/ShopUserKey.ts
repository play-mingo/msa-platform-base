import { IBaseKey, MysqlBaseKey } from "domain/_base";

export class ShopUserKey extends MysqlBaseKey implements IBaseKey {
  public static create() {
    return new ShopUserKey(this.uuid());
  }
}
