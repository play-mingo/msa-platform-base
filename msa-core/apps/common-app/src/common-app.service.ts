import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CheckVerifyNumCommand, SendVerifyNumCommand } from "usecase/common/common.command";
import { ICheckVerifyNumPayload, ISendVerifyNumPayload } from "usecase/common/common.payload";
import { ICheckVerifyNumResult, ISendVerifyNumResult } from "usecase/common/common.result";

@Injectable()
export class CommonAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}
  getHello(): string {
    return "Hello World!";
  }

  async sendVerifyNum(payload: ISendVerifyNumPayload): Promise<ISendVerifyNumResult> {
    return await this.commandBus.execute(new SendVerifyNumCommand(payload));
  }

  async checkVerifyNum(payload: ICheckVerifyNumPayload): Promise<ICheckVerifyNumResult> {
    return await this.commandBus.execute(new CheckVerifyNumCommand(payload));
  }
}
