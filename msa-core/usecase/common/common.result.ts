import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { ToggleYn, ToggleYnValues } from "domain/_base";

export class VerifyResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "인증시도키" })
  verifyKey!: string;

  @ApiProperty({ example: "01012345678", description: "전화번호" })
  verifyPhone!: string;

  @ApiProperty({ example: "234692", description: "인증코드" })
  verifyCode!: string;

  @ApiProperty({ example: ToggleYn.ACTIVE, description: "인증결과", enum: ToggleYnValues })
  verifyYn!: string;
}

/**
 * 인증번호 발송
 */
export type ISendVerifyNumResult = Pick<VerifyResult, "verifyKey">;
export class SendVerifyNumResult extends PickType(VerifyResult, ["verifyKey"] as const) implements ISendVerifyNumResult {}
export class SendVerifyNumResponse extends BaseResponse<SendVerifyNumResult> {
  @ApiProperty({ description: "응답 데이터", type: SendVerifyNumResult })
  data!: SendVerifyNumResult;
}
export const SendVerifyNumApiResponse = {
  status: 200,
  type: SendVerifyNumResponse,
};

/**
 * 인증번호 확인
 */
export type ICheckVerifyNumResult = Pick<VerifyResult, "verifyYn">;
export class CheckVerifyNumResult extends PickType(VerifyResult, ["verifyYn"] as const) implements ICheckVerifyNumResult {}
export class CheckVerifyNumResponse extends BaseResponse<CheckVerifyNumResult> {
  @ApiProperty({ description: "응답 데이터", type: CheckVerifyNumResult })
  data!: CheckVerifyNumResult;
}
export const CheckVerifyNumApiResponse = {
  status: 200,
  type: CheckVerifyNumResponse,
};
