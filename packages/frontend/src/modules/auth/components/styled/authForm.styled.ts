import styled from 'styled-components';

export const StyledAuthForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 320px;
  height: calc(100vh - 76px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin-bottom: ${({ theme }) => theme.SPACES.m};
    text-align: center;
  }

  label {
    margin-bottom: ${({ theme }) => theme.SPACES.m};
    display: flex;
    flex-direction: column;
    font-size: ${({ theme }) => theme.FONTS.SIZES.s};
    font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.bold};
  }

  input {
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

  fieldset {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
