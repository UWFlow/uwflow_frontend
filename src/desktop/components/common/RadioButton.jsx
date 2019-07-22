import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import CheckCircle from '../common/CheckCircle';

/* Styled Components */
import  {
  RadioButtonWrapper,
  RadioButtonOption,
  RadioButtonText
} from './styles/RadioButton';

const RadioButton = ({ color, selected, options, onClick = () => {} }) => {
  return (
    <RadioButtonWrapper>
      {options.map((opt, idx) => (
        <RadioButtonOption>
          <CheckCircle
            key={idx}
            color={color}
            disabled={false}
            checked={idx === selected}
            onClick={() => onClick(idx)}
          />
          <RadioButtonText>
            {opt}
          </RadioButtonText>
        </RadioButtonOption>
      ))}
    </RadioButtonWrapper>
  );
};

RadioButton.propTypes = {
  color: PropTypes.string,
  selected: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

export default RadioButton;
