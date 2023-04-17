import styled from 'styled-components';

export const Header = styled.header`
  height: 68px;
  padding: ${({ theme }) => theme.SPACES.m} 0;
  margin-bottom: ${({ theme }) => theme.SPACES.s};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
