import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* Child Components */
import Modal from '../components/display/Modal';
import AuthForm from './AuthForm';

/* Selectors */
import { getIsAuthModalOpen } from '../data/reducers/AuthReducer';
import { authModalClose } from '../data/actions/AuthActions';

export const AUTH_MODAL = 'AUTH_MODAL';

const mapStateToProps = state => ({
  isAuthModalOpen: getIsAuthModalOpen(state),
});

const AuthModal = ({ isAuthModalOpen, onAfterLogin, onAfterSignup }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isAuthModalOpen}
      onRequestClose={() => dispatch(authModalClose())}
    >
      <AuthForm
        onLoginComplete={() => {
          dispatch(authModalClose());
          if (onAfterLogin) {
            onAfterLogin();
          }
        }}
        onSignupComplete={() => {
          dispatch(authModalClose());
          if (onAfterSignup) {
            onAfterSignup();
          }
        }}
        margin="0"
      />
    </Modal>
  );
};

AuthModal.propTypes = {
  isAuthModalOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthModal);
