import { Injectable } from "@nestjs/common";
import { JwtService as Jwt, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class JwtAuth<Payload extends object, Option extends JwtSignOptions> {
  constructor(private readonly jwt: Jwt) {}

  protected async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token);
  }

  protected async verify(token: string): Promise<any> {
    return this.jwt.verify(token);
  }

  protected async sign(payload: Payload, option: Option): Promise<string> {
    return await this.jwt.sign(payload, option);
  }
}
