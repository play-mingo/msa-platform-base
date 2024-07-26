import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { CqrsModule, EventBus } from "@nestjs/cqrs";
import { ClientProxyFactory, ClientsModule, Transport } from "@nestjs/microservices";
import { AopModule } from "@toss/nestjs-aop";
import { kafkaBrokers } from "core/config/microservice/KafkaClientOption";
import { KafkaEventDecorator } from "./KafkaEventDecorator";
import KafkaPublisher from "./KafkaPublisher";
import KafkaSubscriber from "./KafkaSubscriber";

@Module({
  imports: [
    AopModule,
    CqrsModule,
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: "USERS_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "users",
            brokers: kafkaBrokers,
          },
          consumer: {
            groupId: "users-consumer",
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: "USERS_SERVICE",
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: "users",
              brokers: kafkaBrokers,
            },
            consumer: {
              groupId: "users-consumer",
            },
          },
        });
      },
      inject: [ConfigService],
    },
    KafkaSubscriber,
    KafkaPublisher,
    KafkaEventDecorator,
    // KafkaMsaDecorator,
    DiscoveryService,
    MetadataScanner,
  ],
  exports: [KafkaSubscriber, KafkaPublisher, KafkaEventDecorator],
})
export class MessagingModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly event$: EventBus,
    private readonly kafkaPublisher: KafkaPublisher,
    private readonly kafkaSubscriber: KafkaSubscriber,
  ) {}

  async onModuleInit(): Promise<any> {
    await this.kafkaSubscriber.connect();
    this.kafkaSubscriber.bridgeEventsTo(this.event$.subject$);

    await this.kafkaPublisher.connect();
    this.event$.publisher = this.kafkaPublisher;
  }

  async onModuleDestroy(): Promise<any> {
    await this.kafkaPublisher.disconnect();
    await this.kafkaSubscriber.disconnect();
  }
}
