import styled from 'styled-components';

export const TabletTodoList = styled.section`
  width: 80%;
  margin: 0 auto;
  margin-top: calc(${({ theme }) => theme.SPACES.xl} * 2);

  div.border {
    padding: ${({ theme }) => theme.SPACES.m};
    border: 2px solid black;
    border-radius: ${({ theme }) => theme.SPACES.s};
  }

  .swiper {
    overflow: visible;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 0;
    height: 0;
    border-top: ${({ theme }) => theme.SPACES.m} solid transparent;
    border-bottom: ${({ theme }) => theme.SPACES.m} solid transparent;
  }

  .swiper-button-prev {
    left: -45px;
    border-right: ${({ theme }) => theme.SPACES.m} solid ${({ theme }) => theme.COLORS.green};
  }

  .swiper-button-next {
    right: -45px;
    border-left: ${({ theme }) => theme.SPACES.m} solid ${({ theme }) => theme.COLORS.green};
  }
`;
