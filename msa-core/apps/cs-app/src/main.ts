import { NestFactory } from '@nestjs/core';
import { CsAppModule } from './cs-app.module';

async function bootstrap() {
  const app = await NestFactory.create(CsAppModule);
  await app.listen(3000);
}
bootstrap();
