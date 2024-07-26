import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResult {
  @ApiProperty({ example: 200, description: "HTTP 상태 코드" })
  code!: number;

  @ApiProperty({ example: "정상적으로 처리되었습니다.", description: "HTTP 상태 메시지" })
  message!: string;
}

export class BaseResponse<ResultData> extends BaseResult {
  @ApiProperty({ example: 200, description: "HTTP 상태 코드" })
  code!: number;

  @ApiProperty({ example: "정상적으로 처리되었습니다.", description: "HTTP 상태 메시지" })
  message!: string;

  @ApiProperty({ description: "응답 데이터" })
  data!: ResultData;
}
