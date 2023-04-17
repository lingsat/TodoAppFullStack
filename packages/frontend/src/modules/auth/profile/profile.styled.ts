import styled from 'styled-components';

export const Profile = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.SPACES.s};
  }

  h3 {
    margin-bottom: ${({ theme }) => theme.SPACES.xl};
  }

  h4 {
    margin-bottom: ${({ theme }) => theme.SPACES.s};
  }
`;
