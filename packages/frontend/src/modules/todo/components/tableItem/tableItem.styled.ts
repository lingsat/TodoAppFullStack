import styled from 'styled-components';

export const TableItem = styled.tr`
  td {
    padding: ${({ theme }) => theme.SPACES.xs};
    border: 2px solid ${({ theme }) => theme.COLORS.black};
    text-align: left;
  }

  td > div {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: ${({ theme }) => theme.SPACES.s};
  }
`;
