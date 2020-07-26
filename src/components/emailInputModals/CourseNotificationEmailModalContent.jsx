import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EmailInputForm from './EmailInputForm';
import { FormText, FormLink } from './styles/EmailInputForm';

/* Selectors */
import { courseNotificationEmailModalClose } from '../../data/actions/ModalActions';

/* Routes */
import { PROFILE_PAGE_ROUTE } from '../../Routes';

const renderText = (history, dispatch) => () => (
  <FormText>
    You can change this email anytime in your{' '}
    <FormLink
      onClick={() => {
        dispatch(courseNotificationEmailModalClose());
        history.push(PROFILE_PAGE_ROUTE);
      }}
    >
      profile page
    </FormLink>
  </FormText>
);

const CourseNotificationEmailModalContent = ({
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

export default withRouter(CourseNotificationEmailModalContent);
