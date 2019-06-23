import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBarWrapper, Complete, Incomplete } from './styles/ProgressBar';

const ProgressBar = ({ percentComplete, width = 250, height = 30 }) => {
  const percentWidth = Math.round(percentComplete * 100);
  return (
    <ProgressBarWrapper width={width} height={height}>
      <Complete width={percentWidth} />
      <Incomplete width={100 - percentWidth} />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  percentComplete: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

export default ProgressBar;
