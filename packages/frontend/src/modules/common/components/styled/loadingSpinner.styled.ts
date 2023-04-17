import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const StyledLoadingSpinner = styled.div`
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.COLORS.light_grey};
  border-top: 4px solid ${({ theme }) => theme.COLORS.black};
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;
