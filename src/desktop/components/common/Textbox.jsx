import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { SearchInput, SearchInputWrapper } from './styles/Textbox';

const Textbox = ({
  text,
  setText,
  placeholder,
  error = false,
  errorMessage = '',
  handleKeyDown = () => {},
  options = {},
  maxLength = 524288, // default browser maxLength
}) => {
  const onKeyDown = event => {
    handleKeyDown(event, text);
  };

  const onChange = event => {
    setText(event.currentTarget.value);
  };

  return (
    <SearchInputWrapper>
      <SearchInput
        type={options.type ? options.type : 'text'}
        value={text}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        options={options}
        maxLength={`${maxLength}`}
        error={error}
      />
    </SearchInputWrapper>
  );
};

Textbox.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleKeyDown: PropTypes.func,
  options: PropTypes.object,
  maxLength: PropTypes.number,
};

export default Textbox;
