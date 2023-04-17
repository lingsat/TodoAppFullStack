import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from '@mui/material';
import { todoService } from '../../services/todo.service';
import TableItem from '../tableItem/tableItem.component';
import { StyledErrorMessage } from '../../../common/components/styled/error.styled';
import { StyledLoadingSpinner } from '../../../common/components/styled/loadingSpinner.styled';
import * as Styled from './desktopTodoList.styled';
import { EStatus } from '../../types/status.enum';
import { APP_KEYS } from '../../../common/consts';
import { ITodo } from '../../types/todo.type';

interface DesktopTodoListProps {
  search: string;
  status: EStatus;
  page: number;
  onSetPage: (newPage: number) => void;
}

const DesktopTodoList: FC<DesktopTodoListProps> = ({ search, status, page, onSetPage }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [pagesCount, setPagesCount] = useState<number>(0);

  const { isLoading, error, refetch } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: () => todoService.getTodos(search, status, page),
    onSuccess: ({ data }) => {
      setTodos(data.todos);
      const pages = Math.ceil(data.count / APP_KEYS.PAGINATION.ITEMS_PER_PAGE);
      setPagesCount(pages);
    }
  });

  useEffect(() => {
    navigate(
      `?${APP_KEYS.QUERY_KEYS.SEARCH}=${search}&${APP_KEYS.QUERY_KEYS.STATUS}=${status}&${APP_KEYS.QUERY_KEYS.PAGE}=${page}`
    );
    refetch();
  }, [search, status, page]);

  if (isLoading) {
    return <StyledLoadingSpinner />;
  }

  if (error) {
    return <StyledErrorMessage>Something went wrong!</StyledErrorMessage>;
  }

  return (
    <>
      <Styled.DesktopTodoList>
        <thead>
          <tr>
            <th className="col--title">Todo Title</th>
            <th className="col--description">Description</th>
            <th className="col--actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TableItem key={`todo-${todo.id}`} todo={todo} />
          ))}
        </tbody>
      </Styled.DesktopTodoList>
      {todos.length === 0 && <p>No tasks found! Press Add Todo - to create new one.</p>}
      <Pagination
        count={pagesCount}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={(_, newPage) => onSetPage(newPage)}
      />
    </>
  );
};

export default DesktopTodoList;
