import React from 'react';
import Modal from '../display/Modal';
import EmailInputForm from './EmailInputForm';
import { FormText } from './styles/EmailInputForm';

const renderText = () => (
  <FormText>
    We will send an alert to the following email when a spot opens up in a
    section you're subscribed to.
  </FormText>
);

const EditEmailModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <EmailInputForm
      title="Edit your email"
      renderText={renderText}
      submitText="Save"
    />
  </Modal>
);

export default EditEmailModal;
