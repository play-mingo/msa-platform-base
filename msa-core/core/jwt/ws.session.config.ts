import RedisStore from "connect-redis";
import cookieParser from "cookie-parser";
import session from "express-session";
import { createClient } from "redis";
import { Socket } from "socket.io";

export const sessionConstants = {
  secret: process.env.JWT_SECRET_KEY,
};

export const setupUserWsSession = async (io: Socket) => {
  const redisClient = await createClient({
    socket: {
      host: process.env.PROJECT_REDIS_HOST,
      port: +(process.env.PROJECT_REDIS_PORT as string),
    },
    password: process.env.PROJECT_REDIS_PASSWORD as string,
  }).connect();
  await redisClient.set("connect_time", new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
  const redisStore = new RedisStore({ client: redisClient });
  const sessionMiddleware = session({
    store: redisStore,
    secret: sessionConstants.secret as string,
    resave: false,
    saveUninitialized: false,
    name: "user-session",
  });

  const wsAuthMiddleware = (socket: any, next: any) => {
    try {
      socket.request.user = socket.request.session.passport.user;
    } catch (error) {
      // socket.emit("error", "Please login first");
      // console.log("ws AuthMiddleware error", error);
      // throw new WsException("Please login first");
    }
    return next();
  };

  const wrap = (middleware: any) => (socket: any, next: any) => middleware(socket.request, {}, next);
  io.use(wrap(cookieParser(sessionConstants.secret)));
  io.use(wrap(sessionMiddleware));
  io.use((socket, next) => wsAuthMiddleware(socket, next));
};
