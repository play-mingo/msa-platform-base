import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/DatabaseModule";

@Module({
  // imports: [MessagingModule, DatabaseModule],
  imports: [DatabaseModule],
  providers: [],
  // exports: [MessagingModule, DatabaseModule],
  exports: [DatabaseModule],
})
export class CoreModule {}
