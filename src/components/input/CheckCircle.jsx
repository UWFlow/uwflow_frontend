import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'react-feather';

/* Styled Components */
import { CheckCircleWrapper, CheckIcon } from './styles/CheckCircle';

const CheckCircle = ({
  color,
  checked = false,
  width = 32,
  disabled = true,
  onClick = () => {},
}) => {
  return (
    <CheckCircleWrapper
      onClick={() => (disabled ? null : onClick())}
      disabled={disabled}
      width={width}
      color={color}
      checked={checked}
    >
      {checked ? (
        <CheckIcon>
          <Check color="white" size={24} strokeWidth={3} />
        </CheckIcon>
      ) : null}
    </CheckCircleWrapper>
  );
};

CheckCircle.propTypes = {
  color: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  width: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default CheckCircle;
