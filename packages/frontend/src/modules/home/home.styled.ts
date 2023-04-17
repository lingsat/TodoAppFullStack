import styled from 'styled-components';

export const Home = styled.div`
  width: 100%;
  height: calc(100vh - 76px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.SPACES.l};

  h1 {
    margin-bottom: ${({ theme }) => theme.SPACES.xl};
  }
`;
