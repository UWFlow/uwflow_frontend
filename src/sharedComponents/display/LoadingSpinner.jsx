import React from 'react';

/* Styled Components */
import { 
    LoadingSpinnerWrapper,
    CircularSvg,
    CircleSvgPath,
    CircleSvgGrey
} from './styles/LoadingSpinner';

const LoadingSpinner = ({ margin = "32px auto" }) => {
  return (
    <LoadingSpinnerWrapper margin={margin}>
        <CircularSvg viewBox="24 24 48 48">
            <CircleSvgGrey
                cx="48"
                cy="48"
                r="16"
                fill="none"
            />
            <CircleSvgPath
                cx="48"
                cy="48"
                r="16"
                fill="none"
            />
        </CircularSvg>
    </LoadingSpinnerWrapper>
  );
};

export default LoadingSpinner;
