import styled, { css } from 'styled-components';

export const StyledCheckboxBtn = styled('div')<{ $checked: boolean }>`
  margin-left: auto;
  width: 50px;
  height: 28px;
  background-color: ${({ theme }) => theme.COLORS.green};
  border: 2px solid ${({ theme }) => theme.COLORS.black};
  border-radius: ${({ theme }) => theme.SPACES.m};
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    width: 28px;
    height: 28px;
    background-color: ${({ theme }) => theme.COLORS.white};
    border: 2px solid ${({ theme }) => theme.COLORS.black};
    border-radius: 100%;
    position: absolute;
    top: 50%;
    right: ${(props) => (props.$checked ? '20px' : '-2px')};
    transform: translateY(-50%);
    z-index: 1;
  }

  ${(props) =>
    props.$checked &&
    css`
      background-color: ${({ theme }) => theme.COLORS.red};
    `}
`;
