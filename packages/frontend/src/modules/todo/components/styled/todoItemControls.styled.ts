import styled from 'styled-components';

export const TodoItemControls = styled.div`
  margin-top: ${({ theme }) => theme.SPACES.m};
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    column-gap: ${({ theme }) => theme.SPACES.m};
  }
`;
