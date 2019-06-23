import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Child Components */
import Textbox from '../common/Textbox';
import TabContainer from '../common/TabContainer';
import Button from '../common/Button';
import TestModal from '../common/modal/TestModal';

/* Selectors */
import { getTextboxText } from '../../reducers/TextboxReducer';

/* Utils */
import {externalCall} from '../../../utils/Api';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

/* Styled Components */
import { Path } from './styles/TestPage';

const mapStateToProps = state => ({
  getTextboxText: ID => getTextboxText(state, ID),
});

export const TESTPAGE_API_TEXTBOX = 'TESTPAGE_API_TEXTBOX';

const TestPage = ({ getTextboxText }) => {
  const handleKeyDown = event => {
    if (event.keyCode === KEYCODE.ENTER) {
      externalCall(getTextboxText(TESTPAGE_API_TEXTBOX), {});
    }
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
      <Button>
        Test
      </Button>
    </>
  );
};
export default connect(mapStateToProps)(TestPage);
