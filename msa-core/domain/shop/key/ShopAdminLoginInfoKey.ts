import { IBaseKey, MysqlBaseKey } from "domain/_base";

export class ShopAdminLoginInfoKey extends MysqlBaseKey implements IBaseKey {
  public static create() {
    return new ShopAdminLoginInfoKey(this.uuid());
  }
}
