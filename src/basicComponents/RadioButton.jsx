import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CheckCircle from './CheckCircle';

/* Styled Components */
import {
  RadioButtonWrapper,
  RadioButtonOption,
  RadioButtonText,
} from './styles/RadioButton';

const RadioButton = ({
  color,
  selected,
  options,
  margin = '0 0 40px 0',
  toggle = false,
  onClick = () => {},
}) => {
  return (
    <RadioButtonWrapper margin={margin}>
      {options.map((opt, idx) => (
        <RadioButtonOption key={idx}>
          <CheckCircle
            color={color}
            disabled={false}
            checked={(toggle && selected) || (!toggle && idx === selected)}
            onClick={() => onClick(idx)}
          />
          <RadioButtonText>{opt}</RadioButtonText>
        </RadioButtonOption>
      ))}
    </RadioButtonWrapper>
  );
};

RadioButton.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  margin: PropTypes.string,
  toggle: PropTypes.bool,
  onClick: PropTypes.func,
};

export default RadioButton;
