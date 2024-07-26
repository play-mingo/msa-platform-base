import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AllHttpExceptionsFilter } from "core/exception/all-http-exceptions.filter";
import { AllRpcExceptionsFilter } from "core/exception/all-rpc-exceptions.filter";
import { setupUserSession } from "core/jwt/session.config";
import express from "express";
import * as http from "http";
import { StorageDriver, initializeTransactionalContext } from "typeorm-transactional";
import { TransformInterceptor } from "./common/interceptor/transform.interceptor";
import { setupSwagger } from "./common/swagger/SetupSwagger";
import { GatewayAppModule } from "./gateway-app.module";

export async function bootstrapForLocal() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(GatewayAppModule, new ExpressAdapter(server), { cors: true });
  const httpAdapter = app.get(HttpAdapterHost);
  const httpServer = http.createServer(server);
  app.connectMicroservice(KAFKA_CLIENT_OPTIONS.GATEWAY_CONSUMER.OPTION);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllHttpExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new AllRpcExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useWebSocketAdapter(new IoAdapter(httpServer));
  setupUserSession(app);
  setupSwagger(app);
  await app.init();
  await app.startAllMicroservices();
  httpServer.listen(process.env.PROJECT_MSA_GATEWAY_HTTP_PORT);
  Logger.log(`[${process.env.MSA_NAME}] Application is running on: http://${process.env.SERVER_DOMAIN} 🚀`);
}
