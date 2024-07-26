import { Module } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { SessionAuthModule } from "core/jwt/SessionAuthModule";

@Module({
  imports: [SessionAuthModule, ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [AuthController],
  providers: [AuthService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class AuthModule {}
