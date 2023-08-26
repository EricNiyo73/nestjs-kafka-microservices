import { Test, TestingModule } from '@nestjs/testing';
import { todoService } from './todo.service';

describe('todoService', () => {
  let service: todoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [todoService],
    }).compile();

    service = module.get<todoService>(todoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
