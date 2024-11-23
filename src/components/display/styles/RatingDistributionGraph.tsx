import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Body, Heading4 } from 'constants/Mixins';

export const GraphWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Graph = styled.div`
  width: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const BarLabel = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  min-width: 24px;
`;

export const BarPercentage = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  min-width: 48px;
  text-align: right;
`;

export const DistributionBarWrapper = styled.div`
  flex: 1;
`;

export const GraphTitle = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};
  margin-bottom: 8px;
`;

export const GraphDistributionLabel = styled.span`
  ${Heading4}
  color: ${({ theme }) => theme.dark1};
`;
