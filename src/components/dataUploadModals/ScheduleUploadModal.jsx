import React from 'react';
import Modal from '../display/Modal';

/* Child Components */
import ScheduleUploadModalContent from './ScheduleUploadModalContent';

const ScheduleUploadModal = ({
  onCloseModal,
  isModalOpen,
  onAfterClose = () => {},
  showSkipStepButton = false,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      onAfterClose={onAfterClose}
    >
      <ScheduleUploadModalContent
        onSkip={onCloseModal}
        showSkipStepButton={showSkipStepButton}
      />
    </Modal>
  );
};

export default ScheduleUploadModal;
