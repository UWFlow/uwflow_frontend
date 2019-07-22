import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper, ButtonText } from './styles/Button';

const Button = ({
  children,
  color,
  hoverColor,
  margin = '0',
  handleClick = () => {},
  width = 144,
  height = 64,
}) => {
  return (
    <ButtonWrapper
      width={width}
      height={height}
      onClick={handleClick}
      color={color}
      hoverColor={hoverColor}
      margin={margin}
    >
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  margin: PropTypes.string
};

export default Button;
