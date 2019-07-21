import React,{ useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside'

/* Styled Components */
import {
  DropdownWrapper,
  DropdownControl,
  DropdownArrow,
  DropdownMenu,
  MenuItem
} from './styles/DropdownList';

const DropdownList = ({
  selectedIndex,
  options,
  color,
  onChange = () => {},
  placeholder = 'select an option',
  zIndex = 4,
  width = 'fit-content',
  margin = 'auto'
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => {setOpen(false)});

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    // ESC key
    if (keyCode === 27) {
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
      <DropdownControl
        open={open}
        color={color}
        onClick={() => setOpen(!open)}
      >
        {selectedIndex !== -1 ? options[selectedIndex] : placeholder}
        {
          open
            ? <DropdownArrow>&#9650;</DropdownArrow>
            : <DropdownArrow>&#9660;</DropdownArrow>
        }
      </DropdownControl>
      <DropdownMenu open={open}>
        {options.map((opt, idx) => (
          <MenuItem
            key={idx}
            selected={idx === selectedIndex}
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
  colour: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  zIndex: PropTypes.number, // callback function that takes the index of the clicked element in the list
  placeholder: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string
};

export default DropdownList;
