import { MysqlBaseKey } from "domain/_base";

export class OrderInfoKey extends MysqlBaseKey {
  constructor(public readonly key: string) {
    super(key);
  }
  public static create() {
    return new OrderInfoKey(this.uuid());
  }
}
