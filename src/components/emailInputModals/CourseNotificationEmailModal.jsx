import React from 'react';
import Modal from '../display/Modal';
import EmailInputForm from './EmailInputForm';
import { FormText, FormLink } from './styles/EmailInputForm';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* Selectors */
import { getIsCourseNotificationEmailModalOpen } from '../../data/reducers/ModalReducer';
import { courseNotificationEmailModalClose } from '../../data/actions/ModalActions';

/* Routes */
import { PROFILE_PAGE_ROUTE } from '../../Routes';

const mapStateToProps = state => ({
  isOpen: getIsCourseNotificationEmailModalOpen(state),
});

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

const CourseNotificationEmailModal = ({ isOpen, history }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(courseNotificationEmailModalClose())}
    >
      <EmailInputForm
        title="Subscribe to alerts"
        renderText={renderText(history, dispatch)}
        submitText="Subscribe"
        onClose={() => dispatch(courseNotificationEmailModalClose())}
      />
    </Modal>
  );
};

export default withRouter(
  connect(mapStateToProps)(CourseNotificationEmailModal),
);
