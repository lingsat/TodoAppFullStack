import styled from 'styled-components';

export const Filter = styled.div`
  margin-bottom: ${({ theme }) => theme.SPACES.m};
  display: flex;
  flex-direction: column;
  row-gap: ${({ theme }) => theme.SPACES.s};

  input {
    padding: ${({ theme }) => theme.SPACES.xs};
    font-family: ${({ theme }) => theme.FONTS.FAMILIES.normal};
    width: 150px;
  }

  & > div {
    display: flex;
  }

  button {
    border-radius: 0;
    border-right: none;

    &:last-child {
      border-right: 2px solid black;
    }
  }

  @media (min-width: 425px) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    input {
      width: 200px;
    }
  }
`;
