/* eslint-disable no-console */

import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';
import { Todo } from '../entities/Todo.entity';

const connectDB = async () => {
  try {
    const AppDataSource = new DataSource({
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      logging: ['query', 'error'],
      type: 'postgres',
      entities: [Todo, User],
      migrations: ['dist/migrations/**/*.{ts,js}'],
      subscribers: ['src/subscriber/**/*.ts'],
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: true
    });

    await AppDataSource.initialize();
    console.log('PostgreSQL Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
