import React from 'react';
import ReactModal from 'react-modal';

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
      {children}
    </ReactModal>
  );
};

export default Modal;
