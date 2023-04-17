import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HomePageContainer from '../home/home.component';
import Login from '../auth/login/login.component';
import Register from '../auth/register/register.component';
import Profile from '../auth/profile/profile.component';
import TodoContainer from '../todo/containers/todoContainer/todoContainer.component';
import TodoDetails from '../todo/containers/todoDetails/todoDetails.component';
import { userService } from '../auth/services/user.service';
import { APP_KEYS } from '../common/consts';
import Header from '../header/header.component';

export const MainRouter = () => {
  const { data } = useQuery({
    queryKey: [APP_KEYS.QUERY_KEYS.USER],
    retry: false,
    queryFn: () => userService.getUserInfo()
  });

  return (
    <>
      {data && <Header />}
      <Routes>
        <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<HomePageContainer />} />
        <Route path={APP_KEYS.ROUTER_KEYS.LOGIN} element={<Login />} />
        <Route path={APP_KEYS.ROUTER_KEYS.REGISTER} element={<Register />} />
        <Route path={APP_KEYS.ROUTER_KEYS.PROFILE} element={<Profile />} />
        <Route path={APP_KEYS.ROUTER_KEYS.TODOS_LIST} element={<TodoContainer />} />
        <Route path={APP_KEYS.ROUTER_KEYS.TODO_ITEM} element={<TodoDetails />} />
      </Routes>
    </>
  );
};
