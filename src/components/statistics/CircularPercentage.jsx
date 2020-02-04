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

function sector(center, inner, outer, percent, largeArc, sweep) {
    const angle = (percent / 100) * 2 * Math.PI;
    const cf = Math.cos(angle), sf = Math.sin(angle);
    const outerEnd = {x: sf * outer, y: cf * outer};
    const innerEnd = {x: sf * inner, y: cf * inner};
    const startPos = `M ${center} ${center - inner}`;
    const outerPos = `L ${center} ${center - outer}`;
    const outerArc = `A ${outer} ${outer} 0 ${largeArc} ${1-sweep} ${center - outerEnd.x} ${center - outerEnd.y}`;
    const innerPos = `L ${center - innerEnd.x} ${center - innerEnd.y}`;
    const innerArc = `A ${inner} ${inner} 0 ${largeArc} ${sweep} ${center} ${center - inner}`;
    return startPos + outerPos + outerArc + innerPos + innerArc;
}

function donut(theme, sidelength, percent, barThickness) {
    const outerRadius = sidelength / 2;
    const innerRadius = outerRadius - barThickness;
    // Arc paths cannot form a closed circle
    if (percent === 100) {
      return (
        <g>
          <circle cx="50%" cy="50%" r={outerRadius} stroke="none" fill={theme.primary}/>
          <circle cx="50%" cy="50%" r={innerRadius} stroke="none" fill={theme.white}/>
        </g>
      );
    } else {
      const largeArc = (percent >= 50) ? 1 : 0;
      const outerPath = sector(outerRadius, outerRadius, innerRadius, percent, largeArc, 1);
      const innerPath = sector(outerRadius, outerRadius, innerRadius, percent, 1-largeArc, 0);
      return (
        <g>
          <path d={outerPath} stroke="none" fill={theme.primary}/>
          <path d={innerPath} stroke="none" fill={theme.light3}/>
        </g>
      )
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
