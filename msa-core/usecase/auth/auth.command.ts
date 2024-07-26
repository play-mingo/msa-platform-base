import {
  IFloristAppleLoginPayload,
  IFloristFindIdPayload,
  IFloristKakaoLoginPayload,
  IFloristNormalJoinPayload,
  IFloristNormalLoginPayload,
  IUserNormalJoinPayload,
  IUserNormalLoginPayload,
} from "./auth.payload";

export class AuthFloristNormalLoginCommand {
  readonly data: IFloristNormalLoginPayload;
  constructor(public readonly payload: IFloristNormalLoginPayload) {
    this.data = payload;
  }
}
export class AuthFloristNormalJoinCommand {
  readonly data: IFloristNormalJoinPayload;
  constructor(public readonly payload: IFloristNormalJoinPayload) {
    this.data = payload;
  }
}
export class AuthFloristKakaoLoginCommand {
  readonly data: IFloristKakaoLoginPayload;
  constructor(public readonly payload: IFloristKakaoLoginPayload) {
    this.data = payload;
  }
}
export class AuthFloristAppleLoginCommand {
  readonly data: IFloristAppleLoginPayload;
  constructor(public readonly payload: IFloristAppleLoginPayload) {
    this.data = payload;
  }
}
export class AuthFloristFindIdCommand {
  readonly data: IFloristFindIdPayload;
  constructor(public readonly payload: IFloristFindIdPayload) {
    this.data = payload;
  }
}

/**
 * 사용자 일반 로그인
 * @property {string} data.userName 사용자 이름 ex) 홍길동
 * @property {string} data.userPhone 사용자 전화번호 ex) 01012345678
 * @property {string} data.shopLink 상점 링크 ex) mingo
 */
export class AuthUserNormalLoginCommand {
  readonly data: IUserNormalLoginPayload;
  constructor(public readonly payload: IUserNormalLoginPayload) {
    this.data = payload;
  }
}

/**
 * 사용자 일반 회원가입
 * @property {string} data.shopKey 상점 키 ex) d870sdafd9as0df70sadf70as7fd0
 * @property {string} data.userName 사용자 이름 ex) 홍길동
 * @property {string} data.userPhone 사용자 전화번호 ex) 01012345678
 * @property {string} [data.userBirth] 사용자 생년월일 ex) 19900101
 * @property {UserGender} [data.userGender] 사용자 성별 ex) 0: 남자, 1: 여자
 */
export class AuthUserNormalJoinCommand {
  readonly data: IUserNormalJoinPayload;
  constructor(public readonly payload: IUserNormalJoinPayload) {
    this.data = payload;
  }
}

export const AuthCommands = [
  AuthFloristNormalLoginCommand,
  AuthFloristNormalJoinCommand,
  AuthFloristKakaoLoginCommand,
  AuthFloristAppleLoginCommand,
  AuthFloristFindIdCommand,
  AuthUserNormalLoginCommand,
  AuthUserNormalJoinCommand,
];
