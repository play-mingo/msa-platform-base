import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { _BaseSchema } from "./_Base.schema";

export const MessageSender = {
  SHOP: 0,
  USER: 1,
} as const;
export type MessageSender = (typeof MessageSender)[keyof typeof MessageSender];
export const MessageSenders = Object.values(MessageSender);

export const ChatMessageType = {
  TEXT: 0,
  IMAGE: 1,
  INFO: 2,
} as const;
export type ChatMessageType = (typeof ChatMessageType)[keyof typeof ChatMessageType];
export const ChatMessageTypes = Object.values(ChatMessageType);
export interface ChatMessageTotalType {
  sender: MessageSender;
  type: ChatMessageType;
  message: string;
  image: string;
  info: any;
}
export interface ChatMessageInfoTextType extends ChatMessageTotalType {
  sender: MessageSender;
  type: typeof ChatMessageType.TEXT;
  message: string;
}

export interface ChatMessageInfoImageType extends ChatMessageTotalType {
  sender: MessageSender;
  type: typeof ChatMessageType.IMAGE;
  image: string;
}

export interface ChatMessageInfoInfoType extends ChatMessageTotalType {
  sender: MessageSender;
  type: typeof ChatMessageType.INFO;
  info: any;
}

export type ChatMessageInfo = ChatMessageInfoTextType | ChatMessageInfoImageType | ChatMessageInfoInfoType;

export interface IChatMessageSchema {
  chatRoomId: string;
  sender: MessageSender;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
}
type IChatMessageModel = Model<IChatMessageSchema>;
export type IChatMessageDocument = IChatMessageSchema;

export type ChatMessageDocument = HydratedDocument<ChatMessage>;

@Schema({ timestamps: true, _id: true })
export class ChatMessage extends _BaseSchema implements ChatMessageTotalType {
  @Prop({ required: true })
  chatRoomId!: string;

  @Prop({ required: true })
  sender!: MessageSender;

  @Prop({ required: true })
  type!: ChatMessageType;

  @Prop({ required: false })
  message!: string;

  @Prop({ required: false })
  image!: string;

  @Prop({ required: false, type: Object })
  info!: any;
}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
ChatMessageSchema.index({ chatRoomId: 1, indDate: -1 });
