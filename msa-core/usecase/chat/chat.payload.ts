import { ChatMessageType } from "domain/chat/vo/ChatMessageType";

export type IFloristChatRoomsPayload = {
  shopId: number;
  pageNum: number;
};

export type IUserChatRoomsPayload = {
  shopUserId: number;
  pageNum: number;
};

export type IFloristChatMessagesPayload = {
  chatRoomKey: string;
  pageNum: number;
};

export type IUserChatMessagesPayload = {
  chatRoomKey: string;
  pageNum: number;
};

export type IFloristSendMessagePayload = {
  chatRoomKey: string;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
};

export type IUserSendMessagePayload = {
  chatRoomKey: string;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
};

export type IFloristCreateRoomPayload = {
  orderKey: string;
};

export type IUserCreateRoomPayload = {
  orderKey: string;
};
