import { Controller, Get } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { CHAT_TOPIC } from "core/constant/chat.msa.topic";
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
import { ChatAppService } from "./chat-app.service";

@Controller("chat")
export class ChatAppController {
  constructor(private readonly chatAppService: ChatAppService) {}

  @Get()
  getHello(): string {
    return this.chatAppService.getHello();
  }

  @MessagePattern(CHAT_TOPIC.FLORIST.CHAT_ROOMS)
  async floristChatRooms(payload: IFloristChatRoomsPayload): Promise<IFloristChatRoomsListResult> {
    return await this.chatAppService.floristChatRooms(payload);
  }

  @MessagePattern(CHAT_TOPIC.USER.CHAT_ROOMS)
  async userChatRooms(payload: IUserChatRoomsPayload): Promise<IUserChatRoomsListResult> {
    return await this.chatAppService.userChatRooms(payload);
  }

  @MessagePattern(CHAT_TOPIC.FLORIST.CHAT_MESSAGES)
  async floristChatMessages(payload: IFloristChatMessagesPayload): Promise<IFloristChatMessagesListResult> {
    return await this.chatAppService.floristChatMessages(payload);
  }

  @MessagePattern(CHAT_TOPIC.USER.CHAT_MESSAGES)
  async userChatMessages(payload: IUserChatMessagesPayload): Promise<IUserChatMessagesListResult> {
    return await this.chatAppService.userChatMessages(payload);
  }

  @MessagePattern(CHAT_TOPIC.FLORIST.SEND_MESSAGE)
  async floristSendMessage(payload: IFloristSendMessagePayload): Promise<IFloristSendMessageResult> {
    return await this.chatAppService.floristSendMessage(payload);
  }

  @MessagePattern(CHAT_TOPIC.USER.SEND_MESSAGE)
  async userSendMessage(payload: IUserSendMessagePayload): Promise<IUserSendMessageResult> {
    return await this.chatAppService.userSendMessage(payload);
  }

  @EventPattern(CHAT_TOPIC.FLORIST.CREATE_CHAT_ROOM)
  async floristCreateChatRoom(payload: any) {
    return await this.chatAppService.floristCreateChatRoom(payload);
  }

  @EventPattern(CHAT_TOPIC.USER.CREATE_CHAT_ROOM)
  async userCreateChatRoom(payload: any) {
    return await this.chatAppService.userCreateChatRoom(payload);
  }
}
