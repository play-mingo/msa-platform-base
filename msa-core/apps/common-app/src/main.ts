import { NestFactory } from "@nestjs/core";
import { CommonAppModule } from "./common-app.module";
import { MicroserviceOptions } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { Logger } from "@nestjs/common";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.create(CommonAppModule);
  app.connectMicroservice<MicroserviceOptions>(KAFKA_CLIENT_OPTIONS.COMMON_CONSUMER.OPTION);
  await app.startAllMicroservices();
  await app.listen(8010);
  Logger.log(`🚀 Application is running`);
}
bootstrap();
