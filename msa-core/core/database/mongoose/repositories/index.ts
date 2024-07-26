import { ChatMessageRepository } from "./ChatMessageRepository";
import { ChatRoomRepository } from "./ChatRoomRepository";

export * from "./ChatRoomRepository";
export * from "./ChatMessageRepository";

export const MongooseRepositories = [ChatRoomRepository, ChatMessageRepository];
