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
      <g stroke="none">
        <circle cx="50%" cy="50%" r={outerRadius} fill={theme.primary} />
        <circle cx="50%" cy="50%" r={innerRadius} fill={theme.white} />
      </g>
    );
  }

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

  const outerDark = `${outerArcStart} ${largeArc} 0 ${outerArcEnd}`;
  const outerLight = `${outerArcStart} ${1 - largeArc} 1 ${outerArcEnd}`;
  const innerDark = `${innerArcStart} ${largeArc} 1 ${innerArcEnd}`;
  const innerLight = `${innerArcStart} ${1 - largeArc} 0 ${innerArcEnd}`;

  const dark = `${start} ${moveOut} ${outerDark} ${moveIn} ${innerDark}`;
  const light = `${start} ${moveOut} ${outerLight} ${moveIn} ${innerLight}`;

  return (
    <g stroke="none">
      <path d={dark} fill={theme.primary} />
      <path d={light} fill={theme.light3} />
    </g>
  );
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
