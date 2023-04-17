import styled from 'styled-components';

export const StyledDetailsControls = styled.div`
  padding: ${({ theme }) => theme.SPACES.xl} 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${({ theme }) => theme.SPACES.m};

  @media (min-width: 768px) {
    padding-left: ${({ theme }) => theme.SPACES.xl};
    padding-right: calc(${({ theme }) => theme.SPACES.xl} * 3);
  }
`;
