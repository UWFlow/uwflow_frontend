import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import { ChevronDown } from 'react-feather';

/* Styled Components */
import {
  DropdownWrapper,
  DropdownControl,
  DropdownMenu,
  MenuItem,
} from './styles/DropdownList';
import KeycodeConstants from '../../constants/KeycodeConstants';

const DropdownList = ({
  selectedIndex,
  options,
  color,
  onChange = () => {},
  placeholder = 'select an option',
  zIndex = 4,
  width = 'fit-content',
  margin = 'auto',
  itemColor = null,
  menuOffset = 8
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => setOpen(false));

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    if (keyCode === KeycodeConstants.ESCAPE) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <DropdownWrapper zIndex={zIndex} ref={ref} width={width} margin={margin}>
      <DropdownControl open={open} color={color} onClick={() => setOpen(!open)}>
        {selectedIndex !== -1 ? options[selectedIndex] : placeholder}
        <ChevronDown />
      </DropdownControl>
      <DropdownMenu open={open} menuOffset={menuOffset}>
        {options.map((opt, idx) => (
          <MenuItem
            key={idx}
            selected={idx === selectedIndex}
            itemColor={itemColor}
            onClick={() => {
              onChange(idx);
              setOpen(false);
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

DropdownList.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  color: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  zIndex: PropTypes.number, // callback function that takes the index of the clicked element in the list
  placeholder: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  itemColor: PropTypes.string,
};

export default DropdownList;
