import { Module } from "@nestjs/common";
import { ShopService } from "./shop.service";
import { ShopController } from "./shop.controller";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [ShopController],
  providers: [ShopService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class ShopModule {}
