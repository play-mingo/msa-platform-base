import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { TblVerify } from "core/database/typerom/entities";
import { VerifyRepository } from "core/database/typerom/repositories";
import { Verify } from "domain/verify/Verify";
import { VerifyKey } from "domain/verify/key/VerifyKey";
import { BaseEntityMapper } from "./_IBaseEntityMapper";

@Injectable()
export class VerifyEntityMapper extends BaseEntityMapper<TblVerify, Verify> {
  protected aggregate?: Verify;
  protected entity?: TblVerify;
  constructor(private readonly verifyRepository: VerifyRepository, private readonly publisher: EventPublisher) {
    super();
  }

  protected toAggregate(entity: TblVerify): Verify {
    const verifyKey: VerifyKey = new VerifyKey(entity.key);
    return new Verify(verifyKey, {
      verifyCode: entity.verifyCode as string,
      verifyPhone: entity.verifyPhone as string,
      verifyYn: entity.verifyYn as string,
      type: entity.type,
      verifyExpDate: entity.verifyExpDate,
      confirmExpDate: entity.confirmExpDate,
    });
  }

  protected toEntity(aggregate: Verify): TblVerify {
    let entity: TblVerify | undefined = this.entity;
    if (!entity) {
      entity = new TblVerify();
    }
    entity.key = aggregate.verifyKey.key;
    entity.verifyCode = aggregate.info.verifyCode;
    entity.verifyPhone = aggregate.info.verifyPhone;
    entity.verifyYn = aggregate.info.verifyYn;
    entity.type = aggregate.info.type;
    entity.verifyExpDate = aggregate.info.verifyExpDate;
    entity.confirmExpDate = aggregate.info.confirmExpDate;
    return entity;
  }

  createContext(verifyKey: VerifyKey): VerifyMapContext {
    const entity = new TblVerify();
    entity.key = verifyKey.key;
    const aggregate = Verify.create(verifyKey);
    return { aggregate, entity };
  }

  async contextByKey(verifyKey: VerifyKey): Promise<VerifyMapContext> {
    const entity = await this.verifyRepository.findOneByKey(verifyKey);
    if (!entity) throw new Error("VerifyEntityMapper.contextByKey: entity not found");
    return {
      aggregate: this.publisher.mergeObjectContext(this.toAggregate(entity)),
      entity: entity,
    };
  }

  connect(context: VerifyMapContext): IVerifyMappedManager {
    this.aggregate = this.publisher.mergeObjectContext(context.aggregate);
    this.entity = context.entity;
    return this;
  }

  public get context(): Readonly<VerifyMapContext> {
    return {
      aggregate: this.aggregate as Verify,
      entity: this.entity as TblVerify,
    };
  }

  load(): Verify {
    return this.aggregate as Verify;
  }

  async persist(): Promise<TblVerify> {
    await this.verifyRepository.prevVerifyDelete(this.aggregate?.info.verifyPhone as string);
    this.entity = this.toEntity(this.aggregate as Verify);
    return await this.verifyRepository.save(this.entity);
  }
}

export interface IVerifyMappedManager {
  load(): Verify;
  persist(): Promise<TblVerify>;
  context: Readonly<VerifyMapContext>;
}

export interface VerifyMapContext {
  aggregate: Verify;
  entity: TblVerify;
}
