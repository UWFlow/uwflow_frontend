import styled from 'styled-components';
import { Body, BoxShadow } from '../../../../../constants/Mixins';

export const SquareRatingWrapper = styled.div`
  display: flex;
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
  ${({ border, theme }) => (border ? `border: 2px solid ${theme.light4}` : '')};
  margin: 0 1px;
  ${({ filled }) => filled ? '' : BoxShadow}
`;

export const YNText = styled.div`
  ${Body}
  position: absolute;
  top: 3px;
  left: 5px;
  font-family: 'Anderson Grotesk';
  color: white;
`;
