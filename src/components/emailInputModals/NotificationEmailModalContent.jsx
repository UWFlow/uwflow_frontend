import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PROFILE_PAGE_ROUTE } from 'Routes';

import { notificationEmailModalClose } from 'data/actions/ModalActions';

import { FormLink, FormText } from './styles/EmailInputForm';
import EmailInputForm from './EmailInputForm';

const renderText = (history, dispatch) => () => (
  <FormText>
    You can change this email anytime in your{' '}
    <FormLink
      onClick={() => {
        dispatch(notificationEmailModalClose());
        history.push(PROFILE_PAGE_ROUTE);
      }}
    >
      profile page
    </FormLink>
  </FormText>
);

const NotificationEmailModalContent = ({
  onRequestClose,
  history,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  return (
    <EmailInputForm
      title="Subscribe to alerts"
      renderText={renderText(history, dispatch)}
      submitText="Subscribe"
      onClose={onRequestClose}
      onSuccess={onSuccess}
    />
  );
};

export default withRouter(NotificationEmailModalContent);
