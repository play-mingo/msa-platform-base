import { MysqlBaseKey } from "domain/_base";

export class VerifyKey extends MysqlBaseKey {
  constructor(public readonly key: string) {
    super(key);
  }

  public static create() {
    return new VerifyKey(this.uuid());
  }
}
