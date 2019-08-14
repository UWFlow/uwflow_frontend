import styled from 'styled-components';
import { Heading4 } from '../../../../constants/Mixins';

export const ButtonWrapper = styled.button`
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  border: 2px solid ${({ theme, borderColor = theme.light2 }) => borderColor};
  border-radius: 8px;
  padding: ${({ padding }) => padding};
  color: ${({ theme }) => theme.dark1};
  min-height: ${({ height }) => height}px;
  margin: ${({ margin }) => margin};
  background: ${({ theme, color = theme.accent }) => color};
  ${({ hasShadow }) => hasShadow 
    && `box-shadow: 0px 2px 5px rgba(236, 237, 237, 0.5),
      0px 0px 5px rgba(142, 147, 148, 0.2);`}

  :hover {
    background: ${({ theme, hoverColor = theme.accentDark }) => hoverColor};
  }

  :focus {
    color: ${({ theme }) => theme.dark2};
  }
`;

export const ButtonText = styled.div`
  margin: auto;
  ${Heading4}
`;
