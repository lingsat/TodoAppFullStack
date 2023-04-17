import styled from 'styled-components';

export const DesktopTodoList = styled.table`
  margin-bottom: ${({ theme }) => theme.SPACES.l};
  border-collapse: collapse;
  border: 2px solid ${({ theme }) => theme.COLORS.black};
  width: 100%;

  th {
    padding: ${({ theme }) => theme.SPACES.xs};
    border: 2px solid ${({ theme }) => theme.COLORS.black};
    background-color: ${({ theme }) => theme.COLORS.light_grey};
    text-align: center;
  }

  th.col--title {
    width: 20%;
  }

  th.col--description {
    width: 55%;
  }

  th.col--actions {
    width: 25%;
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.COLORS.table_row};
  }
`;
