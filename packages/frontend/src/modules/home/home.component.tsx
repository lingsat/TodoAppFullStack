import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { StyledContainer } from '../common/components/styled/container.styled';
import { StyledButton } from '../common/components/styled/button.styled';
import * as Styled from './home.styled';
import { APP_KEYS } from '../common/consts';
import { IUser } from '../auth/types/user.type';

const HomePageContainer = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<{ data: IUser }>([APP_KEYS.QUERY_KEYS.USER]);

  useEffect(() => {
    if (userData) {
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <StyledContainer>
      <Styled.Home>
        <h1>TodoApp</h1>
        <StyledButton as={Link} to={APP_KEYS.ROUTER_KEYS.LOGIN}>
          Login
        </StyledButton>
        <StyledButton as={Link} to={APP_KEYS.ROUTER_KEYS.REGISTER}>
          Register
        </StyledButton>
      </Styled.Home>
    </StyledContainer>
  );
};

export default HomePageContainer;
