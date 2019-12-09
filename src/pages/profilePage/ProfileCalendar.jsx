import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import './styles/calendar.css';

/* Child Components */
import Button from '../../components/input/Button';
import Tooltip from '../../components/input/Tooltip';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ProfileCalendarImg,
  ProfileCalendarEventWrapper,
  LocationText,
  CourseText,
  SectionText,
  EventCourseSectionWrapper
} from './styles/ProfileCalendar';

/* Utils */
import { getDateWithSeconds, splitCourseCode, millisecondsPerDay } from '../../utils/Misc';
import { getCoursePageRoute } from '../../Routes';

// set first day of week to Monday
moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
});

const getCoursePageLink = rawCourseCode => {
  let courseCode = rawCourseCode.replace(/ /g, '').toLowerCase()
  courseCode = courseCode.substr(-1) == 'e' ? courseCode.substr(0, courseCode.length-1) : courseCode;
  return getCoursePageRoute(courseCode);
};

const EventSection = ({ event }) => (
  <ProfileCalendarEventWrapper
    data-tip={`<div align='center'><b>${event.courseCode}</b> - ${event.section}<br/><br/>@ ${event.location}</div>`}
  >
    <Tooltip />
    <EventCourseSectionWrapper>
      <CourseText to={getCoursePageLink(event.courseCode)}>
        {splitCourseCode(event.courseCode)}
      </CourseText>
      {' '}-{' '}
      <SectionText>{event.section}</SectionText>
    </EventCourseSectionWrapper>
    <LocationText>{event.location}</LocationText>
  </ProfileCalendarEventWrapper>
);

const getScheduleRange = (schedule) => {
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
  const dayRange = Math.round(maxTime.getTime() - minTime.getTime()) / millisecondsPerDay;  
  return [minTime, dayRange];
}

// start and end inclusive
const getMomentsWithinRange = (start, end, dayOfWeek) => {
  const legalDays = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
  var currentMoment = start.clone();
  var daysToReturn = [];
  while (currentMoment.isSameOrBefore(end)) {
    if (legalDays[currentMoment.weekday()] === dayOfWeek) {
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
        courseCode: splitCourseCode(section.course.code),
        location: exam.location,
        section: `${section.section} exam`,
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
                .add(meeting.start_seconds, 'seconds')
                .toDate(),
              end: momentOfWeekForDay
                .clone()
                .add(meeting.end_seconds, 'seconds')
                .toDate(),
              courseCode: splitCourseCode(section.course.code),
              location: meeting.location,
              section: section.section,
            });
          }
        });
      });
    });
    return allIntv;
  }, []);

const ProfileCalendar = ({ schedule, theme }) => {
  const [minDate, dayRange] = getScheduleRange(schedule);

  return (!schedule || schedule.length === 0) ? (
    <ProfileCalendarWrapper>
      <ProfileCalendarHeading>
        Import your class schedule
      </ProfileCalendarHeading>
      <ProfileCalendarText>
        To print, share, or export it to Google Calendar, Calendar.app, etc...
        It looks like:
      </ProfileCalendarText>
      <ProfileCalendarImg>
        <Button
          onClick={() => {}}
          margin="auto"
          borderColor={theme.dark3}
          hasShadow={false}
        >
          Import your schedule from Quest
        </Button>
      </ProfileCalendarImg>
    </ProfileCalendarWrapper>
  ) : (
    <ProfileCalendarWrapper>
      <Calendar
        views={[Views.WEEK]}
        defaultView={Views.WEEK}
        step={15}
        min={new Date(0, 0, 0, 8)} // minimum hour displayed
        max={new Date(0, 0, 0, 22)} // maximum hour displayed
        events={getEventIntervals(moment(minDate), dayRange, schedule)}
        localizer={momentLocalizer(moment)}
        components={{
          event: EventSection,
        }}
      />
    </ProfileCalendarWrapper>
  );
};

ProfileCalendar.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfileCalendar);
