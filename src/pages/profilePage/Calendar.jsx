import React, { useState } from 'react';
import moment from 'moment';

/* Styled components */
import {
  CalendarWrapper,
  CalendarNavWrapper,
  DateRangeText,
  NavButtonWrapper,
  CurrentWeekButton,
  PrevWeekButton,
  NextWeekButton,
  CalendarContentWrapper,
  CalendarHeader,
  HourRow,
  HourText,
  CalendarEvents,
  DayColumn,
  DayHeader,
} from './styles/Calendar';

const getDateRangeString = (start, end) => {
  if (start.year() !== end.year()) {
    return `${start.format('MMM Do, YYYY')} - ${end.format('MMM Do, YYYY')}`;
  } else if (start.month() !== end.month()) {
    return `${start.format('MMM Do')} - ${end.format('MMM Do, YYYY')}`;
  } else {
    return `${start.format('MMM Do')} - ${end.format('Do, YYYY')}`;
  }
};

const CalendarColumn = ({ day }) => (
  <DayColumn>
    <DayHeader>{day.format('ddd MMM D')}</DayHeader>
  </DayColumn>
);

const Calendar = ({ events }) => {
  const nearestMonday = moment().startOf('isoWeek');
  const [currentWeek, setCurrentWeek] = useState(nearestMonday);
  const lastDayOfWeek = currentWeek.clone().add(5, 'days'); // saturday

  const hoursToDisplay = () => {
    let hours = [];
    let minHour = 8;
    let maxHour = 18;
    for (let i = minHour; i <= maxHour; i++) {
      hours.push(i < 13 ? `${i} am` : `${i - 12} pm`);
    }
    return hours;
  };

  const daysToDisplay = () => {
    let days = [];
    for (let i = 0; i < 6; i++) {
      days.push(currentWeek.clone().add(i, 'days'));
    }
    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarNavWrapper>
        <DateRangeText>
          {getDateRangeString(currentWeek, lastDayOfWeek)}
        </DateRangeText>
        <NavButtonWrapper>
          <CurrentWeekButton onClick={() => setCurrentWeek(nearestMonday)}>
            Current Week
          </CurrentWeekButton>
          <PrevWeekButton
            onClick={() =>
              setCurrentWeek(currentWeek.clone().subtract(7, 'days'))
            }
          >
            {'<'}
          </PrevWeekButton>
          <NextWeekButton
            onClick={() => setCurrentWeek(currentWeek.clone().add(7, 'days'))}
          >
            {'>'}
          </NextWeekButton>
        </NavButtonWrapper>
      </CalendarNavWrapper>
      <CalendarContentWrapper>
        <CalendarHeader />
        <div>
          {hoursToDisplay().map(hour => (
            <HourRow>
              <HourText>{hour}</HourText>
            </HourRow>
          ))}
        </div>
        <CalendarEvents>
          {daysToDisplay().map(day => (
            <CalendarColumn day={day} />
          ))}
        </CalendarEvents>
      </CalendarContentWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
