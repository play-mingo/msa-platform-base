import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AuthAppModule } from "./auth-app.module";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthAppModule, KAFKA_CLIENT_OPTIONS.AUTH_CONSUMER.OPTION);
  await app.listen();
  Logger.log(`🚀 Application is running`);
}
bootstrap();
