import React from 'react';
import PropTypes from 'prop-types';

import { ProgressBarWrapper, Complete } from './styles/ProgressBar';

const ProgressBar = ({ percentComplete, width = 188, height = 16 }) => {
  const percentWidth = Math.round(percentComplete * 100);
  return (
    <ProgressBarWrapper width={width} height={height}>
      <Complete width={percentWidth} />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  percentComplete: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ProgressBar;
