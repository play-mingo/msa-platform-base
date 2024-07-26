export type IFloristChatRoomsPayload = {
  shopId: number;
  pageNum: number;
};

export type IUserChatRoomsPayload = {
  shopUserId: number;
  pageNum: number;
};

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

export type IFloristChatRoomsEachResult = Pick<IChatRoomResult, "charRoomKey" | "user" | "lastMessage" | "lastMessageDate">;
export interface IFloristChatRoomsListResult {
  pageNum: number;
  totalCount: number;
  list: IFloristChatRoomsEachResult[];
}

export type IUserChatRoomsEachResult = Pick<IChatRoomResult, "charRoomKey" | "shop" | "lastMessage" | "lastMessageDate">;
export interface IUserChatRoomsListResult {
  pageNum: number;
  totalCount: number;
  list: IUserChatRoomsEachResult[];
}
