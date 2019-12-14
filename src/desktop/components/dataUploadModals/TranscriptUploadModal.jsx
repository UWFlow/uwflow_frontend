import React from 'react';
import Modal from '../../../components/display/Modal';

/* Child Components */
import TranscriptUploadModalContent from './TranscriptUploadModalContent';

const TranscriptUploadModal = ({
  onCloseModal,
  isModalOpen,
  onAfterClose = () => {},
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      onAfterClose={onAfterClose}
    >
      <TranscriptUploadModalContent onSkip={onCloseModal} />
    </Modal>
  );
};

export default TranscriptUploadModal;
