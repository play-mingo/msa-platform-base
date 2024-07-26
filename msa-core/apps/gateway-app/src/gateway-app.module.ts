import { Inject, MiddlewareConsumer, Module, NestModule, OnModuleInit, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { ClientKafka, ClientsModule } from "@nestjs/microservices";
import { CustomConfigModule } from "core/config/CustomConfigModule";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { MAS_TOPICS } from "core/constant/mas-topic";
import { CoreModule } from "core/CoreModule";
import { ShopRepository } from "core/database/typerom/repositories/ShopRepository";
import { JwtAuthModule } from "core/jwt/JwtAuthModule";
import { SessionAuthModule } from "core/jwt/SessionAuthModule";
import { UserSessionWsMiddleware } from "core/jwt/user-session.ws.middleware";
import { LocalSerializer } from "core/jwt/user.local.serializer";
import { LocalStrategy } from "core/jwt/user.session.strategy";
import { Repository } from "typeorm";
import { AuthModule } from "./api/auth/auth.module";
import { AuthService } from "./api/auth/auth.service";
import { ApiChatModule } from "./api/chat/chat.module";
import { CommonModule } from "./api/common/common.module";
import { OrderModule } from "./api/order/order.module";
import { ShopModule } from "./api/shop/shop.module";
import { UserModule } from "./api/user/user.module";
import { GatewayAppController } from "./gateway-app.controller";
import { GatewayAppService } from "./gateway-app.service";
import { ChatModule } from "./socket/chat/chat.module";

@Module({
  imports: [
    AuthModule,
    ShopModule,
    OrderModule,
    UserModule,
    ApiChatModule,
    ChatModule,
    CoreModule,
    CqrsModule,
    CustomConfigModule,
    JwtAuthModule,
    SessionAuthModule,
    ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION]),
    CommonModule,
  ],
  controllers: [GatewayAppController],
  providers: [
    LocalStrategy,
    LocalSerializer,
    AuthService,
    GatewayAppService,
    ClientKafka,
    ShopRepository,
    String,
    Repository,
    JwtService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class GatewayAppModule implements OnModuleInit, NestModule {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}
  onModuleInit() {
    MAS_TOPICS.map((topicObject) => {
      Object.values(topicObject).map((topic) => {
        console.log(`Subscribing to topic: ${topic}`);
        this.client.subscribeToResponseOf(topic);
      });
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserSessionWsMiddleware).forRoutes("*");
  }
}
