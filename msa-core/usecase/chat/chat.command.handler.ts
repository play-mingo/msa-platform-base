import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TblOrder } from "core/database/typerom/entities";
import { OrderRepository } from "core/database/typerom/repositories";
import { Chat, IChatBeforeSetupSender } from "domain/chat/Chat";
import { ChatMessage } from "domain/chat/ChatMessage";
import { ChatMessageKey } from "domain/chat/key/ChatMessageKey";
import { ChatRoomKey } from "domain/chat/key/ChatRoomKey";
import { MessageSender } from "domain/chat/vo/MessageSender";
import { Transactional } from "typeorm-transactional";
import { ChatSchemaMapper, IChatMappedManager } from "usecase/shared/mapper/ChatSchemaMapper";
import { ChatFloristCreateRoomCommand, ChatFloristSendMessageCommand, ChatUserCreateRoomCommand, ChatUserSendMessageCommand } from "./chat.command";
import { IFloristSendMessageResult, IUserSendMessageResult } from "./chat.result";

@CommandHandler(ChatFloristSendMessageCommand)
export class ChatFloristSendMessageCommandHandler implements ICommandHandler<ChatFloristSendMessageCommand, IFloristSendMessageResult> {
  constructor(private readonly chatSchemaMapper: ChatSchemaMapper) {}
  @Transactional()
  async execute(command: ChatFloristSendMessageCommand): Promise<IFloristSendMessageResult> {
    const manager: IChatMappedManager = this.chatSchemaMapper.connect(
      await this.chatSchemaMapper.contextByKey(new ChatRoomKey(command.data.chatRoomKey)),
    );
    const chat: IChatBeforeSetupSender = manager.load();
    chat.setupSender(MessageSender.SHOP).addMessage(
      new ChatMessage(ChatMessageKey.create(), new ChatRoomKey(command.data.chatRoomKey), {
        sender: MessageSender.SHOP,
        type: command.data.type,
        message: command.data.message,
        image: command.data.image,
        info: command.data.info,
        insDate: new Date(),
      }),
    );
    await manager.persist();
    return {};
  }
}

@CommandHandler(ChatUserSendMessageCommand)
export class ChatUserSendMessageCommandHandler implements ICommandHandler<ChatUserSendMessageCommand, IUserSendMessageResult> {
  constructor(private readonly chatSchemaMapper: ChatSchemaMapper) {}
  @Transactional()
  async execute(command: ChatUserSendMessageCommand): Promise<IFloristSendMessageResult> {
    const manager: IChatMappedManager = this.chatSchemaMapper.connect(
      await this.chatSchemaMapper.contextByKey(new ChatRoomKey(command.data.chatRoomKey)),
    );
    const chat: IChatBeforeSetupSender = manager.load();
    chat.setupSender(MessageSender.USER).addMessage(
      new ChatMessage(ChatMessageKey.create(), new ChatRoomKey(command.data.chatRoomKey), {
        sender: MessageSender.USER,
        type: command.data.type,
        message: command.data.message,
        image: command.data.image,
        info: command.data.info,
        insDate: new Date(),
      }),
    );
    await manager.persist();
    return {};
  }
}

/**
 * 꽃집 채팅방 생성 Command Handler
 */
@CommandHandler(ChatFloristCreateRoomCommand)
export class ChatFloristCreateRoomCommandHandler implements ICommandHandler<ChatFloristCreateRoomCommand> {
  constructor(private readonly chatSchemaMapper: ChatSchemaMapper, private readonly orderRepository: OrderRepository) {}
  @Transactional()
  async execute(command: ChatFloristCreateRoomCommand): Promise<void> {
    const orderEntity: TblOrder = await this.orderRepository.findByKeyWithShopAndShopUser(command.data.orderKey);
    const chatRoomKey: ChatRoomKey = ChatRoomKey.create();
    const chat: Chat = Chat.create(
      chatRoomKey,
      {
        shopKey: orderEntity.shop.key,
        shopName: orderEntity.shop.shopName as string,
        shopImage: orderEntity.shop.shopImgPath as string,
        isShopReaded: false,
      },
      {
        shopUserKey: orderEntity.shopUser.key,
        userName: orderEntity.shopUser.shopUserName as string,
        userImage: "user_profile_image" as string,
        isUserReaded: false,
      },
    );
    const manager: IChatMappedManager = this.chatSchemaMapper.connect({
      aggregate: chat,
      document: this.chatSchemaMapper.toSchema(chat, {
        orderId: orderEntity.id,
        shopId: orderEntity.shop.id,
        shopUserId: orderEntity.shopUser.id,
      }).chatRoomDocument,
      relationDocument: {
        orderId: orderEntity.id,
        shopId: orderEntity.shop.id,
        shopUserId: orderEntity.shopUser.id,
      },
    });
    // const chat: IChatBeforeSetupSender = manager.load();
    // chat.setupSender(MessageSender.SHOP);
    await manager.persist();
  }
}

/**
 * 사용자 채팅방 생성 Command Handler
 */
@CommandHandler(ChatUserCreateRoomCommand)
export class ChatUserCreateRoomCommandHandler implements ICommandHandler<ChatUserCreateRoomCommand> {
  constructor(private readonly chatSchemaMapper: ChatSchemaMapper, private readonly orderRepository: OrderRepository) {}
  @Transactional()
  async execute(command: ChatUserCreateRoomCommand): Promise<void> {
    const orderEntity: TblOrder = await this.orderRepository.findByKeyWithShopAndShopUser(command.data.orderKey);
    const chatRoomKey: ChatRoomKey = ChatRoomKey.create();
    const chat: Chat = Chat.create(
      chatRoomKey,
      {
        shopKey: orderEntity.shop.key,
        shopName: orderEntity.shop.shopName as string,
        shopImage: orderEntity.shop.shopImgPath as string,
        isShopReaded: false,
      },
      {
        shopUserKey: orderEntity.shopUser.key,
        userName: orderEntity.shopUser.shopUserName as string,
        userImage: "user_profile_image" as string,
        isUserReaded: false,
      },
    );
    const manager: IChatMappedManager = this.chatSchemaMapper.connect({
      aggregate: chat,
      document: this.chatSchemaMapper.toSchema(chat, {
        orderId: orderEntity.id,
        shopId: orderEntity.shop.id,
        shopUserId: orderEntity.shopUser.id,
      }).chatRoomDocument,
      relationDocument: {
        orderId: orderEntity.id,
        shopId: orderEntity.shop.id,
        shopUserId: orderEntity.shopUser.id,
      },
    });
    // const chat: IChatBeforeSetupSender = manager.load();
    // chat.setupSender(MessageSender.SHOP);
    await manager.persist();
  }
}

export const ChatCommandHandlers = [
  ChatFloristSendMessageCommandHandler,
  ChatUserSendMessageCommandHandler,
  ChatFloristCreateRoomCommandHandler,
  ChatUserCreateRoomCommandHandler,
];
