import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AllRpcExceptionsFilter } from "core/exception/all-rpc-exceptions.filter";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import { UserAppModule } from "./user-app.module";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserAppModule, KAFKA_CLIENT_OPTIONS.USER_CONSUMER.OPTION);
  app.useGlobalFilters(new AllRpcExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`🚀 Application is running`);
}
bootstrap();
