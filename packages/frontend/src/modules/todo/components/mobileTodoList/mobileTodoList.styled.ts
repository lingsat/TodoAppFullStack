import styled from 'styled-components';

export const MobileTodoList = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.SPACES.xl};
`;
