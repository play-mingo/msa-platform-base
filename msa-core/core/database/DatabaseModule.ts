import { Module } from "@nestjs/common";
import { TypeormTransactionalModule } from "./typerom/TypeormTransactionalModule";
import { MongooseDatabaseModule } from "./mongoose/MongooseDatabaseModule";

@Module({
  imports: [TypeormTransactionalModule, MongooseDatabaseModule],
  exports: [TypeormTransactionalModule, MongooseDatabaseModule],
})
export class DatabaseModule {}
