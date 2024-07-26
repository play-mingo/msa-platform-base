import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { OrderAppModule } from "./order-app.module";
import { initializeTransactionalContext, StorageDriver } from "typeorm-transactional";
import { AllRpcExceptionsFilter } from "core/exception/all-rpc-exceptions.filter";

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderAppModule, KAFKA_CLIENT_OPTIONS.ORDER_CONSUMER.OPTION);
  app.useGlobalFilters(new AllRpcExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`🚀 Application is running`);
}
bootstrap();
