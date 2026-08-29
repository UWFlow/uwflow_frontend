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

import LoadingSpinner from 'components/display/LoadingSpinner';
import Tooltip from 'components/display/Tooltip';
import AccentButton from 'components/input/Button';
import Textbox from 'components/input/Textbox';
import { Button } from 'components/ui/button';
import { LEAVE_GROUP } from 'graphql/mutations/SharedGroup';
import { getUserId } from 'utils/Auth';
import { getKittenFromID } from 'utils/Kitten';

import {
  deleteGroup,
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
  onChanged: () => void;
}

// Matches the avatar shown elsewhere in the app (navbar, reviews, profile
// header): a kitten placeholder keyed off the user's id. Group members only
// carry an id and name here, not a picture_url, so unlike those call sites
// this always renders the kitten rather than a real photo.
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

// LEC / LAB / TUT drives a colored pill using the same section colors the
// schedule calendar uses. Anything else falls back to a neutral chip.
const componentTint = (sectionName: string) => {
  const kind = sectionName.trim().split(/\s+/)[0].toUpperCase();
  if (kind.startsWith('LEC')) return 'bg-lecture text-dark1';
  if (kind.startsWith('LAB')) return 'bg-lab text-dark1';
  if (kind.startsWith('TUT')) return 'bg-tutorial text-dark1';
  return 'bg-light2 text-dark2';
};

const SharedClassCard = ({ shared }: { shared: SharedClass }) => (
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
      {shared.members.map((m) => (
        <Avatar key={m.user_id} userId={m.user_id} name={m.name} />
      ))}
      <span className="ml-xs text-sm text-dark2">
        {shared.members.map((m) => m.name).join(', ')}
      </span>
    </div>
  </li>
);

const GroupDetail = ({ groupId, onBack, onChanged }: Props) => {
  const userId = getUserId();
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
      onChanged();
      onBack();
    } catch {
      toast('Could not leave the group.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${group?.name}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteGroup(groupId);
      onChanged();
      onBack();
    } catch {
      toast('Could not delete the group.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!group) return null;

  const members = group.members.filter((m) => m.status === 'member');
  const pending = group.members.filter((m) => m.status === 'pending');

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
      </form>

      <div className="flex flex-col gap-sm">
        <h2 className="text-xl font-bold text-dark1">Classes you share</h2>
        {group.shared_classes.length === 0 ? (
          <div className="rounded-card border border-dashed border-light3 bg-white p-lg text-center text-sm text-dark2">
            No shared classes yet. Once two or more members are in the same
            section, it shows up here.
          </div>
        ) : (
          <ul className="flex flex-col gap-sm">
            {group.shared_classes.map((c) => (
              <SharedClassCard key={c.section_id} shared={c} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
