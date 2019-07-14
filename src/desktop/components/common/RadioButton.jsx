import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ selected, onClick }) => {
  return <div onClick={onClick}>{selected ? 'ON' : 'OFF'}</div>;
};

RadioButton.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RadioButton;
