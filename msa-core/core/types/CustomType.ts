import { FloristJwtAuthPayload } from "core/jwt/florist-jwt-auth.guard";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      florist?: FloristJwtAuthPayload;
    }
  }
}
