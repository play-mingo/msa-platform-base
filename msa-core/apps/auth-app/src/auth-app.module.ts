import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { AUTH_TOPICS } from "core/constant/auth.msa.topic";
import { DatabaseModule } from "core/database/DatabaseModule";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { JwtAuthModule } from "core/jwt/JwtAuthModule";
import { AuthAppService } from "./auth-app.service";
import { AuthUseCase } from "usecase/auth";
import { UserJwtAuth } from "usecase/auth/JwtAuth";
import { AuthCommands } from "usecase/auth/auth.command";
import { AuthCommandHandlers } from "usecase/auth/auth.command.handler";
import { Mappers } from "usecase/shared/mapper";
import { AuthAppController } from "./auth-app.controller";
import { MongooseRepositories } from "core/database/mongoose/repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { moduleSchemas } from "core/database/mongoose/schemas/schema.config";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature(moduleSchemas),
    CqrsModule,
    JwtAuthModule,
    ClientsModule.register([KAFKA_CLIENT_OPTIONS.AUTH_PRODUCER.OPTION]),
  ],
  controllers: [AuthAppController],
  providers: [
    AuthAppService,
    ...AuthUseCase,
    JwtService,
    ...Mappers,
    ...TypeormRepositories,
    ...MongooseRepositories,
    Map,
    EventPublisher,
    UserJwtAuth,
    ...AuthCommands,
    ...AuthCommandHandlers,
  ],
})
export class AuthAppModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.AUTH_PRODUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    Object.values(AUTH_TOPICS).map((topic) => {
      console.log(`Subscribing to AUTH_TOPIC topic: ${topic}`);
      this.client.subscribeToResponseOf(topic);
    });
  }
}
