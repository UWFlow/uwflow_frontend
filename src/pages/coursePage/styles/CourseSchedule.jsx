import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LEC, LAB } from '../CourseScheduleTableColumns';
import { Heading3 } from '../../../constants/Mixins';

export const CourseScheduleWrapper = styled.div`
  margin-bottom: 32px;
`;

export const SectionCellWrapper = styled.div`
  display: flex;
  position: relative;
  height: calc(
    ${({ numRows }) => numRows}em + ${({ numRows }) => numRows * 4}px);
  height: 100%;
  width: 100%;
  align-items: flex-begin;
  padding-left: 20px;
`;

export const ColorBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: ${({ color }) =>
    color === LEC ? '#B3D4FF' : color === LAB ? '#B3F5FF' : '#C0B6F2'};
`;

export const NormalCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SectionContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  font-weight: 600;
  position: relative;
  top: 16px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  padding: 8px 0;
  align-items: center;
  width: 100%;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  padding: 8px 0;
  font-weight: 600;
`;

export const ScheduleTableWrapper = styled.div`
  overflow-x: auto;
  zoom: 0.9;
  max-height: 200vh;
`;

export const FinalExamsTableWrapper = styled.div`
  overflow-x: auto;
  padding: 32px 0;
`;

export const EnrollmentText = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  color: ${({ theme, filled }) => filled ? theme.red : 'inherit'};
`;

export const FinalExamsText = styled.div`
  padding-bottom: 8px;
  padding-left: 16px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};
`;

export const SpaceMargin = styled.div`
  margin-bottom: 4px;
  content: '';
`;