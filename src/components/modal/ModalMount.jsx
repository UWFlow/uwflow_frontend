import React from 'react';
import { ModalContext } from '../../data/providers/ModalProvider';

const ModalMount = () => {
  return (
    <ModalContext.Consumer>
      {context => {
        context.modalsById.map(modalData =>
          context.modalNameToModal[modalData.modal](
            modalData.isOpen,
            modalData.props,
          ),
        );
      }}
    </ModalContext.Consumer>
  );
};

export default ModalMount;
