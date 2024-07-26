import { ChatMessage, ChatMessageSchema } from "./ChatMessage.schema";
import { ChatRoom, ChatRoomSchema } from "./ChatRoom.schema";

export const moduleSchemas = [
  { name: ChatRoom.name, schema: ChatRoomSchema },
  { name: ChatMessage.name, schema: ChatMessageSchema },
];
