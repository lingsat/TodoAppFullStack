import React, { FC, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { todoService } from '../../services/todo.service';
import TodoItem from '../todoItem/todoItem.component';
import { StyledErrorMessage } from '../../../common/components/styled/error.styled';
import { StyledLoadingSpinner } from '../../../common/components/styled/loadingSpinner.styled';
import * as Styled from './mobileTodoList.styled';
import { ITodo } from '../../types/todo.type';
import { EStatus } from '../../types/status.enum';
import { APP_KEYS } from '../../../common/consts';

interface MobileTodoListProps {
  search: string;
  status: EStatus;
}

const MobileTodoList: FC<MobileTodoListProps> = ({ search, status }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [fetchingNewPage, setFetchingNewPage] = useState<boolean>(false);

  const { isLoading, error, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: ({ pageParam = 1 }) => todoService.getTodos(search, status, pageParam),
    getNextPageParam: (prevData) => prevData.data.nextPage,
    onSuccess: (data) => {
      if (data.pages) {
        const newTodosArr = data.pages.map((page) => page.data.todos);
        const newTodos = newTodosArr.reduce((acc, todoArr) => acc.concat(todoArr));
        setTodos(newTodos);
      } else {
        refetch();
      }
      setFetchingNewPage(false);
    }
  });

  // Remove any
  const scrollHandler = (e: DocumentEventMap['scroll']) => {
    const { scrollHeight, scrollTop } = (e.target as Document).documentElement;
    if (scrollHeight - (scrollTop + window.innerHeight) < 100) {
      setFetchingNewPage(true);
    }
  };

  useEffect(() => {
    if (fetchingNewPage) {
      fetchNextPage();
    }
  }, [fetchingNewPage]);

  // Effect for scroll listening
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    navigate(`?${APP_KEYS.QUERY_KEYS.SEARCH}=${search}&${APP_KEYS.QUERY_KEYS.STATUS}=${status}`);
    refetch();
  }, [search, status]);

  if (isLoading) {
    return <StyledLoadingSpinner />;
  }

  if (error) {
    return <StyledErrorMessage>Something went wrong!</StyledErrorMessage>;
  }

  return (
    <>
      {todos.length === 0 && <p>No tasks found! Press Add Todo - to create new one.</p>}
      <Styled.MobileTodoList>
        {todos.map((todo) => (
          <TodoItem key={`todo-${todo.id}`} todo={todo} />
        ))}
      </Styled.MobileTodoList>
    </>
  );
};

export default MobileTodoList;
