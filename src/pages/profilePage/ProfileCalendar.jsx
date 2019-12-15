import React, { useState } from 'react';
import moment from 'moment';

/* Child Components */
import Button from '../../components/input/Button';
import Calendar from './Calendar';
import ScheduleUploadModal from '../../components/dataUploadModals/ScheduleUploadModal';

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
      const meetingDate = new Date(meeting.start_date);
      if (meetingDate < minTime) {
        minTime = meetingDate;
      } else if (meetingDate > maxTime) {
        maxTime = meetingDate;
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
  var currentMoment = start.clone();
  var daysToReturn = [];
  while (currentMoment.isSameOrBefore(end)) {
    if (weekDayLetters[currentMoment.weekday()] === dayOfWeek) {
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

const ProfileCalendar = ({ schedule }) => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const ScheduleModal = (
    <ScheduleUploadModal
      isModalOpen={scheduleModalOpen}
      onCloseModal={() => setScheduleModalOpen(false)}
    />
  );

  const ScheduleModalButton = (
    <Button
      handleClick={() => setScheduleModalOpen(true)}
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
        {ScheduleModal}
      </ProfileCalendarWrapper>
    );

  const [minDate, dayRange] = getScheduleRange(schedule);
  const events = getEventIntervals(moment(minDate), dayRange, schedule);
  const eventsByDate = getEventsByDate(events);
  return (
    <CalendarWithButtonsWrapper>
      <ExportCalendarWrapper>
        <ExportCalendarText>Export your calendar</ExportCalendarText>
        <Button padding="0 32px" maxHeight="48px">
          Export
        </Button>
      </ExportCalendarWrapper>
      <Calendar eventsByDate={eventsByDate} />
      <RecentCalendarWrapper>
        <RecentCalendarText>Have a more recent schedule?</RecentCalendarText>
        <ButtonWrapper>{ScheduleModalButton}</ButtonWrapper>
      </RecentCalendarWrapper>
      {ScheduleModal}
    </CalendarWithButtonsWrapper>
  );
};

export default ProfileCalendar;
