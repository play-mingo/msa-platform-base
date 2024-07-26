import { Module } from "@nestjs/common";
import { CommonService } from "./common.service";
import { CommonController } from "./common.controller";
import { MulterModule } from "@nestjs/platform-express";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [MulterModule, ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [CommonController],
  providers: [CommonService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class CommonModule {}
