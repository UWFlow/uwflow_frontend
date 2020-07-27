import React from 'react';

/* Modal Content */
import AuthModalContent from 'auth/AuthModalContent';
import ResetPasswordModalContent from 'auth/ResetPasswordModalContent';
import CourseReviewCourseBox from 'components/common/CourseReviewCourseBox';
import ScheduleUploadModalContent from 'components/dataUploadModals/ScheduleUploadModalContent';
import TranscriptUploadModalContent from 'components/dataUploadModals/TranscriptUploadModalContent';
import EditEmailModalContent from 'components/emailInputModals/EditEmailModalContent';
import NotificationEmailModalContent from 'components/emailInputModals/NotificationEmailModalContent';

/* Modal Constants */
export const AUTH_MODAL = 'AUTH_MODAL';
export const SCHEDULE_UPLOAD_MODAL = 'SCHEDULE_UPLOAD_MODAL';
export const TRANSCRIPT_UPLOAD_MODAL = 'TRANSCRIPT_UPLOAD_MODAL';
export const COURSE_REVIEW_COURSE_MODAL = 'COURSE_REVIEW_COURSE_MODAL';
export const NOTIFICATION_EMAIL_MODAL = 'NOTIFICATION_EMAIL_MODAL';
export const EDIT_EMAIL_MODAL = 'EDIT_EMAIL_MODAL';
export const RESET_PASSWORD_MODAL = 'RESET_PASSWORD_MODAL';

/* Modal Render Functions */
// TODO: add types to props
const AuthModal = (props: any) => <AuthModalContent {...props} />;
const ScheduleUploadModal = (props: any) => (
  <ScheduleUploadModalContent {...props} />
);
const TranscriptUploadModal = (props: any) => (
  <TranscriptUploadModalContent {...props} />
);
const CourseReviewCourseModal = (props: any) => (
  <CourseReviewCourseBox {...props} />
);
const NotificationEmailModal = (props: any) => (
  <NotificationEmailModalContent {...props} />
);
const EditEmailModal = (props: any) => <EditEmailModalContent {...props} />;
const ResetPasswordModal = (props: any) => (
  <ResetPasswordModalContent {...props} />
);

export const modalNameToModal = {
  [AUTH_MODAL]: AuthModal,
  [SCHEDULE_UPLOAD_MODAL]: ScheduleUploadModal,
  [TRANSCRIPT_UPLOAD_MODAL]: TranscriptUploadModal,
  [COURSE_REVIEW_COURSE_MODAL]: CourseReviewCourseModal,
  [NOTIFICATION_EMAIL_MODAL]: NotificationEmailModal,
  [EDIT_EMAIL_MODAL]: EditEmailModal,
  [RESET_PASSWORD_MODAL]: ResetPasswordModal,
};
