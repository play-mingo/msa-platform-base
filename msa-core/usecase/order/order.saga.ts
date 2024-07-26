import { Inject, Injectable } from "@nestjs/common";
import { ofType, Saga } from "@nestjs/cqrs";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { CHAT_TOPIC } from "core/constant/chat.msa.topic";
import { lastValueFrom, map, Observable } from "rxjs";
import { UserRegisteredOrderWithConsultingEvent, UserRegisteredOrderWithQuickOrderEvent } from "./order.event";

@Injectable()
export class OrderSaga {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.ORDER_PRODUCER.NAME) private readonly client: ClientKafka) {}

  @Saga()
  orderRegistered = (events$: Observable<any>): Observable<any> => {
    return events$
      .pipe(
        ofType(UserRegisteredOrderWithConsultingEvent),
        map((event) => {
          console.log("OrderSaga :: UserRegisteredOrderWithConsultingEvent", event);
          lastValueFrom(this.client.emit(CHAT_TOPIC.USER.CREATE_CHAT_ROOM, event.data));
          return event;
        }),
      )
      .pipe(
        ofType(UserRegisteredOrderWithQuickOrderEvent),
        map((event) => {
          console.log("OrderSaga :: UserRegisteredOrderWithQuickOrderEvent", event);
          lastValueFrom(this.client.emit(CHAT_TOPIC.USER.CREATE_CHAT_ROOM, event.data));
          return event;
        }),
      );
  };
}
