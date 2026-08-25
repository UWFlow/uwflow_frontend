import React, { useEffect, useState } from 'react';
import { ArrowLeft, Users } from 'react-feather';
import { toast } from 'react-toastify';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { Button } from 'components/ui/button';

import {
  fetchGroup,
  formatMeeting,
  GroupDetail as GroupDetailData,
  inviteToGroup,
  leaveGroup,
} from './api';

interface Props {
  groupId: number;
  onBack: () => void;
  onChanged: () => void;
}

const GroupDetail = ({ groupId, onBack, onChanged }: Props) => {
  const [group, setGroup] = useState<GroupDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [inviting, setInviting] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setInviting(true);
    try {
      await inviteToGroup(groupId, email.trim());
      // Always the same message: the server never reveals whether the email
      // has an account.
      toast('Invite sent.');
      setEmail('');
      await load();
    } catch {
      toast('Could not send the invite.');
    } finally {
      setInviting(false);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveGroup(groupId);
      onChanged();
      onBack();
    } catch {
      toast('Could not leave the group.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!group) return null;

  const memberNames = group.members.filter((m) => m.status === 'member');
  const pending = group.members.filter((m) => m.status === 'pending');

  return (
    <div className="flex flex-col gap-lg">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-xs text-sm text-dark2 hover:text-dark1"
      >
        <ArrowLeft size={16} /> All groups
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-dark1">{group.name}</h1>
        <Button variant="outline" size="sm" onClick={handleLeave}>
          Leave group
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-xs text-sm text-dark2">
        <Users size={16} />
        {memberNames.map((m) => m.name).join(', ')}
        {pending.length > 0 && (
          <span className="text-dark3"> + {pending.length} pending</span>
        )}
      </div>

      <form
        onSubmit={handleInvite}
        className="flex flex-col gap-sm rounded-card border border-light3 bg-white p-md tablet:flex-row tablet:items-end"
      >
        <label className="flex flex-1 flex-col gap-xs text-sm text-dark2">
          Invite a friend by email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="friend@example.com"
            className="rounded-card border border-light3 px-sm py-xs text-md text-dark1 outline-none focus:border-primary"
          />
        </label>
        <Button type="submit" disabled={inviting}>
          {inviting ? 'Sending...' : 'Send invite'}
        </Button>
      </form>

      {group.invited_emails.length > 0 && (
        <p className="text-sm text-dark3">
          Invited, not yet joined: {group.invited_emails.join(', ')}
        </p>
      )}

      <div className="flex flex-col gap-sm">
        <h2 className="text-lg font-semibold text-dark1">Classes you share</h2>
        {group.shared_classes.length === 0 ? (
          <p className="text-sm text-dark2">
            No shared classes yet. Once two or more members are in the same
            section, it shows up here.
          </p>
        ) : (
          <ul className="flex flex-col gap-sm">
            {group.shared_classes.map((c) => (
              <li
                key={c.section_id}
                className="rounded-card border border-light3 bg-white p-md"
              >
                <div className="flex flex-wrap items-baseline gap-xs">
                  <span className="text-md font-semibold text-primary">
                    {c.course_code.toUpperCase()}
                  </span>
                  <span className="text-md text-dark1">{c.course_name}</span>
                  <span className="text-sm text-dark3">{c.section_name}</span>
                </div>
                {c.meetings.map((m, i) => (
                  <div key={i} className="mt-xs text-sm text-dark2">
                    {formatMeeting(m)}
                  </div>
                ))}
                <div className="mt-sm text-sm text-dark2">
                  Together: {c.members.map((m) => m.name).join(', ')}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
