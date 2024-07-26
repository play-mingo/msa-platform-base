import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { DatabaseModule } from "core/database/DatabaseModule";
import { JwtAuthModule } from "core/jwt/JwtAuthModule";
import { PopbillModule } from "core/popbill/PopbillModule";
import { CommonAppController } from "./common-app.controller";
import { CommonAppService } from "./common-app.service";
import { CommonUseCases } from "usecase/common";
import { Mappers } from "usecase/shared/mapper";
import { TypeormRepositories } from "core/database/typerom/repositories";
import { MongooseRepositories } from "core/database/mongoose/repositories";

@Module({
  imports: [DatabaseModule, CqrsModule, JwtAuthModule, ClientsModule.register([KAFKA_CLIENT_OPTIONS.COMMON_PRODUCER.OPTION]), PopbillModule],
  controllers: [CommonAppController],
  providers: [CommonAppService, PopbillModule, ...CommonUseCases, ...Mappers, ...TypeormRepositories, ...MongooseRepositories, Map],
})
export class CommonAppModule {}
