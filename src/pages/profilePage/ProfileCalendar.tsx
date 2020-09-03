import React from 'react';
import { ApolloQueryResult } from 'apollo-client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';
import moment, { Moment } from 'moment/moment';
import { useTheme } from 'styled-components';

import Button from 'components/input/Button';
import DropdownList from 'components/input/DropdownList';
import {
  BACKEND_ENDPOINT,
  CALENDAR_EXPORT_ENDPOINT,
  GOOGLE_CALENDAR_URL,
} from 'constants/Api';
import { SCHEDULE_UPLOAD_MODAL } from 'constants/Modal';
import useModal from 'hooks/useModal';
import { EventsByDate, ScheduleInterval } from 'types/Common';
import {
  getDateWithSeconds,
  millisecondsPerDay,
  weekDayLetters,
} from 'utils/Misc';
import { randString } from 'utils/Random';

import {
  ButtonWrapper,
  CalendarWithButtonsWrapper,
  ExportCalendarText,
  ExportCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ProfileCalendarWrapper,
  RecentCalendarText,
  RecentCalendarWrapper,
} from './styles/ProfileCalendar';
import Calendar from './Calendar';

const getScheduleRange = (
  schedule: UserScheduleFragment['schedule'],
): [Date, number] => {
  let minTime = new Date();
  let maxTime = new Date();

  schedule.forEach((curr) => {
    const { section } = curr;
    section.exams.forEach((exam) => {
      const examDate = new Date(exam.date);
      if (examDate < minTime) {
        minTime = examDate;
      } else if (examDate > maxTime) {
        maxTime = examDate;
      }
    });

    section.meetings.forEach((meeting) => {
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
const getMomentsWithinRange = (
  start: Moment,
  end: Moment,
  dayOfWeek: string,
) => {
  const currentMoment = start.clone();
  const daysToReturn = [];
  while (currentMoment.isSameOrBefore(end)) {
    if (weekDayLetters[currentMoment.weekday() - 1] === dayOfWeek) {
      daysToReturn.push(currentMoment.clone().startOf('day'));
    }
    currentMoment.add(1, 'day');
  }
  return daysToReturn;
};

const getEventIntervals = (
  startDate: Moment,
  calendarDayRange: number,
  schedule: UserScheduleFragment['schedule'],
) =>
  schedule.reduce((allIntv: ScheduleInterval[], curr) => {
    const { section } = curr;
    section.exams.forEach((exam) => {
      allIntv.push({
        start: getDateWithSeconds(exam.date, exam.start_seconds),
        end: getDateWithSeconds(exam.date, exam.end_seconds),
        courseCode: section.course.code,
        location: exam.location,
        section: `${section.section_name} (Exam)`,
      });
    });

    section.meetings.forEach((meeting) => {
      const meetingStart = moment(meeting.start_date);
      const meetingEnd = moment(meeting.end_date);

      meeting.days.forEach((day: string) => {
        const momentsOfWeekForDay = getMomentsWithinRange(
          startDate.clone(),
          startDate.clone().add(calendarDayRange, 'days'),
          day,
        );
        momentsOfWeekForDay.forEach((momentOfWeekForDay) => {
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

const getEventsByDate = (events: ScheduleInterval[]) => {
  const eventsByDate: EventsByDate = {};
  events.forEach((event) => {
    const dateString = event.start.format('YYYY-MM-DD');
    if (!eventsByDate[dateString]) {
      eventsByDate[dateString] = [event];
    } else {
      eventsByDate[dateString].push(event);
    }
  });
  return eventsByDate;
};

const getInitialMonday = (eventsByDate: EventsByDate) => {
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
  }
  return currentWeekMonday;
};

type ProfileCalendarProps = {
  schedule: UserScheduleFragment['schedule'];
  secretId: string;
  refetchAll: (
    variables: GetUserQueryVariables,
  ) => Promise<ApolloQueryResult<GetUserQuery>>;
};

const ProfileCalendar = ({
  schedule,
  secretId,
  refetchAll,
}: ProfileCalendarProps) => {
  const [openModal, closeModal] = useModal();
  const theme = useTheme();

  const handleCalendarExport = async (download: boolean) => {
    const response = await fetch(
      `${BACKEND_ENDPOINT}${CALENDAR_EXPORT_ENDPOINT(secretId)}`,
    );
    if (download) {
      window.location.assign(response.url);
    } else {
      // Replace https:// with webcal:// and append random query
      // parameter to avoid cache issues with Google Calendar
      const calendarUrl = response.url
        .replace(/^https:\/\//, 'webcal://')
        .concat(`?noCache=${randString()}`);
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
          onChange={(value) => {
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

export default ProfileCalendar;
