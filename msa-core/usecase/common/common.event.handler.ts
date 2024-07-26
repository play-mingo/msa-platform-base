import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SendedVerifyNumEvent } from "./common.event";
import { Popbill } from "core/popbill/Popbill";

@EventsHandler(SendedVerifyNumEvent)
export class SendedVerifyNumEventHandler implements IEventHandler<SendedVerifyNumEvent> {
  constructor(private readonly popbill: Popbill) {}
  async handle(event: SendedVerifyNumEvent) {
    console.log("SendedVerifyNumEvent : ", event.data);
    await this.popbill.sendSMS(
      {
        receiver: event.data.verifyPhone,
        contents: `[ 플로링크 ] 인증번호는 [ ${event.data.verifyCode} ] 입니다.`,
      },
      (receiptNum) => {
        console.log(`${receiptNum} : 전송 완료`);
      },
      (error) => {
        console.error("error : ", error);
      },
    );
  }
}

export const CommonEventHandlers = [SendedVerifyNumEventHandler];
