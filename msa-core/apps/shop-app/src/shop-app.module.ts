import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { SHOP_TOPICS } from "core/constant/shop.mas-topic";
import { DatabaseModule } from "core/database/DatabaseModule";
import { MongooseRepositories } from "core/database/mongoose/repositories";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { Mappers } from "usecase/shared/mapper";
import { ShopCommands } from "usecase/shop/shop.command";
import { ShopCommandHandlers } from "usecase/shop/shop.command.handler";
import { ShopQueries } from "usecase/shop/shop.query";
import { ShopQueryHandlers } from "usecase/shop/shop.query.handler";
import { ShopAppController } from "./shop-app.controller";
import { ShopAppService } from "./shop-app.service";

@Module({
  imports: [DatabaseModule, CqrsModule, ClientsModule.register([KAFKA_CLIENT_OPTIONS.SHOP_PRODUCER.OPTION])],
  controllers: [ShopAppController],
  providers: [
    ShopAppService,
    ...ShopCommands,
    ...ShopCommandHandlers,
    ...ShopQueries,
    ...ShopQueryHandlers,
    ...Mappers,
    ...TypeormRepositories,
    ...MongooseRepositories,
    Map,
    EventPublisher,
  ],
})
export class ShopAppModule implements OnModuleInit {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.SHOP_PRODUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    Object.values(SHOP_TOPICS).map((topic) => {
      console.log(`Subscribing to SHOP_TOPIC topic: ${topic}`);
      this.client.subscribeToResponseOf(topic);
    });
  }
}
