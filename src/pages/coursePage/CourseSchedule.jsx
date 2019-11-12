import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import TabContainer from '../../components/display/TabContainer';
import Table from '../../components/display/Table';
import { courseScheduleTableColumns } from './CourseScheduleTableColumns';

/* Styled Components */
import { CourseScheduleWrapper } from './styles/CourseSchedule';

/* GraphQL Queries */
import { termCodeToDate } from '../../utils/Misc';

const secsToTime = secs => {
  const t = Math.floor(secs / 3600) % 12;
  const h = t === 0 ? 12 : t;
  const m = Math.floor((secs % 3600) / 60) % 60;
  return `${h}:${m}${m === 0 ? 0 : ''} ${secs >= 3600 * 12 ? 'PM' : 'AM'}`;
};

// We first group the data by time of day range (start and end time) Now, each group should have
// a time of day range, location, instructor, and all the more specific 'timeranges' the classes occur in.
// Each timerange contains days of the week the class occurs as well as the start and end dates
// of the weeks that timerange applies. We assume that, if the start and end dates are the same,
// the time range is valid for the week beginning on that date and otherwise, the time range is
// valid for the whole term. We order the timeranges for each grouping as follows:
// the time range valid for the whole term, if it exists, comes first and everything else
// is sorted by date.
const getInfoGroupings = meetings => {
  var groupedByTimeOfDay = meetings.reduce((groupings, curr) => {
    const key = `${curr.start_seconds} ${curr.end_seconds}`;
    if (!groupings[key]) {
      groupings[key] = {
        startSeconds: curr.start_seconds,
        endSeconds: curr.end_seconds,
        startTime: secsToTime(curr.start_seconds),
        endTime: secsToTime(curr.end_seconds),
        location: curr.location,
        prof: curr.prof
          ? {
              id: curr.prof.id,
              name: curr.prof.name,
            }
          : null,
        timeRanges: [],
      };
    }
    groupings[key].timeRanges.push({
      days: curr.days,
      startDate: curr.start_date,
      endDate: curr.end_date,
    });
    return groupings;
  }, {});
  var answer = [];
  // Sort timeRanges for each group
  Object.entries(groupedByTimeOfDay).forEach(entry => {
    entry[1].timeRanges.sort((a, b) => a.startDate > b.startDate);
    answer.push(entry[1]);
  });
  // Merge and sort days of week for timeRanges that occur in the same date range
  const daysOfWeek = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su']; //not to0 sure about saturday and sunday
  answer.forEach(entry => {
    var newTimeRanges = [];
    var newDays = [];
    entry.timeRanges.forEach((currRange, i) => {
      if (i < entry.timeRanges.length - 1) {
        const nextRange = entry.timeRanges[i + 1];
        if (
          currRange.startDate == nextRange.startDate &&
          currRange.endDate == nextRange.endDate
        ) {
          for (var day of currRange.days) {
            if (!newDays.includes(day)) {
              newDays.push(day);
            }
          }
          return;
        }
      }
      for (var day of currRange.days) {
        if (!newDays.includes(day)) {
          newDays.push(day);
        }
      }
      newDays.sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));
      newTimeRanges.push({
        days: newDays,
        startDate: currRange.startDate,
        endDate: currRange.endDate,
      });
      newDays = [];
    });
    entry.timeRanges = newTimeRanges;
  });
  answer.sort((a, b) => a.startSeconds - b.startSeconds);
  return answer;
};

const CourseSchedule = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return null;
  }
  const termsOffered = sections.reduce((allTerms, curr) => {
    if (!allTerms.includes(curr.term)) {
      allTerms.push(curr.term);
    }
    return allTerms;
  }, []);

  const sectionsCleanedData = sections.map(s => ({
    section: s.section,
    class: s.class_number,
    term: s.term,
    enrolled: {
      section: s.section,
      class: s.class_number,
      filled: s.enrollment_total,
      capacity: s.enrollment_capacity,
    },
    // Every grouping contains a single time of day, location, and instructor
    // and the classes that occur with those parameters.
    infoGroupings: getInfoGroupings(s.meetings),
  }));

  console.log(sectionsCleanedData);

  const tabList = termsOffered.map(term => {
    return {
      title: termCodeToDate(term),
      render: () =>
        /*
        <Table
          columns={courseScheduleTableColumns}
          data={sectionsCleanedData.filter(c => c.term === term)}
        />
        */
        null,
    };
  });

  return (
    <CourseScheduleWrapper>
      <TabContainer
        initialSelectedTab={0}
        tabList={tabList}
        contentPadding={'0'}
      />
    </CourseScheduleWrapper>
  );
};

CourseSchedule.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      campus: PropTypes.string,
      class_number: PropTypes.number,
      enrollment_capacity: PropTypes.number,
      enrollment_total: PropTypes.number,
      meetings: PropTypes.arrayOf(
        PropTypes.shape({
          days: PropTypes.arrayOf(PropTypes.string),
          end_date: PropTypes.string,
          end_seconds: PropTypes.number,
          is_cancelled: PropTypes.bool,
          is_closed: PropTypes.bool,
          location: PropTypes.string,
          prof: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
          start_date: PropTypes.string,
          start_seconds: PropTypes.number,
        }),
      ),
      section: PropTypes.string,
      term: PropTypes.number,
    }),
  ),
};

export default CourseSchedule;
