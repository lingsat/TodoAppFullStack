import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer } from '../common/components/styled/container.styled';
import { StyledButton } from '../common/components/styled/button.styled';
import { APP_KEYS } from '../common/consts';
import * as Styled from './header.styled';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <StyledContainer>
    <Styled.Header>
      <StyledButton $medium as={Link} to={APP_KEYS.ROUTER_KEYS.TODOS_LIST}>
        Todo List
      </StyledButton>
      <StyledButton $medium as={Link} to={APP_KEYS.ROUTER_KEYS.PROFILE}>
        My Profile
      </StyledButton>
    </Styled.Header>
  </StyledContainer>
);

export default Header;
