import { ChatMessageKey } from "./key/ChatMessageKey";
import { ChatRoomKey } from "./key/ChatRoomKey";
import { ChatMessageType } from "./vo/ChatMessageType";
import { MessageSender } from "./vo/MessageSender";

export interface ChatMessageProps {
  sender: MessageSender;
  type: ChatMessageType;
  message?: string;
  image?: string;
  info?: any;
  insDate: Date;
}

export class ChatMessage {
  constructor(
    private readonly _chatMessageKey: ChatMessageKey,
    private readonly _chatRoomKey: ChatRoomKey,
    private readonly chatMessageProps: ChatMessageProps,
  ) {}

  get chatMessageKey(): Readonly<ChatMessageKey> {
    return this._chatMessageKey;
  }

  get chatRoomKey(): Readonly<ChatRoomKey> {
    return this._chatRoomKey;
  }

  get sender(): Readonly<MessageSender> {
    return this.chatMessageProps.sender;
  }

  get type(): Readonly<ChatMessageType> {
    return this.chatMessageProps.type;
  }

  get message(): string | any {
    switch (this.type) {
      case ChatMessageType.TEXT:
        return this.chatMessageProps.message;
      case ChatMessageType.IMAGE:
        return this.chatMessageProps.image;
      case ChatMessageType.INFO:
        return this.chatMessageProps.info;
    }
  }
}
