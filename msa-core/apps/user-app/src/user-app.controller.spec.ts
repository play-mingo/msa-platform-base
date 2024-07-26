import { Test, TestingModule } from '@nestjs/testing';
import { UserAppController } from './user-app.controller';
import { UserAppService } from './user-app.service';

describe('UserAppController', () => {
  let userAppController: UserAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
      providers: [UserAppService],
    }).compile();

    userAppController = app.get<UserAppController>(UserAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userAppController.getHello()).toBe('Hello World!');
    });
  });
});
