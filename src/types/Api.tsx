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

/* Data upload */
export type ScheduleParseBody = {
  text: string;
};

export type ScheduleParseResponse = {
  sections_imported: number;
  failed_classes: number[];
};

export type TranscriptParseResponse = {
  courses_imported: number;
};
