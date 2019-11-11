import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

/* Mixins */
import { WideColumn, ThinColumn, PageContent } from '../../../constants/Mixins';

export const ProfPageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.light1};
`;

export const ColumnWrapper = styled.div`
  ${PageContent}
  margin: auto;
  display: flex;
  flex-flow: row wrap;
`;

export const Column1 = styled.div`
  ${WideColumn}

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    padding: 0;
    order: 2;
  `}
`;

export const Column2 = styled.div`
  ${ThinColumn}

  ${breakpoint('mobile', 'tablet')`
    width: 100%;
    order: 1;
  `}
`;
