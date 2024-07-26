import { ApiProperty, PickType } from "@nestjs/swagger";
import { ChatMessageType } from "domain/chat/vo/ChatMessageType";
import {
  IFloristChatMessagesPayload,
  IFloristChatRoomsPayload,
  IFloristSendMessagePayload,
  IUserChatMessagesPayload,
  IUserChatRoomsPayload,
  IUserSendMessagePayload,
} from "usecase/chat/chat.payload";

export class ChatRoomPayload {
  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;
}

export class ChatMessagePayload {
  @ApiProperty({ example: "04f2742f4e5c49e38587cca28023ccf8", description: "채팅방 키" })
  chatRoomKey!: string;

  @ApiProperty({ example: 1, description: "페이지 번호" })
  pageNum!: number;

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
}
export class FloristChatRoomsPayload extends PickType(ChatRoomPayload, ["pageNum"]) implements Omit<IFloristChatRoomsPayload, "shopId"> {}
export class UserChatRoomsPayload extends PickType(ChatRoomPayload, ["pageNum"]) implements Omit<IUserChatRoomsPayload, "shopUserId"> {}
export class FloristChatMessagesPayload extends PickType(ChatMessagePayload, ["chatRoomKey", "pageNum"]) implements IFloristChatMessagesPayload {}
export class UserChatMessagesPayload extends PickType(ChatMessagePayload, ["chatRoomKey", "pageNum"]) implements IUserChatMessagesPayload {}
export class FloristSendMessagePayload
  extends PickType(ChatMessagePayload, ["chatRoomKey", "type", "message", "image", "info"] as const)
  implements IFloristSendMessagePayload {}
export class UserSendMessagePayload
  extends PickType(ChatMessagePayload, ["chatRoomKey", "type", "message", "image", "info"] as const)
  implements IUserSendMessagePayload {}
