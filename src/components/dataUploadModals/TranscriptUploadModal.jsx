import React from 'react';
import Modal from '../display/Modal';

/* Child Components */
import TranscriptUploadModalContent from './TranscriptUploadModalContent';

const TranscriptUploadModal = ({
  onCloseModal,
  isModalOpen,
  onAfterClose = () => {},
  showSkipStepButton = false,
  onAfterUploadSuccess,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      onAfterClose={onAfterClose}
    >
      <TranscriptUploadModalContent
        onSkip={onCloseModal}
        showSkipStepButton={showSkipStepButton}
        onAfterUploadSuccess={onAfterUploadSuccess}
      />
    </Modal>
  );
};

export default TranscriptUploadModal;
