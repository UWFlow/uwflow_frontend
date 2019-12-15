import styled from 'styled-components';
import { Heading4, BoxShadow } from '../../../constants/Mixins';

export const ButtonWrapper = styled.button`
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
  display: flex;
  align-items: center;
  text-align: center;
  border: ${({ borderColor }) =>
    borderColor ? `2px solid ${borderColor}` : 'none'};
  border-radius: 8px;
  padding: ${({ padding }) => padding};
  color: ${({ theme, disabled }) => (disabled ? theme.light1 : theme.dark1)};
  min-height: ${({ height }) => height}px;
  max-height: ${({ maxHeight }) => maxHeight};
  margin: ${({ margin }) => margin};
  background: ${({ theme, color = theme.accent, disabled = false }) =>
    disabled ? theme.light4 : color};
  ${({ hasShadow }) => hasShadow && BoxShadow}
  max-width: 100%;
  width: ${({ width }) => (width ? width : 'auto')};

  :hover {
    background: ${({
      theme,
      hoverColor = theme.accentDark,
      disabled = false,
    }) => (disabled ? theme.light4 : hoverColor)};
  }

  :focus {
    color: ${({ theme }) => theme.dark2};
  }
`;

export const ButtonText = styled.div`
  margin: auto;
  width: max-content;
  ${Heading4}
`;
