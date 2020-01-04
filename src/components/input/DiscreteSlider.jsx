import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { withTheme } from 'styled-components';

import {
  DiscreteSliderWrapper,
  SliderBarWrapper,
  SliderRail,
  SliderHandle,
  SliderTick,
  SliderTrack,
} from './styles/DiscreteSlider';

const Handle = ({
  handle: { id, percent },
  getHandleProps,
  color,
  disabled,
}) => (
  <SliderHandle
    percent={percent}
    color={color}
    disabled={disabled}
    {...getHandleProps(id)}
  />
);

const Track = ({ source, target, color, getTrackProps, disabled }) => (
  <SliderTrack
    target={target}
    source={source}
    color={color}
    disabled={disabled}
    {...getTrackProps()}
  />
);

const DiscreteSlider = ({
  theme,
  numNodes,
  currentNode,
  color,
  margin = '0 0 40px 0',
  showTicks = true,
  selected = true,
  fullWidthMobile = false,
  disabled = false,
  onSlideEnd = () => {},
  onUpdate = () => {},
  setSelected = () => {},
}) => {
  const [updateValue, setUpdateValue] = useState(currentNode);

  useEffect(() => {
    setUpdateValue(currentNode);
  }, [currentNode]);

  const percentGap = numNodes > 1 ? 100 / (numNodes - 1) : 100;
  let percentages = [];
  for (let i = 0; i < 100; i += percentGap) {
    percentages.push(i);
  }
  percentages.push(100);

  return (
    <DiscreteSliderWrapper margin={margin} fullWidthMobile={fullWidthMobile}>
      <SliderBarWrapper>
        <Slider
          step={1}
          mode={2}
          domain={[0, numNodes - 1]}
          disabled={disabled}
          onSlideEnd={value => {
            if (disabled) {
              return;
            }
            onSlideEnd(value);
          }}
          onUpdate={value => {
            if (disabled) {
              return;
            }
            setUpdateValue(value);
            onUpdate(value);
          }}
          values={[currentNode]}
          rootStyle={{
            position: 'relative',
            width: '100%',
            height: '8px',
            marginRight: '12px',
            marginLeft: '12px',
          }}
        >
          <Rail>
            {({ getRailProps }) => (
              <>
                <SliderRail {...getRailProps()} disabled={disabled} />
                {showTicks &&
                  percentages.map((percent, idx) => (
                    <SliderTick
                      key={percent}
                      color={idx <= updateValue ? color : theme.light3}
                      percent={percent}
                      disabled={disabled}
                      {...getRailProps()}
                    />
                  ))}
              </>
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div
                className="slider-handles"
                onClick={() => {
                  if (!selected && !disabled) {
                    setSelected(true);
                  }
                }}
              >
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                    color={selected ? color : theme.light3}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    color={color}
                    getTrackProps={getTrackProps}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </SliderBarWrapper>
    </DiscreteSliderWrapper>
  );
};

DiscreteSlider.propTypes = {
  theme: PropTypes.object.isRequired,
  margin: PropTypes.string,
  numNodes: PropTypes.number.isRequired, // includes 0 so 6 for 0 20 40 60 80 100
  currentNode: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  showTicks: PropTypes.bool,
};

export default withTheme(DiscreteSlider);
