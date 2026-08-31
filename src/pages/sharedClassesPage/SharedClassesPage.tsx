import React, { useState } from 'react';
import { ChevronRight, Users } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import {
  AcceptInviteMutation,
  AcceptInviteMutationVariables,
  CreateGroupMutation,
  CreateGroupMutationVariables,
  DeclineInviteMutation,
  DeclineInviteMutationVariables,
  ListGroupsQuery,
  ListGroupsQueryVariables,
} from 'generated/graphql';

import LoadingSpinner from 'components/display/LoadingSpinner';
import AccentButton from 'components/input/Button';
import Textbox from 'components/input/Textbox';
import { Button } from 'components/ui/button';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import {
  ACCEPT_INVITE,
  CREATE_GROUP,
  DECLINE_INVITE,
} from 'graphql/mutations/SharedGroup';
import { LIST_GROUPS } from 'graphql/queries/sharedClasses/SharedGroup';
import useModal from 'hooks/useModal';
import { getUserId } from 'utils/Auth';

import GroupDetail from './GroupDetail';

const wrapperClasses =
  'mx-auto flex min-h-[calc(100vh-102px)] w-full max-w-[720px] flex-col gap-lg bg-light1 px-md py-xl';

const SharedClassesPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [openModal] = useModal();
  const userId = getUserId();

  const [selected, setSelected] = useState<number | null>(null);
  const [newName, setNewName] = useState('');

  const { data, loading, refetch } = useQuery<
    ListGroupsQuery,
    ListGroupsQueryVariables
  >(LIST_GROUPS, {
    variables: { userId },
    skip: !isLoggedIn,
    onError: () => toast('Could not load your groups.'),
  });
  const groups = data?.shared_group ?? [];

  const [createGroup, { loading: creating }] = useMutation<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >(CREATE_GROUP);
  const [acceptInvite] = useMutation<
    AcceptInviteMutation,
    AcceptInviteMutationVariables
  >(ACCEPT_INVITE);
  const [declineInvite] = useMutation<
    DeclineInviteMutation,
    DeclineInviteMutationVariables
  >(DECLINE_INVITE);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    try {
      const result = await createGroup({ variables: { name } });
      const group = result.data?.insert_shared_group?.returning[0];
      setNewName('');
      await refetch();
      if (group) setSelected(group.id);
    } catch {
      toast('Could not create the group.');
    }
  };

  const handleRespond = async (groupId: number, accept: boolean) => {
    try {
      if (accept) await acceptInvite({ variables: { groupId, userId } });
      else await declineInvite({ variables: { groupId, userId } });
      await refetch();
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
          <Button
            className="font-semibold"
            onClick={() => openModal(AUTH_MODAL)}
          >
            Log in
          </Button>
        </div>
      );
    }

    if (loading) return <LoadingSpinner />;

    if (selected !== null) {
      return (
        <GroupDetail
          groupId={selected}
          onBack={() => setSelected(null)}
          onChanged={refetch}
        />
      );
    }

    const invites = groups.filter((g) => g.members[0]?.status === 'pending');
    const mine = groups.filter((g) => g.members[0]?.status === 'member');

    return (
      <>
        <div className="flex flex-col">
          <h1 className="font-anderson text-4xl font-extrabold leading-tight text-dark1 tabletDown:text-3xl">
            Shared Classes
          </h1>
          <p className="text-body text-dark2">
            Make a group, invite friends by email, and see the classes you have
            together.
          </p>
        </div>

        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-sm rounded-card border border-light3 bg-white p-md shadow-box"
        >
          <h2 className="text-xl font-bold text-dark1">Create a group</h2>
          <div className="flex flex-col gap-sm tablet:flex-row tablet:items-center">
            <div className="flex-1">
              <Textbox
                text={newName}
                setText={setNewName}
                placeholder="Group name, e.g. Study crew"
                maxLength={80}
                options={{ width: '100%' }}
              />
            </div>
            <AccentButton type="submit" disabled={creating}>
              {creating ? 'Creating...' : 'Create group'}
            </AccentButton>
          </div>
        </form>

        {invites.length > 0 && (
          <div className="flex flex-col gap-sm">
            <h2 className="text-xl font-bold text-dark1">Invites</h2>
            {invites.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-card border border-light3 bg-white p-md shadow-box"
              >
                <span className="text-md font-semibold text-dark1">
                  {g.name}
                </span>
                <div className="flex gap-sm">
                  <Button
                    size="sm"
                    className="font-semibold"
                    onClick={() => handleRespond(g.id, true)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="font-semibold"
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
            <ul className="flex list-none flex-col gap-sm p-0">
              {mine.map((g) => {
                const memberCount = g.members_aggregate.aggregate?.count ?? 0;
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(g.id)}
                      className="group flex w-full items-center gap-md rounded-card border border-light3 bg-white p-md text-left font-inter shadow-box transition-all duration-hover ease-hover hover:border-primary"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-light2 text-primary">
                        <Users size={18} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-md font-semibold text-dark1">
                          {g.name}
                        </span>
                        <span className="text-xs text-dark3">
                          {memberCount}{' '}
                          {memberCount === 1 ? 'member' : 'members'}
                        </span>
                      </span>
                      <ChevronRight
                        size={18}
                        className="shrink-0 text-dark3 transition-transform duration-hover ease-hover group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </button>
                  </li>
                );
              })}
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
