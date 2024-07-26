import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ShopUserKey } from "domain/shop/key/ShopUserKey";
import { ShopAdmin } from "domain/shop/ShopAdmin";
import { ShopUser } from "domain/shop/ShopUser";
import { LoginType } from "domain/shop/vo";
import { Transactional } from "typeorm-transactional";
import { ShopAdminEntityMapper, ShopEntityMapper } from "usecase/shared/mapper";
import { IShopUserMappedManager, ShopUserEntityMapper } from "usecase/shared/mapper/ShopUserEntityMapper";
import {
  AuthFloristAppleLoginCommand,
  AuthFloristFindIdCommand,
  AuthFloristKakaoLoginCommand,
  AuthFloristNormalJoinCommand,
  AuthFloristNormalLoginCommand,
  AuthUserNormalJoinCommand,
  AuthUserNormalLoginCommand,
} from "./auth.command";
import {
  IFloristAppleLoginResult,
  IFloristFindIdResult,
  IFloristKakaoLoginResult,
  IFloristNormalJoinResult,
  IFloristNormalLoginResult,
  IUserNormalJoinResult,
  IUserNormalLoginResult,
} from "./auth.result";
import { FloristJwtAuth } from "./JwtAuth";

@CommandHandler(AuthFloristNormalLoginCommand)
export class AuthFloristNormalLoginCommandHandler implements ICommandHandler<AuthFloristNormalLoginCommand, IFloristNormalLoginResult> {
  constructor(
    private readonly shopAdminEntityMapper: ShopAdminEntityMapper,
    private readonly shopEntityMapper: ShopEntityMapper,
    private readonly floristJwtAuth: FloristJwtAuth,
  ) {}

  @Transactional()
  async execute(command: AuthFloristNormalLoginCommand): Promise<IFloristNormalLoginResult> {
    const shopAdmin: ShopAdmin = await this.shopAdminEntityMapper.loadWithNormalLogin(
      command.data.shopAdminNormalAuthId as string,
      command.data.shopAdminPw as string,
    );

    const token: string = shopAdmin.login(command.data.agentInfo).signAccessToken(
      await this.floristJwtAuth.floristSign({
        key: shopAdmin.shopAdminKey.key,
        shopKey: shopAdmin.shop.shopKey.key,
        shopId: shopAdmin.shop.shopInfo.id,
        authId: shopAdmin.shopAdminInfo.shopAdminNormalAuthId as string,
        login_type: LoginType.NORMAL,
      }),
    );
    await this.shopAdminEntityMapper.saveWithLoginInfo(shopAdmin);
    shopAdmin.commit();

    return { token };
  }
}

@CommandHandler(AuthFloristNormalJoinCommand)
export class AuthFloristNormalJoinCommandHandler implements ICommandHandler<AuthFloristNormalJoinCommand, IFloristNormalJoinResult> {
  constructor(private readonly shopAdminEntityMapper: ShopAdminEntityMapper, private readonly floristJwtAuth: FloristJwtAuth) {}

  @Transactional()
  async execute(command: AuthFloristNormalJoinCommand): Promise<IFloristNormalJoinResult> {
    // 기존 게정 유무 여부 체크
    await this.isExistNormalAuthId(command.data.shopAdminNormalAuthId as string);
    const shopAdmin: ShopAdmin = await this.isExistShopAdminAccountWithNormal({
      shopAdminName: command.data.shopAdminName,
      shopAdminPhone: command.data.shopAdminPhone,
    });

    shopAdmin
      .join({
        shopAdminNormalAuthId: command.data.shopAdminNormalAuthId as string,
        shopAdminPw: command.data.shopAdminPw as string,
        shopAdminName: command.data.shopAdminName,
        shopAdminPhone: command.data.shopAdminPhone,
        marketingYn: command.data.marketingYn,
      })
      .login(command.data.agentInfo);

    const token: string = shopAdmin.signAccessToken(
      await await this.floristJwtAuth.floristSign({
        key: shopAdmin.shopAdminKey.key,
        shopKey: shopAdmin.shop.shopKey.key,
        shopId: shopAdmin.shop.shopInfo.id,
        authId: shopAdmin.shopAdminInfo.shopAdminNormalAuthId as string,
        login_type: LoginType.NORMAL,
      }),
    );

    await this.shopAdminEntityMapper.saveWithJoinInfo(shopAdmin);
    shopAdmin.commit();

    return { token };
  }

  async isExistNormalAuthId(normalAuthId: string): Promise<void> {
    const isExist: boolean = await this.shopAdminEntityMapper.isExistSameNormalAuthId(normalAuthId);
    if (isExist) {
      throw new Error("동일한 이메일이 이미 존재합니다.");
    }
  }

  async isExistShopAdminAccountWithNormal(data: { shopAdminName: string; shopAdminPhone: string }): Promise<ShopAdmin> {
    const existShopAdmins: ShopAdmin[] = await this.shopAdminEntityMapper.findAllWithSameNameAndPhone(data);
    const exsitShopAdmin: ShopAdmin | undefined = existShopAdmins.find((shopAdmin) => !shopAdmin.shopAdminInfo.shopAdminNormalAuthId);
    if (existShopAdmins.length === 0) return ShopAdmin.create();
    if (existShopAdmins.find((shopAdmin) => shopAdmin.shopAdminInfo.shopAdminNormalAuthId)) throw new Error("이미 가입되어 있는 계정입니다.");
    if (exsitShopAdmin) return exsitShopAdmin;
    throw new Error("계정 확인 중 문제가 발생했습니다.");
  }
}

@CommandHandler(AuthFloristKakaoLoginCommand)
export class AuthFloristKakaoLoginCommandHandler implements ICommandHandler<AuthFloristKakaoLoginCommand, IFloristKakaoLoginResult> {
  execute(command: AuthFloristKakaoLoginCommand): Promise<IFloristKakaoLoginResult> {
    throw new Error("Method not implemented.");
  }
}

@CommandHandler(AuthFloristAppleLoginCommand)
export class AuthFloristAppleLoginCommandHandler implements ICommandHandler<AuthFloristAppleLoginCommand, IFloristAppleLoginResult> {
  execute(command: AuthFloristAppleLoginCommand): Promise<IFloristAppleLoginResult> {
    throw new Error("Method not implemented.");
  }
}

@CommandHandler(AuthFloristFindIdCommand)
export class AuthFloristFindIdCommandHandler implements ICommandHandler<AuthFloristFindIdCommand, IFloristFindIdResult> {
  execute(command: AuthFloristFindIdCommand): Promise<IFloristFindIdResult> {
    throw new Error("Method not implemented.");
  }
}

@CommandHandler(AuthUserNormalLoginCommand)
export class AuthUserNormalLoginCommandHandler implements ICommandHandler<AuthUserNormalLoginCommand, IUserNormalLoginResult> {
  constructor(private readonly shopUserEntityMapper: ShopUserEntityMapper) {}

  @Transactional()
  async execute(command: AuthUserNormalLoginCommand): Promise<IUserNormalLoginResult> {
    const manager: IShopUserMappedManager = await this.shopUserEntityMapper.connect(
      await this.shopUserEntityMapper.contextByNameAndPhoneWithShop(command.data.shopKey, command.data.userName, command.data.userPhone),
    );
    const shopUser: ShopUser = manager.load();
    shopUser.login();
    console.log(
      JSON.stringify({
        key: shopUser.shopUserKey.key as string,
        userName: manager.context.entity.shopUserName as string,
        shopUserId: manager.context.entity.id as number,
        shopLink: manager.context.entity.shop.shopLink as string,
      }),
    );

    return {
      shopUserkey: shopUser.shopUserKey.key as string,
      shopUserName: manager.context.entity.shopUserName as string,
      shopUserId: manager.context.entity.id as number,
      shopLink: manager.context.entity.shop.shopLink as string,
    };
  }
}
@CommandHandler(AuthUserNormalJoinCommand)
export class AuthUserNormalJoinCommandHandler implements ICommandHandler<AuthUserNormalJoinCommand, IUserNormalJoinResult> {
  constructor(private readonly shopUserEntityMapper: ShopUserEntityMapper) {}
  @Transactional()
  async execute(command: AuthUserNormalJoinCommand): Promise<IUserNormalJoinResult> {
    const manager: IShopUserMappedManager = await this.shopUserEntityMapper.connect(
      await this.shopUserEntityMapper.contextByShopKey(new ShopUserKey(command.data.shopKey)),
    );
    const shopUser: ShopUser = manager.load();
    shopUser.createInfo({
      shopUserName: command.data.userName,
      shopUserPhone: command.data.userPhone,
      shopUserBirth: command.data.userBirth ?? null,
      shopUserGender: command.data.userGender ?? null,
      orderCnt: 0,
    });
    await manager.persist();
    return {
      token: "test",
    };
  }
}

export const AuthCommandHandlers = [
  AuthFloristNormalLoginCommandHandler,
  AuthFloristNormalJoinCommandHandler,
  AuthFloristKakaoLoginCommandHandler,
  AuthFloristAppleLoginCommandHandler,
  AuthFloristFindIdCommandHandler,
  AuthUserNormalLoginCommandHandler,
  AuthUserNormalJoinCommandHandler,
];
