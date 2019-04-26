import React from 'react';

import TabContainer from '../TabContainer';
import ModalHOC from './ModalHOC';

const TestModal = ({ onCloseModal, isModalOpen }) => {
  const tabList = [
    { title: 'abc', render: () => <div>ABC</div> },
    { title: 'def', render: () => <div>def</div> },
    { title: 'ghi', render: () => <div>ghi</div> },
    { title: 'jkl', render: () => <div>jkl</div> },
  ];

  return (
    <ModalHOC onCloseModal={onCloseModal} isModalOpen={isModalOpen}>
      <TabContainer
        containerWidth={'80%'}
        tabList={tabList}
        initialSelectedTab={0}
      />
    </ModalHOC>
  );
};

export default TestModal;
