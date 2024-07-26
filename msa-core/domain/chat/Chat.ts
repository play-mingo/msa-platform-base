import { AggregateRoot } from "@nestjs/cqrs";
import { ChatMessage } from "./ChatMessage";
import { ChatRoomKey } from "./key/ChatRoomKey";
import { MessageSender } from "./vo/MessageSender";

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

export interface ChatProps {
  shop: IChatRoomShop;
  user: IChatRoomUser;
  lastMessage: string;
  lastMessageDate: Date;
  updDate: Date;
}

export interface IChatBeforeSetupSender {
  chatRoomKey: Readonly<ChatRoomKey>;
  info: Readonly<ChatProps>;
  setupSender: (sender: MessageSender) => IChatAfterSetupSender;
}

export interface IChatAfterSetupSender {
  chatRoomKey: Readonly<ChatRoomKey>;
  info: Readonly<ChatProps>;
  sender: Readonly<MessageSender>;
  addMessage: (message: ChatMessage) => void;
  messages: Readonly<ChatMessage[]>;
}

export class Chat extends AggregateRoot {
  private _sender?: MessageSender;
  private _messages: ChatMessage[] = [];
  constructor(private readonly _chatRoomKey: ChatRoomKey, private _chatInfo: ChatProps) {
    super();
  }

  static create(chatRoomKey: ChatRoomKey, shop: IChatRoomShop, user: IChatRoomUser): Chat {
    return new Chat(chatRoomKey, {
      shop,
      user,
      lastMessage: "",
      lastMessageDate: new Date(),
      updDate: new Date(),
    });
  }

  public get chatRoomKey(): Readonly<ChatRoomKey> {
    return this._chatRoomKey;
  }

  public get info(): Readonly<ChatProps> {
    return this._chatInfo;
  }

  public get sender(): Readonly<MessageSender> {
    return this._sender as MessageSender;
  }

  public get messages(): Readonly<ChatMessage[]> {
    return this._messages;
  }

  public setupSender(sender: MessageSender): IChatAfterSetupSender {
    this._sender = sender;
    return this as IChatAfterSetupSender;
  }

  public addMessage(message: ChatMessage): IChatAfterSetupSender {
    this._messages.push(message);
    this._chatInfo.lastMessage = message.message || "사진을 보냈습니다." || "주문정보를 보냈습니다.";
    this._chatInfo.updDate = new Date();
    if (this._sender === MessageSender.SHOP) {
      this._chatInfo.user.isUserReaded = false;
      this._chatInfo.shop.isShopReaded = true;
    } else {
      this._chatInfo.user.isUserReaded = true;
      this._chatInfo.shop.isShopReaded = false;
    }
    return this as IChatAfterSetupSender;
  }
}
