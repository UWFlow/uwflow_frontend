import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '../../../../constants/Mixins';

/* Mixins */
import { Heading2, PageContent, WideColumn, ThinColumn } from '../../../../constants/Mixins';

export const ExplorePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`;

export const ExploreHeaderWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  background-color: ${({ theme }) => theme.primaryExtraDark};
  flex-direction: column;
  position: relative;
`;

export const ExploreHeaderText = styled.div`
  ${PageContent}
  ${Heading2}
  padding-top: 48px !important;
  padding-bottom: 16px !important;
  word-break: break-all;
  min-height: 104px;
  display: flex;
  flex-direction: row;
  margin: auto;
  position: relative;
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

export const CourseCode = styled(RouterLink)`
  ${Link}
  color: ${({theme}) => theme.courses};
`;

export const ProfName = styled(RouterLink)`
 ${Link}
  color: ${({theme}) => theme.professors};
`;
