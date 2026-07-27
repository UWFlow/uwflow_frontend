/**
 * Analytics vocabulary shared by call sites and the events they emit.
 *
 * `AuthSource` identifies *which* piece of UI put the auth form in front of the
 * user. Keep it a closed union: these values become PostHog breakdown keys, so
 * free-text drift would fragment the funnel.
 */

export const AUTH_SOURCES = {
  /** The always-visible auth form on the desktop landing page. */
  LANDING_FORM: 'landing_form',
  /** Profile icon in the nav bar — login intent as often as signup. */
  NAV_PROFILE: 'nav_profile',
  /** "Log in to continue" card gating the swap planner. */
  SWAP_PAGE_PROMPT: 'swap_page_prompt',
  /** Thumbs up/down on a course. */
  LIKE_COURSE: 'like_course',
  /** Shortlist star on a course. */
  SHORTLIST_STAR: 'shortlist_star',
  /** Upvoting someone else's review. */
  REVIEW_UPVOTE: 'review_upvote',
  /** "Write a review" on a course page. */
  WRITE_REVIEW: 'write_review',
  /** Section notification bell on a course page. */
  SCHEDULE_NOTIFICATION: 'schedule_notification',
} as const;

export type AuthSource = (typeof AUTH_SOURCES)[keyof typeof AUTH_SOURCES];
