import { Test, TestingModule } from '@nestjs/testing';
import { ShopAppController } from './shop-app.controller';
import { ShopAppService } from './shop-app.service';

describe('ShopAppController', () => {
  let shopAppController: ShopAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShopAppController],
      providers: [ShopAppService],
    }).compile();

    shopAppController = app.get<ShopAppController>(ShopAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shopAppController.getHello()).toBe('Hello World!');
    });
  });
});
