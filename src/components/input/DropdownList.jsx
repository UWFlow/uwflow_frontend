import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useOnClickOutside from 'use-onclickoutside';
import { ChevronDown, Search } from 'react-feather';
import { withTheme } from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import FadeIn from 'react-fade-in';

/* Styled Components */
import {
  DropdownWrapper,
  DropdownControl,
  DropdownMenu,
  MenuItem,
  MenuSearch,
  ITEM_HEIGHT,
} from './styles/DropdownList';
import KeycodeConstants from '../../constants/KeycodeConstants';
import Textbox from './Textbox';

const DropdownList = ({
  theme,
  selectedIndex,
  options,
  color,
  onChange = () => {},
  placeholder = 'select an option',
  zIndex = 4,
  width = 'fit-content',
  margin = 'auto',
  itemColor = null,
  menuOffset = 8,
  searchable = false,
  maxItems = 5,
}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  const DropdownMenuContent = () => (
    <>
      {searchable && options.length > maxItems && (
      <MenuSearch>
        <Textbox
          icon={<Search color={theme.dark3} />}
          text={searchText}
          setText={setSearchText}
          placeholder=""
          maxLength={50}
          options={{
            width: '100%',
            backgroundColor: theme.light2,
            padding: 0,
          }}
        />
      </MenuSearch>
    )}
    {options
      .map((opt, idx) => Object({ value: opt, index: idx }))
      .filter(opt => {
        const lowercaseOpt = opt.value.toLowerCase();
        const lowercaseSearchText = searchText.toLowerCase();
        return (
          lowercaseOpt
            .split(' ')
            .some(val => val.startsWith(lowercaseSearchText)) ||
          lowercaseOpt.startsWith(lowercaseSearchText)
        );
      })
      .map(opt => (
        <MenuItem
          key={opt.index}
          selected={opt.index === selectedIndex}
          itemColor={itemColor}
          onMouseDown={e => e.preventDefault()}
          onClick={() => {
            onChange(opt.index);
            setOpen(false);
          }}
        >
          {opt.value}
        </MenuItem>
      ))}{' '}
    </>
  );

  return (
    <DropdownWrapper zIndex={zIndex} ref={ref} width={width} margin={margin}>
      <DropdownControl open={open} color={color} onClick={() => setOpen(!open)} onMouseDown={e => e.preventDefault()}>
        {selectedIndex !== -1 ? options[selectedIndex] : placeholder}
        <ChevronDown />
      </DropdownControl>
      <FadeIn>
        <DropdownMenu open={open} menuOffset={menuOffset}>
          {options.length > maxItems ? (
            <Scrollbars
              autoHeight
              autoHeightMin="100%"
              autoHeightMax={maxItems * ITEM_HEIGHT}
            >
              {DropdownMenuContent()}
            </Scrollbars>
          ) : DropdownMenuContent()}
        </DropdownMenu>
      </FadeIn>
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

export default withTheme(DropdownList);
