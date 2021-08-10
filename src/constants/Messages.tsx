import { MIN_PASSWORD_LENGTH } from './Auth';

interface MessageObject {
  [key: string]: any;
}

/* Errors */
export const AUTH_ERRORS: MessageObject = {
  email_not_registered: 'We don’t recognize that email.',
  email_wrong_password: 'Invalid password.',
  email_taken: 'That email has already been registered.',
  no_facebook_email: 'We were unable able to log you in through Facebook.',
  no_google_email: 'We were unable able to log you in through Google.',
};

export const AUTH_FORM_ERRORS: MessageObject = {
  invalid_email: 'Please enter a valid email.',
  empty_password: 'Please enter a password.',
  password_too_short: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  passwords_dont_match: "Passwords don't match.",
  empty_first_name: 'Please enter a first name.',
  empty_last_name: 'Please enter a last name.',
};

export const RESET_PASSWORD_ERRORS: MessageObject = {
  email_not_registered: 'We don’t recognize that email.',
  invalid_reset_key: 'That reset code is invalid or has expired.',
};

export const TRANSCRIPT_ERRORS: MessageObject = {
  file_too_big: 'Please upload a file smaller than 10 MB.',
  default_transcript:
    'We were unable to process your transcript. Get in touch at info@uwflow.com if this persists.',
};

export const SCHEDULE_ERRORS: MessageObject = {
  empty_schedule:
    'Looks like that schedule is empty. Check for copy/paste errors, and try again.',
  old_schedule:
    'That looks like an old schedule – try uploading one for the current or next term.',
  default_schedule:
    'We were unable to process your schedule. Get in touch at info@uwflow.com if this persists.',
  classes_failed: (classes: number[]) =>
    `We were unable to add ${
      classes.length === 1 ? 'class number' : 'class numbers'
    } ${classes
      .join(', ')
      .replace(/, ((?:.(?!, ))+)$/, ' and $1')} to your schedule.
    Get in touch at info@uwflow.com if this persists.`,
};

export const SUBSCRIPTION_ERROR =
  'Sorry, we couldn’t sign you up for notifications – try again in a few minutes.';

export const SHORTLIST_ERROR =
  'Sorry, we couldn’t favourite that course – try again in a few minutes.';

export const REVIEW_ERROR =
  'Sorry, we couldn’t post your review – try again in a few minutes.';

export const EMAIL_ERROR =
  'Sorry, we couldn’t update your email – try again in a few minutes.';

export const DEFAULT_ERROR =
  'Sorry, looks like something is wrong on our end – try again in a few minutes.';

export const NOT_FOUND: MessageObject = {
  page: "Oops! That page doesn't exist.",
  course: "That course doesn't exist!",
  prof: "That professor doesn't exist!",
};

export const EXPLORE_COURSES_ERROR =
  "We couldn't load your search results – try again in a few minutes.";

/* Success */

export const DATA_UPLOAD_SUCCESS = 'Success! 🎉';

export const EMAIL_UPDATE_SUCCESS = 'Successfully updated email! 🎉';

export const AUTH_SUCCESS: MessageObject = {
  login: 'Logged in!',
  logout: 'Logged out!',
  signup: 'Signed up!',
};

export const SUBSCRIPTION_SUCCESS: MessageObject = {
  unsubscribed: 'Unsubscribed!',
  subscribed:
    'Subscribed! You’ll receive an email from us when a spot opens up in this section.',
};

export const REVIEW_SUCCESS: MessageObject = {
  posted: 'Posted! 🎉',
  updated: 'Your review has been updated.',
  deleted: 'Your review has been deleted.',
};

export const PASSWORD_RESET_SUCCESS: MessageObject = {
  emailSent: 'Email sent!',
  reset: 'Password reset!',
};

/* Tooltips */

export const SUBSCRIPTION_TOOLTIP: MessageObject = {
  subscribe: 'Click to receive an email when a spot opens up in this section.',
  unsubscribe: 'Click to unsubscribe from email alerts for this section.',
};

/* SEO */

export const SEO_DESCRIPTIONS: MessageObject = {
  /* landing, not found, welcome (course, prof pages set descriptions dynamically) */
  default:
    'Plan your courses. Read about your professors. Get the most out of your experience at the University of Waterloo.',
  about: 'About UW Flow.',
  privacy: 'Privacy policy.',
  explore: 'Explore courses and professors at the University of Waterloo.',
  profile: 'My profile.',
};
