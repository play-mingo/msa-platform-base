import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DatabaseModule } from "core/database/DatabaseModule";
import { moduleSchemas } from "core/database/mongoose/schemas/schema.config";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { JwtAuthModule } from "core/jwt/JwtAuthModule";
import { ChatCommands } from "usecase/chat/chat.command";
import { ChatCommandHandlers } from "usecase/chat/chat.command.handler";
import { ChatQueries } from "usecase/chat/chat.query";
import { ChatQueryHandlers } from "usecase/chat/chat.query.handler";
import { Mappers } from "usecase/shared/mapper";
import { ChatAppController } from "./chat-app.controller";
import { ChatAppService } from "./chat-app.service";
import { MongooseRepositories } from "core/database/mongoose/repositories";
import { CHAT_TOPICS } from "core/constant/chat.msa.topic";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature(moduleSchemas),
    CqrsModule,
    JwtAuthModule,
    ClientsModule.register([KAFKA_CLIENT_OPTIONS.CHAT_PRODUCER.OPTION]),
  ],
  controllers: [ChatAppController],
  providers: [
    ChatAppService,
    ...Mappers,
    ...TypeormRepositories,
    ...MongooseRepositories,
    Map,
    EventPublisher,
    ...ChatCommands,
    ...ChatCommandHandlers,
    ...ChatQueries,
    ...ChatQueryHandlers,
  ],
})
export class ChatAppModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.CHAT_PRODUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    Object.values(CHAT_TOPICS).map((topic) => {
      console.log(`Subscribing to CHAT_TOPIC topic: ${topic}`);
      this.client.subscribeToResponseOf(topic);
    });
  }
}
