import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { moduleSchemas } from "./schemas/schema.config";
import mongoose from "mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("PROJECT_MONGODB_URI"),
        user: configService.get<string>("PROJECT_MONGO_INITDB_ROOT_USERNAME"),
        pass: configService.get<string>("PROJECT_MONGO_INITDB_ROOT_PASSWORD"),
        dbName: configService.get<string>("PROJECT_MONGO_INITDB_DATABASE"),
      }),
    }),
    MongooseModule.forFeature(moduleSchemas),
  ],
  exports: [MongooseModule, MongooseModule.forFeature(moduleSchemas)],
})
export class MongooseDatabaseModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    console.log("MongooseDatabaseModule onModuleInit");
    mongoose.set("debug", true);
  }
  onModuleDestroy() {
    console.log("MongooseDatabaseModule onModuleDestroy");
  }
}
