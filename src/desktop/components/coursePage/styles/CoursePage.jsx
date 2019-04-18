import styled from 'styled-components';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

/* Mixins */
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';

export const CoursePageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;

export const CourseInfoBoxWrapper = styled.div`
  width: ${PAGE_CONTENT_WIDTH}px;
  margin: auto;
  display: flex;
`;

export const ExtraInfoBoxWrapper = styled.div`
  width: 100%;
`;
