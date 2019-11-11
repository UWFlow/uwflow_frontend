import styled from 'styled-components';

/* Mixins */
import { WideColumn, ThinColumn, PageContent, PageWrapper } from '../../../../constants/Mixins';

export const ProfPageWrapper = styled.div`
  ${PageWrapper}
  background-color: ${({ theme }) => theme.light1};
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
