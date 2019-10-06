import React from 'react';
import { withTheme } from 'styled-components';
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  NumbersInCircle,
  LargePercentage,
  GreyText,
} from './styles/CircularPercentage';

//Contained within a square tho
const CircularPercentage = ({
  theme,
  height,
  percent,
  barThickness,
  label,
}) => (
  <>
    <PieChart width={height} height={height}>
      <Pie
        dataKey="value"
        data={[{ value: percent }, { value: 100 - percent }]}
        cx="50%"
        cy="50%"
        outerRadius={height / 2}
        innerRadius={height / 2 - barThickness}
      >
        <Cell fill={theme.primary} />
        <Cell fill={theme.light3} />
      </Pie>
    </PieChart>
    <NumbersInCircle height={height}>
      <LargePercentage>{percent}%</LargePercentage>
      <GreyText>{label}</GreyText>
    </NumbersInCircle>
  </>
);

CircularPercentage.propTypes = {
  height: PropTypes.number,
  percent: PropTypes.number, //Out of 100, not as a decimal
  barThickness: PropTypes.number,
  label: PropTypes.string,
};

export default withTheme(CircularPercentage);
