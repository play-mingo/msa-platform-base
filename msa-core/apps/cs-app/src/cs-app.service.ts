import { Injectable } from "@nestjs/common";

@Injectable()
export class CsAppService {
  getHello(): string {
    return "Hello World!";
  }
}
