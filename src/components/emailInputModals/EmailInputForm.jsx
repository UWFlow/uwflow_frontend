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
  title,
  renderText,
  submitText,
  theme,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    // TODO: Submit email mutation
    // This part executes if submit email is successful
    if (onSuccess) {
      onSuccess(email);
    }
    onClose();
  };

  return (
    <EmailInputFormWrapper>
      <FormTitle>{title}</FormTitle>
      {renderText()}
      <TextboxWrapper>
        <Textbox
          text={email}
          setText={setEmail}
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
