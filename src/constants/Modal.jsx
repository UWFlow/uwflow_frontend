import React from 'react';

/* Modal Content */
import AuthModalContent from 'auth/AuthModalContent';
import ScheduleUploadModalContent from 'components/dataUploadModals/ScheduleUploadModalContent';
import TranscriptUploadModalContent from 'components/dataUploadModals/TranscriptUploadModalContent';
import CourseReviewCourseBox from 'components/common/CourseReviewCourseBox';
import CourseNotificationEmailModalContent from 'components/emailInputModals/CourseNotificationEmailModalContent';
import EditEmailModalContent from 'components/emailInputModals/EditEmailModalContent';
import ResetPasswordModalContent from 'auth/ResetPasswordModalContent';

/* Modal Constants */
export const AUTH_MODAL = 'AUTH_MODAL';
export const SCHEDULE_UPLOAD_MODAL = 'SCHEDULE_UPLOAD_MODAL';
export const TRANSCRIPT_UPLOAD_MODAL = 'TRANSCRIPT_UPLOAD_MODAL';
export const COURSE_REVIEW_COURSE_MODAL = 'COURSE_REVIEW_COURSE_MODAL';
export const COURSE_NOTIFICATION_EMAIL_MODAL =
  'COURSE_NOTIFICATION_EMAIL_MODAL';
export const EDIT_EMAIL_MODAL = 'EDIT_EMAIL_MODAL';
export const RESET_PASSWORD_MODAL = 'RESET_PASSWORD_MODAL';

/* Modal Render Functions */
const AuthModal = (props) => <AuthModalContent {...props} />;
const ScheduleUploadModal = (props) => (
  <ScheduleUploadModalContent {...props} />
);
const TranscriptUploadModal = (props) => (
  <TranscriptUploadModalContent {...props} />
);
const CourseReviewCourseModal = (props) => <CourseReviewCourseBox {...props} />;
const CourseNotificationEmailModal = (props) => (
  <CourseNotificationEmailModalContent {...props} />
);
const EditEmailModal = (props) => <EditEmailModalContent {...props} />;
const ResetPasswordModal = (props) => <ResetPasswordModalContent {...props} />;

export const modalNameToModal = {
  [AUTH_MODAL]: AuthModal,
  [SCHEDULE_UPLOAD_MODAL]: ScheduleUploadModal,
  [TRANSCRIPT_UPLOAD_MODAL]: TranscriptUploadModal,
  [COURSE_REVIEW_COURSE_MODAL]: CourseReviewCourseModal,
  [COURSE_NOTIFICATION_EMAIL_MODAL]: CourseNotificationEmailModal,
  [EDIT_EMAIL_MODAL]: EditEmailModal,
  [RESET_PASSWORD_MODAL]: ResetPasswordModal,
};
