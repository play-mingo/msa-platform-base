import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FloristJwtAuthPayload } from "usecase/auth/JwtAuth";

export const WsFlorist = createParamDecorator<unknown, ExecutionContext, FloristJwtAuthPayload>((data: unknown, ctx: ExecutionContext) => {
  const client = ctx.switchToWs().getClient();
  if (!client.florist) throw new Error("Florist data not found");
  if (!(client.florist.authId && client.florist.key && client.florist.login_type)) throw new Error("Florist data not found");
  return client.florist;
});
