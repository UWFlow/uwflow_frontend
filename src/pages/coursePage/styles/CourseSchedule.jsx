import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading3 } from '../../../constants/Mixins';
import { LEC, LAB } from '../../../constants/PageConstants';

export const CourseScheduleWrapper = styled.div`
  margin-bottom: 32px;
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
  transition 0.2s all;
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
  height: 32px;
  align-items: center;
  width: 100%;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  padding: 8px 0;
  font-weight: 600;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 168px;
  transition 0.1s all;

  &:hover {
    max-width: 100%;
    transition 0.1s all;
    text-overflow: none;
  }
`;

export const ScheduleTableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  zoom: 0.9;
`;

export const FinalExamsTableWrapper = styled.div`
  overflow-x: auto;
  padding: 32px 0;
`;

export const EnrollmentText = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  color: ${({ theme, filled }) => (filled ? theme.red : 'inherit')};
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
