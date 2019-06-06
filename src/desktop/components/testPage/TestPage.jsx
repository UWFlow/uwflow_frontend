import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

/* Child Components */
import Textbox from '../common/Textbox';
import TabContainer from '../common/TabContainer';
import TestModal from '../common/modal/TestModal';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

/* Styled Components */
import { Path } from './styles/TestPage';

export const TESTPAGE_API_TEXTBOX = 'TESTPAGE_API_TEXTBOX';

const TestPage = ({}) => {
  const handleKeyDown = event => {
    return;
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const tabList = [
    { title: 'abc', render: () => <div>ABC</div> },
    { title: 'def', render: () => <div>def</div> },
    { title: 'ghi', render: () => <div>ghi</div> },
    { title: 'jkl', render: () => <div>jkl</div> },
  ];

  return (
    <>
      <Link to="/">Profile Page</Link>
      <Textbox
        handleKeyDown={handleKeyDown}
        ID={TESTPAGE_API_TEXTBOX}
        initialPlaceholder="Enter an api endpoint"
        options={{ width: '600px' }}
      />
      <TabContainer
        containerWidth={'80%'}
        tabList={tabList}
        initialSelectedTab={0}
      />
      <div onClick={() => setModalOpen(true)}>Open Modal</div>
      <TestModal
        onCloseModal={() => setModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default TestPage;
