import styled, { css } from 'styled-components';

export const StyledButton = styled('button')<{
  $small?: boolean;
  $medium?: boolean;
  $auto?: boolean;
  $active?: boolean;
}>`
  display: block;
  padding: ${({ theme }) => theme.SPACES.xs};
  width: 140px;
  font-size: ${({ theme }) => theme.FONTS.SIZES.l};
  color: ${({ theme }) => theme.COLORS.black};
  background-color: ${({ theme }) => theme.COLORS.white};
  text-align: center;
  text-decoration: none;
  border: 2px solid ${({ theme }) => theme.COLORS.black};
  border-radius: ${({ theme }) => theme.SPACES.xs};
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.black};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;

    &:hover {
      color: ${({ theme }) => theme.COLORS.black};
      background-color: ${({ theme }) => theme.COLORS.white};
    }
  }

  // Small
  ${(props) =>
    props.$small &&
    css`
      width: 80px;
      font-size: ${({ theme }) => theme.FONTS.SIZES.m};
    `}

  // Medium
  ${(props) =>
    props.$medium &&
    css`
      width: 100px;
      font-size: ${({ theme }) => theme.FONTS.SIZES.m};
    `}

  // Auto width
  ${(props) =>
    props.$auto &&
    css`
      padding-left: ${({ theme }) => theme.SPACES.s};
      padding-right: ${({ theme }) => theme.SPACES.s};
      width: auto;
      font-size: ${({ theme }) => theme.FONTS.SIZES.s};

      @media (min-width: 768px) {
        font-size: ${({ theme }) => theme.FONTS.SIZES.m};
      }
    `}

  // Active
  ${(props) =>
    props.$active &&
    css`
      font-weight: ${({ theme }) => theme.FONTS.WEIGHTS.bold};
    `}
`;
