import { Injectable, OnModuleInit, SetMetadata } from "@nestjs/common";
import { DiscoveryService } from "@nestjs/core";
import KafkaSubscriber from "./KafkaSubscriber";

export const KAFKA_EVENT = Symbol("KAFKA_EVENT");
export const KafkaEvent = () => SetMetadata(KAFKA_EVENT, true);

@Injectable()
export class KafkaEventDecorator implements OnModuleInit {
  constructor(private readonly discoveryService: DiscoveryService, private readonly kafkaSubscriber: KafkaSubscriber) {}

  onModuleInit() {
    console.log("KafkaEventDecorator onModuleInit...");
    this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ metatype, instance }) => {
        if (!instance || !metatype || !metatype.name) {
          return false;
        }
        const event = Reflect.getMetadata(KAFKA_EVENT, metatype);
        return event;
      })
      .map(({ metatype }) => {
        this.kafkaSubscriber.addEvent(metatype);
      });
    this.kafkaSubscriber.subscribeInit();
  }
}
