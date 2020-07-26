import React from 'react';
import EmailInputForm from './EmailInputForm';
import { FormText } from './styles/EmailInputForm';

const renderText = () => (
  <FormText>
    We will send an alert to the following email when a spot opens up in a
    course section you&apos;ve subscribed to.
  </FormText>
);

const EditEmailModalContent = ({ email, onRequestClose }) => (
  <EmailInputForm
    email={email}
    title="Edit your email"
    renderText={renderText}
    submitText="Save"
    onClose={onRequestClose}
  />
);

export default EditEmailModalContent;
