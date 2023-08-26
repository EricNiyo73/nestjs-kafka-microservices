import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // P
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  time: string;
}
