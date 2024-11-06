import React, { useState } from 'react';
import styled from 'styled-components';

import { Body } from 'constants/Mixins';

import ProgressBar from './ProgressBar';

const GraphWrapper = styled.div`
  border-radius: 4px;
  padding: 16px;
  margin-top: 16px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterButton = styled.button<{ active: boolean }>`
  ${Body}
  background: none;
  border: none;
  color: ${({ theme, active }) => (active ? theme.primary : theme.dark2)};
  cursor: pointer;
  padding: 0;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const BarLabel = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  width: 24px;
  text-align: right;
`;

const BarPercentage = styled.div`
  ${Body}
  color: ${({ theme }) => theme.dark2};
  width: 40px;
`;

type RatingDistributionGraphProps = {
  usefulBuckets?: { value: number; count: number }[];
  easyBuckets?: { value: number; count: number }[];
};

const RatingDistributionGraph = ({
  usefulBuckets = [],
  easyBuckets = [],
}: RatingDistributionGraphProps) => {
  const [activeFilter, setActiveFilter] = useState<'useful' | 'easy'>('useful');

  const buckets = activeFilter === 'useful' ? usefulBuckets : easyBuckets;
  const total = buckets.reduce((sum, bucket) => sum + bucket.count, 0);

  return (
    <GraphWrapper>
      <FilterWrapper>
        <FilterButton
          active={activeFilter === 'useful'}
          onClick={() => setActiveFilter('useful')}
        >
          Useful
        </FilterButton>
        <FilterButton
          active={activeFilter === 'easy'}
          onClick={() => setActiveFilter('easy')}
        >
          Easy
        </FilterButton>
      </FilterWrapper>
      {buckets.map((bucket, index) => {
        const percentage = total > 0 ? (bucket.count / total) * 100 : 0;
        return (
          <BarWrapper key={index}>
            <BarLabel>{bucket.value + 2}</BarLabel>
            <ProgressBar percentComplete={percentage / 100} />
            <BarPercentage>{percentage}%</BarPercentage>
          </BarWrapper>
        );
      })}
    </GraphWrapper>
  );
};

export default RatingDistributionGraph;
