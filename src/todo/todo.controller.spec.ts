import { Test, TestingModule } from '@nestjs/testing';
import { todoController } from './todo.controller';

describe('todoController', () => {
  let controller: todoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [todoController],
    }).compile();

    controller = module.get<todoController>(todoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
