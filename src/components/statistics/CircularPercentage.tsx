import PropTypes from 'prop-types';
import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { withTheme } from 'styled-components';

/* Styled Components */
import {
  CircleWrapper,
  GreyText,
  LargePercentage,
  NumbersInCircle,
} from './styles/CircularPercentage';

const CircularPercentage = ({
  theme,
  height,
  percent,
  barThickness,
  label,
}) => (
  <CircleWrapper>
    <PieChart width={height} height={height}>
      <Pie
        dataKey="value"
        data={[{ value: percent }, { value: 100 - percent }]}
        cx="50%"
        cy="50%"
        startAngle={90}
        endAngle={450}
        outerRadius={height / 2}
        innerRadius={height / 2 - barThickness}
        blendStroke={true}
      >
        <Cell fill={theme.primary} />
        <Cell fill={theme.light3} />
      </Pie>
    </PieChart>
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
  percent: PropTypes.number, // Out of 100, not as a decimal
  barThickness: PropTypes.number,
  label: PropTypes.string,
};

export default withTheme(CircularPercentage);
