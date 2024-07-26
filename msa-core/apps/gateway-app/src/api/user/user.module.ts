import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [UserController],
  providers: [UserService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class UserModule {}
