import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { ButtonWrapper, ButtonText } from './styles/Button';
import LoadingSpinner from '../display/LoadingSpinner';

const Button = ({
  theme,
  children,
  color,
  hoverColor,
  borderColor,
  width = 'auto',
  margin = '0',
  padding = '8px 32px',
  handleClick = () => {},
  height = 48,
  maxHeight = '100%',
  hasShadow = true,
  loading = false
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
      width={width}
      maxHeight={maxHeight}
    >
      {loading ? (
        <LoadingSpinner
          margin={'auto'}
          size={28}
          strokeWidth={2}
          spinnerColor={theme.dark2}
          backgroundColor={theme.white}
        />
      ) : <ButtonText>{children}</ButtonText>}
    </ButtonWrapper>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  handleClick: PropTypes.func,
  height: PropTypes.number,
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  hasShadow: PropTypes.bool,
  loading: PropTypes.bool,
};

export default withTheme(Button);
