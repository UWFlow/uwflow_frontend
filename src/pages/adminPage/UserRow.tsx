import React from 'react';

import { AdminUser } from 'types/Api';
import { getKittenFromID } from 'utils/Kitten';

type UserRowProps = {
  user: AdminUser;
  onImpersonate: (user: AdminUser) => void;
  busy: boolean;
};

const UserRow = ({ user, onImpersonate, busy }: UserRowProps) => (
  <div className="flex items-center gap-md border-0 border-b border-solid border-light3 px-md py-sm last:border-b-0 tabletDown:flex-wrap">
    <img
      src={user.picture_url || getKittenFromID(user.id)}
      alt=""
      className="h-[40px] w-[40px] shrink-0 rounded-full object-cover"
    />

    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-xs">
        <span className="truncate font-inter text-md font-semibold text-dark1">
          {user.first_name} {user.last_name}
        </span>
        {user.is_admin && (
          <span className="shrink-0 rounded-card bg-light2 px-xs py-[2px] font-inter text-xs font-semibold uppercase text-dark2">
            Admin
          </span>
        )}
      </div>
      <div className="truncate font-inter text-sm text-dark2">
        {user.email || <span className="italic text-dark3">no email</span>}
        {user.program ? ` · ${user.program}` : ''}
      </div>
    </div>

    <div className="shrink-0 text-right font-inter text-xs text-dark3">
      <div>id {user.id}</div>
      <div>
        {user.review_count} review{user.review_count === 1 ? '' : 's'} ·{' '}
        {user.schedule_size} class{user.schedule_size === 1 ? '' : 'es'}
      </div>
      <div>joined {new Date(user.join_date).toLocaleDateString()}</div>
    </div>

    {/*
      Admins are not impersonable — the backend refuses it — so the button is
      absent rather than present-and-failing.
    */}
    {user.is_admin ? (
      <span className="w-[104px] shrink-0 text-center font-inter text-xs text-dark3">
        —
      </span>
    ) : (
      <button
        type="button"
        onClick={() => onImpersonate(user)}
        disabled={busy}
        className="w-[104px] shrink-0 cursor-pointer rounded-card border-none bg-primary px-sm py-xs font-inter text-sm font-semibold text-white transition-all duration-hover ease-hover hover:brightness-hover disabled:cursor-default disabled:opacity-50"
      >
        View as
      </button>
    )}
  </div>
);

export default UserRow;
