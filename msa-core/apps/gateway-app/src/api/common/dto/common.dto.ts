import { ApiProperty } from "@nestjs/swagger";
import { ICheckVerifyNumPayload, ISendVerifyNumPayload } from "usecase/common/common.payload";

export class FileUploadDto {
  @ApiProperty({
    type: "array",
    items: {
      type: "string",
      format: "binary",
      description: "Files to upload",
    },
  })
  files!: Express.Multer.File[];
}

export class SendVerifyNumDto implements ISendVerifyNumPayload {
  @ApiProperty({ example: "01012345678", description: "전화번호" })
  verifyPhone!: string;
}

export class CheckVerifyNumDto implements ICheckVerifyNumPayload {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "인증시도키" })
  verifyKey!: string;

  @ApiProperty({ example: "234692", description: "인증코드" })
  verifyCode!: string;

  @ApiProperty({ example: "01012345678", description: "전화번호" })
  verifyPhone!: string;
}
