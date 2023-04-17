import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { todoService } from '../../services/todo.service';
import Notification from '../../../common/components/notification/notification.component';
import { StyledButton } from '../../../common/components/styled/button.styled';
import { StyledCheckboxBtn } from '../../../common/components/styled/checkboxBtn.styled';
import { TodoItemControls } from '../styled/todoItemControls.styled';
import * as Styled from './todoItem.styled';
import { APP_KEYS } from '../../../common/consts';
import { ITodoBody } from '../../types/todoBody.type';
import { ITodo } from '../../types/todo.type';
import { IUser } from '../../../auth/types/user.type';

interface TodoItemProps {
  todo: ITodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  // Error notification
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const handleOpenError = (message: string) => {
    setErrorMessage(message);
    setIsErrorOpen(true);
  };

  const handleCloseError = () => {
    setIsErrorOpen(false);
  };

  const queryClient = useQueryClient();
  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: (updatedTodo: ITodoBody) => todoService.updateTodo(updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      handleOpenError(error.response?.data.message || 'Something went wrong!');
    }
  });

  const userData = queryClient.getQueryData<{ data: IUser }>([APP_KEYS.QUERY_KEYS.USER]);
  const user: IUser | undefined = userData?.data;

  const handleDeleteTodo = (id: number) => () => {
    deleteTodoMutation(id);
  };

  const handleUpdateCompleteStatus = () => {
    const { id, title, description, isPrivate, isComplete } = todo;
    updateTodoMutation({ id, title, description, isPrivate, isComplete: !isComplete });
  };

  return (
    <Styled.TodoItem>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <TodoItemControls>
        <div>
          <StyledButton
            as={Link}
            $small
            to={`${APP_KEYS.ROUTER_KEYS.TODOS_LIST}/${todo.id?.toString()}`}
          >
            View
          </StyledButton>
          <StyledButton
            $small
            onClick={handleDeleteTodo(todo.id!)}
            disabled={user?.id !== todo.user?.id}
          >
            Delete
          </StyledButton>
        </div>
        <StyledCheckboxBtn $checked={!!todo.isComplete} onClick={handleUpdateCompleteStatus} />
      </TodoItemControls>
      <Notification isOpen={isErrorOpen} message={errorMessage} onClose={handleCloseError} />
    </Styled.TodoItem>
  );
};

export default TodoItem;
