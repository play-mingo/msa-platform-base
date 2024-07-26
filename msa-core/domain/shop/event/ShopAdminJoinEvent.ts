import { IEvent } from "@nestjs/cqrs";
import { ShopAdminInfo } from "../ShopAdmin";
import { ShopAdminKey } from "../key";
import { KafkaEvent } from "core/messaging/KafkaEventDecorator";

@KafkaEvent()
export class ShopAdminJoinEvent implements IEvent {
  private shopAdminKey: ShopAdminKey;
  private shopAdminInfo: ShopAdminInfo;
  constructor(shopAdminKey: ShopAdminKey, shopAdminInfo: ShopAdminInfo) {
    this.shopAdminKey = shopAdminKey;
    this.shopAdminInfo = shopAdminInfo;
  }
}
