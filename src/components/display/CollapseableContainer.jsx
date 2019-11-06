import React, { useState } from 'react';
import {
  ContainerWrapper,
  HeaderWrapper,
  HeaderTitle,
  HeaderChevronBox,
  ContentWrapper,
} from './styles/CollapseableContainer';
import { ChevronDown, ChevronUp } from 'react-feather';

const CollapseableContainer = ({
  title,
  children,
  isInitiallyOpen = true,
  centerHeader = true,
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <ContainerWrapper>
      <HeaderWrapper>
        <HeaderTitle centerHeader={centerHeader}>{title}</HeaderTitle>
        <HeaderChevronBox onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </HeaderChevronBox>
      </HeaderWrapper>
      {isOpen && <ContentWrapper>{children}</ContentWrapper>}
    </ContainerWrapper>
  );
};

export default CollapseableContainer;
