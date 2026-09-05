import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
} from 'react-feather';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import {
  LeaveGroupMutation,
  LeaveGroupMutationVariables,
} from 'generated/graphql';

import {
  Calendar,
  CalendarEvent,
  CalendarEventVariant,
} from 'components/calendar';
import LoadingSpinner from 'components/display/LoadingSpinner';
import Tooltip from 'components/display/Tooltip';
import AccentButton from 'components/input/Button';
import Textbox from 'components/input/Textbox';
import { Button } from 'components/ui/button';
import { DELETE_GROUP_MODAL } from 'constants/Modal';
import { LEAVE_GROUP } from 'graphql/mutations/SharedGroup';
import useModal from 'hooks/useModal';
import { getUserId } from 'utils/Auth';
import { getKittenFromID } from 'utils/Kitten';
import { weekDayLetters } from 'utils/Misc';

import {
  fetchGroup,
  formatMeeting,
  GroupDetail as GroupDetailData,
  GroupMember,
  inviteToGroup,
  SharedClass,
} from './api';

interface Props {
  groupId: number;
  onBack: () => void;
  onChanged: () => Promise<unknown>;
}

// Same kitten-avatar pattern as navbar/reviews/profile; members have no picture_url.
const Avatar = ({
  userId,
  name,
  faded,
}: {
  userId: number;
  name: string;
  faded?: boolean;
}) => (
  <Tooltip content={name}>
    <img
      src={getKittenFromID(userId)}
      alt={name}
      className={`h-7 w-7 shrink-0 rounded-full object-cover ${
        faded ? 'opacity-50' : ''
      }`}
    />
  </Tooltip>
);

const MemberChip = ({ member }: { member: GroupMember }) => {
  const pending = member.status === 'pending';
  return (
    <span className="flex items-center gap-xs rounded-card border border-light3 bg-white py-xs pl-xs pr-sm">
      <Avatar userId={member.user_id} name={member.name} faded={pending} />
      <span className="text-sm text-dark1">{member.name}</span>
      {pending && <span className="text-xs text-dark3">pending</span>}
    </span>
  );
};

// LEC/LAB/TUT get the calendar's section colors; everything else is neutral.
const componentTint = (sectionName: string) => {
  const kind = sectionName.trim().split(/\s+/)[0].toUpperCase();
  if (kind.startsWith('LEC')) return 'bg-lecture text-dark1';
  if (kind.startsWith('LAB')) return 'bg-lab text-dark1';
  if (kind.startsWith('TUT')) return 'bg-tutorial text-dark1';
  return 'bg-light2 text-dark2';
};

const sectionVariant = (sectionName: string): CalendarEventVariant => {
  const kind = sectionName.trim().split(/\s+/)[0].toUpperCase();
  if (kind.startsWith('LEC')) return 'lecture';
  if (kind.startsWith('LAB')) return 'lab';
  if (kind.startsWith('TUT')) return 'tutorial';
  return 'other';
};

// Mon-Fri only; weekend class meetings are vanishingly rare and get dropped.
const CALENDAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// One calendar block per meeting per weekday it runs on.
const toCalendarEvents = (classes: SharedClass[]): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  classes.forEach((c) => {
    const variant = sectionVariant(c.section_name);
    c.meetings.forEach((m, mi) => {
      const { start_seconds: startSeconds, end_seconds: endSeconds } = m;
      if (startSeconds === null || endSeconds === null) return;
      m.days.forEach((day) => {
        const dayIndex = weekDayLetters.indexOf(day);
        if (dayIndex < 0 || dayIndex > 4) return;
        events.push({
          id: `${c.section_id}-${mi}-${day}`,
          dayIndex,
          startMinutes: Math.round(startSeconds / 60),
          endMinutes: Math.round(endSeconds / 60),
          variant,
          title: c.course_code.toUpperCase(),
          subtitle: c.section_name,
          location: m.location ?? undefined,
        });
      });
    });
  });
  return events;
};

const SharedClassCard = ({
  shared,
  membersById,
}: {
  shared: SharedClass;
  membersById: Map<number, GroupMember>;
}) => {
  const members = shared.member_ids
    .map((id) => membersById.get(id))
    .filter((m): m is GroupMember => m !== undefined);

  return (
    <li className="flex flex-col gap-sm rounded-card border border-light3 bg-white p-md shadow-box">
      <div className="flex flex-wrap items-center gap-sm">
        <span
          className={`rounded-card px-sm py-xs text-xs font-semibold ${componentTint(
            shared.section_name,
          )}`}
        >
          {shared.section_name}
        </span>
        <span className="text-md font-semibold text-primary">
          {shared.course_code.toUpperCase()}
        </span>
        <span className="text-md text-dark1">{shared.course_name}</span>
      </div>

      {shared.meetings.length > 0 && (
        <div className="flex flex-col gap-xs">
          {shared.meetings.map((m, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-sm text-sm text-dark2"
            >
              <span className="flex items-center gap-xs">
                <Clock size={14} /> {formatMeeting(m)}
              </span>
              {m.location && (
                <span className="flex items-center gap-xs">
                  <MapPin size={14} /> {m.location}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-xs border-t border-light2 pt-sm">
        {members.map((m) => (
          <Avatar key={m.user_id} userId={m.user_id} name={m.name} />
        ))}
        <span className="ml-xs text-sm text-dark2">
          {members.map((m) => m.name).join(', ')}
        </span>
      </div>
    </li>
  );
};

const GroupDetail = ({ groupId, onBack, onChanged }: Props) => {
  const userId = getUserId();
  const [openModal] = useModal();
  const [group, setGroup] = useState<GroupDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [notice, setNotice] = useState<{
    kind: 'success' | 'error';
    text: string;
  } | null>(null);

  const [leaveGroup] = useMutation<
    LeaveGroupMutation,
    LeaveGroupMutationVariables
  >(LEAVE_GROUP);

  const load = async () => {
    try {
      setGroup(await fetchGroup(groupId));
    } catch {
      toast('Could not load this group.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // load closes over groupId only; refetch when the selected group changes.
  }, [groupId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setInviting(true);
    setNotice(null);
    try {
      const result = await inviteToGroup(groupId, email.trim());
      if (result === 'not_found') {
        setNotice({
          kind: 'error',
          text: 'No UW Flow account uses that email.',
        });
      } else {
        setNotice({ kind: 'success', text: `Invite sent to ${email.trim()}.` });
        setEmail('');
        await load();
      }
    } catch {
      setNotice({ kind: 'error', text: 'Could not send the invite.' });
    } finally {
      setInviting(false);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveGroup({ variables: { groupId, userId } });
      await onChanged();
      onBack();
    } catch {
      toast('Could not leave the group.');
    }
  };

  const handleDelete = () => {
    openModal(DELETE_GROUP_MODAL, {
      groupId,
      groupName: group?.name ?? '',
      onDeleted: async () => {
        await onChanged();
        onBack();
      },
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!group) return null;

  const members = group.members.filter((m) => m.status === 'member');
  const pending = group.members.filter((m) => m.status === 'pending');
  const membersById = new Map(group.members.map((m) => [m.user_id, m]));

  const events = toCalendarEvents(group.shared_classes);
  const eventHours = events.flatMap((e) => [
    e.startMinutes / 60,
    e.endMinutes / 60,
  ]);
  const minHour = eventHours.length ? Math.floor(Math.min(...eventHours)) : 8;
  const maxHour = eventHours.length ? Math.ceil(Math.max(...eventHours)) : 18;

  return (
    <div className="flex flex-col gap-lg">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-xs font-inter text-sm text-dark2 transition-all duration-hover ease-hover hover:text-dark1"
      >
        <ArrowLeft size={16} /> All groups
      </button>

      <div className="flex items-center justify-between">
        <h1 className="font-anderson text-3xl font-extrabold text-dark1">
          {group.name}
        </h1>
        <div className="flex gap-sm">
          {group.is_creator && (
            <Button
              variant="outline"
              size="sm"
              className="font-semibold text-red"
              onClick={handleDelete}
            >
              Delete group
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="font-semibold"
            onClick={handleLeave}
          >
            Leave group
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-dark3">
          Members
        </span>
        <div className="flex flex-wrap gap-sm">
          {members.map((m) => (
            <MemberChip key={m.user_id} member={m} />
          ))}
          {pending.map((m) => (
            <MemberChip key={m.user_id} member={m} />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleInvite}
        className="flex flex-col gap-sm rounded-card border border-light3 bg-white p-md shadow-box"
      >
        <span className="text-sm font-semibold text-dark1">
          Invite a friend
        </span>
        <div className="flex flex-col gap-sm tablet:flex-row tablet:items-center">
          <div className="flex-1">
            <Textbox
              text={email}
              setText={(value) => {
                setEmail(value);
                if (notice) setNotice(null);
              }}
              placeholder="Email"
              maxLength={100}
              error={notice?.kind === 'error'}
              options={{ width: '100%', type: 'email' }}
            />
          </div>
          <AccentButton type="submit" disabled={inviting}>
            {inviting ? 'Sending...' : 'Send invite'}
          </AccentButton>
        </div>
        {notice && (
          <span
            className={`flex items-center gap-xs text-sm ${
              notice.kind === 'success' ? 'text-primary' : 'text-red'
            }`}
          >
            {notice.kind === 'success' ? (
              <CheckCircle size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            {notice.text}
          </span>
        )}
        {group.invited_emails.length > 0 && (
          <div className="flex flex-wrap items-center gap-xs pt-xs">
            <span className="text-xs text-dark3">Waiting to join:</span>
            {group.invited_emails.map((e) => (
              <span
                key={e}
                className="rounded-card bg-light2 px-sm py-xs text-xs text-dark2"
              >
                {e}
              </span>
            ))}
          </div>
        )}
      </form>

      <div className="flex flex-col gap-sm">
        <h2 className="text-xl font-bold text-dark1">Classes you share</h2>
        {group.shared_classes.length === 0 ? (
          <div className="rounded-card border border-dashed border-light3 bg-white p-lg text-center text-sm text-dark2">
            No shared classes yet. Once two or more members are in the same
            section, it shows up here.
          </div>
        ) : (
          <>
            {events.length > 0 && (
              <div className="rounded-card border border-light3 bg-white p-md shadow-box">
                <Calendar
                  dayLabels={CALENDAR_DAYS}
                  events={events}
                  minHour={minHour}
                  maxHour={maxHour}
                  interactive={false}
                  showHeader={false}
                />
              </div>
            )}
            <ul className="flex flex-col gap-sm">
              {group.shared_classes.map((c) => (
                <SharedClassCard
                  key={c.section_id}
                  shared={c}
                  membersById={membersById}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
