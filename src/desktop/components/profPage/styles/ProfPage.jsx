import styled from 'styled-components';

/* Mixins */
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';

/* Constants */
import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

export const ProfPageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.light1};
`;

export const ColumnWrapper = styled.div`
  width: ${PAGE_CONTENT_WIDTH}px;
  margin: auto;
  display: flex;
`;

export const Column1 = styled.div`
  ${WideColumn}
`;

export const Column2 = styled.div`
  ${ThinColumn}
`;
