import React, { useEffect } from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import { SearchInput, SearchInputWrapper } from './styles/Textbox';

/* Selectors */
import {
  getTextboxText,
  getTextboxPlaceholder,
} from '../../reducers/TextboxReducer';

/* Actions */
import {
  setTextboxText,
  registerTextbox,
  unregisterTextbox,
} from '../../actions/TextboxActions';

const mapStateToProps = (state, { ID }) => ({
  text: getTextboxText(state, ID),
  placeholder: getTextboxPlaceholder(state, ID),
});

const mapDispatchToProps = (dispatch, { ID, initialPlaceholder }) => ({
  setText: text => dispatch(setTextboxText(ID, text)),
  registerSelf: () => dispatch(registerTextbox(ID, initialPlaceholder)),
  unregisterSelf: () => dispatch(unregisterTextbox(ID)),
});

const Textbox = ({
  text = '',
  placeholder,
  setText,
  registerSelf,
  unregisterSelf,
  handleKeyDown,
  options = {},
  persistThroughUnmount,
}) => {
  useEffect(() => {
    registerSelf();
    if (!persistThroughUnmount) {
      return () => {
        unregisterSelf();
      };
    }
  }, []);

  const onKeyDown = event => {
    if (typeof handleKeyDown == 'function') {
      handleKeyDown(event);
    }
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
      />
    </SearchInputWrapper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textbox);
