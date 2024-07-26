import { Test, TestingModule } from '@nestjs/testing';
import { CommonAppController } from './common-app.controller';
import { CommonAppService } from './common-app.service';

describe('CommonAppController', () => {
  let commonAppController: CommonAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommonAppController],
      providers: [CommonAppService],
    }).compile();

    commonAppController = app.get<CommonAppController>(CommonAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(commonAppController.getHello()).toBe('Hello World!');
    });
  });
});
