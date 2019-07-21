import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ContainerWrapper,
  TabsWrapper,
  Tab,
  ContentContainer,
} from './styles/TabContainer';

const TabContainer = ({
  tabList,
  containerWidth,
  tabWidth,
  initialSelectedTab = 0,
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
            first={index === 0}
            last={index === tabList.length - 1}
            onClick={() =>
              tab.onClick ? tab.onClick(index) : setSelectedTab(index)
            }
          >
            {tab.title}
          </Tab>
        ))}
      </TabsWrapper>
      <ContentContainer>{tabList[selectedTab].render()}</ContentContainer>
    </ContainerWrapper>
  );
};

TabContainer.propTypes = {
  tabList: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialSelectedTab: PropTypes.number,
  containerWidth: PropTypes.string,
  tabWidth: PropTypes.string
}

export default TabContainer;
