import { Injectable } from "@nestjs/common";

@Injectable()
export class GatewayAppService {
  getHello(): string {
    return "Hello Hero :)";
  }
}
