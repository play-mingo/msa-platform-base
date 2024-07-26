import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VerifyKey } from "domain/verify/key/VerifyKey";
import { Verify } from "domain/verify/Verify";
import { Transactional } from "typeorm-transactional";
import { IVerifyMappedManager, VerifyEntityMapper } from "usecase/shared/mapper/VerifyEntityMapper";
import { CheckVerifyNumCommand, SendVerifyNumCommand } from "./common.command";
import { ICheckVerifyNumResult, ISendVerifyNumResult } from "./common.result";
import { SendedVerifyNumEvent } from "./common.event";

@CommandHandler(SendVerifyNumCommand)
export class SendVerifyNumCommandHandler implements ICommandHandler<SendVerifyNumCommand, ISendVerifyNumResult> {
  constructor(private readonly verifyEntityMapper: VerifyEntityMapper) {}
  @Transactional()
  async execute(command: SendVerifyNumCommand): Promise<ISendVerifyNumResult> {
    const verifyKey: VerifyKey = VerifyKey.create();
    const manager: IVerifyMappedManager = this.verifyEntityMapper.connect(this.verifyEntityMapper.createContext(verifyKey));
    const verify: Verify = manager.load();
    verify.generateVerifyCode(command.data.verifyPhone, 0);
    await manager.persist();
    verify.publish(new SendedVerifyNumEvent({ verifyPhone: command.data.verifyPhone, verifyCode: verify.info.verifyCode }));
    verify.commit();
    return { verifyKey: verify.verifyKey.key };
  }
}

@CommandHandler(CheckVerifyNumCommand)
export class CheckVerifyNumCommandHandler implements ICommandHandler<CheckVerifyNumCommand, ICheckVerifyNumResult> {
  constructor(private readonly verifyEntityMapper: VerifyEntityMapper) {}
  @Transactional()
  async execute(command: CheckVerifyNumCommand): Promise<ICheckVerifyNumResult> {
    const manager: IVerifyMappedManager = this.verifyEntityMapper.connect(
      await this.verifyEntityMapper.contextByKey(new VerifyKey(command.data.verifyKey)),
    );
    const verify: Verify = manager.load();
    verify.confirmVerifyCode({ verifyCode: command.data.verifyCode, verifyPhone: command.data.verifyPhone });
    await manager.persist();
    return { verifyYn: verify.info.verifyYn };
  }
}

export const CommonCommandHandlers = [SendVerifyNumCommandHandler, CheckVerifyNumCommandHandler];
