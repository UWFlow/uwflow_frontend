import styled from 'styled-components';

/* Mixins */
import { WideColumn, ThinColumn } from '../../../../constants/Mixins';

export const ProfPageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.light1};
`;
