import { JwtService as Jwt, JwtSignOptions } from "@nestjs/jwt";
import { jwtConstants } from "core/jwt/jwt.config";
import { JwtAuth } from "core/jwt/JwtAuth";
import { UserJwtAuthPayload } from "core/jwt/user.jwt.strategy";
import { LoginType } from "domain/shop/vo";
export interface FloristJwtAuthPayload {
  key: string;
  shopKey: string;
  shopId: number;
  authId: string;
  login_type: LoginType;
}

export interface FloristJwtAuthOption extends JwtSignOptions {
  expiresIn: string;
}

export class FloristJwtAuth extends JwtAuth<FloristJwtAuthPayload, FloristJwtAuthOption> {
  constructor(jwt: Jwt) {
    super(jwt);
  }

  public async floristSign(payload: FloristJwtAuthPayload): Promise<string> {
    return await this.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: "15d",
    });
  }
}

export type IUserJwtAuthPayload = UserJwtAuthPayload;
export interface UserJwtAuthOption extends JwtSignOptions {
  expiresIn: string;
}

export class UserJwtAuth extends JwtAuth<IUserJwtAuthPayload, UserJwtAuthOption> {
  constructor(jwt: Jwt) {
    super(jwt);
  }

  public async UserSign(payload: IUserJwtAuthPayload): Promise<string> {
    return await this.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: "15d",
    });
  }
}
