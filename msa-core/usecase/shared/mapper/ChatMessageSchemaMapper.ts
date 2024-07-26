import { Injectable } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";
import { ChatMessageRepository } from "core/database/mongoose/repositories/ChatMessageRepository";
import { IChatMessageDocument } from "core/database/mongoose/schemas/ChatMessage.schema";
import { ChatMessage } from "domain/chat/ChatMessage";
import { ChatMessageType } from "domain/chat/vo/ChatMessageType";

@Injectable()
export class ChatMessageSchemaMapper {
  constructor(private readonly chatMessageRepository: ChatMessageRepository, private readonly publisher: EventPublisher) {}

  toSchema(aggregate: ChatMessage): IChatMessageDocument {
    return {
      chatRoomId: aggregate.chatRoomKey.key,
      sender: aggregate.sender,
      type: aggregate.type,
      message: aggregate.type === ChatMessageType.TEXT ? aggregate.message : null,
      image: aggregate.type === ChatMessageType.IMAGE ? aggregate.message : null,
      info: aggregate.type === ChatMessageType.INFO ? aggregate.message : null,
    };
  }
}
