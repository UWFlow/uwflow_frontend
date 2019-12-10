import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ProgressBarWrapper, Complete } from './styles/ProgressBar';

const ProgressBar = ({ percentComplete, width = 188, height = 16 }) => {
  const [percentWidth, setPercentWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentWidth(Math.round(percentComplete * 100));
    }, 500);
  }, []);

  return (
    <ProgressBarWrapper width={width} height={height}>
      <Complete width={percentWidth} />
    </ProgressBarWrapper>
  );
};

ProgressBar.propTypes = {
  percentComplete: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.number,
};

export default ProgressBar;
