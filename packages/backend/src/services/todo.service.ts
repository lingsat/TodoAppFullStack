import { ILike } from 'typeorm';
import { IQuery } from '../types/todoRequest.type';
import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';
import { APP_KEYS } from '../consts';
import { ITodo, ITodoWithCount } from '../types/todos.type';
import { EStatus } from '../types/status.enum';

export default class TodoService {
  async findAllForUser(userId: number, query: IQuery): Promise<ITodoWithCount> {
    const { search, status, page } = query;

    const pageNumber: number = page ? +page : 1;
    let todos: ITodo[] = [];
    let count: number = 0;

    switch (status) {
      // Users private
      case EStatus.PRIVATE:
        todos = await Todo.find({
          relations: { user: true },
          order: { id: 'ASC' },
          where: {
            user: { id: userId },
            title: ILike(`%${search}%`),
            isPrivate: true
          },
          skip: (pageNumber - 1) * APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE,
          take: APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE
        });
        count = await Todo.count({
          relations: { user: true },
          order: { id: 'ASC' },
          where: {
            user: { id: userId },
            title: ILike(`%${search}%`),
            isPrivate: true
          }
        });
        break;

      // Users public
      case EStatus.PUBLIC:
        todos = await Todo.find({
          relations: { user: true },
          order: { id: 'ASC' },
          where: {
            user: { id: userId },
            title: ILike(`%${search}%`),
            isPrivate: false
          },
          skip: (pageNumber - 1) * APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE,
          take: APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE
        });
        count = await Todo.count({
          relations: { user: true },
          order: { id: 'ASC' },
          where: {
            user: { id: userId },
            title: ILike(`%${search}%`),
            isPrivate: false
          }
        });
        break;

      // All completed public and user private completed
      case EStatus.COMPLETED:
        todos = await Todo.find({
          relations: { user: true },
          order: { id: 'ASC' },
          where: [
            {
              user: { id: userId },
              title: ILike(`%${search}%`),
              isComplete: true
            },
            { isPrivate: false, title: ILike(`%${search}%`), isComplete: true }
          ],
          skip: (pageNumber - 1) * APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE,
          take: APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE
        });
        count = await Todo.count({
          relations: { user: true },
          order: { id: 'ASC' },
          where: [
            {
              user: { id: userId },
              title: ILike(`%${search}%`),
              isComplete: true
            },
            { isPrivate: false, title: ILike(`%${search}%`), isComplete: true }
          ]
        });
        break;

      // All public and users private
      default:
        todos = await Todo.find({
          relations: { user: true },
          order: { id: 'ASC' },
          where: [
            { user: { id: userId }, title: ILike(`%${search}%`) },
            { isPrivate: false, title: ILike(`%${search}%`) }
          ],
          skip: (pageNumber - 1) * APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE,
          take: APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE
        });
        count = await Todo.count({
          relations: { user: true },
          order: { id: 'ASC' },
          where: [
            { user: { id: userId }, title: ILike(`%${search}%`) },
            { isPrivate: false, title: ILike(`%${search}%`) }
          ]
        });
        break;
    }

    // Count next page
    const pagesCount: number = Math.ceil(count / APP_KEYS.QUERY_KEYS.ITEMS_PER_PAGE);
    const nextPage: number | undefined = pagesCount > pageNumber ? pageNumber + 1 : undefined;

    return { todos, count, nextPage };
  }

  async findTodoById(id: number): Promise<ITodo | null> {
    const todo = await Todo.findOne({
      relations: { user: true },
      where: { id }
    });
    return todo;
  }

  async addTodo(title: string, description: string, isPrivate: boolean, userId: number) {
    const user = await User.findOneBy({ id: userId });
    if (user) {
      const newTodo = Todo.create({ title, description, isPrivate, user });
      newTodo.save();
      return newTodo;
    }
    return null;
  }

  async updateTodo(
    id: number,
    title: string,
    description: string,
    isPrivate: boolean,
    isComplete: boolean
  ): Promise<ITodo | null> {
    const todo = await Todo.findOne({
      relations: { user: true },
      where: { id }
    });
    if (todo) {
      todo.title = title;
      todo.description = description;
      todo.isPrivate = isPrivate;
      todo.isComplete = isComplete;
      await todo.save();
      return todo;
    }
    return null;
  }

  async deleteTodoById(id: number): Promise<string | null> {
    const todo = await Todo.findOneBy({ id });
    if (todo) {
      todo.remove();
      return 'Deleted succesfully';
    }
    return null;
  }
}
