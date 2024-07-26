import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [OrderController],
  providers: [OrderService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class OrderModule {}
