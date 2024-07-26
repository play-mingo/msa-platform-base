import { IEvent, IMessageSource } from "@nestjs/cqrs";
import { kafkaBrokers } from "core/config/microservice/KafkaClientOption";
import { Consumer, Kafka } from "kafkajs";
import { Subject } from "rxjs";

class KafkaSubscriber implements IMessageSource {
  private readonly kafkaConsumer: Consumer;
  private bridge: Subject<any> | undefined;
  private events: Array<any>;

  constructor() {
    const kafka = new Kafka({
      clientId: "cqrs-consumer" + Math.random(),
      brokers: kafkaBrokers,
    });

    this.events = [];
    this.kafkaConsumer = kafka.consumer({
      groupId: "cqrs-consumer-group",
    });
  }

  async connect(): Promise<void> {
    await this.kafkaConsumer.connect();
    await this.subscribeInit();
  }

  async disconnect(): Promise<void> {
    await this.kafkaConsumer.disconnect();
  }

  bridgeEventsTo<T extends IEvent>(subject: Subject<T>): any {
    this.bridge = subject;
  }

  addEvent(event: any): void {
    this.events.push(event);
  }

  async subscribeInit(): Promise<void> {
    if (this.events.length === 0) return;
    await this.kafkaConsumer.stop();
    for (const event of this.events) {
      await this.kafkaConsumer.subscribe({
        topic: event.name,
        fromBeginning: false,
      });
    }

    await this.kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (this.bridge) {
          for (const event of this.events) {
            if (event.name === topic && message.value) {
              const parsedJson = JSON.parse(message.value.toString());
              const receivedEvent = new event(parsedJson);
              this.bridge.next(receivedEvent);
            }
          }
        }
      },
    });
  }
}

export default KafkaSubscriber;
