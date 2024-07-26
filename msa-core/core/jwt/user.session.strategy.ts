import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "apps/gateway-app/src/api/auth/auth.service";
// import { Strategy } from "passport-local";
import { Strategy } from "passport-custom";
import { UserSessionAuthPayload } from "./user.request.data.decorator";
import { Request } from "express";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request, done: CallableFunction) {
    const { userName, userPhone, shopKey, shopLink } = req.body;
    const user = await this.authService.userLogin({
      userName,
      userPhone,
      shopLink,
      shopKey,
    });
    const userSession: UserSessionAuthPayload = {
      type: "session",
      key: user.shopUserkey,
      shopUserId: user.shopUserId,
      userName: user.shopUserName,
      shopLink: user.shopLink,
      role: "user",
    };
    return await done(null, userSession);
  }
}
