import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import { toast } from 'react-toastify';

/* Child Components */
import Button from 'components/input/Button';
import Textbox from 'components/input/Textbox';

/* GraphQL */
import { UPDATE_USER_EMAIL } from 'graphql/mutations/Email';

/* Utils */
import { validateEmail } from 'utils/Email';
import { EMAIL_ERROR, EMAIL_UPDATE_SUCCESS } from 'constants/Messages';
import {
  EmailInputFormWrapper,
  FormTitle,
  TextboxWrapper,
  ButtonsWrapper,
} from './styles/EmailInputForm';

const EmailInputForm = ({
  email,
  title,
  renderText,
  submitText,
  theme,
  onClose,
  onSuccess = () => {},
}) => {
  const userID = localStorage.getItem('user_id');
  const [emailText, setEmailText] = useState(email || '');
  const [emailError, setEmailError] = useState(false);
  const [updateEmail] = useMutation(UPDATE_USER_EMAIL);

  const notifyUpdate = () => toast(EMAIL_UPDATE_SUCCESS);
  const notifyError = () => toast(EMAIL_ERROR);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(emailText)) {
      setEmailError(true);
    } else {
      updateEmail({ variables: { user_id: userID, email: emailText } })
        .then(() => {
          notifyUpdate();
          onSuccess(email);
          onClose();
        })
        .catch(() => notifyError());
    }
  };

  return (
    <EmailInputFormWrapper onSubmit={onSubmit}>
      <FormTitle>{title}</FormTitle>
      {renderText()}
      <TextboxWrapper>
        <Textbox
          text={emailText}
          setText={(value) => {
            setEmailText(value);
            setEmailError(false);
          }}
          placeholder="Email"
          maxLength={100}
          error={emailError}
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
        <Button handleClick={onSubmit} type="submit">
          {submitText}
        </Button>
      </ButtonsWrapper>
    </EmailInputFormWrapper>
  );
};

export default withTheme(EmailInputForm);
