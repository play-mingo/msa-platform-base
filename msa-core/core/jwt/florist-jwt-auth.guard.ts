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
export class FloristJwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    const payload: FloristJwtAuthPayload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    request.florist = payload;
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
