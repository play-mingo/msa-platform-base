import { Test, TestingModule } from '@nestjs/testing';
import { CsAppController } from './cs-app.controller';
import { CsAppService } from './cs-app.service';

describe('CsAppController', () => {
  let csAppController: CsAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CsAppController],
      providers: [CsAppService],
    }).compile();

    csAppController = app.get<CsAppController>(CsAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(csAppController.getHello()).toBe('Hello World!');
    });
  });
});
