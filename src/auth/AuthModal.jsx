import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* Child Components */
import ModalHOC from '../components/modal/ModalHOC';
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
    <ModalHOC
      isModalOpen={isAuthModalOpen}
      onCloseModal={() => dispatch(authModalClose())}
    >
      <AuthForm onAuthComplete={() => dispatch(authModalClose())} />
    </ModalHOC>
  );
}

AuthModal.propTypes = {
  isAuthModalOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthModal);
