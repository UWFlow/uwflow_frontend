import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import {
  EmailInputFormWrapper,
  FormTitle,
  TextboxWrapper,
  ButtonsWrapper,
} from './styles/EmailInputForm';

/* Child Components */
import Button from '../input/Button';
import Textbox from '../input/Textbox';

const EmailInputForm = ({
  email,
  title,
  renderText,
  submitText,
  theme,
  onClose,
  onSuccess,
}) => {
  const [emailText, setEmailText] = useState(email ? email : '');

  const onSubmit = () => {
    // This part executes if submit email is successful
    if (onSuccess) {
      onSuccess(email);
    }
    onClose();
  };

  return (
    <EmailInputFormWrapper onSubmit={onSubmit}>
      <FormTitle>{title}</FormTitle>
      {renderText()}
      <TextboxWrapper>
        <Textbox
          text={emailText}
          setText={setEmailText}
          placeholder="Email"
          maxLength={100}
          options={{ width: '100%', type: 'email' }}
        />
      </TextboxWrapper>
      <ButtonsWrapper>
        <Button
          color={theme.dark3}
          hoverColor={theme.dark2}
          handleClick={onClose}
          margin="0 16px 0 0"
        >
          Cancel
        </Button>
        <Button handleClick={onSubmit}>{submitText}</Button>
      </ButtonsWrapper>
    </EmailInputFormWrapper>
  );
};

export default withTheme(EmailInputForm);
