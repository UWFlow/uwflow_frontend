import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Child Components */
import Textbox from '../common/Textbox';
import TabContainer from '../common/TabContainer';
import Button from '../common/Button';
import TestModal from '../common/modal/TestModal';
import ProgressBar from '../common/ProgressBar';

/* Selectors */
import { getTextboxText } from '../../reducers/TextboxReducer';

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

  const tabList = [
    { title: 'Hello', render: () => <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div> },
    { title: 'World', render: () => <div>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div> },
    { title: 'Geology', render: () => <div> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu Duis aute irure dolor in reprehenderit in voluptate ve.</div> },
    { title: 'Rocks', render: () => <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div> },
  ];

  return (
    <>
      <TestModal
        onCloseModal={() => setModalOpen(false)}
        isModalOpen={isModalOpen}
      />

      <Link to="/profile">Profile Page</Link>
      <br /><br />
      <Textbox
        handleKeyDown={handleKeyDown}
        initialPlaceholder="Enter an api endpoint"
        options={{ width: '500px' }}
      />
      <br />
      <TabContainer
        containerWidth={'500px'}
        tabList={tabList}
        initialSelectedTab={0}
      />
      <Button handleClick={() => setModalOpen(true)}>
        Open Modal
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
