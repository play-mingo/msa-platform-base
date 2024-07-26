import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { ChatMessageRepository } from "core/database/mongoose/repositories/ChatMessageRepository";
import { ChatRoomRepository } from "core/database/mongoose/repositories/ChatRoomRepository";
import { ChatMessageType, IChatMessageDocument } from "core/database/mongoose/schemas/ChatMessage.schema";
import { ChatRoom, IChatRoomDocument } from "core/database/mongoose/schemas/ChatRoom.schema";
import { Chat } from "domain/chat/Chat";
import { ChatRoomKey } from "domain/chat/key/ChatRoomKey";

@Injectable()
export class ChatSchemaMapper {
  protected aggregate?: Chat;
  protected document?: IChatRoomDocument;
  protected relationDocument!: RelatiomDocument;
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly publisher: EventPublisher,
  ) {}

  toAggregate(document: ChatRoom): Chat {
    const chatRoomKey: ChatRoomKey = new ChatRoomKey(document._id as string);
    return new Chat(chatRoomKey, {
      shop: document.shop,
      user: document.user,
      lastMessage: document.lastMessage,
      lastMessageDate: document.lastMessageDate,
      updDate: document.updDate,
    });
  }

  toSchema(aggregate: Chat, relationDocument: RelatiomDocument): IChatDocument {
    const chatRoomDocument: IChatRoomDocument = {
      _id: aggregate.chatRoomKey.key,
      key: aggregate.chatRoomKey.key,
      shop: aggregate.info.shop,
      user: aggregate.info.user,
      lastMessage: aggregate.info.lastMessage,
      lastMessageDate: aggregate.info.lastMessageDate,
      updDate: aggregate.info.updDate,
      orderId: relationDocument.orderId,
      shopId: relationDocument.shopId,
      shopUserId: relationDocument.shopUserId,
    };
    const chatMessageDocuments: IChatMessageDocument[] = aggregate.messages.map((chatMessage) => {
      return {
        _id: chatMessage.chatMessageKey.key,
        chatRoomId: chatMessage.chatRoomKey.key,
        sender: chatMessage.sender,
        type: chatMessage.type,
        message: chatMessage.type === ChatMessageType.TEXT ? chatMessage.message : null,
        image: chatMessage.type === ChatMessageType.IMAGE ? chatMessage.message : null,
        info: chatMessage.type === ChatMessageType.INFO ? chatMessage.message : null,
      };
    });
    return { chatRoomDocument, chatMessageDocuments };
  }

  // context() {}
  async contextByKey(chatRoomKey: ChatRoomKey): Promise<ChatMapContext> {
    const document = await this.chatRoomRepository.findOneByKey(chatRoomKey.key);
    const aggregate = this.publisher.mergeObjectContext(this.toAggregate(document));
    const relationDocument = {
      orderId: document.orderId,
      shopId: document.shopId,
      shopUserId: document.shopUserId,
    };
    return { aggregate, document, relationDocument };
  }
  public connect(context: ChatMapContext): IChatMappedManager {
    this.aggregate = context.aggregate;
    this.document = context.document;
    this.relationDocument = context.relationDocument;
    return this;
  }

  public load(): Chat {
    return this.aggregate as Chat;
  }

  public async persist() {
    const chatDocument: IChatDocument = this.toSchema(this.aggregate as Chat, this.relationDocument);
    this.document = chatDocument.chatRoomDocument;
    await this.chatRoomRepository.save(chatDocument.chatRoomDocument);
    chatDocument.chatMessageDocuments.forEach(async (chatMessageDocument) => {
      await this.chatMessageRepository.create(chatMessageDocument);
    });
    return;
  }
}

export interface IChatDocument {
  chatRoomDocument: IChatRoomDocument;
  chatMessageDocuments: IChatMessageDocument[];
}

export interface IChatMappedManager {
  // connect(context: ChatMapContext): this;
  load(): Chat;
  persist(): void;
}

export interface RelatiomDocument {
  orderId: number;
  shopId: number;
  shopUserId: number;
}

export interface ChatMapContext {
  aggregate: Chat;
  document: IChatRoomDocument;
  relationDocument: RelatiomDocument;
}
