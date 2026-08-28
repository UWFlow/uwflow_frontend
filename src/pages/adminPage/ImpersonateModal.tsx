import React, { useState } from 'react';

import { AdminUser } from 'types/Api';

type ImpersonateModalProps = {
  user: AdminUser;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  busy: boolean;
  error: string | null;
};

/*
 * Confirmation step before a session starts.
 *
 * The reason field is the point of this dialog. It is optional as far as the
 * backend is concerned, but asking for it at the moment of the decision is what
 * makes the audit log worth reading later — "debugging a schedule import bug"
 * ages far better than a bare timestamp.
 */
const ImpersonateModal = ({
  user,
  onConfirm,
  onCancel,
  busy,
  error,
}: ImpersonateModalProps) => {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(23,43,77,0.5)] p-md">
      <div className="w-full max-w-[480px] rounded-lg bg-white p-lg shadow-dropdown">
        <h2 className="mb-sm font-inter text-xl font-semibold text-dark1">
          View as {user.first_name} {user.last_name}?
        </h2>

        <p className="mb-md font-inter text-sm text-dark2">
          You will see UW Flow exactly as{' '}
          <strong className="font-semibold">
            {user.email || `user ${user.id}`}
          </strong>{' '}
          sees it. The session is{' '}
          <strong className="font-semibold">read-only</strong> — you cannot post
          reviews, change their schedule, or edit their account — it expires
          after an hour, and it is recorded in the impersonation log.
        </p>

        <label
          htmlFor="impersonation-reason"
          className="mb-xs block font-inter text-sm font-semibold text-dark1"
        >
          Reason
        </label>
        <input
          id="impersonation-reason"
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          maxLength={500}
          placeholder="e.g. investigating a schedule import bug"
          autoFocus
          className="mb-md w-full rounded-card border border-solid border-light3 px-sm py-xs font-inter text-sm text-dark1 outline-none focus:border-primary"
        />

        {error && (
          <div className="mb-md font-inter text-sm text-darkRed">{error}</div>
        )}

        <div className="flex justify-end gap-sm">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="cursor-pointer rounded-card border-none bg-light2 px-md py-xs font-inter text-sm font-semibold text-dark1 transition-all duration-hover ease-hover hover:brightness-hover disabled:cursor-default disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            disabled={busy}
            className="cursor-pointer rounded-card border-none bg-primary px-md py-xs font-inter text-sm font-semibold text-white transition-all duration-hover ease-hover hover:brightness-hover disabled:cursor-default disabled:opacity-50"
          >
            {busy ? 'Starting…' : 'Start session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpersonateModal;
