import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import ModalHOC from '../common/modal/ModalHOC';
import AuthForm from './AuthForm';

const AuthModal = ({ isModalOpen, onCloseModal }) => (
  <ModalHOC isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
    <AuthForm onAuthComplete={onCloseModal} />
  </ModalHOC>
);

AuthModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
}

export default AuthModal;
