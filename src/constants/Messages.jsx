import { MIN_PASSWORD_LENGTH } from './Auth';

/* Errors */
export const AUTH_ERRORS = {
  email_taken_by_email: 'You’ve already signed up with this email',
  email_taken_by_google: 'You’ve already signed up with Google',
  email_taken_by_facebook: 'You’ve already signed up with Facebook',
  email_not_registered: 'We don’t recognize that email – try signing up',
  email_wrong_password: 'Invalid password',
  no_facebook_email: 'We were unable able to log you in through Facebook',
  no_google_email: 'We were unable able to log you in through Google',
};

export const AUTH_FORM_ERRORS = {
  invalid_email: 'Please enter a valid email',
  empty_password: 'Please enter a password',
  password_too_short: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  passwords_dont_match: "Passwords don't match",
  empty_first_name: 'Please enter a first name',
  empty_last_name: 'Please enter a last name',
};

export const RESET_PASSWORD_ERRORS = {
  email_not_registered: 'We don’t recognize that email – try signing up',
  invalid_reset_key: 'That reset code is invalid or has expired',
};

export const TRANSCRIPT_ERRORS = {
  default_transcript:
    'We were unable to process your transcript. Get in touch at info@uwflow.com if this persists',
};

export const SCHEDULE_ERRORS = {
  empty_schedule:
    'Looks like that schedule is empty. Check for copy/paste errors, and try again',
  old_schedule: 'We are unable to add schedules from old terms',
  default_schedule:
    'We were unable to process your schedule. Get in touch at info@uwflow.com if this persists',
};

export const SUBSCRIPTION_ERROR =
  'Sorry, we couldn’t sign you up for notifications. Try again in a few minutes';

export const SHORTLIST_ERROR =
  'Sorry, we couldn’t shortlist that course. Try again in a few minutes';

export const REVIEW_ERROR =
  'Sorry, we couldn’t post your review. Try again in a few minutes';

export const DEFAULT_ERROR =
  'Sorry, looks like something is wrong on our end. Try again in a few minutes';

export const NOT_FOUND = {
  page: "Sorry, that page doesn't exist!",
  course: "Sorry, that course doesn't exist!",
  prof: "Sorry, that professor doesn't exist!",
};

export const EXPLORE_COURSES_ERROR =
  "Sorry, we couldn't load your search results. Try again in a few minutes";

/* Success */

export const DATA_UPLOAD_SUCCESS = 'Success! 🎉';

export const AUTH_SUCCESS = {
  login: 'Logged in!',
  logout: 'Logged out!',
  signup: 'Signed up!',
};

export const SUBSCRIPTION_SUCCESS = {
  subscribed:
    'Subscribed! You’ll receive an email from us when at least one spot opens up',
  unsubscribed: 'Unsubscribed!',
};

export const REVIEW_SUCCESS = {
  posted: 'Posted! 🎉',
  updated: 'Updated review!',
  deleted: 'Deleted review!',
};

/* Tooltips */

export const SUBSCRIPTION_TOOLTIP = {
  subscribe: 'Click to receive an email when a spot opens up in this section',
  unsubscribe: 'Click to unsubscribe from email alerts for this section',
};

/* SEO */

export const SEO_DESCRIPTIONS = {
  /* landing, not found, welcome (course, prof pages set descriptions dynamically) */
  default:
    'Course planning tool with reviews for courses and professors at the University of Waterloo.',
  about: 'About UW Flow.',
  privacy: 'Privacy policy for UW Flow.',
  explore: 'Explore courses and professors at the University of Waterloo.',
  profile: 'Profile page for UW Flow.',
};
