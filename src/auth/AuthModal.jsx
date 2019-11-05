import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import ModalHOC from '../components/modal/ModalHOC';
import AuthForm from './AuthForm';

const AuthModal = ({ isModalOpen, onCloseModal, width }) => (
  <ModalHOC isModalOpen={isModalOpen} onCloseModal={onCloseModal}>
    <AuthForm onAuthComplete={onCloseModal} width={width} />
  </ModalHOC>
);

AuthModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default AuthModal;
