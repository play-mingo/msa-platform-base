import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.PROJECT_MSA_ENV_FILE,
    }),
  ],
})
export class CustomConfigModule {}
