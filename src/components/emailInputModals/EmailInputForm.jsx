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

const EmailInputForm = ({ title, renderText, submitText, theme, onClose }) => {
  const [email, setEmail] = useState('');
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
        >
          Cancel
        </Button>
        <Button>{submitText}</Button>
      </ButtonsWrapper>
    </EmailInputFormWrapper>
  );
};

export default withTheme(EmailInputForm);
