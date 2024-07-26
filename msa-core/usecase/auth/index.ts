import {
  AuthFloristAppleLoginCommand,
  AuthFloristFindIdCommand,
  AuthFloristKakaoLoginCommand,
  AuthFloristNormalJoinCommand,
  AuthFloristNormalLoginCommand,
  AuthUserNormalLoginCommand,
} from "./auth.command";
import {
  AuthFloristAppleLoginCommandHandler,
  AuthFloristFindIdCommandHandler,
  AuthFloristKakaoLoginCommandHandler,
  AuthFloristNormalJoinCommandHandler,
  AuthFloristNormalLoginCommandHandler,
  AuthUserNormalLoginCommandHandler,
} from "./auth.command.handler";
import { FloristJwtAuth } from "./JwtAuth";

export const AuthCommand = [
  AuthFloristNormalLoginCommand,
  AuthFloristNormalJoinCommand,
  AuthFloristKakaoLoginCommand,
  AuthFloristAppleLoginCommand,
  AuthFloristFindIdCommand,
  AuthUserNormalLoginCommand,
];

export const AuthCommandHandler = [
  AuthFloristNormalLoginCommandHandler,
  AuthFloristNormalJoinCommandHandler,
  AuthFloristKakaoLoginCommandHandler,
  AuthFloristAppleLoginCommandHandler,
  AuthFloristFindIdCommandHandler,
  AuthUserNormalLoginCommandHandler,
];

export const AuthUseCase = [...AuthCommand, ...AuthCommandHandler, FloristJwtAuth];
