import { AxiosResponse } from 'axios';
import { HttpService } from '../../common/services/http.service';
import { APP_KEYS } from '../../common/consts';
import { ITodoBody } from '../types/todoBody.type';
import { ITodo, ITodoWithCount } from '../types/todo.type';
import { EStatus } from '../types/status.enum';

class TodoService extends HttpService {
  getTodos(search: string, status: EStatus, page: number): Promise<AxiosResponse<ITodoWithCount>> {
    const searchUrlStr = `${APP_KEYS.QUERY_KEYS.SEARCH}=${search}`;
    const statusUrlStr = `${APP_KEYS.QUERY_KEYS.STATUS}=${status}`;
    const pageUrlStr = `${APP_KEYS.QUERY_KEYS.PAGE}=${page}`;
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}?${searchUrlStr}&${statusUrlStr}&${pageUrlStr}`
      },
      true
    );
  }

  getTodoById(id: number): Promise<AxiosResponse<ITodo>> {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.SINGLE_TODO}/${id.toString()}`
      },
      true
    );
  }

  addTodo(todo: ITodoBody): Promise<AxiosResponse<ITodo>> {
    return this.post(
      {
        data: todo,
        url: APP_KEYS.BACKEND_KEYS.TODOS
      },
      true
    );
  }

  updateTodo(todo: ITodoBody): Promise<AxiosResponse<ITodo>> {
    const { id, ...todoReqBody } = todo;
    return this.put(
      {
        data: todoReqBody,
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id!.toString()}`
      },
      true
    );
  }

  deleteTodo(id: number): Promise<AxiosResponse<{ message: string }>> {
    return this.delete(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${id.toString()}`
      },
      true
    );
  }
}

export const todoService = new TodoService();
