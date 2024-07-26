import { INestApplication } from "@nestjs/common";
import session from "express-session";
import passport from "passport";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import cookieParser from "cookie-parser";

export const sessionConstants = {
  secret: process.env.JWT_SECRET_KEY,
};

export const setupUserSession = async (app: INestApplication): Promise<void> => {
  const redisClient = await createClient({
    socket: {
      host: process.env.PROJECT_REDIS_HOST,
      port: +(process.env.PROJECT_REDIS_PORT as string),
    },
    password: process.env.PROJECT_REDIS_PASSWORD as string,
  }).connect();

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(cookieParser());
  app.use(
    session({
      store: redisStore,
      secret: sessionConstants.secret as string,
      resave: false,
      saveUninitialized: false,
      name: "user-session",
      // cookie: {
      //   // httpOnly: true,
      //   secure: true,
      //   maxAge: 1000 * 60 * 60, //세션이 redis에 저장되는 기간은 maxAge로 조절한다.(ms)
      // },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
