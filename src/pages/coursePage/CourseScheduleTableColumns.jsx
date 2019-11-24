import React from 'react';
import {
  SectionCellWrapper,
  SectionContentWrapper,
  NormalCellWrapper,
  ContentWrapper,
  InstructorLink,
  ColorBar,
  EnrollmentText
} from './styles/CourseSchedule';
import { getProfPageRoute } from '../../Routes';
import { processDateString } from '../../utils/Misc';

export const LEC = 'LEC';
export const LAB = 'LAB';
export const TUT = 'TUT';

const SectionCell = ({ cell }) => (
  <SectionCellWrapper numRows={cell.value.numRows}>
    <ColorBar
      color={
        cell.value.includes(LEC)
          ? LEC
          : cell.value.includes(LAB)
          ? LAB
          : TUT
      }
    />
    <SectionContentWrapper>{cell.value}</SectionContentWrapper>
  </SectionCellWrapper>
);

const ClassCell = ({ cell }) => (
  <NormalCellWrapper>{cell.value}</NormalCellWrapper>
);

const EnrolledCell = ({ cell }) => {
  return (
    <NormalCellWrapper>
      <EnrollmentText filled={cell.value.filled >= cell.value.capacity}>
        {cell.value.filled}/{cell.value.capacity}
      </EnrollmentText>
    </NormalCellWrapper>
  );
}

const TimeCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => {
      return (
        <ContentWrapper key={idx}>
          {cl.time}
        </ContentWrapper>
      );
    })}
  </NormalCellWrapper>
);

const DateCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl) => {
      return cl.timeRanges.map((timeRange, idx) => {
        const date = timeRange.startDate === timeRange.endDate ?
          processDateString(timeRange.startDate).split(', ')[1] : '';
        return (
        <ContentWrapper key={idx}>
          {timeRange.days.join(' ')} {date}
        </ContentWrapper>
        );
      })
    })}
  </NormalCellWrapper>
);

const LocationCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => {
      return <ContentWrapper key={idx}>{cl.location}</ContentWrapper>;
    })}
  </NormalCellWrapper>
);

const InstructorCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => {
      return cl.prof.code ? (
        <InstructorLink
          to={getProfPageRoute(cl.prof.code)}
          key={idx}
        >
          {cl.prof.name}
        </InstructorLink>
      ) : null;
    })}
  </NormalCellWrapper>
);

export const courseScheduleTableColumns = [
  {
    Header: 'Section',
    Cell: SectionCell,
    accessor: 'section',
    maxWidth: 96,
    style: {
      padding: 0,
    },
  },
  {
    Header: 'Class',
    Cell: ClassCell,
    accessor: 'class',
    maxWidth: 48,
    style: {
      'vertical-align': 'top',
    },
  },
  {
    Header: 'Enrolled',
    Cell: EnrolledCell,
    accessor: 'enrolled',
    maxWidth: 96,
    style: {
      'vertical-align': 'top',
    },
  },
  {
    Header: 'Time',
    Cell: TimeCell,
    accessor: 'infoGroupings',
    maxWidth: 136,
  },
  {
    Header: 'Date',
    Cell: DateCell,
    accessor: 'infoGroupings',
    maxWidth: 112,
  },
  {
    Header: 'Location',
    Cell: LocationCell,
    accessor: 'infoGroupings',
    maxWidth: 72,
  },
  {
    Header: 'Instructor',
    Cell: InstructorCell,
    accessor: 'infoGroupings',
    maxWidth: 160
  },
];
