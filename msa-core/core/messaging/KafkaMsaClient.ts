import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaBrokers } from "core/config/microservice/KafkaClientOption";

@Module({
  imports: [
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
})
export class KafkaMsaClient {}
