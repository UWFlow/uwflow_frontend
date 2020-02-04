import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  CircleWrapper,
  NumbersInCircle,
  LargePercentage,
  GreyText,
} from './styles/CircularPercentage';

function donut(theme, sidelength, percent, barThickness) {
  const outerRadius = sidelength / 2;
  const innerRadius = outerRadius - barThickness;
  // Arc paths cannot form a closed circle
  if (percent === 100) {
    return (
      <g>
        <circle
          cx="50%"
          cy="50%"
          r={outerRadius}
          stroke="none"
          fill={theme.primary}
        />
        <circle
          cx="50%"
          cy="50%"
          r={innerRadius}
          stroke="none"
          fill={theme.white}
        />
      </g>
    );
  } else {
    const center = outerRadius;
    const angle = (percent / 100) * 2 * Math.PI;
    const cf = Math.cos(angle);
    const sf = Math.sin(angle);
    const outerEnd = { x: sf * outerRadius, y: cf * outerRadius };
    const innerEnd = { x: sf * innerRadius, y: cf * innerRadius };
    const largeArc = percent >= 50 ? 1 : 0;

    const start = `M ${center} ${center - innerRadius}`;
    const moveOut = `L ${center} ${center - outerRadius}`;
    const outerArcStart = `A ${outerRadius} ${outerRadius} 0`;
    const outerArcEnd = `${center - outerEnd.x} ${center - outerEnd.y}`;
    const moveIn = `L ${center - innerEnd.x} ${center - innerEnd.y}`;
    const innerArcStart = `A ${innerRadius} ${innerRadius} 0`;
    const innerArcEnd = `${center} ${center - innerRadius}`;

    const outerFill = `${outerArcStart} ${largeArc} 0 ${outerArcEnd}`;
    const outerClear = `${outerArcStart} ${1 - largeArc} 1 ${outerArcEnd}`;
    const innerFill = `${innerArcStart} ${largeArc} 1 ${innerArcEnd}`;
    const innerClear = `${innerArcStart} ${1 - largeArc} 0 ${innerArcEnd}`;

    const fill = `${start} ${moveOut} ${outerFill} ${moveIn} ${innerFill}`;
    const clear = `${start} ${moveOut} ${outerClear} ${moveIn} ${innerClear}`;

    return (
      <g>
        <path d={fill} stroke="none" fill={theme.primary} />
        <path d={clear} stroke="none" fill={theme.light3} />
      </g>
    );
  }
}

//Contained within a square tho
const CircularPercentage = ({
  theme,
  height,
  percent,
  barThickness,
  label,
}) => (
  <CircleWrapper>
    <svg width={height} height={height}>
      {donut(theme, height, percent, barThickness)}
    </svg>
    <NumbersInCircle height={height}>
      <LargePercentage>
        {percent !== null ? `${percent}%` : 'N/A'}
      </LargePercentage>
      <GreyText>{label}</GreyText>
    </NumbersInCircle>
  </CircleWrapper>
);

CircularPercentage.propTypes = {
  height: PropTypes.number,
  percent: PropTypes.number, //Out of 100, not as a decimal
  barThickness: PropTypes.number,
  label: PropTypes.string,
};

export default withTheme(CircularPercentage);
