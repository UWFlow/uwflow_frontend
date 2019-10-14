import React, { useState } from 'react';

/* Child Components */
import ModalHOC from '../basicComponents/modal/ModalHOC';
import Textbox from '../basicComponents/Textbox';
import Button from '../basicComponents/Button';

/* Styled Components */
import { Wrapper, Header, Form } from './styles/ResetPasswordModal';
import { TextboxWrapper } from './styles/ResetPasswordModal';

const ResetPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  return (
    <Wrapper>
      <Header>Reset Password</Header>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%', type: 'email' }}
          placeholder="Email address"
          error={false}
          text={email}
          setText={value => {
            setEmail(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(email)}>
        Send Reset Email
      </Button>
    </Wrapper>
  );
};

const EnterResetCodeForm = ({ onSubmit }) => {
  const [code, setCode] = useState('');
  return (
    <Wrapper>
      <Header>Enter reset code</Header>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="Code"
          error={false}
          text={code}
          setText={value => {
            setCode(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(code)}>
        Submit
      </Button>
    </Wrapper>
  );
};

const EnterNewPasswordForm = ({ onSubmit }) => {
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  return (
    <Wrapper>
      <Header>Enter new password</Header>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="New password"
          error={false}
          text={pass}
          setText={value => {
            setPass(value);
          }}
        />
      </TextboxWrapper>
      <TextboxWrapper>
        <Textbox
          options={{ width: '100%' }}
          placeholder="Confirm new password"
          error={false}
          text={confirmPass}
          setText={value => {
            setConfirmPass(value);
          }}
        />
      </TextboxWrapper>
      <Button width="100%" handleClick={() => onSubmit(pass, confirmPass)}>
        Send Reset Email
      </Button>
    </Wrapper>
  );
};

const RESET_PASSWORD_FORM = 'RESET_PASSWORD';
const ENTER_RESET_CODE_FORM = 'RESET_CODE';
const ENTER_NEW_PASSWORD_FORM = 'NEW_PASSWORD';

const ResetPasswordModal = ({ handleClose, isOpen }) => {
  const [showingForm, setShowingForm] = useState(RESET_PASSWORD_FORM);

  const handleSendResetEmail = email => {
    setShowingForm(ENTER_RESET_CODE_FORM);
  };
  const handleSubmitResetCode = code => {
    setShowingForm(ENTER_NEW_PASSWORD_FORM);
  };
  const handleNewPassword = (newPass, confirmNewPass) => {
    handleClose();
  };

  return (
    <ModalHOC isModalOpen={isOpen} onCloseModal={handleClose}>
      {showingForm === RESET_PASSWORD_FORM && (
        <ResetPasswordForm onSubmit={handleSendResetEmail} />
      )}
      {showingForm === ENTER_RESET_CODE_FORM && (
        <EnterResetCodeForm onSubmit={handleSubmitResetCode} />
      )}
      {showingForm === ENTER_NEW_PASSWORD_FORM && (
        <EnterNewPasswordForm onSubmit={handleNewPassword} />
      )}
    </ModalHOC>
  );
};

export default ResetPasswordModal;
