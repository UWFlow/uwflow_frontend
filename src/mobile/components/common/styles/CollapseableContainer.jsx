import styled from 'styled-components';
import { Heading3, BoxShadow } from '../../../../constants/Mixins';
import { HEADER_HEIGHT } from '../CollapseableContainer';

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${BoxShadow}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  height: ${HEADER_HEIGHT}px;
  justify-content: space-between;
`;

export const HeaderTitleBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const HeaderTitleText = styled.div`
  ${Heading3}
`;

export const HeaderChevronBox = styled.div`
  width: ${HEADER_HEIGHT}px;
`;

export const ContentWrapper = styled.div``;
