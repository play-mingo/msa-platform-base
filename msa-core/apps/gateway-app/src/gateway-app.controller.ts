import { Controller, Get, Inject } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { GatewayAppService } from "./gateway-app.service";

@Controller("hero")
export class GatewayAppController {
  constructor(private readonly gatewayAppService: GatewayAppService) {}

  @Get()
  getHello(): string {
    return this.gatewayAppService.getHello();
  }
}
