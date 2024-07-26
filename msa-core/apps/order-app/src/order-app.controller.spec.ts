import { Test, TestingModule } from '@nestjs/testing';
import { OrderAppController } from './order-app.controller';
import { OrderAppService } from './order-app.service';

describe('OrderAppController', () => {
  let orderAppController: OrderAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderAppController],
      providers: [OrderAppService],
    }).compile();

    orderAppController = app.get<OrderAppController>(OrderAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderAppController.getHello()).toBe('Hello World!');
    });
  });
});
