import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LEC, LAB } from '../CourseScheduleTableColumns';

export const CourseScheduleWrapper = styled.div`
  margin-bottom: 32px;
`;

export const SectionCellWrapper = styled.div`
  display: flex;
  position: relative;
  margin: auto;
  height: calc(
    ${({ numRows }) => numRows}em + ${({ numRows }) => numRows * 4}px + 60px
  );
  width: 100%;
  align-items: flex-begin;
`;

export const ColorBar = styled.div`
  height: 100%;
  width: 8px;
  background-color: ${({ color, theme }) =>
    color === LEC ? theme.dark1 : color === LAB ? theme.dark2 : theme.dark3};
  margin-right: 24px;
`;

export const NormalCellWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-begin;
`;

export const SectionContentWrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  margin: auto;
  height: 1em;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  margin: 4px 0 4px 0;
  height: 1em;
`;
