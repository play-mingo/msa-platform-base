export const MessageSender = {
  SHOP: 0,
  USER: 1,
} as const;
export type MessageSender = (typeof MessageSender)[keyof typeof MessageSender];
export const MessageSenders = Object.values(MessageSender);
