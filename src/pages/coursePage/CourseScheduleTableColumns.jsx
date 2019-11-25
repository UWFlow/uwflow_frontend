import React from 'react';
import {
  SectionCellWrapper,
  SectionContentWrapper,
  NormalCellWrapper,
  ContentWrapper,
  InstructorLink,
  ColorBar,
  EnrollmentText,
  SpaceMargin
} from './styles/CourseSchedule';
import { getProfPageRoute } from '../../Routes';
import { processDateString } from '../../utils/Misc';

export const LEC = 'LEC';
export const LAB = 'LAB';
export const TUT = 'TUT';

const contentSpace = (spaces) => {
  let content = [];
  for (let i = 0; i < spaces; i++) {
    content.push(<ContentWrapper key={i}></ContentWrapper>);
  }
  return content;
}

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

const CampusCell = ({ cell }) => (
  <NormalCellWrapper>{cell.value}</NormalCellWrapper>
);

const TimeCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => (
        <>
          <ContentWrapper key={idx}>
            {cl.time}
          </ContentWrapper>
          {contentSpace(cl.spaces)}
          {idx < cell.value.length - 1 && <SpaceMargin />}
        </>
    ))}
  </NormalCellWrapper>
);

const DateCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((timeRanges, timeRangeIdx) => {
      let timeRangeContent = timeRanges.map((date, idx) => {
        const processedDate = date.startDate === date.endDate ?
          processDateString(date.startDate).split(', ')[1] : '';
        return (
          <ContentWrapper key={idx}>
            {date.days.join(' ')} {processedDate}
          </ContentWrapper>
        );
      });
      if (timeRangeIdx < cell.value.length - 1) {
        timeRangeContent.push(<SpaceMargin />);
      }
      return timeRangeContent;
    })}
  </NormalCellWrapper>
);

const LocationCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => (
      <>
        <ContentWrapper key={idx}>
          {cl.location}
        </ContentWrapper>
        {contentSpace(cl.spaces)}
        {idx < cell.value.length - 1 && <SpaceMargin />}
      </>
    ))}
  </NormalCellWrapper>
);

const InstructorCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => cl.prof.code ?
      (
        <>
          <InstructorLink
            to={getProfPageRoute(cl.prof.code)}
            key={idx}
          >
            {cl.prof.name}
          </InstructorLink>
          {contentSpace(cl.spaces)}
          {idx < cell.value.length - 1 && <SpaceMargin />}
        </>
      ) : (
        <>
          {contentSpace(cl.spaces + 1)}
          {idx < cell.value.length - 1 && <SpaceMargin />}
        </>
      )
    )}
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
      'verticalAlign': 'top',
    },
  },
  {
    Header: 'Enrolled',
    Cell: EnrolledCell,
    accessor: 'enrolled',
    maxWidth: 96,
    style: {
      'verticalAlign': 'top',
    },
  },
  {
    Header: 'Time',
    Cell: TimeCell,
    accessor: 'times',
    maxWidth: 136,
  },
  {
    Header: 'Date',
    Cell: DateCell,
    accessor: 'dates',
    maxWidth: 104,
  },
  {
    Header: 'Location',
    Cell: LocationCell,
    accessor: 'locations',
    maxWidth: 72,
  },
  {
    Header: 'Instructor',
    Cell: InstructorCell,
    accessor: 'profs',
    maxWidth: 160
  },
  {
    Header: 'Campus',
    Cell: CampusCell,
    accessor: 'campus',
    maxWidth: 80
  },
];
