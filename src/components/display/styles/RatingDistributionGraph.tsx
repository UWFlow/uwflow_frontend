import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Body, Heading4 } from 'constants/Mixins';

export const Graph = styled.div`
  width: 100%;
  border-radius: 0 0 20px 20px;
  padding-bottom: 0;
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
  zoom: 80%;

  ${breakpoint('tablet')`
    width: 300px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 32px;
    background-color: ${({ theme }: { theme: any }) => theme.light1};
  `}
`;

export const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  gap: 8px;

  ${breakpoint('tablet')`
    width: 100%;
  `}
`;

export const BarLabel = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
`;

export const BarPercentage = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
`;

export const GraphWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${breakpoint('tablet')`
    justify-content: flex-end;
    flex-direction: row;
  `}
`;

export const DistributionBarWrapper = styled.div`
  width: 100%;
`;

export const GraphTitle = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark1};
  padding-bottom: 5px;
  width: 100%;
`;

export const GraphDistributionLabel = styled.span`
  ${Heading4}
  color: ${({ theme }) => theme.dark1};
`;
