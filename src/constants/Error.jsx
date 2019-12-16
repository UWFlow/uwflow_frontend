export const AUTH_ERRORS = {
    email_taken_by_email: 'You’ve already signed up with this email.',
    email_taken_by_google: 'You’ve already signed up with Google',
    email_taken_by_facebook: 'You’ve already signed up with Facebook',
    email_not_registered: 'We don’t recognize that email – try signing up.',
    email_wrong_password: 'Invalid password.',
    no_facebook_email: 'We were unable able to log you in through Facebook.',
    no_google_email: 'We were unable able to log you in through Google.',
};

export const RESET_PASSWORD_ERRORS = {
    email_not_registered: 'We don’t recognize that email – try signing up.',
    invalid_reset_key: 'That reset code is invalid or has expired.',
};

export const TRANSCRIPT_ERRORS = {
    default_transcript: 'We were unable to process your transcript. Get in touch at info@uwflow.com if this persists.'
}

export const SCHEDULE_ERRORS = {
    empty_schedule: 'Looks like that schedule is empty. Check for copy/paste errors, and try again.',
    old_schedule: 'We are unable to add schedules from old terms.',
    default_schedule: 'We were unable to process your schedule. Get in touch at info@uwflow.com if this persists.'
}

export const DEFAULT_ERROR = 'Sorry, looks like something is wrong on our end. Try again in a few minutes.';
