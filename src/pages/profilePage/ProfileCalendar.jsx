import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles/calendar.css';

/* Child Components */
import Button from '../../components/input/Button';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ProfileCalendarImg,
  ProfileCalendarEventWrapper,
  TimeText,
  LocationText,
  CourseText,
  SectionText,
  EventCourseSectionWrapper
} from './styles/ProfileCalendar';

/* Utils */
import { getMomentFromDateAndSecs, splitCourseCode } from '../../utils/Misc';

// start and end inclusive
export const getMomentsForWeekdaysWithinRange = (start, end, dayOfWeek) => {
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

const EventSection = ({ start, end, value }) => (
  <ProfileCalendarEventWrapper>
    <EventCourseSectionWrapper>
      <CourseText>{splitCourseCode(value.course.code)}</CourseText>
      {' '}-{' '}
      <SectionText>{value.section}</SectionText>
    </EventCourseSectionWrapper>
    <TimeText>
      {`${start.format('LT')} - ${end.format('LT')}`}
    </TimeText>
    <LocationText>{value.location}</LocationText>
  </ProfileCalendarEventWrapper>
);

EventSection.propTypes = {
  start: PropTypes.object.isRequired, //moment object
  end: PropTypes.object, //moment object
  value: PropTypes.shape({
    location: PropTypes.string,
    course: PropTypes.shape({
      code: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    sectionName: PropTypes.string,
  }),
};

const getIntervalsForWeek = (startDate, calendarDayRange, schedule) =>
  schedule.reduce((allIntv, curr) => {
    const section = curr.section;
    section.exams.forEach(exam => {
      allIntv.push({
        start: getMomentFromDateAndSecs(exam.date, exam.start_seconds).toDate(),
        end: getMomentFromDateAndSecs(exam.date, exam.end_seconds).toDate(),
        title: section.course.code,
        value: {
          location: exam.location,
          course: section.course,
          sectionName: `${section.section_name} exam`,
        },
      });
    });
    section.meetings.forEach(meeting => {
      const meetingStart = moment(meeting.start_date);
      const meetingEnd = moment(meeting.end_date);
      meeting.days.forEach(day => {
        const momentsOfWeekForDay = getMomentsForWeekdaysWithinRange(
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
              title: section.course.code,
              value: {
                location: meeting.location,
                course: section.course,
                sectionName: section.section_name,
              },
            });
          }
        });
      });
    });
    return allIntv;
  }, []);

const ProfileCalendar = ({ schedule, theme }) => {
  // start of current week
  const currentDay = moment(moment().startOf('isoWeek').toDate());

  if (schedule.length === 0) {
  } else {
    return (
      <ProfileCalendarWrapper>
        <Calendar
          views={[Views.WEEK]}
          defaultView={Views.WEEK}
          step={30}
          min={new Date(0, 0, 0, 8)} // minimum hour displayed
          max={new Date(0, 0, 0, 22)} // maximum hour displayed
          events={getIntervalsForWeek(currentDay, 365, schedule)} // TODO build all events
          localizer={momentLocalizer(moment)}
        />
      </ProfileCalendarWrapper>
    );
  }
  return (
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
  );
};

ProfileCalendar.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfileCalendar);
