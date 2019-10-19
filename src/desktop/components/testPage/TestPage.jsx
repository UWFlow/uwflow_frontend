import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Child Components */
import Textbox from '../../../sharedComponents/input/Textbox';
import TabContainer from '../../../sharedComponents/display/TabContainer';
import Button from '../../../sharedComponents/input/Button';
import ProgressBar from '../../../sharedComponents/display/ProgressBar';
import ScheduleUploadModal from '../dataUploadModals/ScheduleUploadModal';
import TranscriptUploadModal from '../dataUploadModals/TranscriptUploadModal';

/* Selectors */
import { getTextboxText } from '../../../reducers/TextboxReducer';

/* Styled Components */
import {} from './styles/TestPage';

const mapStateToProps = state => ({
  getTextboxText: ID => getTextboxText(state, ID),
});

export const TESTPAGE_API_TEXTBOX = 'TESTPAGE_API_TEXTBOX';

const TestPage = () => {
  const handleKeyDown = () => {
    return null;
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModal2Open, setModal2Open] = useState(false);
  const [textboxText, setTextboxText] = useState('');

  const tabList = [
    {
      title: 'Hello',
      render: () => (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      ),
    },
    {
      title: 'World',
      render: () => (
        <div>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </div>
      ),
    },
    {
      title: 'Geology',
      render: () => (
        <div>
          {' '}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu Duis aute irure dolor in reprehenderit in voluptate ve.
        </div>
      ),
    },
    {
      title: 'Rocks',
      render: () => (
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </div>
      ),
    },
  ];

  return (
    <>
      <ScheduleUploadModal
        onCloseModal={() => setModalOpen(false)}
        isModalOpen={isModalOpen}
      />
      <TranscriptUploadModal
        onCloseModal={() => setModal2Open(false)}
        isModalOpen={isModal2Open}
      />

      <Link to="/profile">Profile Page</Link>
      <br />
      <br />
      <Textbox
        text={textboxText}
        setText={setTextboxText}
        handleKeyDown={handleKeyDown}
        placeholder="Enter an api endpoint"
        options={{ width: '500px' }}
      />
      <br />
      <TabContainer
        containerWidth={'500px'}
        tabList={tabList}
        initialSelectedTab={0}
      />
      <Button handleClick={() => setModalOpen(true)}>
        Open Schedule Modal
      </Button>
      <Button handleClick={() => setModal2Open(true)}>
        Open Transcript Modal
      </Button>
      <ProgressBar percentComplete={0} />
      <ProgressBar percentComplete={0.25} />
      <ProgressBar percentComplete={0.5} />
      <ProgressBar percentComplete={0.75} />
      <ProgressBar percentComplete={1.0} />
    </>
  );
};
export default connect(mapStateToProps)(TestPage);
