import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FloristJwtAuthPayload } from "usecase/auth/JwtAuth";

export const Florist = createParamDecorator<unknown, ExecutionContext, FloristJwtAuthPayload>((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.florist) throw new Error("Florist data not found");
  if (!(request.florist.authId && request.florist.key && request.florist.login_type)) throw new Error("Florist data not found");
  return request.florist;
});
