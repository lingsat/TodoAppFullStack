import styled from 'styled-components';

export const TodoContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.SPACES.l};

  & > button {
    margin: 0 auto ${({ theme }) => theme.SPACES.m};
  }

  & > p {
    text-align: center;
    padding: ${({ theme }) => theme.SPACES.m};
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
