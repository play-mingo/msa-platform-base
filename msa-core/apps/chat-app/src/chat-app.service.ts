import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  ChatFloristCreateRoomCommand,
  ChatFloristSendMessageCommand,
  ChatUserCreateRoomCommand,
  ChatUserSendMessageCommand,
} from "usecase/chat/chat.command";
import {
  IFloristChatMessagesPayload,
  IFloristChatRoomsPayload,
  IFloristSendMessagePayload,
  IUserChatMessagesPayload,
  IUserChatRoomsPayload,
  IUserCreateRoomPayload,
  IUserSendMessagePayload,
} from "usecase/chat/chat.payload";
import { ChatFloristChatMessagesQuery, ChatFloristChatRoomsQuery, ChatUserChatMessagesQuery, ChatUserChatRoomsQuery } from "usecase/chat/chat.query";
import {
  IFloristChatMessagesListResult,
  IFloristChatRoomsListResult,
  IFloristSendMessageResult,
  IUserChatMessagesListResult,
  IUserChatRoomsListResult,
  IUserCreateRoomResult,
  IUserSendMessageResult,
} from "usecase/chat/chat.result";

@Injectable()
export class ChatAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  getHello(): string {
    return "Hello World!";
  }

  async floristChatRooms(payload: IFloristChatRoomsPayload): Promise<IFloristChatRoomsListResult> {
    return await this.queryBus.execute(new ChatFloristChatRoomsQuery(payload));
  }

  async userChatRooms(payload: IUserChatRoomsPayload): Promise<IUserChatRoomsListResult> {
    return await this.queryBus.execute(new ChatUserChatRoomsQuery(payload));
  }

  async floristChatMessages(payload: IFloristChatMessagesPayload): Promise<IFloristChatMessagesListResult> {
    return await this.queryBus.execute(new ChatFloristChatMessagesQuery(payload));
  }

  async userChatMessages(payload: IUserChatMessagesPayload): Promise<IUserChatMessagesListResult> {
    return await this.queryBus.execute(new ChatUserChatMessagesQuery(payload));
  }

  async floristSendMessage(payload: IFloristSendMessagePayload): Promise<IFloristSendMessageResult> {
    return await this.commandBus.execute(new ChatFloristSendMessageCommand(payload));
  }

  async userSendMessage(payload: IUserSendMessagePayload): Promise<IUserSendMessageResult> {
    return await this.commandBus.execute(new ChatUserSendMessageCommand(payload));
  }

  async floristCreateChatRoom(payload: IUserCreateRoomPayload): Promise<IUserCreateRoomResult> {
    return this.commandBus.execute(new ChatFloristCreateRoomCommand(payload));
  }

  async userCreateChatRoom(payload: IUserCreateRoomPayload): Promise<IUserCreateRoomResult> {
    return this.commandBus.execute(new ChatUserCreateRoomCommand(payload));
  }
}
