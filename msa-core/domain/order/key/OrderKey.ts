import { MysqlBaseKey } from "domain/_base";

export class OrderKey extends MysqlBaseKey {
  constructor(public readonly key: string) {
    super(key);
  }
  public static create() {
    return new OrderKey(this.uuid());
  }
}
