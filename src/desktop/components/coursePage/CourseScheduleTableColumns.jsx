import React from 'react';
import {
  SectionCellWrapper,
  NormalCellWrapper,
  ContentWrapper,
  InstructorLink,
  ColorBar,
} from './styles/CourseSchedule';
import { getProfPageRoute } from '../../../Routes';

export const LEC = 'LEC';
export const LAB = 'LAB';
export const TUT = 'TUT';

const SectionCell = ({ cell }) => (
  <SectionCellWrapper>
    <ColorBar
      color={
        cell.value.includes(LEC) ? LEC : cell.value.includes(LAB) ? LAB : TUT
      }
    />
    <ContentWrapper>{cell.value}</ContentWrapper>
  </SectionCellWrapper>
);

const ClassCell = ({ cell }) => (
  <NormalCellWrapper>{cell.value}</NormalCellWrapper>
);
const EnrolledCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.filled}/{cell.value.capacity}
  </NormalCellWrapper>
);
const TimeCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, ind) => {
      return (
        <ContentWrapper key={ind}>
          {cl.time.start} - {cl.time.end}
        </ContentWrapper>
      );
    })}
  </NormalCellWrapper>
);
const DateCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, ind) => {
      return (
        <ContentWrapper key={ind}>
          {cl.date.reduce((acc, curr, ind) => {
            return `${acc}${ind === 0 ? curr : ` ${curr}`}`;
          }, '')}
        </ContentWrapper>
      );
    })}
  </NormalCellWrapper>
);
const LocationCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, ind) => {
      return <ContentWrapper key={ind}>{cl.location}</ContentWrapper>;
    })}
  </NormalCellWrapper>
);
const InstructorCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, ind) => {
      if (!cl.instructor) return <ContentWrapper key={ind} />;
      return (
        <InstructorLink
          to={getProfPageRoute(cl.instructor.toString())}
          key={ind}
        >
          {cl.instructor}
        </InstructorLink>
      );
    })}
  </NormalCellWrapper>
);

export const courseScheduleTableColumns = [
  {
    Header: 'Section',
    Cell: SectionCell,
    accessor: 'section',
    align: 'top',
    style: { background: 'red' },
  },
  {
    Header: 'Class',
    Cell: ClassCell,
    accessor: 'c',
  },
  {
    Header: 'Enrolled',
    Cell: EnrolledCell,
    accessor: 'enrolled',
  },
  {
    Header: 'Time',
    Cell: TimeCell,
    accessor: 'classes',
  },
  {
    Header: 'Date',
    Cell: DateCell,
    accessor: 'classes',
  },
  {
    Header: 'Location',
    Cell: LocationCell,
    accessor: 'classes',
  },
  {
    Header: 'Instructor',
    Cell: InstructorCell,
    accessor: 'classes',
  },
];
