export const AUTH_TOPIC = {
  FLORIST: {
    NORMAL_LOGIN: "auth.florist.normalLogin",
    NORMAL_JOIN: "auth.florist.normalJoin",
    KAKAO_LOGIN: "auth.florist.kakaoLogin",
    APPLE_LOGIN: "auth.florist.appleLogin",
    FIND_ID: "auth.florist.findId",
  },
  USER: {
    NORMAL_LOGIN: "auth.user.normalLogin",
    NORMAL_JOIN: "auth.user.normalJoin",
  },
};

export const AUTH_TOPICS = [
  AUTH_TOPIC.FLORIST.NORMAL_LOGIN,
  AUTH_TOPIC.FLORIST.NORMAL_JOIN,
  AUTH_TOPIC.FLORIST.KAKAO_LOGIN,
  AUTH_TOPIC.FLORIST.APPLE_LOGIN,
  AUTH_TOPIC.FLORIST.FIND_ID,
  AUTH_TOPIC.USER.NORMAL_LOGIN,
  AUTH_TOPIC.USER.NORMAL_JOIN,
];
