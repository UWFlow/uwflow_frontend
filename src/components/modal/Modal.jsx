import React from 'react';
import ReactModal from 'react-modal';
import { X } from 'react-feather';
import { Scrollbars } from 'react-custom-scrollbars';

import { ModalChildren, ModalX } from './styles/Modal';

/* Styles found in index.css */
const Modal = ({
  children,
  onRequestClose,
  isOpen,
  onAfterClose = () => {},
}) => {
  return (
    <Scrollbars
      autoHeight
      autoHide
      autoHeightMin={isOpen ? '100%' : '0'}
      autoHeightMax="100%"
      style={{
        width: isOpen ? '100%' : '0',
      }}
    >
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
            onMouseDown={e => e.preventDefault()}
          >
            <X />
          </ModalX>
          {children}
        </ModalChildren>
      </ReactModal>
    </Scrollbars>
  );
};

export default Modal;
