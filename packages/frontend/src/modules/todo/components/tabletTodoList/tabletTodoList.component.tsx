import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Navigation } from 'swiper';
import { todoService } from '../../services/todo.service';
import TodoItem from '../todoItem/todoItem.component';
import { StyledErrorMessage } from '../../../common/components/styled/error.styled';
import { StyledLoadingSpinner } from '../../../common/components/styled/loadingSpinner.styled';
import * as Styled from './tabletTodoList.styled';
import 'swiper/css';
import 'swiper/css/navigation';
import { APP_KEYS } from '../../../common/consts';
import { EStatus } from '../../types/status.enum';
import { ITodo } from '../../types/todo.type';

interface TabletTodoListProps {
  search: string;
  status: EStatus;
}

const TabletTodoList: FC<TabletTodoListProps> = ({ search, status }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<ITodo[]>([]);

  const { isLoading, error, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS],
    queryFn: ({ pageParam = 1 }) => todoService.getTodos(search, status, pageParam),
    getNextPageParam: (prevData) => prevData.data.nextPage,
    onSuccess: (data) => {
      if (data.pages) {
        const newTodosArr = data.pages.map((page) => page.data.todos);
        const newTodos = newTodosArr.reduce((acc, todoArr) => acc.concat(todoArr));
        setTodos(newTodos);
      }
    }
  });

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
      <Styled.TabletTodoList>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          initialSlide={0}
          centeredSlides
          onReachEnd={() => fetchNextPage()}
        >
          {todos.map((todo) => (
            <SwiperSlide key={`todo-${todo.id}`}>
              <div className="border">
                <TodoItem todo={todo} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Styled.TabletTodoList>
    </>
  );
};

export default TabletTodoList;
