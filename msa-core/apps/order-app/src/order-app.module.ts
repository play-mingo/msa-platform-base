import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { OrderAppController } from "./order-app.controller";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { Mappers } from "usecase/shared/mapper";
import { DatabaseModule } from "core/database/DatabaseModule";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { OrderAppService } from "./order-app.service";
import { OrderCommandHandlers } from "usecase/order/order.command.handler";
import { OrderCommands } from "usecase/order/order.command";
import { OrderQueries } from "usecase/order/order.query";
import { OrderQueryHandlers } from "usecase/order/order.query.handler";
import { ORDER_TOPICS } from "core/constant/order.msa.topic";
import { OrderEvents } from "usecase/order/order.event";
import { OrderEventsHandlers } from "usecase/order/order.event.handler";
import { OrderSaga } from "usecase/order/order.saga";
import { MongooseModule } from "@nestjs/mongoose";
import { moduleSchemas } from "core/database/mongoose/schemas/schema.config";
import { MongooseRepositories } from "core/database/mongoose/repositories";

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature(moduleSchemas),
    CqrsModule,
    ClientsModule.register([KAFKA_CLIENT_OPTIONS.ORDER_PRODUCER.OPTION]),
  ],
  controllers: [OrderAppController],
  providers: [
    OrderAppService,
    ...OrderCommandHandlers,
    ...OrderCommands,
    ...OrderQueryHandlers,
    ...OrderQueries,
    ...OrderEvents,
    ...OrderEventsHandlers,
    OrderSaga,
    ...Mappers,
    ...TypeormRepositories,
    ...MongooseRepositories,
    Map,
    EventPublisher,
  ],
})
export class OrderAppModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.ORDER_PRODUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    Object.values(ORDER_TOPICS).map((topic) => {
      console.log(`Subscribing to ORDER_TOPIC topic: ${topic}`);
      this.client.subscribeToResponseOf(topic);
    });
  }
}
