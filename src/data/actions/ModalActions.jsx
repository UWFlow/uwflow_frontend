export const COURSE_NOTIFICATION_EMAIL_MODAL_OPEN =
  'COURSE_NOTIFICATION_EMAIL_MODAL_OPEN';
export const COURSE_NOTIFICATION_EMAIL_MODAL_CLOSE =
  'COURSE_NOTIFICATION_EMAIL_MODAL_CLOSE';

export const courseNotificationEmailModalOpen = () => ({
  type: COURSE_NOTIFICATION_EMAIL_MODAL_OPEN,
});

export const courseNotificationEmailModalClose = () => ({
  type: COURSE_NOTIFICATION_EMAIL_MODAL_CLOSE,
});
