import { ShopAdminRepository } from "./ShopAdminRepository";
import { ShopAdminLoginInfoRepository } from "./ShopAdminLoginInfoRepository";
import { ShopRepository } from "./ShopRepository";
import { ShopProductRepository } from "./ShopProductRepository";
import { OrderRepository } from "./OrderRepository";
import { OrderInfoRepository } from "./OrderInfoRepository";
import { ShopUserRepository } from "./ShopUserRepository";
import { ReviewRepository } from "./ReviewRepository";
import { VerifyRepository } from "./VerifyRepository";

export * from "./ShopAdminRepository";
export * from "./ShopAdminLoginInfoRepository";
export * from "./ShopRepository";
export * from "./ShopProductRepository";
export * from "./ShopUserRepository";
export * from "./OrderRepository";
export * from "./OrderInfoRepository";
export * from "./ReviewRepository";
export * from "./VerifyRepository";

export const TypeormRepositories = [
  ShopAdminRepository,
  ShopAdminLoginInfoRepository,
  ShopRepository,
  ShopProductRepository,
  ShopUserRepository,
  OrderRepository,
  OrderInfoRepository,
  ReviewRepository,
  VerifyRepository,
];
