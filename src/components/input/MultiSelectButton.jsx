import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  MultiSelectButtonWrapper,
  ButtonWrapper
} from './styles/MultiSelectButton';

const MultiSelectButton = ({
  options, selected, margin = "0 0 32px 0", onClick = () => {} }
) => {
  return (
    <MultiSelectButtonWrapper margin={margin}>
      {options.map((option, idx) => (
        <ButtonWrapper
          selected={selected[idx]}
          onClick={() => onClick(idx)}
          key={idx}
        >
          {option}
        </ButtonWrapper>
      ))}
    </MultiSelectButtonWrapper>
  );
};

MultiSelectButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  selected: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onClick: PropTypes.func
};

export default MultiSelectButton;
