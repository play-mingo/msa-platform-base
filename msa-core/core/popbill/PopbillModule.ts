import { Module } from "@nestjs/common";
import { Popbill } from "./Popbill";

@Module({
  imports: [],
  controllers: [],
  providers: [Popbill],
  exports: [Popbill],
})
export class PopbillModule {}
