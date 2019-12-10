import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchInput,
  SearchInputWrapper,
  AutocompleteInput,
  Icon,
} from './styles/Textbox';

const Textbox = ({
  text,
  setText,
  placeholder,
  autocompletePlaceholder,
  icon,
  error = false,
  handleKeyDown = () => {},
  options = {},
  maxLength = 524288, // default browser maxLength,
  forwardRef = null,
}) => {
  const onKeyDown = event => {
    handleKeyDown(event, text);
  };

  const onChange = event => {
    setText(event.currentTarget.value);
  };

  return (
    <SearchInputWrapper>
      {autocompletePlaceholder && (
        <AutocompleteInput
          value={autocompletePlaceholder}
          options={options}
          hasIcon={!!icon}
          disabled
        />
      )}
      {icon && <Icon>{icon}</Icon>}
      <SearchInput
        type={options.type ? options.type : 'text'}
        value={text}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        options={options}
        maxLength={`${maxLength}`}
        error={error}
        hasIcon={!!icon}
        autocompleteActive={!!autocompletePlaceholder}
        ref={forwardRef}
      />
    </SearchInputWrapper>
  );
};

Textbox.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autocompletePlaceholder: PropTypes.string,
  icon: PropTypes.any,
  error: PropTypes.bool,
  handleKeyDown: PropTypes.func,
  options: PropTypes.object,
  maxLength: PropTypes.number,
};

export default Textbox;
