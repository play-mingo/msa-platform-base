import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { UserAppController } from "./user-app.controller";
import { UserAppService } from "./user-app.service";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { USER_TOPICS } from "core/constant/user.msa.topic";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { DatabaseModule } from "core/database/DatabaseModule";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { Mappers } from "usecase/shared/mapper";
import { UserCommandHandlers, UserCommands, UserQueries, UserQueryHandlers } from "usecase/user";
import { MongooseRepositories } from "core/database/mongoose/repositories";

@Module({
  imports: [DatabaseModule, CqrsModule, ClientsModule.register([KAFKA_CLIENT_OPTIONS.ORDER_PRODUCER.OPTION])],
  controllers: [UserAppController],
  providers: [
    UserAppService,
    ...UserCommandHandlers,
    ...UserCommands,
    ...UserQueryHandlers,
    ...UserQueries,
    ...Mappers,
    ...TypeormRepositories,
    ...MongooseRepositories,
    Map,
    EventPublisher,
  ],
})
export class UserAppModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.ORDER_PRODUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    Object.values(USER_TOPICS).map((topic) => {
      console.log(`Subscribing to USER_TOPIC topic: ${topic}`);
      this.client.subscribeToResponseOf(topic);
    });
  }
}
