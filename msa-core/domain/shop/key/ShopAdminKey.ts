import { IBaseKey, MysqlBaseKey } from "domain/_base";

export class ShopAdminKey extends MysqlBaseKey implements IBaseKey {
  constructor(public readonly key: string) {
    super(key);
  }
  public static create() {
    return new ShopAdminKey(this.uuid());
  }
}
