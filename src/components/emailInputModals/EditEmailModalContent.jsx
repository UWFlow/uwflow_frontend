import React from 'react';
import EmailInputForm from './EmailInputForm';
import { FormText } from './styles/EmailInputForm';

const renderText = () => (
  <FormText>
    We will send an alert to the following email when a spot opens up in a
    section you're subscribed to
  </FormText>
);

const EditEmailModalContent = ({ email, onClose }) => (
  <EmailInputForm
    email={email}
    title="Edit your email"
    renderText={renderText}
    submitText="Save"
    onClose={onClose}
  />
);

export default EditEmailModalContent;
