import { UseGuards } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { CHAT_TOPIC } from "core/constant/chat.msa.topic";
import { CHAT_SOCKET_EVENT, CHAT_SOCKET_MESSAGE } from "core/constant/chat.socket.message";
import { FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";
import { FloristJwtAuthWsGuard } from "core/jwt/florist-jwt-auth.ws.guard";
import { Florist } from "core/jwt/florist.request.data.decorator";
import { WsFlorist } from "core/jwt/florist.request.data.ws.decorator";
import { User, UserSessionAuthPayload } from "core/jwt/user.request.data.decorator";
import { setupUserWsSession } from "core/jwt/ws.session.config";
import { Server, Socket } from "socket.io";
import {
  IFloristChatMessagesListResult,
  IFloristSendMessageResult,
  IUserChatMessagesListResult,
  IUserSendMessageResult,
} from "usecase/chat/chat.result";
import { ChatService } from "./chat.service";
import { FloristChatMessagesPayload, FloristSendMessagePayload, UserChatMessagesPayload, UserSendMessagePayload } from "./dto/chat.dto";

@WebSocketGateway({
  namespace: "/socket/chat",
  cors: {
    origin: "*",
    credential: true,
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  userInSocketRequest = (socket: Socket): UserSessionAuthPayload => {
    if (!socket.request || !(socket.request as any).user) throw new Error("socket.request.user is required");
    return (socket.request as any).user;
  };

  @WebSocketServer()
  server!: Server;

  async afterInit(io: Socket) {
    await setupUserWsSession(io);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("client connected");
  }

  handleDisconnect(client: any) {
    console.log("client disconnected");
  }

  /**
   * 꽃집 채팅방 입장
   */
  @SubscribeMessage(CHAT_SOCKET_MESSAGE.FLORIST.JOIN_ROOM)
  async floristJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: unknown) {
    console.log("joinRoom", data);
    const { chatRoomId } = data as { chatRoomId: string };
    if (!chatRoomId) throw new Error(`chatRoomId is required :: ${chatRoomId}`);
    await socket.join(chatRoomId);
  }

  /**
   * 사용자 채팅방 입장
   */
  @SubscribeMessage(CHAT_SOCKET_MESSAGE.USER.JOIN_ROOM)
  async userJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: unknown) {
    console.log("joinRoom", data);
    const { chatRoomId } = data as { chatRoomId: string };
    if (!chatRoomId) throw new Error(`chatRoomId is required :: ${chatRoomId}`);
    await socket.join(chatRoomId);
  }

  /**
   * 꽃집 채팅방 퇴장
   */
  @SubscribeMessage(CHAT_SOCKET_MESSAGE.FLORIST.LEAVE_ROOM)
  async floristLeaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: unknown) {
    console.log("leaveRoom", data);
    const { chatRoomId } = data as { chatRoomId: string };
    if (!chatRoomId) throw new Error(`chatRoomId is required :: ${chatRoomId}`);
    await socket.leave(chatRoomId);
  }

  /**
   * 사용자 채팅방 퇴장
   */
  @SubscribeMessage(CHAT_SOCKET_MESSAGE.USER.LEAVE_ROOM)
  async leaveRoom(@ConnectedSocket() socket: Socket, @MessageBody() data: unknown) {
    console.log("leaveRoom", data);
    const { chatRoomId } = data as { chatRoomId: string };
    if (!chatRoomId) throw new Error(`chatRoomId is required :: ${chatRoomId}`);
    await socket.leave(chatRoomId);
  }

  /**
   * 꽃집 채팅 메시지 조회
   */
  @UseGuards(FloristJwtAuthWsGuard)
  @SubscribeMessage(CHAT_TOPIC.FLORIST.CHAT_MESSAGES)
  async floristChatMessages(
    @ConnectedSocket() socket: Socket,
    @WsFlorist() shop: FloristJwtAuthPayload,
    @MessageBody() payload: FloristChatMessagesPayload,
  ): Promise<void> {
    const result: IFloristChatMessagesListResult = await this.chatService.floristChatMessages(payload);
    this.server.to(socket.id).emit(CHAT_SOCKET_EVENT.COMMON.CHAT_MESSAGES, { message: result });
    return;
  }

  /**
   * 사용자 채팅 메시지 조회
   */
  // @UseGuards(UserSessionLoginedAuthWsGuard)
  @SubscribeMessage(CHAT_TOPIC.USER.CHAT_MESSAGES)
  async userChatMessages(
    @ConnectedSocket() socket: Socket,
    // @WsUser() wsWser: UserSessionAuthPayload,
    @MessageBody() payload: UserChatMessagesPayload,
  ): Promise<void> {
    const user: UserSessionAuthPayload = this.userInSocketRequest(socket);
    console.log("SocketRequest User", user);
    // console.log("SocketRequest wsWser", wsWser);
    const result: IUserChatMessagesListResult = await this.chatService.userChatMessages(payload);
    this.server.to(socket.id).emit(CHAT_SOCKET_EVENT.COMMON.CHAT_MESSAGES, { message: result });
    return;
  }

  /**
   * 꽃집 채팅 메시지 전송
   */
  @UseGuards(FloristJwtAuthWsGuard)
  @SubscribeMessage(CHAT_TOPIC.FLORIST.SEND_MESSAGE)
  async floristSendMessage(
    @ConnectedSocket() socket: Socket,
    @Florist() shop: FloristJwtAuthPayload,
    @MessageBody() payload: FloristSendMessagePayload,
  ): Promise<void> {
    const result: IFloristSendMessageResult = await this.chatService.floristSendMessage(payload);
    this.server.to(socket.id).emit(CHAT_SOCKET_EVENT.COMMON.CHAT_MESSAGES, { message: result });
    return;
  }

  /**
   * 사용자 채팅 메시지 전송
   */
  // @UseGuards(UserSessionLoginedAuthGuard)
  @SubscribeMessage(CHAT_TOPIC.USER.SEND_MESSAGE)
  async userSendMessage(
    @ConnectedSocket() socket: Socket,
    @User() user: UserSessionAuthPayload,
    @MessageBody() payload: UserSendMessagePayload,
  ): Promise<void> {
    const result: IUserSendMessageResult = await this.chatService.userSendMessage(payload);
    this.server.to(socket.id).emit(CHAT_SOCKET_EVENT.COMMON.CHAT_MESSAGES, { message: result });
    return;
  }
}
