import React from 'react';
import { ModalContext } from '../../data/providers/ModalProvider';

/* Child Components */
import Modal from '../display/Modal';

/* Constants */
import { modalNameToModal } from '../../constants/Modal';

const ModalMountInner = ({ context }) => {
  console.log(context.modalsById);
  return (
    <>
      {context.modalsById.map(modalData => (
        <Modal
          isOpen={modalData.isOpen}
          onRequestClose={modalData.props.onRequestClose}
          onAfterClose={modalData.props.onAfterClose}
          key={`${modalData.id}${modalData.modal}`}
        >
          {modalNameToModal[modalData.modal](modalData.props)}
        </Modal>
      ))}
    </>
  );
};

const ModalMount = () => (
  <ModalContext.Consumer>
    {context => <ModalMountInner context={context} />}
  </ModalContext.Consumer>
);

export default ModalMount;
