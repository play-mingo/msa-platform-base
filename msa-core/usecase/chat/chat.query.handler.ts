import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ChatMessageRepository } from "core/database/mongoose/repositories/ChatMessageRepository";
import { ChatRoomRepository } from "core/database/mongoose/repositories/ChatRoomRepository";
import { ChatFloristChatMessagesQuery, ChatFloristChatRoomsQuery, ChatUserChatMessagesQuery, ChatUserChatRoomsQuery } from "./chat.query";
import { IFloristChatMessagesListResult, IFloristChatRoomsListResult, IUserChatMessagesListResult, IUserChatRoomsListResult } from "./chat.result";

@QueryHandler(ChatFloristChatRoomsQuery)
export class ChatFloristChatRoomsQueryHandler implements IQueryHandler<ChatFloristChatRoomsQuery, IFloristChatRoomsListResult> {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}
  async execute(query: ChatFloristChatRoomsQuery): Promise<IFloristChatRoomsListResult> {
    const chatRooms = await this.chatRoomRepository.chatRoomsByShopId(query.data.shopId, query.data.pageNum);
    const totalCount = await this.chatRoomRepository.chatRoomsCountByShopId(query.data.shopId);
    return {
      pageNum: query.data.pageNum,
      totalCount,
      list: chatRooms.map((chatRoom) => ({
        charRoomKey: chatRoom._id as string,
        user: {
          shopUserKey: chatRoom.user.shopUserKey,
          userName: chatRoom.user.userName,
          userImage: chatRoom.user.userImage,
          isUserReaded: chatRoom.user.isUserReaded,
        },
        lastMessage: chatRoom.lastMessage,
        lastMessageDate: chatRoom.lastMessageDate,
      })),
    };
  }
}

@QueryHandler(ChatUserChatRoomsQuery)
export class ChatUserChatRoomsQueryHandler implements IQueryHandler<ChatUserChatRoomsQuery, IUserChatRoomsListResult> {
  constructor(private readonly chatRoomRepository: ChatRoomRepository) {}
  async execute(query: ChatUserChatRoomsQuery): Promise<IUserChatRoomsListResult> {
    const chatRooms = await this.chatRoomRepository.chatRoomsByShopUserId(query.data.shopUserId, query.data.pageNum);
    const totalCount = await this.chatRoomRepository.chatRoomsCountByShopUserId(query.data.shopUserId);
    return {
      pageNum: query.data.pageNum,
      totalCount,
      list: chatRooms.map((chatRoom) => ({
        charRoomKey: chatRoom._id as string,
        shop: {
          shopKey: chatRoom.shop.shopKey,
          shopName: chatRoom.shop.shopName,
          shopImage: chatRoom.shop.shopImage,
          isShopReaded: chatRoom.shop.isShopReaded,
        },
        lastMessage: chatRoom.lastMessage,
        lastMessageDate: chatRoom.lastMessageDate,
      })),
    };
  }
}

@QueryHandler(ChatFloristChatMessagesQuery)
export class ChatFloristChatMessagesQueryHandler implements IQueryHandler<ChatFloristChatMessagesQuery, IFloristChatMessagesListResult> {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}
  async execute(query: ChatFloristChatMessagesQuery): Promise<IFloristChatMessagesListResult> {
    const chatMessages = await this.chatMessageRepository.chatMessagesByChatRoomId(query.data.chatRoomKey, query.data.pageNum);
    const totalCount = await this.chatMessageRepository.chatMessagesCountByChatRoomId(query.data.chatRoomKey);
    return {
      pageNum: query.data.pageNum,
      totalCount,
      list: chatMessages.map((chatMessage) => ({
        chatMessageKey: chatMessage._id as string,
        sender: chatMessage.sender,
        type: chatMessage.type,
        message: chatMessage.message,
        sendDate: chatMessage.insDate,
      })),
    };
  }
}

@QueryHandler(ChatUserChatMessagesQuery)
export class ChatUserChatMessagesQueryHandler implements IQueryHandler<ChatUserChatMessagesQuery, IUserChatMessagesListResult> {
  constructor(private readonly chatMessageRepository: ChatMessageRepository) {}
  async execute(query: ChatUserChatMessagesQuery): Promise<IUserChatMessagesListResult> {
    const chatMessages = await this.chatMessageRepository.chatMessagesByChatRoomId(query.data.chatRoomKey, query.data.pageNum);
    const totalCount = await this.chatMessageRepository.chatMessagesCountByChatRoomId(query.data.chatRoomKey);
    return {
      pageNum: query.data.pageNum,
      totalCount,
      list: chatMessages.map((chatMessage) => ({
        chatMessageKey: chatMessage._id as string,
        sender: chatMessage.sender,
        type: chatMessage.type,
        message: chatMessage.message,
        sendDate: chatMessage.insDate,
      })),
    };
  }
}

export const ChatQueryHandlers = [
  ChatFloristChatRoomsQueryHandler,
  ChatUserChatRoomsQueryHandler,
  ChatFloristChatMessagesQueryHandler,
  ChatUserChatMessagesQueryHandler,
];
