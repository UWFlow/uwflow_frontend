import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper, ButtonText } from './styles/Button';

const Button = ({
  children,
  color,
  hoverColor,
  borderColor,
  margin = '0',
  padding = '16px 48px',
  handleClick = () => {},
  height = 48,
  hasShadow = true,
}) => {
  return (
    <ButtonWrapper
      height={height}
      onClick={handleClick}
      color={color}
      hoverColor={hoverColor}
      borderColor={borderColor}
      hasShadow={hasShadow}
      margin={margin}
      padding={padding}
    >
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  handleClick: PropTypes.func,
  height: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  hasShadow: PropTypes.bool,
};

export default Button;
