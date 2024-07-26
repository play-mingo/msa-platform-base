import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TblShop } from "core/database/typerom/entities";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";
import { ShopUser } from "domain/shop/ShopUser";
import { Transactional } from "typeorm-transactional";
import { IShopUserMappedManager, ShopUserEntityMapper } from "usecase/shared/mapper/ShopUserEntityMapper";
import { FloristShopUserRegInCommand, FloristShopUserUpdateCommand, UserUpdateCommand } from "./user.command";
import { IFloristShopUserRegInResult, IFloristShopUserUpdateResult, IUserUpdateResult } from "./user.result";

@CommandHandler(FloristShopUserRegInCommand)
export class FloristShopUserRegInCommandHandler implements ICommandHandler<FloristShopUserRegInCommand, IFloristShopUserRegInResult> {
  constructor(private readonly shopUserEntityMapper: ShopUserEntityMapper) {}
  @Transactional()
  async execute(command: FloristShopUserRegInCommand): Promise<IFloristShopUserRegInResult> {
    const shopUserKey: ShopUserKey = ShopUserKey.create();
    const shopEntity: TblShop = new TblShop();
    shopEntity.id = command.data.shopId;
    const manager: IShopUserMappedManager = await this.shopUserEntityMapper.connectByKey({ shop: shopEntity }, shopUserKey);
    const shopUser: ShopUser = manager.load();
    shopUser.createInfo({
      shopUserName: command.data.userName,
      shopUserPhone: command.data.userPhone,
      shopUserBirth: command.data.userBirth ?? null,
      shopUserGender: command.data.userGender ?? null,
      orderCnt: 0,
    });
    await manager.persist();
    return {};
  }
}

@CommandHandler(FloristShopUserUpdateCommand)
export class FloristShopUserUpdateCommandHandler implements ICommandHandler<FloristShopUserUpdateCommand, IFloristShopUserUpdateResult> {
  constructor(private readonly shopUserEntityMapper: ShopUserEntityMapper) {}
  @Transactional()
  async execute(command: FloristShopUserUpdateCommand): Promise<IFloristShopUserUpdateResult> {
    const manager: IShopUserMappedManager = this.shopUserEntityMapper.connect(
      await this.shopUserEntityMapper.contextByKeyWithShop(new ShopUserKey(command.data.shopUserKey)),
    );
    const shopUser: ShopUser = manager.load();
    shopUser.updateInfo({
      shopUserName: command.data.userName,
      shopUserPhone: command.data.userPhone,
      shopUserBirth: command.data.userBirth ?? null,
      shopUserGender: command.data.userGender ?? null,
      orderCnt: 0,
    });
    await manager.persist();
    return {};
  }
}

@CommandHandler(UserUpdateCommand)
export class UserUpdateCommandHandler implements ICommandHandler<UserUpdateCommand, IUserUpdateResult> {
  constructor(private readonly shopUserEntityMapper: ShopUserEntityMapper) {}
  @Transactional()
  async execute(command: UserUpdateCommand): Promise<IUserUpdateResult> {
    const manager: IShopUserMappedManager = this.shopUserEntityMapper.connect(
      await this.shopUserEntityMapper.contextByIdWithShop(command.data.shopUserId),
    );
    const shopUser: ShopUser = manager.load();
    shopUser.updateInfo({
      shopUserName: command.data.userName,
      shopUserPhone: command.data.userPhone,
      shopUserBirth: command.data.userBirth ?? null,
      shopUserGender: command.data.userGender ?? null,
      orderCnt: 0,
    });
    await manager.persist();
    return {};
  }
}

export const UserCommandHandlers = [FloristShopUserRegInCommandHandler, FloristShopUserUpdateCommandHandler, UserUpdateCommandHandler];
