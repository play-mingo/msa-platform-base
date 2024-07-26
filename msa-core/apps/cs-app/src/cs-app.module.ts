import { Module } from "@nestjs/common";
import { CsAppController } from "./cs-app.controller";
import { CsAppService } from "./cs-app.service";

@Module({
  imports: [],
  controllers: [CsAppController],
  providers: [CsAppService],
})
export class CsAppModule {}
