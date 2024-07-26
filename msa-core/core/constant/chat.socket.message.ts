export const CHAT_SOCKET_MESSAGE = {
  FLORIST: {
    JOIN_ROOM: "chat.florist.joinRoom",
    LEAVE_ROOM: "chat.florist.leaveRoom",
    CHAT_MESSAGES: "chat.florist.chatMessages",
    SEND_MESSAGE: "chat.florist.sendMessage",
  },
  USER: {
    JOIN_ROOM: "chat.user.joinRoom",
    LEAVE_ROOM: "chat.user.leaveRoom",
    CHAT_MESSAGES: "chat.user.chatMessages",
    SEND_MESSAGE: "chat.user.sendMessage",
  },
};

export const CHAT_SOCKET_EVENT = {
  COMMON: {
    JOIN_ROOM: "chat.common.joinRoom.reply",
    LEAVE_ROOM: "chat.common.leaveRoom.reply",
    CHAT_MESSAGES: "chat.common.messages.reply",
    NEW_MESSAGE: "chat.common.newMessage.reply",
  },
};

export const CHAT_SOCKET_TOPICS = [
  // client -> server
  CHAT_SOCKET_MESSAGE.FLORIST.JOIN_ROOM,
  CHAT_SOCKET_MESSAGE.FLORIST.LEAVE_ROOM,
  CHAT_SOCKET_MESSAGE.FLORIST.CHAT_MESSAGES,
  CHAT_SOCKET_MESSAGE.FLORIST.SEND_MESSAGE,
  CHAT_SOCKET_MESSAGE.USER.JOIN_ROOM,
  CHAT_SOCKET_MESSAGE.USER.LEAVE_ROOM,
  CHAT_SOCKET_MESSAGE.USER.CHAT_MESSAGES,
  CHAT_SOCKET_MESSAGE.USER.SEND_MESSAGE,
  // server -> client
  CHAT_SOCKET_EVENT.COMMON.JOIN_ROOM,
  CHAT_SOCKET_EVENT.COMMON.LEAVE_ROOM,
  CHAT_SOCKET_EVENT.COMMON.CHAT_MESSAGES,
  CHAT_SOCKET_EVENT.COMMON.NEW_MESSAGE,
];
