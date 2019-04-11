import React, { useState, useEffect } from 'react';

/* Styled Components */
import {
  ContainerWrapper,
  TabsWrapper,
  Tab,
  ContentContainer,
} from './styles/TabContainer';

const TabContainer = ({
  tabList,
  initialSelectedTab,
  containerWidth,
  tabWidth,
}) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);

  return (
    <ContainerWrapper width={containerWidth}>
      <TabsWrapper>
        {tabList.map((tab, index) => (
          <Tab
            key={index}
            width={tabWidth}
            selected={index === selectedTab}
            onClick={() => setSelectedTab(index)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabsWrapper>
      <ContentContainer>{tabList[selectedTab].render()}</ContentContainer>
    </ContainerWrapper>
  );
};

export default TabContainer;
