import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('boolean', { default: false })
  isComplete: boolean = false;

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
