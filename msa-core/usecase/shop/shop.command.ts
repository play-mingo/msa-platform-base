import { ShopKey } from "domain/shop/key";
import { ShopProductTargets } from "domain/shop/ShopProducts";

export class ShopFloristUpdateShopProductCommand {
  constructor(public readonly shopKey: ShopKey, public readonly shopProductTargets: ShopProductTargets) {}
}

export class ShopFloristUpdateOrderOptionCommand {
  constructor(public readonly shopKey: ShopKey) {}
}

export class ShopFloristUpdateShopUserCommand {
  constructor(public readonly shopKey: ShopKey) {}
}

export const ShopCommands = [ShopFloristUpdateShopProductCommand, ShopFloristUpdateOrderOptionCommand, ShopFloristUpdateShopUserCommand];
