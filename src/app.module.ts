import { Module } from '@nestjs/common';

import { KafkaModule } from './kafka/kafka.module';
import { todoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Todo],
        // entities: [join(__dirname + '/entity/*.ts')],

        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    KafkaModule,
    todoModule,
  ],
})
export class AppModule {}
