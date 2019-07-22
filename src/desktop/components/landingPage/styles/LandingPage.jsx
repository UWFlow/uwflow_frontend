import styled from 'styled-components';
import {
  PageContentZIndex,
  BackgroundZIndex,
} from '../../../../constants/Mixins';

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${PageContentZIndex}
  opacity: 0.8;
`;

export const TitleText = styled.div`
  color: white;
  font-size: 40px;
  font-weight: 400;
  opacity: inherit;
  display: flex;
  justify-content: center;
`;

export const Background = styled.div`
  position: absolute;
  width: 100%;
  background-image: linear-gradient(to bottom right, #27ae60, #e0e0e0);
  ${BackgroundZIndex}
`;
