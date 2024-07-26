import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserJwtStrategy } from "./user.jwt.strategy";
import { LocalStrategy } from "./user.session.strategy";
import { AuthService } from "apps/gateway-app/src/api/auth/auth.service";
import { ClientsModule } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { LocalSerializer } from "./user.local.serializer";
import { WsSessionStrategy } from "./user.session.ws.strategy";

@Module({
  imports: [PassportModule.register({ session: true }), ClientsModule.register([KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.OPTION])],
  providers: [UserJwtStrategy, WsSessionStrategy, LocalStrategy, LocalSerializer, AuthService],
})
export class SessionAuthModule {}
