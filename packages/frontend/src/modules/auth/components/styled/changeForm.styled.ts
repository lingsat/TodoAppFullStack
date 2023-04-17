import styled from 'styled-components';

export const StyledChangeForm = styled.form`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.FONTS.SIZES.xl};
  display: flex;
  flex-direction: column;

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
`;
