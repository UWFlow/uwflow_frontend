import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
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
    ${({ numRows }) => numRows}em + ${({ numRows }) => numRows * 4}px + 60px
  );
  height: 100%;
  width: 100%;
  align-items: flex-begin;
  padding-left: 32px;
`;

export const ColorBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 8px;
  background-color: ${({ color, theme }) =>
    color === LEC ? theme.dark1 : color === LAB ? theme.dark2 : theme.dark3};
`;

export const NormalCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-begin;
`;

export const SectionContentWrapper = styled.div`
  margin: 6px 0 2px 0;
  height: 1em;
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 600;
  top: 16px;
  position: relative;
`;

export const ContentWrapper = styled.div`
margin: 6px 0 2px 0;
height: 1em;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  margin: 6px 0 2px 0;
  height: 1em;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const EnrollmentText = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme, filled }) => filled ? theme.red : 'inherit'};
`;

export const FinalExamsText = styled.div`
  padding: 24px 32px 16px 32px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};

  ${breakpoint('mobile', 'tablet')`
    padding: 16px;
  `}
`;

export const SpaceMargin = styled.div`
  margin-bottom: 8px;
  content: '';
`;