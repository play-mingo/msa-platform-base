import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import {
  AuthFloristNormalLoginCommand,
  AuthFloristNormalJoinCommand,
  AuthFloristKakaoLoginCommand,
  AuthFloristAppleLoginCommand,
  AuthFloristFindIdCommand,
  AuthUserNormalLoginCommand,
  AuthUserNormalJoinCommand,
} from "usecase/auth/auth.command";
import {
  IFloristAppleLoginPayload,
  IFloristFindIdPayload,
  IFloristKakaoLoginPayload,
  IFloristNormalJoinPayload,
  IFloristNormalLoginPayload,
  IUserNormalJoinPayload,
  IUserNormalLoginPayload,
} from "usecase/auth/auth.payload";
import {
  IFloristAppleLoginResult,
  IFloristFindIdResult,
  IFloristKakaoLoginResult,
  IFloristNormalJoinResult,
  IFloristNormalLoginResult,
  IUserNormalJoinResult,
  IUserNormalLoginResult,
} from "usecase/auth/auth.result";

@Injectable()
export class AuthAppService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  getHello(): string {
    return "Hello World!";
  }

  async floristLogin(payload: IFloristNormalLoginPayload): Promise<IFloristNormalLoginResult> {
    return await this.commandBus.execute(new AuthFloristNormalLoginCommand(payload));
  }

  async floristJoin(payload: IFloristNormalJoinPayload): Promise<IFloristNormalJoinResult> {
    return await this.commandBus.execute(new AuthFloristNormalJoinCommand(payload));
  }

  async floristKakaoLogin(payload: IFloristKakaoLoginPayload): Promise<IFloristAppleLoginResult> {
    return await this.commandBus.execute(new AuthFloristKakaoLoginCommand(payload));
  }

  async floristAppleLogin(payload: IFloristAppleLoginPayload): Promise<IFloristKakaoLoginResult> {
    return await this.commandBus.execute(new AuthFloristAppleLoginCommand(payload));
  }

  async floristFindId(payload: IFloristFindIdPayload): Promise<IFloristFindIdResult> {
    return await this.commandBus.execute(new AuthFloristFindIdCommand(payload));
  }

  async userLogin(payload: IUserNormalLoginPayload): Promise<IUserNormalLoginResult> {
    return await this.commandBus.execute(new AuthUserNormalLoginCommand(payload));
  }

  async userJoin(payload: IUserNormalJoinPayload): Promise<IUserNormalJoinResult> {
    return await this.commandBus.execute(new AuthUserNormalJoinCommand(payload));
  }
}
