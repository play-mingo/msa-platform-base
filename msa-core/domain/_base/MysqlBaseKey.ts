import { ValueObject } from "./ValueObject";
import { v4 as uuidv4 } from "uuid";

export class MysqlBaseKey extends ValueObject {
  constructor(public readonly key: string) {
    super();
  }

  static uuid(): string {
    return uuidv4().split("-").join("");
  }

  binaryToString(entityKey: Buffer): string {
    return Buffer.from(entityKey.toString("binary"), "ascii").toString("hex");
  }

  srtingToBinary(): Buffer {
    return Buffer.from(this.key, "hex");
  }
}
