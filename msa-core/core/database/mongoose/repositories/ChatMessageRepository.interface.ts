import { ChatMessageType, MessageSender } from "../schemas/ChatMessage.schema";

export type IFloristChatMessagesPayload = {
  chatRoomKey: string;
  pageNum: number;
};

export type IUserChatMessagesPayload = {
  chatRoomKey: string;
  pageNum: number;
};

export interface IChatMessageResult {
  sender: MessageSender;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
}

export type IFloristChatMessagesEachResult = IChatMessageResult;
export type IUserChatMessagesEachResult = IChatMessageResult;
