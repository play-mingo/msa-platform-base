import { Module } from "@nestjs/common";
import { ChatController } from "./chat.controller";
import { ChatService } from "../../socket/chat/chat.service";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  controllers: [ChatController],
  providers: [ChatService, ClientKafka, DiscoveryService, MetadataScanner, JwtService],
})
export class ApiChatModule {}
