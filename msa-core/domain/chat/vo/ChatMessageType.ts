import { MessageSender } from "./MessageSender";

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
