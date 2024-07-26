import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AllHttpExceptionsFilter } from "core/exception/all-http-exceptions.filter";
import { AllRpcExceptionsFilter } from "core/exception/all-rpc-exceptions.filter";
import { setupUserSession } from "core/jwt/session.config";
import express from "express";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import { StorageDriver, initializeTransactionalContext } from "typeorm-transactional";
import { TransformInterceptor } from "./common/interceptor/transform.interceptor";
import { setupSwagger } from "./common/swagger/SetupSwagger";
import { GatewayAppModule } from "./gateway-app.module";

export async function bootstrapForProduction() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(GatewayAppModule, new ExpressAdapter(server), { cors: true });
  const httpAdapter = app.get(HttpAdapterHost);
  const httpsOptions = {
    cert: fs.readFileSync(process.env.PROJECT_MSA_GATEWAY_SSL_FULLCHAIN_PATH as string),
    key: fs.readFileSync(process.env.PROJECT_MSA_GATEWAY_SSL_PRIVKEY_PATH as string),
  };
  const httpServer = http.createServer(server);
  const httpsServer = https.createServer(httpsOptions, server);
  app.connectMicroservice(KAFKA_CLIENT_OPTIONS.GATEWAY_CONSUMER.OPTION);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllHttpExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new AllRpcExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useWebSocketAdapter(new IoAdapter(httpsServer));
  setupUserSession(app);
  setupSwagger(app);
  await app.init();
  await app.startAllMicroservices();
  httpServer.listen(process.env.PROJECT_MSA_GATEWAY_HTTP_PORT);
  if (["production", "development"].includes(process.env.NODE_ENV_MODE as string)) {
    httpsServer.listen(process.env.PROJECT_MSA_GATEWAY_HTTPS_PORT);
  }
  Logger.log(`[${process.env.MSA_NAME}] Application is running on: https://${process.env.SERVER_DOMAIN} 🚀`);
}
