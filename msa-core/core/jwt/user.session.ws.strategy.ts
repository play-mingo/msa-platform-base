import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";

@Injectable()
export class WsSessionStrategy extends PassportStrategy(Strategy, "ws-session") {
  constructor() {
    super();
  }

  async validate(req: Request, done: CallableFunction) {
    return await done(null, req.user);
  }
}
