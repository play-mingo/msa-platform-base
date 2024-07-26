import { ApiProperty, PickType } from "@nestjs/swagger";
import { BaseResponse } from "apps/gateway-app/src/common/swagger/BaseResult";
import { ChatMessageType } from "domain/chat/vo/ChatMessageType";
import { MessageSender, MessageSenders } from "domain/chat/vo/MessageSender";

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
export interface IChatRoomResult {
  charRoomKey: string;
  shop: IChatRoomShop;
  user: IChatRoomUser;
  lastMessage: string;
  lastMessageDate: Date;
}

export class ChatRoomShop {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "꽃집키" })
  shopKey!: string;

  @ApiProperty({ example: "꽃집이름", description: "꽃집이름" })
  shopName!: string;

  @ApiProperty({ example: "/image.png", description: "꽃집이미지" })
  shopImage!: string;

  @ApiProperty({ example: true, description: "꽃집 읽음여부", enum: [true, false] })
  isShopReaded!: boolean;
}

export class ChatRoomUser {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "사용자키" })
  shopUserKey!: string;

  @ApiProperty({ example: "사용자이름", description: "사용자이름" })
  userName!: string;

  @ApiProperty({ example: "/image.png", description: "사용자이미지" })
  userImage!: string;

  @ApiProperty({ example: true, description: "사용자 읽음여부", enum: [true, false] })
  isUserReaded!: boolean;
}
export class CharRoomResult {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "채팅방 키" })
  charRoomKey!: string;

  @ApiProperty({ description: "꽃집 정보", type: ChatRoomShop })
  shop!: ChatRoomShop;

  @ApiProperty({ description: "사용자 정보", type: ChatRoomUser })
  user!: ChatRoomUser;

  @ApiProperty({ example: "안녕하세요", description: "마지막 메시지" })
  lastMessage!: string;

  @ApiProperty({ example: "2021-09-01T00:00:00", description: "마지막 메시지 날짜" })
  lastMessageDate!: Date;
}

export interface IChatMessageResult {
  sender: MessageSender;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
  sendDate: Date;
}

export class ChatMessageResult {
  @ApiProperty({ example: MessageSender.SHOP, type: MessageSender, enum: MessageSenders, description: "메시지 보낸사람 ( 0: 꽃집, 1: 사용자 )" })
  sender!: MessageSender;

  @ApiProperty({
    example: ChatMessageType.TEXT,
    type: ChatMessageType,
    enum: ChatMessageType,
    description: "메시지 타입( 0: 텍스트, 1: 이미지, 2: 주문정보 )",
  })
  type!: ChatMessageType;

  @ApiProperty({ example: "안녕하세요", description: "메시지", required: false })
  message?: string;

  @ApiProperty({ example: "/image.png", description: "이미지", required: false })
  image?: string;

  @ApiProperty({ example: {}, description: "주문정보", required: false })
  info?: any;

  @ApiProperty({ example: "2021-09-01T00:00:00", description: "전송일자" })
  sendDate!: Date;
}

/**
 * 꽃집 채팅방 목록 조회 - 페이징 결과
 */
export type IFloristChatRoomsEachResult = Pick<IChatRoomResult, "charRoomKey" | "user" | "lastMessage" | "lastMessageDate">;
export interface IFloristChatRoomsListResult {
  pageNum: number;
  totalCount: number;
  list: IFloristChatRoomsEachResult[];
}
export class FloristChatRoomsEachResult
  extends PickType(CharRoomResult, ["charRoomKey", "user", "lastMessage", "lastMessageDate"])
  implements IFloristChatRoomsEachResult {}
export class FloristChatRoomsListResult implements IFloristChatRoomsListResult {
  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;

  @ApiProperty({ example: 20, description: "전체 건수" })
  totalCount!: number;

  @ApiProperty({ description: "채팅방 목록", type: [FloristChatRoomsEachResult] })
  list!: FloristChatRoomsEachResult[];
}
export class FloristChatRoomsResponse extends BaseResponse<FloristChatRoomsListResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristChatRoomsListResult })
  data!: FloristChatRoomsListResult;
}
export const FloristChatRoomsApiResponse = {
  status: 200,
  type: FloristChatRoomsResponse,
};

/**
 * 사용자 채팅방 목록 조회 - 페이징 결과
 */
export type IUserChatRoomsEachResult = Pick<IChatRoomResult, "charRoomKey" | "shop" | "lastMessage" | "lastMessageDate">;
export interface IUserChatRoomsListResult {
  pageNum: number;
  totalCount: number;
  list: IUserChatRoomsEachResult[];
}
export class UserChatRoomsEachResult
  extends PickType(CharRoomResult, ["charRoomKey", "shop", "lastMessage", "lastMessageDate"])
  implements IUserChatRoomsEachResult {}
export class UserChatRoomsListResult implements IUserChatRoomsListResult {
  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;

  @ApiProperty({ example: 20, description: "전체 건수" })
  totalCount!: number;

  @ApiProperty({ description: "채팅방 목록", type: [UserChatRoomsEachResult] })
  list!: UserChatRoomsEachResult[];
}
export class UserChatRoomsResponse extends BaseResponse<UserChatRoomsListResult> {
  @ApiProperty({ description: "응답 데이터", type: UserChatRoomsListResult })
  data!: UserChatRoomsListResult;
}
export const UserChatRoomsApiResponse = {
  status: 200,
  type: UserChatRoomsResponse,
};

/**
 * 꽃집 채팅 메시지 조회 - 페이징 결과
 */
export type IFloristChatMessagesEachResult = IChatMessageResult;
export interface IFloristChatMessagesListResult {
  pageNum: number;
  totalCount: number;
  list: IFloristChatMessagesEachResult[];
}
export class FloristChatMessagesEachResult extends ChatMessageResult implements IFloristChatMessagesEachResult {}
export class FloristChatMessagesListResult implements IFloristChatMessagesListResult {
  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;

  @ApiProperty({ example: 100, description: "전체 건수" })
  totalCount!: number;

  @ApiProperty({ description: "채팅 메시지 목록", type: [FloristChatMessagesEachResult] })
  list!: FloristChatMessagesEachResult[];
}
export class FloristChatMessagesResponse extends BaseResponse<FloristChatMessagesListResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristChatMessagesListResult })
  data!: FloristChatMessagesListResult;
}
export const FloristChatMessagesApiResponse = {
  status: 200,
  type: FloristChatMessagesResponse,
};

/**
 * 사용자 채팅 메시지 조회 - 페이징 결과
 */
export type IUserChatMessagesEachResult = IChatMessageResult;
export interface IUserChatMessagesListResult {
  pageNum: number;
  totalCount: number;
  list: IUserChatMessagesEachResult[];
}
export class UserChatMessagesEachResult extends ChatMessageResult implements IUserChatMessagesEachResult {}
export class UserChatMessagesListResult implements IUserChatMessagesListResult {
  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;

  @ApiProperty({ example: 100, description: "전체 건수" })
  totalCount!: number;

  @ApiProperty({ description: "채팅 메시지 목록", type: [UserChatMessagesEachResult] })
  list!: IUserChatMessagesEachResult[];
}
export class UserChatMessagesResponse extends BaseResponse<UserChatMessagesListResult> {
  @ApiProperty({ description: "응답 데이터", type: UserChatMessagesListResult })
  data!: UserChatMessagesListResult;
}
export const UserChatMessagesApiResponse = {
  status: 200,
  type: UserChatMessagesResponse,
};

/**
 * 꽃집 채팅 메시지 전송
 */
export type IFloristSendMessageResult = object;
export class FloristSendMessageResult implements IFloristSendMessageResult {}
export class FloristSendMessageResponse extends BaseResponse<IFloristSendMessageResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristSendMessageResult })
  data!: FloristSendMessageResult;
}
export const FloristSendMessageApiResponse = {
  status: 200,
  type: FloristSendMessageResponse,
};

/**
 * 사용자 채팅 메시지 전송
 */
export type IUserSendMessageResult = object;
export class UserSendMessageResult implements IUserSendMessageResult {}
export class UserSendMessageResponse extends BaseResponse<IUserSendMessageResult> {
  @ApiProperty({ description: "응답 데이터", type: UserSendMessageResult })
  data!: UserSendMessageResult;
}
export const UserSendMessageApiResponse = {
  status: 200,
  type: UserSendMessageResponse,
};

/**
 * 상담문의하기
 */
export type IUserRequestConsultResult = object;
export class UserRequestConsultResult implements IUserRequestConsultResult {}
export class UserRequestConsultResponse extends BaseResponse<IUserRequestConsultResult> {
  @ApiProperty({ description: "응답 데이터", type: UserRequestConsultResult })
  data!: UserRequestConsultResult;
}
export const UserRequestConsultApiResponse = {
  status: 200,
  type: UserRequestConsultResponse,
};

/**
 * 꽃집 채팅방 생성
 */
export type IFloristCreateRoomResult = object;
export class FloristCreateRoomResult implements IFloristCreateRoomResult {}
export class FloristCreateRoomResponse extends BaseResponse<IFloristCreateRoomResult> {
  @ApiProperty({ description: "응답 데이터", type: FloristCreateRoomResult })
  data!: FloristCreateRoomResult;
}
export const FloristCreateRoomApiResponse = {
  status: 200,
  type: FloristCreateRoomResponse,
};

/**
 * 사용자 채팅방 생성
 */
export type IUserCreateRoomResult = object;
export class UserCreateRoomResult implements IUserCreateRoomResult {}
export class UserCreateRoomResponse extends BaseResponse<IUserCreateRoomResult> {
  @ApiProperty({ description: "응답 데이터", type: UserCreateRoomResult })
  data!: UserCreateRoomResult;
}
export const UserCreateRoomApiResponse = {
  status: 200,
  type: UserCreateRoomResponse,
};
