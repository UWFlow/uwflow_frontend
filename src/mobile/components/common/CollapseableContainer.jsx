import React, { useState } from 'react';
import {
  ContainerWrapper,
  HeaderWrapper,
  HeaderTitleBox,
  HeaderTitleText,
  HeaderChevronBox,
  ContentWrapper,
} from './styles/CollapseableContainer';
import { ChevronDown, ChevronUp } from 'react-feather';

const CollapseableContainer = ({
  title,
  renderContent,
  isInitiallyOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <ContainerWrapper>
      <HeaderWrapper>
        <HeaderTitleBox>
          <HeaderTitleText>{title}</HeaderTitleText>
        </HeaderTitleBox>
        <HeaderChevronBox onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </HeaderChevronBox>
      </HeaderWrapper>
      {isOpen && <ContentWrapper>{renderContent()}</ContentWrapper>}
    </ContainerWrapper>
  );
};

export default CollapseableContainer;
