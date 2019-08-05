import styled from 'styled-components';

/* Mixins */
import { Heading2, PageContent } from '../../../../constants/Mixins';

export const ExplorePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding-bottom: 200px;
`;

export const ExploreHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: ${({ theme }) => theme.primary};
  flex-direction: column;
  position: relative;
`;

export const ExploreHeaderText = styled.div`
  padding: 52px 0;
  ${PageContent}
  height: 104px;
  display: flex;
  flex-direction: row;
  margin: auto;
  position: relative;
  margin-bottom: 16px;
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;
`;
