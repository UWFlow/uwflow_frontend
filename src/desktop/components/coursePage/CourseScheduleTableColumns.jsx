import React from 'react';
import {
  SectionCellWrapper,
  SectionContentWrapper,
  NormalCellWrapper,
  ContentWrapper,
  InstructorLink,
  ColorBar,
} from './styles/CourseSchedule';
import { getProfPageRoute } from '../../../Routes';

export const LEC = 'LEC';
export const LAB = 'LAB';
export const TUT = 'TUT';

const SectionCell = ({ value }) => (
  <SectionCellWrapper numRows={value.numRows}>
    <ColorBar
      color={
        value.section.includes(LEC)
          ? LEC
          : value.section.includes(LAB)
          ? LAB
          : TUT
      }
    />
    <SectionContentWrapper>{value.section}</SectionContentWrapper>
  </SectionCellWrapper>
);

const ClassCell = ({ value }) => (
  <NormalCellWrapper>{value}</NormalCellWrapper>
);
const EnrolledCell = ({ value }) => (
  <NormalCellWrapper>
    {value.filled}/{value.capacity}
  </NormalCellWrapper>
);
const TimeCell = ({ value }) => (
  <NormalCellWrapper>
    {value.map((cl, ind) => {
      return (
        <ContentWrapper key={ind}>
          {cl.time.start} - {cl.time.end}
        </ContentWrapper>
      );
    })}
  </NormalCellWrapper>
);
const DateCell = ({ value }) => (
  <NormalCellWrapper>
    {value.map((cl, ind) => {
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
const LocationCell = ({ value }) => (
  <NormalCellWrapper>
    {value.map((cl, ind) => {
      return <ContentWrapper key={ind}>{cl.location}</ContentWrapper>;
    })}
  </NormalCellWrapper>
);
const InstructorCell = ({ value }) => (
  <NormalCellWrapper>
    {value.map((cl, ind) => {
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
    style: {
      padding: 0,
    },
  },
  {
    Header: 'Class',
    Cell: ClassCell,
    accessor: 'class_number',
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
