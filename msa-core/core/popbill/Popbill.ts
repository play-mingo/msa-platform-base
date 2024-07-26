import { Injectable } from "@nestjs/common";
import { PopbillSmsOptions } from "./sms/popbill.sms.interface";

@Injectable()
export class Popbill {
  private readonly popbill: any;
  /**
   * 팝빌 API 설정
   * TODO : 환경변수로 설정할 수 있도록 변경
   */
  private readonly config = {
    POPBILL_SECRET_KEY: process.env.POPBILL_SECRET_KEY,
    POPBILL_LINKID: process.env.POPBILL_LINKID,
    POPBILL_USERID: process.env.POPBILL_USERID,
    POPBILL_CORP_NUM: process.env.POPBILL_CORP_NUM,
    POPBILL_SEND_NUMBER: process.env.POPBILL_SEND_NUMBER,
    POPBILL_GOURL_MEMBER: process.env.POPBILL_GOURL_MEMBER,
    POPBILL_GOURL_CORP: process.env.POPBILL_GOURL_CORP,
  };

  /**
   * TODO : 설정값을 주입할 수 있도록 변경
   */
  constructor() {
    this.popbill = require("popbill");
    this.popbill.config({
      // 링크허브에서 발급받은 링크아이디, 비밀키
      LinkID: this.config.POPBILL_LINKID,
      SecretKey: this.config.POPBILL_SECRET_KEY,

      // 연동환경 설정값, (true-개발용, false-상업용)
      IsTest: false,

      // 인증토큰 IP제한기능 사용여부, 권장(true)
      IPRestrictOnOff: true,

      // 팝빌 API 서비스 고정 IP 사용여부
      UseStaticIP: false,

      // 로컬시스템 시간 사용여부 true-사용(기본값-권장), false-미사용
      UseLocalTimeYN: true,

      defaultErrorHandler: function (Error: { code: string; message: any }) {
        console.log("Error Occur : [" + Error.code + "] ", Error.message);
      },
    });
  }

  /**
   * 문자메시지 전송
   * @param options PopbillSmsOptions
   * @param success 성공 콜백 함수
   * @param fail 실패 콜백 함수
   */
  async sendSMS(options: PopbillSmsOptions, success: (receiptNum?: string) => void, fail: (error?: Error) => void): Promise<any> {
    const messageService = this.popbill.MessageService();
    const result = new Promise((resolve, reject) => {
      messageService.sendSMS(
        this.config.POPBILL_CORP_NUM,
        this.config.POPBILL_SEND_NUMBER,
        options.receiver,
        options.receiverName,
        options.contents,
        options.reserveDT,
        options.adsYN,
        options.senderName,
        (receiptNum: string) => {
          success(receiptNum);
          resolve(receiptNum);
        },
        (error: any) => {
          fail(error);
          reject(error);
        },
      );
    });
    return result;
  }
}
