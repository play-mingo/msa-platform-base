import { ICheckVerifyNumPayload, ISendVerifyNumPayload } from "./common.payload";

/**
 * SendVerifyNumCommand
 * @property data.verifyPhone - 전화번호
 */
export class SendVerifyNumCommand {
  constructor(public readonly data: ISendVerifyNumPayload) {}
}

/**
 * CheckVerifyNumCommand
 * @property data.verifyKey - 인증시도키
 * @property data.verifyCode - 인증코드
 */
export class CheckVerifyNumCommand {
  constructor(public readonly data: ICheckVerifyNumPayload) {}
}

export const CommonCommands = [SendVerifyNumCommand, CheckVerifyNumCommand];
