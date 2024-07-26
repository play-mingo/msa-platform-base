import { Inject, OnModuleInit, SetMetadata } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { ClientKafka } from "@nestjs/microservices";

export const KAFKA_MSA_EVENT = Symbol("KAFKA_MSA_EVENT");
export const KafkaMsaEvent = (topic: string) => SetMetadata(KAFKA_MSA_EVENT, topic);

class KafkaMsaDecorator implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    console.log("KafkaMsaDecorator onModuleInit...");
    console.log(this.discoveryService);
    await this.discoveryService
      .getControllers()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .filter(({ metatype, instance }) => instance && metatype && metatype.name)
      .forEach(({ metatype, instance }) => {
        const topics = this.metadataScanner.getAllMethodNames(Object.getPrototypeOf(instance)).map((methodName) => {
          const topic: string = Reflect.getMetadata(KAFKA_MSA_EVENT, instance[methodName]);
          if (topic) {
            this.client.subscribeToResponseOf(topic);
            console.log("======= topic =======");
            console.log(topic);
          }
        });
      });
    await this.client.connect();
  }
}

export default KafkaMsaDecorator;
