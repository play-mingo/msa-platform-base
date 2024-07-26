import { HttpException, HttpStatus } from "@nestjs/common";

export const ShopExceptionErrorCode = {
  COMMON_ERROR: "SHOP_0000",
  FAIL_IS_EXIST_ACCOUNT: "SHOP_0001",
  IS_EXIST_ACCOUNT: "SHOP_0002",
} as const;
type ShopExceptionErrorCodeValue = (typeof ShopExceptionErrorCode)[keyof typeof ShopExceptionErrorCode];

export class ShopException extends HttpException {
  constructor(errCode: ShopExceptionErrorCodeValue, data: any = null) {
    switch (errCode) {
      case ShopExceptionErrorCode.COMMON_ERROR:
        super(`문제가 발생하였습니다. 관리자에게 문의해주세요.`, HttpStatus.INTERNAL_SERVER_ERROR);
        break;
      case ShopExceptionErrorCode.IS_EXIST_ACCOUNT:
        super(`이미 가입된 정보입니다.`, HttpStatus.BAD_REQUEST);
        break;

      default:
        break;
    }
  }
}
