import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { COMMON_TOPIC } from "core/constant/common.msa.topic";
import { lastValueFrom } from "rxjs";
import { ICheckVerifyNumPayload, ISendVerifyNumPayload } from "usecase/common/common.payload";
import { ICheckVerifyNumResult, ISendVerifyNumResult } from "usecase/common/common.result";

@Injectable()
export class CommonService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  async sendVerifyNum(payload: ISendVerifyNumPayload): Promise<ISendVerifyNumResult> {
    return lastValueFrom(this.client.send(COMMON_TOPIC.SEND_VERIFY_NUM, payload));
  }

  async checkVerifyNum(payload: ICheckVerifyNumPayload): Promise<ICheckVerifyNumResult> {
    return lastValueFrom(this.client.send(COMMON_TOPIC.CHECK_VERIFY_NUM, payload));
  }
}
