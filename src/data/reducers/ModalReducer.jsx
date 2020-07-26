import {
  COURSE_NOTIFICATION_EMAIL_MODAL_OPEN,
  COURSE_NOTIFICATION_EMAIL_MODAL_CLOSE,
} from '../actions/ModalActions';

/* Selectors */
import { getDataState } from './DataReducer';

export default (
  state = {
    courseNotificationEmailModalOpen: false,
  },
  action,
) => {
  switch (action.type) {
    case COURSE_NOTIFICATION_EMAIL_MODAL_OPEN:
      return {
        ...state,
        courseNotificationEmailModalOpen: true,
      };
    case COURSE_NOTIFICATION_EMAIL_MODAL_CLOSE:
      return {
        ...state,
        courseNotificationEmailModalOpen: false,
      };
    default:
      break;
  }
  return state;
};

// Selectors
export const getModalState = (state) => getDataState(state).modal;
export const getIsCourseNotificationEmailModalOpen = (state) =>
  getModalState(state).courseNotificationEmailModalOpen;
