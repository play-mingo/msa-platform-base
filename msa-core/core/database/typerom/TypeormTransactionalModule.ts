import { Module, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions, Repository } from "typeorm";
import { addTransactionalDataSource, deleteDataSourceByName } from "typeorm-transactional";
import {
  TblOrder,
  TblOrderInfo,
  TblReview,
  TblShop,
  TblShopAdmin,
  TblShopAdminLoginInfo,
  TblShopProduct,
  TblShopUser,
  TblTerm,
  TblVerify,
} from "./entities";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await {
          type: "mysql",
          host: configService.get("PROJECT_MYSQL_HOST"),
          port: +(configService.get("PROJECT_MYSQL_PORT") as string),
          username: configService.get("PROJECT_MYSQL_USER"),
          password: configService.get("PROJECT_MYSQL_PASSWORD"),
          database: configService.get("PROJECT_MYSQL_DATABASE"),
          synchronize: false,
          logging: true,
          name: `connection_${process.env.MSA_NAME}_${process.env.INSTANCE_ID}_${Math.random()}`,
          entities: [
            TblOrder,
            TblOrderInfo,
            TblReview,
            TblShop,
            TblShopAdmin,
            TblShopAdminLoginInfo,
            TblShopProduct,
            TblShopUser,
            TblTerm,
            TblVerify,
          ],
        };
      },
      async dataSourceFactory(options: DataSourceOptions | undefined) {
        if (!options) {
          throw new Error("Invalid options passed");
        }
        deleteDataSourceByName("default");
        return await addTransactionalDataSource(new DataSource(options));
        // return addTransactionalDataSource(dataSource);
      },
    }),
  ],
  providers: [Repository],
  exports: [Repository],
})
export class TypeormTransactionalModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    console.log("TypeormTransactionalModule onModuleInit");
  }
  onModuleDestroy() {
    console.log("TypeormTransactionalModule onModuleDestroy");
  }
}
