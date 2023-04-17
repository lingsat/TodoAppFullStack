import styled from 'styled-components';

export const TodoItem = styled.div`
  h2 {
    margin-bottom: ${({ theme }) => theme.SPACES.m};
  }

  & > p {
    text-align: justify;
    font-style: italic;
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.bold};
  }
`;
