import styled from 'styled-components';

export const TodoDetails = styled.div`
  margin-top: ${({ theme }) => theme.SPACES.l};

  h2 {
    font-size: ${({ theme }) => theme.FONTS.SIZES.xl};
    margin-bottom: ${({ theme }) => theme.SPACES.xl};
  }

  h4 {
    margin-bottom: ${({ theme }) => theme.SPACES.m};
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.regular};
  }

  & > p {
    text-align: justify;
    font-style: italic;
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.bold};
  }

  & > .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
