import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import FadeIn from 'react-fade-in';
import { ChevronDown, Search } from 'react-feather';
import { useTheme } from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';

import KeycodeConstants from 'constants/KeycodeConstants';

import {
  DropdownControl,
  DropdownMenu,
  DropdownWrapper,
  ITEM_HEIGHT,
  MenuItem,
  MenuSearch,
} from './styles/DropdownList';
import Textbox from './Textbox';

type DropdownListProps = {
  color: string;
  options: string[];
  selectedIndex: number;
  maxItems?: number;
  menuOffset?: number;
  itemColor?: string;
  margin?: string;
  onChange?: (index: number) => void;
  placeholder?: string;
  searchable?: boolean;
  width?: string;
  zIndex?: number;
};

const DropdownList = ({
  color,
  options,
  selectedIndex,
  onChange = () => {},
  placeholder = 'select an option',
  zIndex = 4,
  width = 'fit-content',
  margin = 'auto',
  itemColor = undefined,
  menuOffset = 8,
  searchable = false,
  maxItems = 5,
}: DropdownListProps) => {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  useOnClickOutside(ref, () => setOpen(false));

  const handleUserKeyPress = useCallback((event) => {
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
        .filter((opt: { value: string; index: number }) => {
          const lowercaseOpt = opt.value.toLowerCase();
          const lowercaseSearchText = searchText.toLowerCase();
          return (
            lowercaseOpt
              .split(' ')
              .some((val: string) => val.startsWith(lowercaseSearchText)) ||
            lowercaseOpt.startsWith(lowercaseSearchText)
          );
        })
        .map((opt) => (
          <MenuItem
            key={opt.index}
            selected={opt.index === selectedIndex}
            itemColor={itemColor}
            onMouseDown={(e) => e.preventDefault()}
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
      <DropdownControl
        open={open}
        color={color}
        onClick={() => setOpen(!open)}
        onMouseDown={(e) => e.preventDefault()}
      >
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
          ) : (
            DropdownMenuContent()
          )}
        </DropdownMenu>
      </FadeIn>
    </DropdownWrapper>
  );
};

export default DropdownList;
