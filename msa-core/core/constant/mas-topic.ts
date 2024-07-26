import { AUTH_TOPIC, AUTH_TOPICS } from "./auth.msa.topic";
import { SHOP_TOPIC, SHOP_TOPICS } from "./shop.mas-topic";
import { ORDER_TOPIC, ORDER_TOPICS } from "./order.msa.topic";
import { USER_TOPIC, USER_TOPICS } from "./user.msa.topic";
import { COMMON_TOPIC, COMMON_TOPICS } from "./common.msa.topic";
import { CHAT_TOPIC, CHAT_TOPICS } from "./chat.msa.topic";

export const MAS_TOPIC = {
  SHOP: SHOP_TOPIC,
  ORDER: ORDER_TOPIC,
  AUTH: AUTH_TOPIC,
  USER: USER_TOPIC,
  CHAT: CHAT_TOPIC,
  COMMON: COMMON_TOPIC,
} as const;
export type MAS_TOPIC = (typeof MAS_TOPIC)[keyof typeof MAS_TOPIC];
export const MAS_TOPICS = [SHOP_TOPICS, ORDER_TOPICS, AUTH_TOPICS, USER_TOPICS, CHAT_TOPICS, COMMON_TOPICS];
