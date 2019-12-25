import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import Collapsible from 'react-collapsible';

/* Styled Components */
import {
  ContainerWrapper,
  HeaderWrapper,
  HeaderTitle,
  HeaderChevronBox,
  ContentWrapper,
} from './styles/CollapsibleContainer';

const CollapsibleContainer = ({
  title,
  children,
  isInitiallyOpen = true,
  centerHeader = true,
  headerBorder = false,
  bigTitle = false,
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <ContainerWrapper>
      <HeaderWrapper headerBorder={isOpen && headerBorder}>
        <HeaderTitle centerHeader={centerHeader} bigTitle={bigTitle}>
          {title}
        </HeaderTitle>
        <HeaderChevronBox onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </HeaderChevronBox>
      </HeaderWrapper>
      <Collapsible open={isOpen} transitionTime={250}>
        <ContentWrapper>{children}</ContentWrapper>
      </Collapsible>
    </ContainerWrapper>
  );
};

export default CollapsibleContainer;
