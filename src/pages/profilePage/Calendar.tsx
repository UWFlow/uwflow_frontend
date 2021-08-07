import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import moment, { Moment } from 'moment/moment';
import { getCoursePageRoute } from 'Routes';

import { LAB, LEC, TUT } from 'constants/CourseSection';
import { EventsByDate, ScheduleInterval } from 'types/Common';
import { formatCourseCode } from 'utils/Misc';

import {
  CalendarContentWrapper,
  CalendarEvents,
  CalendarHeader,
  CalendarNavWrapper,
  CalendarWrapper,
  CourseCode,
  DateHoursWrapper,
  DateRangeText,
  DayColumn,
  DayHeader,
  EventWrapper,
  HOUR_HEIGHT,
  HourRow,
  HourText,
  NavButton,
  NavButtonWrapper,
  TotalHours,
} from './styles/Calendar';

const getDateRangeString = (start: Moment, end: Moment) => {
  if (start.year() !== end.year()) {
    return `${start.format('MMM Do, YYYY')} - ${end.format('MMM Do, YYYY')}`;
  }
  if (start.month() !== end.month()) {
    return `${start.format('MMM Do')} - ${end.format('MMM Do, YYYY')}`;
  }
  return `${start.format('MMM Do')} - ${end.format('Do, YYYY')}`;
};

const parseEventOverlap = (events: ScheduleInterval[]) => {
  if (events.length < 2) {
    return events;
  }

  const sortedEvents = events.sort(
    (a, b) => a.start.valueOf() - b.start.valueOf(),
  );

  const prevEvent = sortedEvents[0];
  for (let i = 1; i < sortedEvents.length; i += 1) {
    const curEvent = sortedEvents[i];

    // alternate between left and right for overlapping events
    if (prevEvent.end.valueOf() > curEvent.start.valueOf()) {
      if (prevEvent.truncate === undefined) {
        prevEvent.truncate = 'left';
        curEvent.truncate = 'right';
      } else {
        curEvent.truncate = prevEvent.truncate === 'left' ? 'right' : 'left';
      }
    }
  }
  return events;
};

type CalendarColumnProps = {
  day: Moment;
  minHour: number;
  events: ScheduleInterval[];
};

const CalendarColumn = ({ day, minHour, events = [] }: CalendarColumnProps) => (
  <DayColumn>
    <DayHeader>{day.format('ddd MMM D')}</DayHeader>
    {parseEventOverlap(events).map((event, i) => {
      const startDurationMinutes =
        (event.start.hour() - minHour) * 60 + event.start.minutes();
      const timeDiffMinutes = moment
        .duration(event.start.diff(event.end))
        .asMinutes();
      const color = event.section.includes(LEC)
        ? LEC
        : event.section.includes(LAB)
        ? LAB
        : TUT;

      return (
        <EventWrapper
          top={HOUR_HEIGHT * (Math.abs(startDurationMinutes) / 60)}
          height={HOUR_HEIGHT * (Math.abs(timeDiffMinutes) / 60)}
          color={color}
          key={i}
          truncate={event.truncate}
        >
          <CourseCode to={getCoursePageRoute(event.courseCode)}>
            {formatCourseCode(event.courseCode)}
          </CourseCode>
          {event.section.includes('Exam') && <br />}
          {!event.section.includes('Exam') && ' - '}
          {event.section}
          <br />
          {event.start.format('h:mma')} - {event.end.format('h:mma')}
          <br />
          {event.location}
        </EventWrapper>
      );
    })}
  </DayColumn>
);

type CalendarProps = {
  eventsByDate: EventsByDate;
  initialStartDate: Moment;
};

const Calendar = ({ eventsByDate, initialStartDate }: CalendarProps) => {
  const nearestMonday = initialStartDate;
  const [currentWeek, setCurrentWeek] = useState(nearestMonday);
  const fridayOfWeek = currentWeek.clone().add(4, 'days');
  const saturdayOfWeek = currentWeek.clone().add(5, 'days');

  // get events for every day of week
  const currentWeekEvents: EventsByDate = {};
  for (let i = 0; i < 6; i += 1) {
    const curDate = currentWeek.clone().add(i, 'days').format('YYYY-MM-DD');
    currentWeekEvents[curDate] = eventsByDate[curDate];
  }

  // get dynamic time range to display
  let minHour = 9;
  let maxHour = 17;
  let totalMinutes = 0;

  Object.values(currentWeekEvents).forEach((events) => {
    if (events !== undefined) {
      events.forEach((event) => {
        if (event.start.hour() <= minHour) {
          minHour = event.start.hour();
          if (event.start.minutes() === 0) {
            minHour -= 1;
          }
        }

        if (event.end.hour() >= maxHour) {
          maxHour = event.end.hour();
          // minutes might be in the middle of the hour
          if (event.end.minutes() > 0) {
            maxHour += 1;
          }
        }

        // add to totalMinutes (this does not account for time conflicts)
        totalMinutes += Math.abs(
          moment.duration(event.start.diff(event.end)).asMinutes(),
        );
      });
    }
  });

  const hoursToDisplay = () => {
    const hours = [];
    for (let i = minHour; i <= maxHour; i += 1) {
      if (i === 0) {
        hours.push('12 am');
      } else if (i === 12) {
        hours.push('12 pm');
      } else {
        hours.push(i < 12 ? `${i} am` : `${i - 12} pm`);
      }
    }
    return hours;
  };

  const includeSaturday =
    currentWeekEvents[saturdayOfWeek.format('YYYY-MM-DD')] === undefined;
  const daysToDisplay = () => {
    const days = [];
    // display saturday if there is an event
    const numDays = includeSaturday ? 5 : 6;
    for (let i = 0; i < numDays; i += 1) {
      days.push(currentWeek.clone().add(i, 'days'));
    }
    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarNavWrapper>
        <DateHoursWrapper>
          <DateRangeText>
            {getDateRangeString(
              currentWeek,
              includeSaturday ? saturdayOfWeek : fridayOfWeek,
            )}
          </DateRangeText>
          <TotalHours>
            ({Math.round((2 * totalMinutes) / 60) / 2} hours this week)
          </TotalHours>
        </DateHoursWrapper>
        <NavButtonWrapper>
          <NavButton
            hideSmall={true}
            onClick={() => setCurrentWeek(nearestMonday)}
            onMouseDown={(e) => e.preventDefault()}
          >
            Current Week
          </NavButton>
          <NavButton
            onClick={() =>
              setCurrentWeek(currentWeek.clone().subtract(7, 'days'))
            }
            onMouseDown={(e) => e.preventDefault()}
          >
            <ChevronLeft />
          </NavButton>
          <NavButton
            onClick={() => setCurrentWeek(currentWeek.clone().add(7, 'days'))}
            onMouseDown={(e) => e.preventDefault()}
          >
            <ChevronRight />
          </NavButton>
        </NavButtonWrapper>
      </CalendarNavWrapper>
      <CalendarContentWrapper>
        <CalendarHeader />
        <div>
          {hoursToDisplay().map((hour) => (
            <HourRow key={hour}>
              <HourText>{hour}</HourText>
            </HourRow>
          ))}
        </div>
        <CalendarEvents>
          {daysToDisplay().map((day, i) => (
            <CalendarColumn
              key={i}
              day={day}
              minHour={minHour}
              events={currentWeekEvents[day.format('YYYY-MM-DD')] || []}
            />
          ))}
        </CalendarEvents>
      </CalendarContentWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
