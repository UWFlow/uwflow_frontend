import React, { useState } from 'react';
import moment from 'moment';
import { withTheme } from 'styled-components';

/* Styled components */
import {
  CalendarWrapper,
  CalendarNavWrapper,
  DateRangeText,
  NavButtonWrapper,
  NavButton,
  CalendarContentWrapper,
  CalendarHeader,
  HourRow,
  HourText,
  CalendarEvents,
  DayColumn,
  DayHeader,
  EventWrapper,
  HOUR_HEIGHT,
} from './styles/Calendar';

import { splitCourseCode } from '../../utils/Misc';

const getDateRangeString = (start, end) => {
  if (start.year() !== end.year()) {
    return `${start.format('MMM Do, YYYY')} - ${end.format('MMM Do, YYYY')}`;
  } else if (start.month() !== end.month()) {
    return `${start.format('MMM Do')} - ${end.format('MMM Do, YYYY')}`;
  } else {
    return `${start.format('MMM Do')} - ${end.format('Do, YYYY')}`;
  }
};

const CalendarColumn = withTheme(({ theme, day, minHour, events = [] }) => (
  <DayColumn>
    <DayHeader>{day.format('ddd MMM D')}</DayHeader>
    {events.map((event, i) => {
      const startDurationMinutes =
        (event.start.hour() - minHour) * 60 + event.start.minutes();
      const timeDiffMinutes = moment
        .duration(event.start.diff(event.end))
        .asMinutes();
      return (
        <EventWrapper
          top={HOUR_HEIGHT * (Math.abs(startDurationMinutes) / 60)}
          height={HOUR_HEIGHT * (Math.abs(timeDiffMinutes) / 60)}
          color={theme.light1}
          key={i}
        >
          {splitCourseCode(event.courseCode)} - {event.section}
        </EventWrapper>
      );
    })}
  </DayColumn>
));

const Calendar = ({ eventsByDate }) => {
  const nearestMonday = moment().startOf('isoWeek');
  const [currentWeek, setCurrentWeek] = useState(nearestMonday);
  const fridayOfWeek = currentWeek.clone().add(4, 'days');
  const saturdayOfWeek = currentWeek.clone().add(5, 'days');

  // get events for every day of week
  let currentWeekEvents = {};
  for (let i = 0; i < 6; i++) {
    const curDate = currentWeek
      .clone()
      .add(i, 'days')
      .format('YYYY-MM-DD');
    currentWeekEvents[curDate] = eventsByDate[curDate];
  }

  // get dynamic time range to display
  let minHour = 8;
  let maxHour = 17;
  Object.values(currentWeekEvents).forEach(events => {
    if (events !== undefined) {
      events.forEach(event => {
        if (event.start.hour() < minHour) {
          minHour = Math.floor(event.start.hour());
        }
        if (event.end.hour() >= maxHour) {
          maxHour = event.end.hour();
          // minutes might be in the middle of the hour
          if (event.end.minutes() > 0) {
            maxHour += 1;
          }
        }
      });
    }
  });

  const hoursToDisplay = () => {
    let hours = [];
    for (let i = minHour; i <= maxHour; i++) {
      hours.push(i < 13 ? `${i} am` : `${i - 12} pm`);
    }
    return hours;
  };

  const includeSaturday =
    currentWeekEvents[saturdayOfWeek.format('YYYY-MM-DD')] === undefined;
  const daysToDisplay = () => {
    let days = [];
    // display saturday if there is an event
    let numDays = includeSaturday ? 5 : 6;
    for (let i = 0; i < numDays; i++) {
      days.push(currentWeek.clone().add(i, 'days'));
    }
    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarNavWrapper>
        <DateRangeText>
          {getDateRangeString(
            currentWeek,
            includeSaturday ? saturdayOfWeek : fridayOfWeek,
          )}
        </DateRangeText>
        <NavButtonWrapper>
          <NavButton onClick={() => setCurrentWeek(nearestMonday)}>
            Current Week
          </NavButton>
          <NavButton
            onClick={() =>
              setCurrentWeek(currentWeek.clone().subtract(7, 'days'))
            }
          >
            {'<'}
          </NavButton>
          <NavButton
            onClick={() => setCurrentWeek(currentWeek.clone().add(7, 'days'))}
          >
            {'>'}
          </NavButton>
        </NavButtonWrapper>
      </CalendarNavWrapper>
      <CalendarContentWrapper>
        <CalendarHeader />
        <div>
          {hoursToDisplay().map(hour => (
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
