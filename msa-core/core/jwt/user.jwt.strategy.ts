import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./jwt.config";
import { Strategy } from "passport-custom";

export interface UserJwtAuthPayload {
  type: string;
  key: string;
  shopUserId: number;
  shopLink: string;
  role: string;
}

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, "user-jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserJwtAuthPayload) {
    return payload;
  }
}
