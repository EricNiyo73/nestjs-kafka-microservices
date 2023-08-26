import { Module } from '@nestjs/common';
import { todoService } from './todo.service';
import { todoController } from './todo.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { CreateConsumer } from './create.consumer';
import { UpdateConsumer } from './update.consumer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../entity/entity';

@Module({
  imports: [KafkaModule, TypeOrmModule.forFeature([Todo])],
  providers: [todoService, CreateConsumer, UpdateConsumer],
  controllers: [todoController],
})
export class todoModule {}
