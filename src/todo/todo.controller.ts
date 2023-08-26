import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { todoService } from './todo.service';
import { CreatetodoDTO } from 'src/dto/create-todo.dto.ts';
import { Todo } from 'src/entity/entity';

@Controller('todo')
export class todoController {
  constructor(private todoService: todoService) {}
  @Post()
  async create(@Body() createTaskDto: CreatetodoDTO) {
    return await this.todoService.createTask(createTaskDto);
  }

  @Patch('/:todoId')
  public async editUser(
    @Body() createUserDto: CreatetodoDTO,
    @Param('todoId') todoId: number,
  ) {
    return await this.todoService.updateTask(todoId, createUserDto);
  }

  @Get(':id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Delete('/:todoId')
  public async deleteUser(@Param('todoId') Id: number) {
    return await this.todoService.deleteTodoById(Id);
  }

  // @Delete(':id')
  // async deleteTodo(@Param('id') id: number) {
  //   try {
  //     await this.todoService.deleteTodoById(id);
  //     return { message: 'Todo deleted successfully' };
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }
}
