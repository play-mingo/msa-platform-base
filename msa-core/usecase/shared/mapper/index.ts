import { ShopAdminEntityMapper } from "./ShopAdminEntityMapper";
import { ShopAdminLoginInfoEntityMapper } from "./ShopAdminLoginInfoEntityMapper";
import { ShopEntityMapper } from "./ShopEntityMapper";
import { ShopProductEntityMapper } from "./ShopProductEntityMapper";
import { OrderEntityMapper } from "./OrderEntityMapper";
import { OrderInfoEntityMapper } from "./OrderInfoEntityMapper";
import { ReviewEntityMapper } from "./ReviewEntityMapper";
import { ShopUserEntityMapper } from "./ShopUserEntityMapper";
import { VerifyEntityMapper } from "./VerifyEntityMapper";
import { ChatSchemaMapper } from "./ChatSchemaMapper";

export * from "./ShopAdminEntityMapper";
export * from "./ShopAdminLoginInfoEntityMapper";
export * from "./ShopEntityMapper";
export * from "./ShopUserEntityMapper";
export * from "./ShopProductEntityMapper";
export * from "./OrderEntityMapper";
export * from "./OrderInfoEntityMapper";
export * from "./ReviewEntityMapper";
export * from "./VerifyEntityMapper";
export * from "./ChatSchemaMapper";

export const Mappers = [
  ShopAdminEntityMapper,
  ShopAdminLoginInfoEntityMapper,
  ShopEntityMapper,
  ShopUserEntityMapper,
  ShopProductEntityMapper,
  OrderEntityMapper,
  OrderInfoEntityMapper,
  ReviewEntityMapper,
  VerifyEntityMapper,
  ChatSchemaMapper,
];
