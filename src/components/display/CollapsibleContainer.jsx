import React, { useState } from 'react';
import Collapsible from 'react-collapsible';

/* Styled Components */
import {
  ContainerWrapper,
  HeaderWrapper,
  HeaderTitle,
  HeaderChevronBox,
  Chevron,
  ContentWrapper,
} from './styles/CollapsibleContainer';

const CollapsibleContainer = ({
  title,
  children,
  isInitiallyOpen = true,
  centerHeader = true,
  headerBorder = false,
  bigTitle = false,
  margin = '32px 0 0 0',
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return (
    <ContainerWrapper margin={margin}>
      <HeaderWrapper headerBorder={isOpen && headerBorder}>
        <HeaderTitle centerHeader={centerHeader} bigTitle={bigTitle}>
          {title}
        </HeaderTitle>
        <HeaderChevronBox
          onClick={() => setIsOpen(!isOpen)}
          onMouseDown={e => e.preventDefault()}
        >
          <Chevron open={isOpen} />
        </HeaderChevronBox>
      </HeaderWrapper>
      <Collapsible open={isOpen} transitionTime={300} easing="ease-in-out">
        <ContentWrapper>{children}</ContentWrapper>
      </Collapsible>
    </ContainerWrapper>
  );
};

export default CollapsibleContainer;
