import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserRegisteredOrderWithConsultingEvent, UserRegisteredOrderWithQuickOrderEvent } from "./order.event";

@EventsHandler(UserRegisteredOrderWithConsultingEvent)
export class UserRegisteredOrderWithConsultingEventHandler implements IEventHandler<UserRegisteredOrderWithConsultingEvent> {
  handle(event: UserRegisteredOrderWithConsultingEvent) {
    console.log(`UserRegisteredOrderWithConsultingEvent :: ${event}`);
  }
}

@EventsHandler(UserRegisteredOrderWithQuickOrderEvent)
export class UserRegisteredOrderWithQuickOrderEventHandler implements IEventHandler<UserRegisteredOrderWithQuickOrderEvent> {
  handle(event: UserRegisteredOrderWithQuickOrderEvent) {
    console.log(`UserRegisteredOrderWithQuickOrderEvent :: ${event}`);
  }
}

export const OrderEventsHandlers = [UserRegisteredOrderWithConsultingEventHandler, UserRegisteredOrderWithQuickOrderEventHandler];
