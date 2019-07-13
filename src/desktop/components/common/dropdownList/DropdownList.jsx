import React from 'react';
import PropTypes from 'prop-types';
import { SelectedTextWrapper } from './styles/DropdownList';

const DropdownList = ({ selectedIndex, list, onClickElement }) => {
  return <SelectedTextWrapper>{list[selectedIndex]}</SelectedTextWrapper>;
};

DropdownList.propTypes = {
  selectedIndex: PropTypes.number,
  list: PropTypes.arrayOf(PropTypes.string),
  onClickElement: PropTypes.func, // callback function that takes the index of the clicked element in the list
};

export default DropdownList;
