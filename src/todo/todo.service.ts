import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entity/entity';
import { ProducerService } from 'src/kafka/producer/producer.service';
import { CreatetodoDTO } from 'src/dto/create-todo.dto.ts';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class todoService {
  // constructor(private readonly _kafka: ProducerService) {}
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    // private client: ClientKafka,
    private producerService: ProducerService,
  ) {}

  async createTask(createTaskDto: CreatetodoDTO) {
    const task = this.todoRepository.create(createTaskDto);
    await this.todoRepository.save(task);
    await this.producerService.produce({
      topic: 'create-todo',
      messages: [{ value: JSON.stringify(task) }],
    });
    return task;
  }

  async updateTask(todoId: number, createUserDto: CreatetodoDTO) {
    //find user if exists
    const editedUser = await this.todoRepository.findOne({
      where: { id: todoId },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    const result = await this.todoRepository.update(
      { id: todoId },
      createUserDto,
    );
    await this.producerService.produce({
      topic: 'update-todo',
      messages: [{ value: JSON.stringify(result) }],
    });
    return result;
  }

  async getTodoById(todoId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${todoId} not found`);
    }
    return todo;
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async deleteTodoById(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    await this.todoRepository.remove(todo);
  }
}
// }
// async update() {
//   console.log('update call');
//   this._kafka.produce({
//     topic: 'update-todo',
//     messages: [{ value: 'this is todo update' }],
//   });
// }
