import React,{ useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside'

/* Styled Components */
import {
  DropdownWrapper,
  DropdownControl,
  DropdownControlText,
  DropdownMenu,
  MenuItem
} from './styles/DropdownList';

const DropdownList = ({
  selectedIndex,
  options,
  color,
  onChange = () => {},
  placeholder = 'select an option',
  zIndex = 4
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => {setOpen(false)});

  return (
    <DropdownWrapper ref={ref} zIndex={zIndex}>
      <DropdownControl onClick={() => setOpen(!open)}>
        <DropdownControlText color={color}>
          {selectedIndex !== -1 ? options[selectedIndex] : placeholder}
        </DropdownControlText>
      </DropdownControl>
      <DropdownMenu open={open}>
        {options.map((opt, i) => (
          <MenuItem
            key={i}
            selected={i === selectedIndex}
            onChange={onChange(i)}
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
  placeholder: PropTypes.string
};

export default DropdownList;
