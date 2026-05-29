import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import { ApolloQueryResult } from 'apollo-client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';
import moment, { Moment } from 'moment/moment';
import { getCoursePageRoute } from 'Routes';
import { useTheme } from 'styled-components';

import { Calendar, CalendarEvent } from 'components/calendar';
import DropdownList from 'components/input/DropdownList';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import {
  BACKEND_ENDPOINT,
  CALENDAR_EXPORT_ENDPOINT,
  GOOGLE_CALENDAR_URL,
} from 'constants/Api';
import { LAB, LEC } from 'constants/CourseSection';
import { SCHEDULE_UPLOAD_MODAL } from 'constants/Modal';
import useModal from 'hooks/useModal';
import { EventsByDate, ScheduleInterval } from 'types/Common';
import {
  formatCourseCode,
  getDateWithSeconds,
  millisecondsPerDay,
  weekDayLetters,
} from 'utils/Misc';
import { randString } from 'utils/Random';

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

const getDateRangeString = (start: Moment, end: Moment) => {
  if (start.year() !== end.year()) {
    return `${start.format('MMM Do, YYYY')} - ${end.format('MMM Do, YYYY')}`;
  }
  if (start.month() !== end.month()) {
    return `${start.format('MMM Do')} - ${end.format('MMM Do, YYYY')}`;
  }
  return `${start.format('MMM Do')} - ${end.format('Do, YYYY')}`;
};

const sectionVariant = (section: string): CalendarEvent['variant'] => {
  if (section.includes(LEC)) return 'lecture';
  if (section.includes(LAB)) return 'lab';
  return 'tutorial';
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

  const hasSchedule = Boolean(schedule && schedule.length);

  const eventsByDate = React.useMemo(() => {
    if (!hasSchedule) return {} as EventsByDate;
    const [minDate, dayRange] = getScheduleRange(schedule);
    return getEventsByDate(
      getEventIntervals(moment(minDate), dayRange, schedule),
    );
  }, [schedule, hasSchedule]);

  const initialMonday = React.useMemo(() => getInitialMonday(eventsByDate), [
    eventsByDate,
  ]);
  const [weekStart, setWeekStart] = useState<Moment>(initialMonday);

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

  const openScheduleModal = () =>
    openModal(SCHEDULE_UPLOAD_MODAL, scheduleModalProps);

  if (!hasSchedule) {
    return (
      <Card className="mb-8 p-6">
        <div className="mb-4 text-2xl font-semibold text-[#172b4d]">
          Import your class schedule
        </div>
        <div className="mb-8 text-xl font-light text-[#505f79]">
          To export it to Google Calendar, Calendar.app, etc...
        </div>
        <Button className="w-full" onClick={openScheduleModal}>
          Add current / upcoming term
        </Button>
      </Card>
    );
  }

  // Show Saturday only when something is scheduled on it.
  const saturday = weekStart.clone().add(5, 'days');
  const numDays =
    eventsByDate[saturday.format('YYYY-MM-DD')] === undefined ? 5 : 6;
  const days = Array.from({ length: numDays }, (_, i) =>
    weekStart.clone().add(i, 'days'),
  );

  // Dynamic vertical bounds: default to a 9am–5pm window, then widen to fit.
  let minHour = 9;
  let maxHour = 17;
  let totalMinutes = 0;
  const calendarEvents: CalendarEvent[] = [];

  days.forEach((day, dayIndex) => {
    const intervals = eventsByDate[day.format('YYYY-MM-DD')] ?? [];
    intervals.forEach((event, i) => {
      if (event.start.hour() <= minHour) {
        minHour = event.start.hour();
        if (event.start.minutes() === 0) minHour -= 1;
      }
      if (event.end.hour() >= maxHour) {
        maxHour = event.end.hour();
        if (event.end.minutes() > 0) maxHour += 1;
      }
      totalMinutes += Math.abs(
        moment.duration(event.start.diff(event.end)).asMinutes(),
      );

      calendarEvents.push({
        id: `${day.format('YYYY-MM-DD')}-${i}`,
        dayIndex,
        startMinutes: event.start.hour() * 60 + event.start.minutes(),
        endMinutes: event.end.hour() * 60 + event.end.minutes(),
        variant: sectionVariant(event.section),
        title: (
          <Link
            to={getCoursePageRoute(event.courseCode)}
            className="text-courses hover:underline"
          >
            {formatCourseCode(event.courseCode)}
          </Link>
        ),
        subtitle: event.section,
        timeLabel: `${event.start.format('h:mma')} - ${event.end.format(
          'h:mma',
        )}`,
        location: event.location,
      });
    });
  });

  const navHeader = (
    <div className="flex items-center justify-between border-0 border-b-2 border-solid border-[#dfe1e5] px-8 py-4 max-[768px]:px-4">
      <div className="flex flex-col">
        <div className="text-base font-semibold text-[#172b4d]">
          {getDateRangeString(weekStart, days[days.length - 1])}
        </div>
        <div className="text-sm font-normal text-[#505f79]">
          ({Math.round((2 * totalMinutes) / 60) / 2} hours this week)
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          variant="outline"
          size="sm"
          className="border-solid max-[480px]:hidden"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setWeekStart(initialMonday)}
        >
          Current Week
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-solid"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setWeekStart(weekStart.clone().subtract(7, 'days'))}
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-solid"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setWeekStart(weekStart.clone().add(7, 'days'))}
        >
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex items-center justify-between border-0 border-b-2 border-solid border-[#dfe1e5] px-8 py-8 max-[768px]:px-4">
        <div className="text-lg font-semibold leading-relaxed text-[#172b4d]">
          Export your calendar
        </div>
        <DropdownList
          selectedIndex={-1}
          options={['Google', 'iCalendar']}
          margin="auto 0"
          onChange={(value) => handleCalendarExport(value !== 0)}
          color={theme.primary}
          placeholder="Export as"
        />
      </div>

      <Calendar
        header={navHeader}
        dayLabels={days.map((day) => day.format('ddd MMM D'))}
        events={calendarEvents}
        minHour={minHour}
        maxHour={maxHour}
      />

      <div className="flex items-center justify-between gap-4 px-6 py-6 max-[768px]:px-4 max-[500px]:flex-col max-[500px]:items-start">
        <div className="text-base font-semibold text-[#172b4d]">
          Have a more recent schedule?
        </div>
        <Button onClick={openScheduleModal}>Add current / upcoming term</Button>
      </div>
    </Card>
  );
};

export default ProfileCalendar;
