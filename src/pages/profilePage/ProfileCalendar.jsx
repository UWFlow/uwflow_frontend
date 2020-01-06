import React from 'react';
import moment from 'moment';
import { withTheme } from 'styled-components';

/* Child Components */
import Button from '../../components/input/Button';
import Calendar from './Calendar';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ExportCalendarWrapper,
  RecentCalendarWrapper,
  RecentCalendarText,
  CalendarWithButtonsWrapper,
  ExportCalendarText,
  ButtonWrapper,
} from './styles/ProfileCalendar';

/* Utils */
import {
  getDateWithSeconds,
  millisecondsPerDay,
  weekDayLetters,
} from '../../utils/Misc';
import withModal from '../../components/modal/withModal';

/* Constants */
import {
  CALENDAR_EXPORT_ENDPOINT,
  BACKEND_ENDPOINT,
  GOOGLE_CALENDAR_URL,
} from '../../constants/Api';
import DropdownList from '../../components/input/DropdownList';
import { SCHEDULE_UPLOAD_MODAL } from '../../constants/Modal';

const getScheduleRange = schedule => {
  let minTime = new Date();
  let maxTime = new Date();

  schedule.forEach(curr => {
    const section = curr.section;
    section.exams.forEach(exam => {
      const examDate = new Date(exam.date);
      if (examDate < minTime) {
        minTime = examDate;
      } else if (examDate > maxTime) {
        maxTime = examDate;
      }
    });

    section.meetings.forEach(meeting => {
      const meetingStart = new Date(meeting.start_date);
      const meetingEnd = new Date(meeting.end_date);
      if (meetingStart < minTime) {
        minTime = meetingStart;
      } else if (meetingEnd > maxTime) {
        maxTime = meetingEnd;
      }
    });
  });

  // increase date range to be safe
  minTime.setDate(minTime.getDate() - 1);
  maxTime.setDate(maxTime.getDate() + 1);

  // time for one day from milliseconds
  const dayRange =
    Math.round(maxTime.getTime() - minTime.getTime()) / millisecondsPerDay;
  return [minTime, dayRange];
};

// start and end inclusive
const getMomentsWithinRange = (start, end, dayOfWeek) => {
  let currentMoment = start.clone();
  let daysToReturn = [];
  while (currentMoment.isSameOrBefore(end)) {
    if (weekDayLetters[currentMoment.weekday() - 1] === dayOfWeek) {
      daysToReturn.push(currentMoment.clone().startOf('day'));
    }
    currentMoment.add(1, 'day');
  }
  return daysToReturn;
};

const getEventIntervals = (startDate, calendarDayRange, schedule) =>
  schedule.reduce((allIntv, curr) => {
    const section = curr.section;
    section.exams.forEach(exam => {
      allIntv.push({
        start: getDateWithSeconds(exam.date, exam.start_seconds),
        end: getDateWithSeconds(exam.date, exam.end_seconds),
        courseCode: section.course.code,
        location: exam.location,
        section: `${section.section_name} (Exam)`,
      });
    });

    section.meetings.forEach(meeting => {
      const meetingStart = moment(meeting.start_date);
      const meetingEnd = moment(meeting.end_date);
      meeting.days.forEach(day => {
        const momentsOfWeekForDay = getMomentsWithinRange(
          startDate.clone(),
          startDate.clone().add(calendarDayRange, 'days'),
          day,
        );
        momentsOfWeekForDay.forEach(momentOfWeekForDay => {
          if (
            momentOfWeekForDay.isSameOrAfter(meetingStart, 'days') &&
            momentOfWeekForDay.isSameOrBefore(meetingEnd, 'days')
          ) {
            allIntv.push({
              start: momentOfWeekForDay
                .clone()
                .add(meeting.start_seconds, 'seconds'),
              end: momentOfWeekForDay
                .clone()
                .add(meeting.end_seconds, 'seconds'),
              courseCode: section.course.code,
              location: meeting.location,
              section: section.section_name,
            });
          }
        });
      });
    });
    return allIntv;
  }, []);

const getEventsByDate = events => {
  let eventsByDate = {};
  events.forEach(event => {
    const dateString = event.start.format('YYYY-MM-DD');
    if (!eventsByDate[dateString]) {
      eventsByDate[dateString] = [event];
    } else {
      eventsByDate[dateString].push(event);
    }
  });
  return eventsByDate;
};

const getInitialMonday = eventsByDate => {
  const currentDate = moment();
  const dates = Object.keys(eventsByDate).sort((a, b) =>
    moment(a, 'YYYY-MM-DD').isBefore(moment(b, 'YYYY-MM-DD')) ? -1 : 1,
  );
  const currentWeekMonday = currentDate.startOf('isoWeek');
  if (dates.length === 0) {
    return currentWeekMonday;
  }
  const scheduleFirstDay = moment(dates[0], 'YYYY-MM-DD');
  if (currentDate.isBefore(scheduleFirstDay)) {
    return scheduleFirstDay.startOf('isoWeek');
  } else {
    return currentWeekMonday;
  }
};

const ProfileCalendar = ({
  schedule,
  secretID,
  theme,
  refetchAll,
  openModal,
  closeModal,
}) => {
  const handleCalendarExport = async download => {
    const response = await fetch(
      `${BACKEND_ENDPOINT}${CALENDAR_EXPORT_ENDPOINT(secretID)}`,
    );
    if (download) {
      window.location.assign(response.url);
    } else {
      // replace https:// with webcal://
      const calendarUrl = response.url.replace(/^https:\/\//, 'webcal://');
      window.open(`${GOOGLE_CALENDAR_URL}${calendarUrl}`, '_blank');
    }
  };

  const scheduleModalProps = {
    onSkip: () => closeModal(SCHEDULE_UPLOAD_MODAL),
    onAfterUploadSuccess: refetchAll,
  };

  const ScheduleModalButton = (
    <Button
      handleClick={() => openModal(SCHEDULE_UPLOAD_MODAL, scheduleModalProps)}
      margin="0"
      padding="8px 24px"
      maxHeight="48px"
      hasShadow={false}
      width="100%"
    >
      Add current / upcoming term
    </Button>
  );

  if (!schedule || schedule.length === 0)
    return (
      <ProfileCalendarWrapper>
        <ProfileCalendarHeading>
          Import your class schedule
        </ProfileCalendarHeading>
        <ProfileCalendarText>
          To export it to Google Calendar, Calendar.app, etc...
        </ProfileCalendarText>
        {ScheduleModalButton}
      </ProfileCalendarWrapper>
    );

  const [minDate, dayRange] = getScheduleRange(schedule);
  const events = getEventIntervals(moment(minDate), dayRange, schedule);
  const eventsByDate = getEventsByDate(events);
  const initialStartDate = getInitialMonday(eventsByDate);

  return (
    <CalendarWithButtonsWrapper>
      <ExportCalendarWrapper>
        <ExportCalendarText>Export your calendar</ExportCalendarText>
        <DropdownList
          selectedIndex={-1}
          options={['Google', 'iCalendar']}
          margin="auto 0"
          onChange={value => {
            if (value === 0) {
              handleCalendarExport(false);
            } else {
              handleCalendarExport(true);
            }
          }}
          color={theme.primary}
          placeholder="Export as"
        />
      </ExportCalendarWrapper>
      <Calendar
        eventsByDate={eventsByDate}
        initialStartDate={initialStartDate}
      />
      <RecentCalendarWrapper>
        <RecentCalendarText>Have a more recent schedule?</RecentCalendarText>
        <ButtonWrapper>{ScheduleModalButton}</ButtonWrapper>
      </RecentCalendarWrapper>
    </CalendarWithButtonsWrapper>
  );
};

export default withModal(withTheme(ProfileCalendar));
