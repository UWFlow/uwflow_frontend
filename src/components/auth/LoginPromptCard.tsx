import React from 'react';
import { Lock } from 'react-feather';

import { Button } from 'components/ui/button';
import { AUTH_MODAL } from 'constants/Modal';
import useModal from 'hooks/useModal';

type LoginPromptCardProps = {
  title: string;
  description: string;
};

// Floating "log in to continue" card shown on pages that need an account
// (plan page, swap page).
const LoginPromptCard = ({ title, description }: LoginPromptCardProps) => {
  const [openModal] = useModal();

  return (
    <div className="flex max-w-[400px] flex-col items-center gap-3 rounded bg-white px-12 py-10 text-center shadow-modal">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-light2 text-dark2">
        <Lock size={24} />
      </div>
      <h2 className="mb-0 mt-1 text-xl font-bold text-dark1">{title}</h2>
      <p className="m-0 text-sm leading-normal text-dark2">{description}</p>
      <Button
        variant="accent"
        size="lg"
        className="mt-2"
        onClick={() => openModal(AUTH_MODAL)}
      >
        Log in to continue
      </Button>
    </div>
  );
};

export default LoginPromptCard;
