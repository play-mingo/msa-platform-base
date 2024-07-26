import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatMessage, ChatMessageDocument } from "../schemas/ChatMessage.schema";
import { MongooseBaseRepository } from "./_MongooseBase.repository";

@Injectable()
export class ChatMessageRepository extends MongooseBaseRepository<ChatMessage> {
  constructor(@InjectModel(ChatMessage.name) private charMessageModel: Model<ChatMessageDocument>) {
    super(charMessageModel);
  }

  async chatMessagesByChatRoomId(chatRoomId: string, pageNum: number): Promise<ChatMessage[]> {
    return this.charMessageModel
      .find({ chatRoomId })
      .skip((pageNum - 1) * 20)
      .limit(20);
  }

  async chatMessagesCountByChatRoomId(chatRoomId: string): Promise<number> {
    return this.charMessageModel.countDocuments({ chatRoomId });
  }
}
