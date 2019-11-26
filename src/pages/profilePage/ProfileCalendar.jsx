import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import moment from 'moment';
import 'react-week-calendar/dist/style.css';

/* Child Components */
import Button from '../../components/input/Button';
import WeekCalendar from 'react-week-calendar';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ProfileCalendarImg,
  ProfileCalendarEventWrapper,
  EventTimeWrapper,
  EventLocationWrapper,
  EventCourseWrapper,
  EventSectionWrapper,
} from './styles/ProfileCalendar';

/* Utils */
import { getMomentFromDateAndSecs } from '../../utils/Misc';

// start and end inclusive
export const getMomentsForWeekdaysWithinRange = (start, end, dayOfWeek) => {
  const legalDays = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
  var currentMoment = start.clone();
  var daysToReturn = [];
  // console.log(`Finding: ${dayOfWeek} between ${start} and ${end}`);
  while (currentMoment.isSameOrBefore(end)) {
    // console.log(`  ${currentMoment} is ${legalDays[currentMoment.weekday()]}`);
    if (legalDays[currentMoment.weekday()] === dayOfWeek) {
      daysToReturn.push(currentMoment.clone().startOf('day'));
    }
    currentMoment.add(1, 'day');
  }
  return daysToReturn;
};

const EventSection = ({ start, end, value }) => (
  <ProfileCalendarEventWrapper>
    <EventCourseWrapper>{value.course.code}</EventCourseWrapper>
    <EventSectionWrapper>{value.section}</EventSectionWrapper>
    <EventTimeWrapper>{`${start.format('LT')} - ${end.format(
      'LT',
    )}`}</EventTimeWrapper>
    <EventLocationWrapper>{value.location}</EventLocationWrapper>
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
    section: PropTypes.string,
  }),
};

const getIntervalsForWeek = (startDate, calendarDayRange, schedule) =>
  schedule.reduce((allIntv, curr) => {
    const section = curr.section;
    section.exams.forEach(exam => {
      allIntv.push({
        start: getMomentFromDateAndSecs(exam.date, exam.start_seconds),
        end: getMomentFromDateAndSecs(exam.date, exam.end_seconds),
        value: {
          location: exam.location,
          course: section.course,
          section: `${section.section} exam`,
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
                .add(meeting.start_seconds, 'seconds'),
              end: momentOfWeekForDay
                .clone()
                .add(meeting.end_seconds, 'seconds'),
              value: {
                location: meeting.location,
                course: section.course,
                section: section.section,
              },
            });
          }
        });
      });
    });
    return allIntv;
  }, []);

const ProfileCalendar = ({ schedule, theme }) => {
  console.log(schedule);
  const intv = getIntervalsForWeek(moment(), 5, schedule);
  // const intv = [];
  console.log(intv);
  if (schedule.length === 0) {
  } else {
    return (
      <WeekCalendar
        numberOfDays={5}
        selectedIntervals={intv}
        eventComponent={EventSection}
        startTime={moment()
          .startOf('day')
          .add(7, 'hours')}
        dayFormat="dd. DD/MM"
      />
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
