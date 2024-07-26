import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UserSessionWsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export function wsAuthMiddleware(socket: any, next: any) {
  try {
    if (socket.request.session) socket.request.user = socket.request.session.passport.user;
    return next();
  } catch (error) {
    socket.emit("error", error);
    return next(error);
  }
}
