import { Test, TestingModule } from '@nestjs/testing';
import { GatewayAppController } from './gateway-app.controller';
import { GatewayAppService } from './gateway-app.service';

describe('GatewayAppController', () => {
  let gatewayAppController: GatewayAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GatewayAppController],
      providers: [GatewayAppService],
    }).compile();

    gatewayAppController = app.get<GatewayAppController>(GatewayAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gatewayAppController.getHello()).toBe('Hello World!');
    });
  });
});
