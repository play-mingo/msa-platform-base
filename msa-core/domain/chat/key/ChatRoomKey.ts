import { MysqlBaseKey } from "domain/_base";

export class ChatRoomKey extends MysqlBaseKey {
  constructor(key: string) {
    super(key);
  }

  static create(): ChatRoomKey {
    return new ChatRoomKey(this.uuid());
  }
}
