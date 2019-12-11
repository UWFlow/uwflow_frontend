import React from 'react';
import Modal from '../../../components/display/Modal';

/* Child Components */
import ScheduleUploadModalContent from './ScheduleUploadModalContent';

const ScheduleUploadModal = ({
  onCloseModal,
  isModalOpen,
  onAfterClose = () => {},
  theme,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      onAfterClose={onAfterClose}
    >
      <ScheduleUploadModalContent onSkip={onCloseModal} theme={theme} />
    </Modal>
  );
};

export default ScheduleUploadModal;
