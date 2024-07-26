import { MysqlBaseKey } from "domain/_base";

export class ReviewKey extends MysqlBaseKey {
  constructor(public readonly key: string) {
    super(key);
  }
  public static create() {
    return new ReviewKey(this.uuid());
  }
}
