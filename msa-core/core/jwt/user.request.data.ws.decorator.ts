import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface UserSessionAuthPayload {
  type: string;
  key: string;
  shopUserId: number;
  userName: string;
  shopLink: string;
  role: string;
}

/**
 * User Request Data Decorator
 * @param data
 * @param ctx
 * @returns User
 */
export const WsUser = createParamDecorator<unknown, ExecutionContext, UserSessionAuthPayload>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToWs().getClient();
  if (!request.user) throw new Error("User Auth not found");
  const user = request.user;
  if (!(user.type && user.key && user.shopUserId && user.userName && user.shopLink && user.role)) throw new Error("User Auth not found");
  return user;
});
