import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { FloristJwtAuthGuard, FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";
import { Florist } from "core/jwt/florist.request.data.decorator";
import { UserSessionLoginedAuthGuard } from "core/jwt/user-session-logined-auth.guard";
import { User, UserSessionAuthPayload } from "core/jwt/user.request.data.decorator";
import {
  FloristChatMessagesApiResponse,
  FloristChatRoomsApiResponse,
  FloristSendMessageApiResponse,
  IFloristChatMessagesListResult,
  IFloristChatRoomsListResult,
  IFloristSendMessageResult,
  IUserChatMessagesListResult,
  IUserChatRoomsListResult,
  IUserSendMessageResult,
  UserChatMessagesApiResponse,
  UserChatRoomsApiResponse,
  UserSendMessageApiResponse,
} from "usecase/chat/chat.result";
import { ChatService } from "../../socket/chat/chat.service";
import {
  FloristChatMessagesPayload,
  FloristChatRoomsPayload,
  FloristSendMessagePayload,
  UserChatMessagesPayload,
  UserChatRoomsPayload,
  UserSendMessagePayload,
} from "../../socket/chat/dto/chat.dto";

@ApiTags("chat")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * 꽃집 채팅방 목록 조회
   */
  @Get("florist/rooms/:pageNum")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: "pageNum", required: true, type: "number", example: 1 })
  @ApiOkResponse(FloristChatRoomsApiResponse)
  async floristChatRooms(@Florist() shop: FloristJwtAuthPayload, @Param() payload: FloristChatRoomsPayload): Promise<IFloristChatRoomsListResult> {
    return await this.chatService.floristChatRooms({
      ...payload,
      shopId: shop.shopId,
    });
  }

  /**
   * 사용자 채팅방 목록 조회
   */
  @Get("user/rooms/:pageNum")
  @UseGuards(UserSessionLoginedAuthGuard)
  @ApiParam({ name: "pageNum", required: true, type: "number", example: 1 })
  @ApiOkResponse(UserChatRoomsApiResponse)
  async userChatRooms(@User() user: UserSessionAuthPayload, @Param() payload: UserChatRoomsPayload): Promise<IUserChatRoomsListResult> {
    return await this.chatService.userChatRooms({
      ...payload,
      shopUserId: user.shopUserId,
    });
  }

  /**
   * 꽃집 채팅 메시지 조회
   */
  @Get("florist/messages/:chatRoomKey/:pageNum")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: "chatRoomKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "채팅방키" })
  @ApiParam({ name: "pageNum", required: true, type: "number", example: 1 })
  @ApiOkResponse(FloristChatMessagesApiResponse)
  async floristChatMessages(
    @Florist() shop: FloristJwtAuthPayload,
    @Param() payload: FloristChatMessagesPayload,
  ): Promise<IFloristChatMessagesListResult> {
    return await this.chatService.floristChatMessages(payload);
  }

  /**
   * 사용자 채팅 메시지 조회
   */
  @Get("user/messages/:chatRoomKey/:pageNum")
  @UseGuards(UserSessionLoginedAuthGuard)
  @ApiParam({ name: "chatRoomKey", type: "string", example: "04f2742f4e5c49e38587cca28023ccf8", description: "채팅방키" })
  @ApiParam({ name: "pageNum", required: true, type: "number", example: 1 })
  @ApiOkResponse(UserChatMessagesApiResponse)
  async userChatMessages(@User() user: UserSessionAuthPayload, @Param() payload: UserChatMessagesPayload): Promise<IUserChatMessagesListResult> {
    return await this.chatService.userChatMessages(payload);
  }

  /**
   * 꽃집 채팅 메시지 전송
   */
  @Post("florist/send")
  @UseGuards(FloristJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse(FloristSendMessageApiResponse)
  async floristSendMessage(@Florist() shop: FloristJwtAuthPayload, @Body() payload: FloristSendMessagePayload): Promise<IFloristSendMessageResult> {
    return await this.chatService.floristSendMessage(payload);
  }

  /**
   * 사용자 채팅 메시지 전송
   */
  @Post("user/send")
  @UseGuards(UserSessionLoginedAuthGuard)
  @ApiOkResponse(UserSendMessageApiResponse)
  async userSendMessage(@User() user: UserSessionAuthPayload, @Body() payload: UserSendMessagePayload): Promise<IUserSendMessageResult> {
    return await this.chatService.userSendMessage(payload);
  }

  /**
   * 상담문의하기
   */
  // @Post("user/consult")
  // async userRequestConsult() {
  //   return async this.chatService.getFloristChatRooms(shop, payload);
  // }
}
