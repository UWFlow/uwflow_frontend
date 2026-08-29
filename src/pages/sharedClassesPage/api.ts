import {
  BACKEND_ENDPOINT,
  GROUP_BY_ID_ENDPOINT,
  GROUP_INVITE_ENDPOINT,
} from 'constants/Api';
import {
  makeAuthenticatedDELETERequest,
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from 'utils/Api';

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

export const fetchGroup = async (id: number): Promise<GroupDetail> => {
  const [body, status] = await makeAuthenticatedGETRequest<GroupDetail>(
    url(GROUP_BY_ID_ENDPOINT(id)),
  );
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

// Only the creator can do this; the backend enforces it too.
export const deleteGroup = async (id: number): Promise<void> => {
  const [, status] = await makeAuthenticatedDELETERequest<{ status: string }>(
    url(GROUP_BY_ID_ENDPOINT(id)),
  );
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
