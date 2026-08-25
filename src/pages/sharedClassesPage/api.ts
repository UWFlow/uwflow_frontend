import {
  BACKEND_ENDPOINT,
  GROUP_BY_ID_ENDPOINT,
  GROUP_ENDPOINT,
  GROUP_INVITE_ENDPOINT,
  GROUP_LEAVE_ENDPOINT,
  GROUP_RESPOND_ENDPOINT,
} from 'constants/Api';
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from 'utils/Api';

export interface GroupSummary {
  id: number;
  name: string;
  status: 'member' | 'pending';
  member_count: number;
}

export interface GroupMember {
  user_id: number;
  name: string;
  status: 'member' | 'pending';
}

export interface Meeting {
  days: string[];
  start_seconds: number | null;
  end_seconds: number | null;
  location: string | null;
}

export interface SharedClass {
  section_id: number;
  course_code: string;
  course_name: string;
  section_name: string;
  term_id: number;
  members: GroupMember[];
  meetings: Meeting[];
}

export interface GroupDetail {
  id: number;
  name: string;
  is_creator: boolean;
  members: GroupMember[];
  invited_emails: string[];
  shared_classes: SharedClass[];
}

const url = (path: string) => `${BACKEND_ENDPOINT}${path}`;

// The GET/POST helpers never throw on their own (see utils/Api.tsx); every
// caller in this codebase checks the status itself, so we do the same here
// rather than letting a failed request masquerade as a successful body.
const checkStatus = (status: number) => {
  if (status >= 400) {
    throw new Error(`shared classes request failed with status ${status}`);
  }
};

export const fetchGroups = async (): Promise<GroupSummary[]> => {
  const [body, status] = await makeAuthenticatedGETRequest<{
    groups: GroupSummary[];
  }>(url(GROUP_ENDPOINT));
  checkStatus(status);
  return body.groups ?? [];
};

export const fetchGroup = async (id: number): Promise<GroupDetail> => {
  const [body, status] = await makeAuthenticatedGETRequest<GroupDetail>(
    url(GROUP_BY_ID_ENDPOINT(id)),
  );
  checkStatus(status);
  return body;
};

export const createGroup = async (
  name: string,
): Promise<{ id: number; name: string }> => {
  const [body, status] = await makeAuthenticatedPOSTRequest<
    { name: string },
    { id: number; name: string }
  >(url(GROUP_ENDPOINT), { name });
  checkStatus(status);
  return body;
};

// Returns the server's outcome: "sent" when the email matched a Flow account
// and the invite went out, or "not_found" when no account uses that email.
// Only real failures (unauthorized, bad group id, malformed email) throw.
export const inviteToGroup = async (
  id: number,
  email: string,
): Promise<'sent' | 'not_found'> => {
  const [body, status] = await makeAuthenticatedPOSTRequest<
    { email: string },
    { status: 'sent' | 'not_found' }
  >(url(GROUP_INVITE_ENDPOINT(id)), { email });
  checkStatus(status);
  return body.status;
};

export const respondToInvite = async (
  id: number,
  accept: boolean,
  block = false,
): Promise<void> => {
  const [, status] = await makeAuthenticatedPOSTRequest<
    { accept: boolean; block: boolean },
    { status: string }
  >(url(GROUP_RESPOND_ENDPOINT(id)), { accept, block });
  checkStatus(status);
};

export const leaveGroup = async (id: number): Promise<void> => {
  const [, status] = await makeAuthenticatedPOSTRequest<
    Record<string, never>,
    { status: string }
  >(url(GROUP_LEAVE_ENDPOINT(id)), {});
  checkStatus(status);
};

// section_meeting stores times as seconds past midnight. Format as h:mm am/pm.
export const formatTime = (seconds: number | null): string => {
  if (seconds === null) return '';
  const totalMinutes = Math.floor(seconds / 60);
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, '0')}${period}`;
};

export const formatMeeting = (meeting: Meeting): string => {
  const days = meeting.days.join('');
  const time =
    meeting.start_seconds !== null
      ? `${formatTime(meeting.start_seconds)} - ${formatTime(
          meeting.end_seconds,
        )}`
      : '';
  return [days, time, meeting.location ?? ''].filter(Boolean).join('  ');
};
