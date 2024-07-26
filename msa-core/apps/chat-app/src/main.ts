import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AllRpcExceptionsFilter } from "core/exception/all-rpc-exceptions.filter";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import { ChatAppModule } from "./chat-app.module";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ChatAppModule, KAFKA_CLIENT_OPTIONS.CHAT_CONSUMER.OPTION);
  app.useGlobalFilters(new AllRpcExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`🚀 Application is running`);
}
bootstrap();
