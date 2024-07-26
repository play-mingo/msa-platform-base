import { Controller, Get } from "@nestjs/common";
import { CsAppService } from "./cs-app.service";

@Controller()
export class CsAppController {
  constructor(private readonly csAppService: CsAppService) {}

  @Get()
  getHello(): string {
    return this.csAppService.getHello();
  }
}
