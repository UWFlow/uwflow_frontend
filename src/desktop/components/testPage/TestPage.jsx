import React, { useState } from 'react';

/* Child Components */
import Button from '../../../components/input/Button';
import ScheduleUploadModal from '../dataUploadModals/ScheduleUploadModal';
import TranscriptUploadModal from '../dataUploadModals/TranscriptUploadModal';

const TestPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);

  return (
    <div style={{ height: 'calc(100vw - 200px)', paddingTop: '100px' }}>
      <ScheduleUploadModal
        onCloseModal={() => setModalOpen(false)}
        isModalOpen={isModalOpen}
      />
      <TranscriptUploadModal
        onCloseModal={() => setModal2Open(false)}
        isModalOpen={isModal2Open}
      />
      <Button handleClick={() => setModalOpen(true)}>
        Open Schedule Modal
      </Button>
      <Button handleClick={() => setModal2Open(true)}>
        Open Transcript Modal
      </Button>
    </div>
  );
};
export default TestPage;
