export type ErrorResponse = {
  error: string;
};

/* Auth */
export type AuthResponse = {
  user_id: string;
  token: string;
  is_new: boolean;
};

export type EmailAuthLoginBody = {
  email: string;
  password: string;
};

export type EmailAuthRegisterBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type FbAuthResponse = {
  accessToken?: string;
};

export type SocialAuthBody = {
  access_token: string;
};

export type AuthRefreshResponse = {
  token: string;
};

/* Reset password */
export type ResetPasswordEmailBody = {
  email: string;
};

export type ResetPasswordCodeBody = {
  key: string;
};

export type ResetPasswordNewPasswordBody = {
  key: string;
  password: string;
};

/* Search data */
export type SearchDataCourse = {
  id: number;
  code: string;
  name: string;
  profs: string[];
  rating_count: number;
};

export type SearchDataProf = {
  id: number;
  code: string;
  name: string;
  courses: string[];
  rating_count: number;
};

export type SearchDataResponse = {
  courses: SearchDataCourse[];
  profs: SearchDataProf[];
};

/* Data upload */
export type ScheduleParseBody = {
  text: string;
};

export type ScheduleParseResponse = {
  sections_imported: number;
  failed_classes: number[];
};

export type ParseOnlyScheduleClass = {
  Number: number;
  Location: string;
};

export type ParseOnlyScheduleResponse = {
  TermId: number;
  Classes: ParseOnlyScheduleClass[];
};

export type TranscriptParseResponse = {
  courses_imported: number;
};

/* Admin console */
export type AdminMeResponse = {
  user_id: number;
  is_admin: boolean;
};

export type AdminUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  program: string | null;
  picture_url: string | null;
  join_source: string;
  join_date: string;
  is_admin: boolean;
  review_count: number;
  schedule_size: number;
};

export type AdminUsersResponse = {
  users: AdminUser[];
};

export type AdminImpersonateBody = {
  user_id: number;
  reason: string;
};

export type AdminImpersonateResponse = {
  token: string;
  user_id: number;
  full_name: string;
  email: string | null;
  session_id: number;
  /* Lifetime of the impersonation token, in seconds. */
  expires_in: number;
};

export type AdminStopImpersonatingResponse = {
  token: string;
  user_id: number;
};

export type AdminImpersonationLogEntry = {
  id: number;
  admin_id: number;
  admin_name: string;
  target_user_id: number;
  target_user_name: string;
  reason: string | null;
  started_at: string;
  ended_at: string | null;
};

export type AdminImpersonationLogResponse = {
  entries: AdminImpersonationLogEntry[];
};
