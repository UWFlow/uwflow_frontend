import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LEC, TUT, LAB } from '../CourseScheduleTableColumns';

export const CourseScheduleWrapper = styled.div`
  margin-bottom: 32px;
`;

export const ScheduleTable = styled.div`
  width: 100%;
`;

export const SectionCellWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const ColorBar = styled.div`
  height: 100%;
  width: 6px;
  background-color: ${({ color, theme }) =>
    color === LEC ? theme.dark1 : color === LAB ? theme.dark2 : theme.dark3};
`;

export const NormalCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-begin;
`;

export const ContentWrapper = styled.div`
  margin: 4px 0 4px 0;
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const InstructorLink = styled(Link)`
  color: ${({ theme }) => theme.professors};
  margin: 4px 0 4px 0;
  height: 1em;
`;
