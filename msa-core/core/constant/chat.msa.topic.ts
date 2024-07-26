export const CHAT_TOPIC = {
  FLORIST: {
    CREATE_CHAT_ROOM: "chat.florist.createChatRoom",
    CHAT_ROOMS: "chat.florist.chatRooms",
    CHAT_MESSAGES: "chat.florist.chatMessages",
    SEND_MESSAGE: "chat.florist.sendMessage",
  },
  USER: {
    CREATE_CHAT_ROOM: "chat.user.createChatRoom",
    CHAT_ROOMS: "chat.user.chatRooms",
    CHAT_MESSAGES: "chat.user.chatMessages",
    SEND_MESSAGE: "chat.user.sendMessage",
  },
};

export const CHAT_TOPICS = [
  CHAT_TOPIC.FLORIST.CHAT_ROOMS,
  CHAT_TOPIC.FLORIST.CHAT_MESSAGES,
  CHAT_TOPIC.FLORIST.SEND_MESSAGE,
  CHAT_TOPIC.USER.CHAT_ROOMS,
  CHAT_TOPIC.USER.CHAT_MESSAGES,
  CHAT_TOPIC.USER.SEND_MESSAGE,
];
