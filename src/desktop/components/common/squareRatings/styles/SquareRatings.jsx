import styled from 'styled-components';
import { Body } from '../../../../../constants/Mixins';

export const SquareRatingWrapper = styled.div`
  display: flex;
`;

export const UnitCircle = styled.div`
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
  ${({ border }) => (border ? 'border: 2px solid gray' : '')};
  margin: 2px;
`;

export const YNText = styled.div`
  ${Body}
  color: white;
`;
