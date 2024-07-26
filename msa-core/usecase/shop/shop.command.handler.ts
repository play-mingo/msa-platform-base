import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Shop } from "domain/shop/Shop";
import { ShopProducts } from "domain/shop/ShopProducts";
import { ShopEntityMapper } from "usecase/shared/mapper/ShopEntityMapper";
import { ShopProductEntityMapper } from "usecase/shared/mapper/ShopProductEntityMapper";
import { ShopFloristUpdateOrderOptionCommand, ShopFloristUpdateShopProductCommand, ShopFloristUpdateShopUserCommand } from "./shop.command";
import { IUpdateFloristOrderOptionResult, IUpdateFloristShopProductResult, IUpdateFloristShopUserResult } from "./shop.result";
import { Transactional } from "typeorm-transactional";
@CommandHandler(ShopFloristUpdateShopProductCommand)
export class ShopFloristUpdateShopProductCommandHandler
  implements ICommandHandler<ShopFloristUpdateShopProductCommand, IUpdateFloristShopProductResult>
{
  constructor(private readonly shopEntityMapper: ShopEntityMapper, private readonly shopProductEntityMapper: ShopProductEntityMapper) {}

  @Transactional()
  async execute(command: ShopFloristUpdateShopProductCommand): Promise<IUpdateFloristShopProductResult> {
    const shop: Shop = await this.shopEntityMapper.load(command.shopKey);
    const newShopProducts: ShopProducts = shop
      .loadProducts(await this.shopProductEntityMapper.loadAll(shop.shopInfo.id))
      .save(command.shopProductTargets);
    console.log("------- newShopProducts.products -------");
    newShopProducts.products.forEach((product) => {
      console.log(product.detail);
      console.log(product.detail.product);
    });
    await this.shopProductEntityMapper.saveAll(newShopProducts.products);
    return {};
  }
}

@CommandHandler(ShopFloristUpdateOrderOptionCommand)
export class ShopFloristUpdateOrderOptionCommandHandler
  implements ICommandHandler<ShopFloristUpdateOrderOptionCommand, IUpdateFloristOrderOptionResult>
{
  @Transactional()
  async execute(command: ShopFloristUpdateOrderOptionCommand): Promise<IUpdateFloristOrderOptionResult> {
    throw new Error("Method not implemented.");
  }
}

@CommandHandler(ShopFloristUpdateShopUserCommand)
export class ShopFloristUpdateShopUseructCommandHandler implements ICommandHandler<ShopFloristUpdateShopUserCommand, IUpdateFloristShopUserResult> {
  @Transactional()
  async execute(command: ShopFloristUpdateShopUserCommand): Promise<IUpdateFloristShopUserResult> {
    throw new Error("Method not implemented.");
  }
}

export const ShopCommandHandlers = [
  ShopFloristUpdateShopProductCommandHandler,
  ShopFloristUpdateOrderOptionCommandHandler,
  ShopFloristUpdateShopUseructCommandHandler,
];
