import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatMessage, ChatMessageDocument } from "../schemas/ChatMessage.schema";
import { ChatRoom, ChatRoomDocument, IChatRoomDocument } from "../schemas/ChatRoom.schema";
import { MongooseBaseRepository } from "./_MongooseBase.repository";

@Injectable()
export class ChatRoomRepository extends MongooseBaseRepository<ChatRoom> {
  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>,
    @InjectModel(ChatMessage.name) private charMessageModel: Model<ChatMessageDocument>,
  ) {
    super(chatRoomModel);
  }

  async chatRoomsByShopId(shopId: number, pageNum: number): Promise<ChatRoom[]> {
    return this.chatRoomModel
      .find({ shopId })
      .skip((pageNum - 1) * 20)
      .limit(20);
  }

  async chatRoomsByShopUserId(shopUserId: number, pageNum: number): Promise<ChatRoom[]> {
    return this.chatRoomModel
      .find({ shopUserId })
      .skip((pageNum - 1) * 20)
      .limit(20);
  }

  async chatRoomsCountByShopId(shopId: number): Promise<number> {
    return this.chatRoomModel.countDocuments({ shopId });
  }

  async chatRoomsCountByShopUserId(shopUserId: number): Promise<number> {
    return this.chatRoomModel.countDocuments({ shopUserId });
  }

  async saveByKey(data: IChatRoomDocument) {
    return await this.chatRoomModel.findOneAndUpdate({ key: data.key }, { ...data, updDate: new Date() }, { upsert: true, new: true });
  }
}
