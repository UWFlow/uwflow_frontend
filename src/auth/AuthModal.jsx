import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* Child Components */
import Modal from '../components/display/Modal';
import AuthForm from './AuthForm';

/* Selectors */
import { getIsAuthModalOpen } from '../data/reducers/AuthReducer';
import { authModalClose } from '../data/actions/AuthActions';

const mapStateToProps = state => ({
  isAuthModalOpen: getIsAuthModalOpen(state),
});

const AuthModal = ({ isAuthModalOpen }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isAuthModalOpen}
      onRequestClose={() => dispatch(authModalClose())}
    >
      <AuthForm onLoginComplete={() => dispatch(authModalClose())} margin="0" />
    </Modal>
  );
};

AuthModal.propTypes = {
  isAuthModalOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthModal);
