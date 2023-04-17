import React, { FC, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddTodo from '../../components/addTodo/addTodo.component';
import Filter from '../../components/filter/filter.component';
import MobileTodoList from '../../components/mobileTodoList/mobileTodoList.component';
import DesktopTodoList from '../../components/desktopTodoList/desktopTodoList.component';
import TabletTodoList from '../../components/tabletTodoList/tabletTodoList.component';
import { StyledContainer } from '../../../common/components/styled/container.styled';
import { StyledButton } from '../../../common/components/styled/button.styled';
import * as Styled from './todoContainer.styled';
import { EStatus } from '../../types/status.enum';

interface TodoContainerProps {}

const TodoContainer: FC<TodoContainerProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<EStatus>(EStatus.ALL);
  const [page, setPage] = useState<number>(1);

  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery('(max-width: 425px)');
  const isMediumScreen = useMediaQuery('(max-width: 768px)');

  const onSetSearchValue = (searchValue: string) => {
    setPage(1);
    setSearch(searchValue);
  };

  const onSetStatus = (newStatus: EStatus) => {
    setPage(1);
    setStatus(newStatus);
  };

  const onSetPage = (newPage: number) => {
    setPage(newPage);
  };

  const toggleAddForm = () => {
    setShowAddForm((prev) => !prev);
  };

  return (
    <StyledContainer>
      <Styled.TodoContainer>
        <Filter status={status} onSetSearchValue={onSetSearchValue} onSetStatus={onSetStatus} />
        <StyledButton $auto onClick={toggleAddForm}>
          {showAddForm ? 'Hide Form' : '+ Add Todo'}
        </StyledButton>
        {showAddForm && <AddTodo />}
        {isSmallScreen ? (
          <MobileTodoList search={search} status={status} />
        ) : isMediumScreen ? (
          <TabletTodoList search={search} status={status} />
        ) : (
          <DesktopTodoList search={search} status={status} page={page} onSetPage={onSetPage} />
        )}
      </Styled.TodoContainer>
    </StyledContainer>
  );
};

export default TodoContainer;
