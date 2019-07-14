import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper, ButtonText } from './styles/Button';

const Button = ({
  children,
  handleClick = () => {},
  width = 144,
  height = 64,
}) => {
  return (
    <ButtonWrapper width={width} height={height} onClick={handleClick}>
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Button;
