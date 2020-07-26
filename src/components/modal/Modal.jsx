import React from 'react';
import ReactModal from 'react-modal';
import { X } from 'react-feather';

import { ModalChildren, ModalX } from './styles/Modal';

/* Styles found in index.css */
const Modal = ({
  children,
  onRequestClose,
  isOpen,
  onAfterClose = () => {},
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      closeTimeoutMS={150}
      className={'Modal'}
      overlayClassName={'ModalOverlay'}
      onAfterClose={onAfterClose}
    >
      <ModalChildren>
        <ModalX
          onClick={onRequestClose}
          onMouseDown={(e) => e.preventDefault()}
        >
          <X />
        </ModalX>
        {children}
      </ModalChildren>
    </ReactModal>
  );
};

export default Modal;
