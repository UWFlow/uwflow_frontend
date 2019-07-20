import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

import {
  DiscreteSliderWrapper,
  DiscreteSliderTitle,
  SliderBarWrapper,
  SliderNodeText,
  SliderRail,
  SliderHandle,
  SliderTick,
  SliderTrack
} from './styles/DiscreteSlider';

const Handle = ({
  handle: { id, percent }, 
  getHandleProps,
  color
}) => (
  <SliderHandle percent={percent} color={color} {...getHandleProps(id)} />
);

const Track = ({ source, target, color, getTrackProps }) => (
  <SliderTrack target={target} source={source} color={color} {...getTrackProps()} />
);
 
const DiscreteSlider = ({
  title,
  numNodes,
  currentNode,
  nodeText,
  color,
  onChange,
  margin="0 0 40px 0"
}) => {
  return (
    <DiscreteSliderWrapper margin={margin}>
      <DiscreteSliderTitle>{title}</DiscreteSliderTitle>
      <SliderBarWrapper>
        <Slider
          step={1}
          mode={2}
          domain={[0, numNodes]}
          onChange={onChange}
          values={[currentNode]}
          rootStyle={{
            position: 'relative',
            width: '100%',
            height: '8px'
          }}
        >
          <Rail>
            {({ getRailProps }) => (
              <SliderRail {...getRailProps()} /> 
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                    color={color}
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
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={numNodes}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <SliderTick color={color} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </SliderBarWrapper>
      <SliderNodeText>{nodeText[currentNode]}</SliderNodeText>
    </DiscreteSliderWrapper>
  );
};

DiscreteSlider.propTypes = {
  title: PropTypes.string,
  margin: PropTypes.string,
  numNodes: PropTypes.number.isRequired, // includes 0 so 6 for 0 20 40 60 80 100
  currentNode: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  nodeText: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired, // when we detect mouse sliding we call onSlide with the index of the node slided to
};

export default DiscreteSlider;
