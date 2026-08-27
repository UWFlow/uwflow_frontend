import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { Button } from 'components/ui/button';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import useModal from 'hooks/useModal';

import { createGroup, fetchGroups, GroupSummary, respondToInvite } from './api';
import GroupDetail from './GroupDetail';

const wrapperClasses =
  'mx-auto flex min-h-[calc(100vh-102px)] w-full max-w-[720px] flex-col gap-lg bg-light1 px-md py-xl';

const SharedClassesPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [openModal] = useModal();

  const [groups, setGroups] = useState<GroupSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      setGroups(await fetchGroups());
    } catch {
      toast('Could not load your groups.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) load();
    else setLoading(false);
    // load reads no props/state beyond the auth flag; refetch on login change.
  }, [isLoggedIn]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const group = await createGroup(newName.trim());
      setNewName('');
      await load();
      setSelected(group.id);
    } catch {
      toast('Could not create the group.');
    } finally {
      setCreating(false);
    }
  };

  const handleRespond = async (id: number, accept: boolean) => {
    try {
      await respondToInvite(id, accept);
      await load();
    } catch {
      toast('Could not update the invite.');
    }
  };

  const body = () => {
    if (!isLoggedIn) {
      return (
        <div className="flex flex-col items-start gap-md rounded-card border border-light3 bg-white p-lg">
          <p className="text-md text-dark2">
            Log in to make a group and see which classes you share with friends.
          </p>
          <Button onClick={() => openModal(AUTH_MODAL)}>Log in</Button>
        </div>
      );
    }

    if (loading) return <LoadingSpinner />;

    if (selected !== null) {
      return (
        <GroupDetail
          groupId={selected}
          onBack={() => setSelected(null)}
          onChanged={load}
        />
      );
    }

    const invites = groups.filter((g) => g.status === 'pending');
    const mine = groups.filter((g) => g.status === 'member');

    return (
      <>
        <div className="flex flex-col gap-xs">
          <h1 className="font-anderson text-4xl font-extrabold text-dark1 tabletDown:text-3xl">
            Shared Classes
          </h1>
          <p className="text-sm text-dark2">
            Make a group, invite friends by email, and see the classes you have
            together.
          </p>
        </div>

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-sm rounded-card border border-light3 bg-white p-md shadow-box tablet:flex-row tablet:items-end"
        >
          <label className="flex flex-1 flex-col gap-xs text-sm text-dark2">
            New group name
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Study crew"
              maxLength={80}
              className="rounded-card border border-light3 px-sm py-xs text-md text-dark1 outline-none focus:border-primary"
            />
          </label>
          <Button type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Create group'}
          </Button>
        </form>

        {invites.length > 0 && (
          <div className="flex flex-col gap-sm">
            <h2 className="text-xl font-bold text-dark1">Invites</h2>
            {invites.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-card border border-light3 bg-white p-md shadow-box"
              >
                <span className="text-md text-dark1">{g.name}</span>
                <div className="flex gap-sm">
                  <Button size="sm" onClick={() => handleRespond(g.id, true)}>
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRespond(g.id, false)}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-sm">
          <h2 className="text-xl font-bold text-dark1">Your groups</h2>
          {mine.length === 0 ? (
            <p className="text-sm text-dark2">
              No groups yet. Create one above to get started.
            </p>
          ) : (
            <ul className="flex flex-col gap-sm">
              {mine.map((g) => (
                <li key={g.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(g.id)}
                    className="flex w-full items-center justify-between rounded-card border border-light3 bg-white p-md text-left shadow-box transition-all duration-hover ease-hover hover:border-primary"
                  >
                    <span className="text-md text-dark1">{g.name}</span>
                    <span className="text-sm text-dark3">
                      {g.member_count}{' '}
                      {g.member_count === 1 ? 'member' : 'members'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    );
  };

  return (
    <div className={wrapperClasses}>
      <Helmet>
        <title>Shared Classes | UW Flow</title>
      </Helmet>
      {body()}
    </div>
  );
};

export default SharedClassesPage;
