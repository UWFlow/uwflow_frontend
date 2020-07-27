import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ContainerWrapper,
  ContentContainer,
  Tab,
  TabsWrapper,
} from './styles/TabContainer';

const TabContainer = ({
  tabList,
  containerWidth,
  minTabWidth,
  initialSelectedTab = 0,
  contentPadding = '32px',
  borderRadius = true,
  onChange = () => {},
}) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);

  return (
    <ContainerWrapper width={containerWidth} borderRadius={borderRadius}>
      <TabsWrapper>
        {tabList.map((tab, index) => (
          <Tab
            key={index}
            minWidth={minTabWidth}
            selected={index === selectedTab}
            first={index === 0}
            last={index === tabList.length - 1}
            onClick={() => {
              tab.onClick();
              setSelectedTab(index);
              onChange(index);
            }}
            onMouseDown={(e) => e.preventDefault()}
            borderRadius={borderRadius}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsWrapper>
      <ContentContainer padding={contentPadding}>
        {tabList[selectedTab].render()}
      </ContentContainer>
    </ContainerWrapper>
  );
};

TabContainer.propTypes = {
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      title: PropTypes.string.isRequired,
      render: PropTypes.func.isRequired,
    }),
  ).isRequired,
  initialSelectedTab: PropTypes.number,
  containerWidth: PropTypes.string,
  tabWidth: PropTypes.string,
  contentPadding: PropTypes.string,
};

export default TabContainer;
