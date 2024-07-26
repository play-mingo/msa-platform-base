import { Controller, Get } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { COMMON_TOPIC } from "core/constant/common.msa.topic";
import { ICheckVerifyNumPayload, ISendVerifyNumPayload } from "usecase/common/common.payload";
import { ICheckVerifyNumResult, ISendVerifyNumResult } from "usecase/common/common.result";
import { CommonAppService } from "./common-app.service";
@Controller("common")
export class CommonAppController {
  constructor(private readonly commonAppService: CommonAppService) {}

  @Get()
  getHello(): string {
    return this.commonAppService.getHello();
  }

  @MessagePattern(COMMON_TOPIC.SEND_VERIFY_NUM)
  async sendVerifyNum(@Payload() payload: ISendVerifyNumPayload): Promise<ISendVerifyNumResult> {
    return await this.commonAppService.sendVerifyNum(payload);
  }

  @MessagePattern(COMMON_TOPIC.CHECK_VERIFY_NUM)
  async checkVerifyNum(@Payload() payload: ICheckVerifyNumPayload): Promise<ICheckVerifyNumResult> {
    return await this.commonAppService.checkVerifyNum(payload);
  }
}
