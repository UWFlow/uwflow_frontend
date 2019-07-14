import React from 'react';
import PropTypes from 'prop-types';

const DiscreteSlider = ({ numNodes, currentNode, colour, onSlide }) => {
  return <div>Discrete Slider!</div>;
};

DiscreteSlider.propTypes = {
  numNodes: PropTypes.number, // includes 0 so 6 for 0 20 40 60 80 100
  currentNode: PropTypes.number,
  colour: PropTypes.string,
  onSlide: PropTypes.func, //When we detect mouse sliding we call onSlide with the index of the node slided to
};

export default DiscreteSlider;
