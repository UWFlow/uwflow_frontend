import React from 'react';

import { ProgressBarWrapper, Complete, Incomplete } from './styles/ProgressBar';

const ProgressBar = ({ percentComplete, width = 250, height = 16 }) => {
  const percentWidth = Math.round(
    percentComplete < 1 ? percentComplete * 100 : percentComplete,
  );
  return (
    <ProgressBarWrapper width={width} height={height}>
      <Complete width={percentWidth} />
      <Incomplete width={100 - percentWidth} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
