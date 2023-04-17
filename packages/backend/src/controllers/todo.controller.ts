import { Request } from 'express';
import TodoService from '../services/todo.service';
import CustomError from '../utils/errorCreator';
import { ITodo, ITodoWithCount } from '../types/todos.type';
import { IMessage } from '../types/message.type';
import { ReqWithNewTodoBody, ReqWithTodoUpdateBody } from '../types/todoRequest.type';
import { ReqWithUser, ReqWithUserQuery } from '../types/userRequest.type';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: ReqWithUserQuery): Promise<ITodoWithCount> {
    const { id } = req.user;
    const { query } = req;
    const todosWithCount = await this.todoService.findAllForUser(id, query);
    return todosWithCount;
  }

  async getTodoById(req: ReqWithUser): Promise<ITodo> {
    const { id: userId } = req.user;
    const { id } = req.params;
    const todo = await this.todoService.findTodoById(+id);
    if (todo) {
      if (todo.user?.id !== userId && todo.isPrivate) {
        throw new CustomError(400, 'Don`t have access!');
      }
      return todo;
    }
    throw new CustomError(400, 'Todo wasn`t found!');
  }

  async addTodo(req: ReqWithNewTodoBody): Promise<ITodo> {
    const { title, description, isPrivate, userId } = req.body;
    const todo = await this.todoService.addTodo(title, description, isPrivate, userId);
    if (todo) {
      const todoRes: ITodo = {
        ...todo,
        user: {
          id: todo.user.id,
          email: todo.user.email
        }
      };
      return todoRes;
    }
    throw new CustomError(400, 'Todo create fails! User wasn`t found!');
  }

  async updateTodo(req: ReqWithTodoUpdateBody): Promise<ITodo> {
    const { id } = req.params;
    const { title, description, isPrivate, isComplete } = req.body;
    const updatedTodo = await this.todoService.updateTodo(
      +id,
      title,
      description,
      isPrivate,
      isComplete
    );
    if (updatedTodo) {
      return updatedTodo;
    }
    throw new CustomError(400, 'Update fails! Todo wasn`t found!');
  }

  async deleteTodo(req: Request): Promise<IMessage> {
    const { id } = req.params;
    const deleteResult = await this.todoService.deleteTodoById(+id);
    if (deleteResult) {
      return { message: deleteResult };
    }
    throw new CustomError(400, 'Delete fails! Todo wasn`t found!');
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
