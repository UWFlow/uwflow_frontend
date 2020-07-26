import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { SearchInput, SearchInputWrapper, Icon } from './styles/Textbox';

const Textbox = ({
  text,
  setText,
  placeholder,
  icon,
  error = false,
  handleKeyDown = () => {},
  onFocus = () => {},
  options = {},
  maxLength = 524288, // default browser maxLength,
  forwardRef = null,
}) => {
  const onKeyDown = (event) => {
    handleKeyDown(event, text);
  };

  const onChange = (event) => {
    setText(event.currentTarget.value);
  };

  return (
    <SearchInputWrapper>
      {icon && <Icon>{icon}</Icon>}
      <SearchInput
        type={options.type ? options.type : 'text'}
        value={text}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        options={options}
        maxLength={`${maxLength}`}
        error={error}
        hasIcon={!!icon}
        ref={forwardRef}
      />
    </SearchInputWrapper>
  );
};

Textbox.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  error: PropTypes.bool,
  handleKeyDown: PropTypes.func,
  options: PropTypes.object,
  maxLength: PropTypes.number,
};

export default Textbox;
