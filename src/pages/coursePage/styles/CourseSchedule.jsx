import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading3, Hover } from '../../../constants/Mixins';
import { LEC, LAB } from '../../../constants/PageConstants';

const CELL_HEIGHT = 28;

export const CourseScheduleWrapper = styled.div`
  margin-bottom: 0;
  width: 100%;
`;

export const SectionCellWrapper = styled.div`
  display: flex;
  position: relative;
  height: calc(
    ${({ numRows }) => numRows}em + ${({ numRows }) => numRows * 4}px
  );
  height: 100%;
  width: 100%;
  align-items: flex-begin;
  padding-left: 20px;
  white-space: nowrap;
`;

export const ColorBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: ${({ color, theme }) =>
    color === LEC ? theme.lecture : color === LAB ? theme.lab : theme.tutorial};
`;

export const NormalCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 8px;
  transition: 0.2s all;
`;

export const SectionContentWrapper = styled.div`
  display: flex;
  font-weight: 600;
  position: relative;
  align-items: center;
  width: 100%;
  height: ${CELL_HEIGHT}px;
  top: 4px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${CELL_HEIGHT}px;
  white-space: nowrap;
  margin-bottom: -8px;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  font-weight: 600;
  white-space: nowrap;
  height: ${CELL_HEIGHT}px;
  display: flex;
  align-items: center;
  margin-bottom: -8px;
  ${Hover()}
`;

export const ScheduleTableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
`;

export const FinalExamsTableWrapper = styled.div`
  overflow-x: auto;
  padding: ${({ hasExams }) => (hasExams ? '32px 0' : '32px 0 0 0')};
`;

export const EnrollmentText = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${({ hasBell = true, filled }) =>
    !filled && hasBell ? 36 : 0}px;
  height: ${CELL_HEIGHT}px;
  color: ${({ theme, filled }) => (filled ? theme.red : 'inherit')};
`;

export const FinalExamsText = styled.div`
  padding-bottom: 8px;
  padding-left: 16px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};
`;

export const SpaceMargin = styled.div`
  margin-bottom: 16px;
  content: '';
`;

export const GreyWeekDay = styled.span`
  color: ${({ theme }) => theme.dark3};
  margin-right: 1px;
`;

export const BoldWeekDay = styled.span`
  color: ${({ theme }) => theme.dark1};
  font-weight: 600;
  margin-right: 1px;
`;

export const DateText = styled.span`
  margin-left: 4px;
`;
