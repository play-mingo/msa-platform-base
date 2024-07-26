import { IFloristCreateRoomPayload, IFloristSendMessagePayload, IUserCreateRoomPayload, IUserSendMessagePayload } from "./chat.payload";

/**
 * 채팅 메시지 전송 Command
 * @property data.chatRoomKey 채팅방 키
 */
export class ChatFloristSendMessageCommand {
  constructor(public readonly data: IFloristSendMessagePayload) {}
}

/**
 * 채팅 메시지 전송 Command
 * @property data.chatRoomKey 채팅방 키
 */
export class ChatUserSendMessageCommand {
  constructor(public readonly data: IUserSendMessagePayload) {}
}

/**
 * 꽃집 채팅방 생성 Command
 * @property data.orderKey 주문 키
 */
export class ChatFloristCreateRoomCommand {
  constructor(public readonly data: IFloristCreateRoomPayload) {}
}

/**
 * 사용자 채팅방 생성 Command
 * @property data.orderKey 주문 키
 */
export class ChatUserCreateRoomCommand {
  constructor(public readonly data: IUserCreateRoomPayload) {}
}

export const ChatCommands = [ChatFloristSendMessageCommand, ChatUserSendMessageCommand, ChatFloristCreateRoomCommand, ChatUserCreateRoomCommand];
