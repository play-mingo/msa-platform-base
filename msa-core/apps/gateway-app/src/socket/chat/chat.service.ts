import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { KAFKA_CLIENT_OPTIONS } from "core/config/microservice/KafkaClientOption";
import { CHAT_TOPIC } from "core/constant/chat.msa.topic";
import { lastValueFrom } from "rxjs";
import {
  IFloristChatMessagesPayload,
  IFloristChatRoomsPayload,
  IFloristSendMessagePayload,
  IUserChatMessagesPayload,
  IUserChatRoomsPayload,
  IUserSendMessagePayload,
} from "usecase/chat/chat.payload";
import {
  IFloristChatMessagesListResult,
  IFloristChatRoomsListResult,
  IFloristSendMessageResult,
  IUserChatMessagesListResult,
  IUserChatRoomsListResult,
  IUserSendMessageResult,
} from "usecase/chat/chat.result";

@Injectable()
export class ChatService {
  constructor(@Inject(KAFKA_CLIENT_OPTIONS.GATEWAY_PROSUCER.NAME) private readonly client: ClientKafka) {}

  async floristChatRooms(payload: IFloristChatRoomsPayload): Promise<IFloristChatRoomsListResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.FLORIST.CHAT_ROOMS, payload));
  }

  async userChatRooms(payload: IUserChatRoomsPayload): Promise<IUserChatRoomsListResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.USER.CHAT_ROOMS, payload));
  }

  async floristChatMessages(payload: IFloristChatMessagesPayload): Promise<IFloristChatMessagesListResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.FLORIST.CHAT_MESSAGES, payload));
  }

  async userChatMessages(payload: IUserChatMessagesPayload): Promise<IUserChatMessagesListResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.USER.CHAT_MESSAGES, payload));
  }

  async floristSendMessage(payload: IFloristSendMessagePayload): Promise<IFloristSendMessageResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.FLORIST.SEND_MESSAGE, payload));
  }

  async userSendMessage(payload: IUserSendMessagePayload): Promise<IUserSendMessageResult> {
    return lastValueFrom(this.client.send(CHAT_TOPIC.USER.SEND_MESSAGE, payload));
  }
}
