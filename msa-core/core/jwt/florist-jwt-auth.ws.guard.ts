import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { jwtConstants } from "./jwt.config";
import { LoginType } from "domain/shop/vo";

export interface FloristJwtAuthPayload {
  key: string;
  shopKey: string;
  shopId: number;
  authId: string;
  login_type: LoginType;
}

@Injectable()
export class FloristJwtAuthWsGuard extends AuthGuard("jwt") {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const clinet = context.switchToWs().getClient();
    const token: string | undefined = this.extractTokenFromHeader(clinet.handshake);
    if (!token) throw new UnauthorizedException();
    const payload: FloristJwtAuthPayload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    clinet.florist = payload;
    try {
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request.headers.authorization);
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
