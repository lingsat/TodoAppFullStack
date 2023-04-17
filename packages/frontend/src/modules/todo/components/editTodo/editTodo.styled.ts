import styled from 'styled-components';

export const EditTodo = styled.form`
  margin: ${({ theme }) => theme.SPACES.m} auto;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.SPACES.m};
    font-size: ${({ theme }) => theme.FONTS.SIZES.s};
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.bold};
  }

  input,
  textarea {
    padding: ${({ theme }) => theme.SPACES.xs};
    font-size: ${({ theme }) => theme.FONTS.SIZES.m};
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.regular};
  }

  label + p {
    color: ${({ theme }) => theme.COLORS.red};
    font-size: ${({ theme }) => theme.FONTS.SIZES.s};
    position: relative;
    left: 0;
    bottom: ${({ theme }) => theme.SPACES.s};
    z-index: 1;
  }
`;
