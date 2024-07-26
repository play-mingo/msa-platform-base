import { IEvent, IEventPublisher } from "@nestjs/cqrs";
import { kafkaBrokers } from "core/config/microservice/KafkaClientOption";
import { Kafka, Producer } from "kafkajs";

class KafkaPublisher implements IEventPublisher {
  private readonly kafkaProducer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: "cqrs-publisher" + Math.random(),
      brokers: kafkaBrokers,
    });

    this.kafkaProducer = kafka.producer();
  }

  async connect(): Promise<void> {
    await this.kafkaProducer.connect();
  }

  async disconnect(): Promise<void> {
    await this.kafkaProducer.disconnect();
  }

  publish<T extends IEvent>(event: T): any {
    return this.kafkaProducer.send({
      topic: event.constructor.name,
      messages: [{ value: JSON.stringify(event) }],
    });
  }

  // send(pattern: any, data: any): Observable<any> {
  //   return this.client.send<any>(pattern, data);
  // }
}

export default KafkaPublisher;
