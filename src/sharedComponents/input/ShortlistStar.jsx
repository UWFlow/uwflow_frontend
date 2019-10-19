import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Styled Components */
import { ShortlistStarWrapper } from './styles/ShortlistStar';

const ShortlistStar = ({ theme, checked, size = 32, onClick = () => {} }) => {
  return (
    <ShortlistStarWrapper
      onClick={onClick}
      checked={checked}
      width={size}
      color={checked ? theme.dark3 : theme.light4}
      size={size}
      strokeWidth={2}
    />
  );
};

ShortlistStar.propTypes = {
  theme: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

export default withTheme(ShortlistStar);
