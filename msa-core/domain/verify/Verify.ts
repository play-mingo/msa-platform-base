import { AggregateRoot } from "@nestjs/cqrs";
import dayjs from "dayjs";
import { VerifyKey } from "./key/VerifyKey";

export interface VerifyInfo {
  verifyPhone: string;
  verifyCode: string;
  verifyYn: string;
  type: number | null;
  verifyExpDate: Date | null;
  confirmExpDate: Date | null;
}
export interface VerifyProps {
  verifyKey: string;
  info: VerifyInfo;
}

export class Verify extends AggregateRoot {
  readonly verifyKey: VerifyKey;
  private verifyInfo: VerifyInfo;

  constructor(verifyKey: VerifyKey, verifyInfo: VerifyInfo) {
    super();
    this.verifyKey = verifyKey;
    this.verifyInfo = verifyInfo;
  }

  static create(verifyKey: VerifyKey): Verify {
    return new Verify(verifyKey, {
      verifyPhone: "",
      verifyCode: "",
      verifyYn: "N",
      type: null,
      verifyExpDate: null,
      confirmExpDate: null,
    });
  }

  public generateVerifyCode(verifyPhone: string, type: number): this {
    this.verifyInfo.verifyCode = this.generateRandomSixDigitString();
    this.verifyInfo.verifyPhone = verifyPhone;
    this.verifyInfo.type = type;
    this.verifyInfo.verifyExpDate = dayjs().add(3, "minute").toDate();
    return this;
  }

  public confirmVerifyCode(info: { verifyCode: string; verifyPhone: string }): this {
    if (this.verifyInfo.verifyCode !== info.verifyCode) throw new Error("인증번호가 일치하지 않습니다.");
    if (this.verifyInfo.verifyPhone !== info.verifyPhone) throw new Error("전화번호가 일치하지 않습니다.");
    if (this.verifyInfo.verifyYn === "Y") throw new Error("이미 인증된 인증번호입니다.");
    if (this.verifyInfo.verifyExpDate && dayjs().isAfter(this.verifyInfo.verifyExpDate)) throw new Error("인증시간이 만료되었습니다.");
    this.verifyInfo.verifyYn = "Y";
    this.verifyInfo.confirmExpDate = dayjs().add(10, "minute").toDate();
    return this;
  }

  get info(): Readonly<VerifyInfo> {
    return this.verifyInfo;
  }

  private generateRandomSixDigitString(): string {
    let result = "";
    const characters = "0123456789";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
