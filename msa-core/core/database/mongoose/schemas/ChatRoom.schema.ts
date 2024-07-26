import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { _BaseSchema } from "./_Base.schema";

export interface IChatRoomUser {
  shopUserKey: string;
  userName: string;
  userImage: string;
  isUserReaded: boolean;
}

export interface IChatRoomShop {
  shopKey: string;
  shopName: string;
  shopImage: string;
  isShopReaded: boolean;
}
export interface IChatRoomSchema {
  orderId: number;
  shopId: number;
  shopUserId: number;
  shop: IChatRoomShop;
  user: IChatRoomUser;
  lastMessage: string;
  lastMessageDate: Date;
  updDate: Date;
}
type IChatRoomModel = Model<IChatRoomSchema>;
export interface IChatRoomDocument extends IChatRoomSchema {
  _id: string;
  key: string;
}

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

@Schema({ timestamps: true, _id: true })
export class ChatRoom extends _BaseSchema {
  @Prop()
  orderId!: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  shop!: IChatRoomShop;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  user!: IChatRoomUser;

  @Prop()
  shopId!: number;

  @Prop()
  shopUserId!: number;

  @Prop()
  lastMessage!: string;

  @Prop()
  lastMessageDate!: Date;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
ChatRoomSchema.index({ key: 1 }, { unique: true });
