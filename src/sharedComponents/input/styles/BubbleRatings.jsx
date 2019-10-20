import styled from 'styled-components';
import { Body, BoxShadow } from '../../../constants/Mixins';

export const BubbleRatingsWrapper = styled.div`
  display: flex;
  padding-bottom: 16px;

  @media only screen and (max-width: 800px) {
    padding-bottom: 8px
  }
`;

export const UnitCircle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius: ${({ diameter }) => diameter / 2}px;
  background-color: ${({ filledColor, emptyColor, theme, filled }) =>
    filled
      ? filledColor
        ? filledColor
        : theme.primary
      : emptyColor
      ? emptyColor
      : 'white'};
  border: 2px solid ${({ filled, theme }) => (filled ? theme.primaryDark : theme.light4)};
  margin: 0 1px;
  ${({ filled }) => (filled ? '' : BoxShadow)}
`;

export const ThumbsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Thumb = styled.div`
  ${Body}
  color: ${({theme, colored}) => colored ? theme.primary : theme.light4};
  margin-left: 4px;
`;