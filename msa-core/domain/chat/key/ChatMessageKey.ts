import { MysqlBaseKey } from "domain/_base";

export class ChatMessageKey extends MysqlBaseKey {
  constructor(key: string) {
    super(key);
  }

  static create(): ChatMessageKey {
    return new ChatMessageKey(this.uuid());
  }
}
