import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../../services/todo.service';
import EditTodo from '../../components/editTodo/editTodo.component';
import { StyledContainer } from '../../../common/components/styled/container.styled';
import { StyledButton } from '../../../common/components/styled/button.styled';
import { StyledCheckboxBtn } from '../../../common/components/styled/checkboxBtn.styled';
import { StyledErrorMessage } from '../../../common/components/styled/error.styled';
import { StyledLoadingSpinner } from '../../../common/components/styled/loadingSpinner.styled';
import { StyledDetailsControls } from '../../components/styled/todoDetailsControls.styled';
import * as Styled from './todoDetails.styled';
import { APP_KEYS } from '../../../common/consts';
import { ITodoBody } from '../../types/todoBody.type';
import { ITodo } from '../../types/todo.type';
import { IUser } from '../../../auth/types/user.type';

interface TodoDetailsProps {}

const TodoDetails: FC<TodoDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [todo, setTodo] = useState<ITodo>({
    id: 0,
    title: 'Loading ...',
    description: 'Loading ...',
    isPrivate: false,
    isComplete: false
  });

  const queryClient = useQueryClient();
  const { isLoading, error, refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS, parseInt(id!, 10)],
    queryFn: () => todoService.getTodoById(+id!),
    onSuccess: ({ data }) => {
      setTodo(data);
    }
  });
  const { mutate } = useMutation({
    mutationFn: (updatedTodo: ITodoBody) => todoService.updateTodo(updatedTodo),
    onSuccess: (newTodo) => {
      setTodo(newTodo.data);
      queryClient.setQueryData([APP_KEYS.QUERY_KEYS.TODOS, parseInt(id!, 10)], newTodo);
    }
  });

  const userData = queryClient.getQueryData<{ data: IUser }>([APP_KEYS.QUERY_KEYS.USER]);

  const handleUpdateCompleteStatus = () => {
    mutate({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isPrivate: todo.isPrivate,
      isComplete: !todo.isComplete
    });
  };

  const handleUpdatePrivateStatus = () => {
    mutate({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isPrivate: !todo.isPrivate,
      isComplete: todo.isComplete
    });
  };

  const toggleEditForm = () => {
    setShowEdit((prev) => !prev);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <StyledLoadingSpinner />;
  }

  if (error) {
    return <StyledErrorMessage>Something went wrong!</StyledErrorMessage>;
  }

  return (
    <StyledContainer>
      <Styled.TodoDetails>
        <h2>{todo.title}</h2>
        <h4>Description</h4>
        <p>{todo.description}</p>
        <StyledDetailsControls>
          <p>Complete</p>
          <StyledCheckboxBtn $checked={!!todo.isComplete} onClick={handleUpdateCompleteStatus} />
          {userData?.data.id === todo.user?.id && (
            <>
              <p>Private</p>
              <StyledCheckboxBtn $checked={!!todo.isPrivate} onClick={handleUpdatePrivateStatus} />
            </>
          )}
        </StyledDetailsControls>
        <div className="flex">
          <StyledButton as={Link} $small to={APP_KEYS.ROUTER_KEYS.TODOS_LIST}>
            Back
          </StyledButton>
          {userData?.data.id === todo.user?.id && (
            <StyledButton $small onClick={toggleEditForm}>
              {showEdit ? 'Hide' : 'Edit'}
            </StyledButton>
          )}
        </div>
        {showEdit && (
          <EditTodo
            id={todo.id!}
            title={todo.title}
            description={todo.description}
            isComplete={!!todo.isComplete}
            isPrivate={!!todo.isPrivate}
            onToggleEditForm={toggleEditForm}
          />
        )}
      </Styled.TodoDetails>
    </StyledContainer>
  );
};

export default TodoDetails;
