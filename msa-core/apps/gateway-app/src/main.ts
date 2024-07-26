import { bootstrapForDevelopment } from "./bootstrap.development";
import { bootstrapForLocal } from "./bootstrap.local";
import { bootstrapForProduction } from "./bootstrap.production";

async function bootstrap() {
  switch (process.env.NODE_ENV_MODE) {
    case "production":
      await bootstrapForProduction();
      break;
    case "development":
      await bootstrapForDevelopment();
      break;
    case "local":
      await bootstrapForLocal();
      break;
    default:
      await bootstrapForDevelopment();
      break;
  }
}
bootstrap();
