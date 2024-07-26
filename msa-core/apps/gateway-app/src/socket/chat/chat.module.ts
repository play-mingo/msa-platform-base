import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [],
  providers: [ChatService, ChatGateway, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class ChatModule {}
