import styled from 'styled-components';

/* Mixins */
import { Heading2, PageContent, WideColumn, ThinColumn } from '../../../../constants/Mixins';

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
  padding-top: 48px;
  padding-bottom: 16px;
  word-break: break-all;
  ${PageContent}
  min-height: 104px;
  display: flex;
  flex-direction: row;
  margin: auto;
  position: relative;
  ${Heading2}
  color: ${({ theme }) => theme.light1};
  font-weight: 400;
`;


export const ColumnWrapper = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;
