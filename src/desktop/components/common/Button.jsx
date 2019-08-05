import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper, ButtonText } from './styles/Button';

const Button = ({
  children,
  color,
  hoverColor,
  borderColor,
  margin = '0',
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
    >
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  handleClick: PropTypes.func,
  height: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  margin: PropTypes.string,
  hasShadow: PropTypes.bool,
};

export default Button;
