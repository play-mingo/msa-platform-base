import { IFloristChatMessagesPayload, IFloristChatRoomsPayload, IUserChatMessagesPayload, IUserChatRoomsPayload } from "./chat.payload";

/**
 * 채팅방 목록 조회 Query
 * @property data.shopId 꽃집 ID
 * @property data.pageNum 페이지 번호
 */
export class ChatFloristChatRoomsQuery {
  constructor(public readonly data: IFloristChatRoomsPayload) {}
}

/**
 * 채팅방 목록 조회 Query
 * @property data.shopUserId 유저 ID
 * @property data.pageNum 페이지 번호
 */
export class ChatUserChatRoomsQuery {
  constructor(public readonly data: IUserChatRoomsPayload) {}
}

/**
 * 채팅 메시지 목록 조회 Query
 * @property data.chatRoomKey 채팅방 키
 * @property data.pageNum 페이지 번호
 */
export class ChatFloristChatMessagesQuery {
  constructor(public readonly data: IFloristChatMessagesPayload) {}
}

/**
 * 채팅 메시지 목록 조회 Query
 * @property data.chatRoomKey 채팅방 키
 * @property data.pageNum 페이지 번호
 */
export class ChatUserChatMessagesQuery {
  constructor(public readonly data: IUserChatMessagesPayload) {}
}

export const ChatQueries = [ChatFloristChatRoomsQuery, ChatUserChatRoomsQuery, ChatFloristChatMessagesQuery, ChatUserChatMessagesQuery];
