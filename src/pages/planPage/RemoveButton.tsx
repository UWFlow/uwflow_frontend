import React from 'react';
import { X } from 'react-feather';

type RemoveButtonProps = {
  label: string;
  onClick: () => void;
};

const RemoveButton = ({ label, onClick }: RemoveButtonProps) => (
  <button
    type="button"
    aria-label={label}
    className="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-dark3 hover:text-red"
    onClick={onClick}
  >
    <X size={14} />
  </button>
);

export default RemoveButton;
