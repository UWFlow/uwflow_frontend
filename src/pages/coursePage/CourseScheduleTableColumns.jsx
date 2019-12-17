import React, { Fragment } from 'react';

import {
  SectionCellWrapper,
  SectionContentWrapper,
  NormalCellWrapper,
  ContentWrapper,
  InstructorLink,
  ColorBar,
  EnrollmentText,
  SpaceMargin,
  GreyWeekDay,
  BoldWeekDay,
  DateText,
} from './styles/CourseSchedule';

import ScheduleNotificationBell from './ScheduleNotificationBell';

import { getProfPageRoute } from '../../Routes';
import { processDateString, weekDayLetters } from '../../utils/Misc';
import { LEC, LAB, TUT } from '../../constants/PageConstants';

const contentSpace = spaces => {
  let content = [];
  for (let i = 0; i < spaces; i++) {
    content.push(<ContentWrapper key={i} compressed></ContentWrapper>);
  }
  return content;
};

const processWeekDays = days =>
  weekDayLetters.map(day =>
    days.includes(day) ? (
      <BoldWeekDay key={day}>{day}</BoldWeekDay>
    ) : (
      <GreyWeekDay key={day}>{day}</GreyWeekDay>
    ),
  );

const SectionCell = ({ cell }) => (
  <SectionCellWrapper numRows={cell.value.numRows}>
    <ColorBar
      color={
        cell.value.includes(LEC) ? LEC : cell.value.includes(LAB) ? LAB : TUT
      }
    />
    <SectionContentWrapper>{cell.value}</SectionContentWrapper>
  </SectionCellWrapper>
);

const ClassCell = ({ cell }) => (
  <NormalCellWrapper>
    <ContentWrapper>{cell.value}</ContentWrapper>
  </NormalCellWrapper>
);

const EnrolledCell = ({ cell }) => (
  <NormalCellWrapper>
    <ContentWrapper>
      {(cell.value.filled >= cell.value.capacity || cell.value.selected) && (
        <ScheduleNotificationBell
          key={cell.value.section_id}
          sectionID={cell.value.section_id}
          courseID={cell.value.course_id}
          initialState={cell.value.selected}
        />
      )}
      <EnrollmentText
        filled={cell.value.filled >= cell.value.capacity}
        hasBell={cell.value.hasBell}
      >
        {cell.value.filled}/{cell.value.capacity}
      </EnrollmentText>
    </ContentWrapper>
  </NormalCellWrapper>
);

const CampusCell = ({ cell }) => <ContentWrapper>{cell.value}</ContentWrapper>;

const TimeCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => (
      <Fragment key={idx}>
        <ContentWrapper>{cl.time}</ContentWrapper>
        {contentSpace(cl.spaces)}
        {idx < cell.value.length - 1 && <SpaceMargin />}
      </Fragment>
    ))}
  </NormalCellWrapper>
);

const DateCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((timeRanges, timeRangeIdx) => (
      <Fragment key={timeRangeIdx}>
        {timeRanges.map((date, idx) => {
          const processedDate =
            date.startDate === date.endDate
              ? processDateString(date.startDate).split(', ')[1]
              : '';
          return (
            <ContentWrapper key={idx}>
              {processWeekDays(date.days)}
              <DateText>{processedDate}</DateText>
            </ContentWrapper>
          );
        })}
        {timeRangeIdx < cell.value.length - 1 && <SpaceMargin />}
      </Fragment>
    ))}
  </NormalCellWrapper>
);

const LocationCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) => (
      <Fragment key={idx}>
        <ContentWrapper>{cl.location}</ContentWrapper>
        {contentSpace(cl.spaces)}
        {idx < cell.value.length - 1 && <SpaceMargin />}
      </Fragment>
    ))}
  </NormalCellWrapper>
);

const InstructorCell = ({ cell }) => (
  <NormalCellWrapper>
    {cell.value.map((cl, idx) =>
      cl.prof.code ? (
        <Fragment key={idx}>
          <InstructorLink to={getProfPageRoute(cl.prof.code)} key={idx}>
            {cl.prof.name}
          </InstructorLink>
          {contentSpace(cl.spaces)}
          {idx < cell.value.length - 1 && <SpaceMargin />}
        </Fragment>
      ) : (
        <Fragment key={idx}>
          {contentSpace(cl.spaces + 1)}
          {idx < cell.value.length - 1 && <SpaceMargin />}
        </Fragment>
      ),
    )}
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
    accessor: 'class',
  },
  {
    Header: 'Enrolled',
    Cell: EnrolledCell,
    accessor: 'enrolled',
  },
  {
    Header: 'Time',
    Cell: TimeCell,
    accessor: 'times',
  },
  {
    Header: 'Date',
    Cell: DateCell,
    accessor: 'dates',
    style: {
      paddingBottom: 16,
    },
  },
  {
    Header: 'Location',
    Cell: LocationCell,
    accessor: 'locations',
  },
  {
    Header: 'Instructor',
    Cell: InstructorCell,
    accessor: 'profs',
  },
  {
    Header: 'Campus',
    Cell: CampusCell,
    accessor: 'campus',
  },
];
