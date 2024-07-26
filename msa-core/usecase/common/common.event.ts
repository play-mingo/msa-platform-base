import { ICheckedVerifyNumPayload, ISendedVerifyNumPayload } from "./common.payload";

/**
 * 인증번호 발송 이벤트
 * @property data.verifyKey 인증키
 * @property data.verifyPhone 전화번호
 */
export class SendedVerifyNumEvent {
  constructor(public readonly data: ISendedVerifyNumPayload) {}
}

/**
 * 인증번호 확인 이벤트
 * @property data.verifyKey 인증키
 * @property data.verifyCode 인증번호
 * @property data.verifyPhone 전화번호
 */
export class CheckedVerifyNumEvent {
  constructor(public readonly data: ICheckedVerifyNumPayload) {}
}

export const CommonEvents = [SendedVerifyNumEvent, CheckedVerifyNumEvent];
