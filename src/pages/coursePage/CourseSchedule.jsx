import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/* Child Components */
import TabContainer from '../../components/display/TabContainer';
import Table from '../../components/display/Table';
import FinalExamTable from '../../components/common/FinalExamTable';
import LastUpdatedSchedule from '../../components/common/LastUpdatedSchedule';
import { courseScheduleTableColumns } from './CourseScheduleTableColumns';

/* Styled Components */
import {
  CourseScheduleWrapper,
  ScheduleTableWrapper,
  FinalExamsTableWrapper,
  FinalExamsText,
} from './styles/CourseSchedule';

/* Utils */
import { termCodeToDate, secsToTime, weekDayLetters } from '../../utils/Misc';
import { processSectionExams } from '../../utils/FinalExams';
import CollapsibleContainer from '../../components/display/CollapsibleContainer';

const sectionOrder = {
  LEC: 0,
  LAB: 1,
  TUT: 2,
};

/*
 * We first group the data by time of day range (start and end time) Now, each group should have
 * a time of day range, location, instructor, and all the more specific 'timeranges' the classes occur in.
 * Each timerange contains days of the week the class occurs as well as the start and end dates
 * of the weeks that timerange applies. We assume that, if the start and end dates are the same,
 * the time range is valid for the week beginning on that date and otherwise, the time range is
 * valid for the whole term. We order the timeranges for each grouping as follows:
 * the time range valid for the whole term, if it exists, comes first and everything else
 * is sorted by date.
 */

const getInfoGroupings = meetings => {
  let groupedByTimeOfDay = meetings.reduce((groupings, curr) => {
    const key = `${curr.start_seconds} ${curr.end_seconds}`;
    if (!groupings[key]) {
      groupings[key] = {
        time: `${secsToTime(curr.start_seconds)} - ${secsToTime(
          curr.end_seconds,
        )}`,
        location: curr.location,
        prof: curr.prof
          ? {
              id: curr.prof.id,
              code: curr.prof.code,
              name: curr.prof.name,
            }
          : {},
        timeRanges: [],
        cancelled: curr.is_cancelled,
        isTba: curr.is_tba,
      };
    }

    groupings[key].timeRanges.push({
      days: curr.days,
      startDate: curr.start_date,
      endDate: curr.end_date,
    });
    return groupings;
  }, {});

  let infoGroups = [];

  // Sort timeRanges for each group
  Object.entries(groupedByTimeOfDay).forEach(entry => {
    entry[1].timeRanges.sort((a, b) => a.startDate > b.startDate);
    infoGroups.push(entry[1]);
  });

  // Merge and sort days of week for timeRanges that occur in the same date range
  infoGroups.forEach(entry => {
    let newTimeRanges = [];
    let newDays = [];
    entry.timeRanges.forEach((currRange, i) => {
      if (i < entry.timeRanges.length - 1) {
        const nextRange = entry.timeRanges[i + 1];
        if (
          currRange.startDate === nextRange.startDate &&
          currRange.endDate === nextRange.endDate
        ) {
          for (let day of currRange.days) {
            if (!newDays.includes(day)) {
              newDays.push(day);
            }
          }
          return;
        }
      }

      for (let day of currRange.days) {
        if (!newDays.includes(day) && weekDayLetters.includes(day)) {
          newDays.push(day);
        }
      }
      newDays.sort(
        (a, b) => weekDayLetters.indexOf(a) - weekDayLetters.indexOf(b),
      );
      newTimeRanges.push({
        days: newDays,
        startDate: currRange.startDate,
        endDate: currRange.endDate,
      });
      newDays = [];
    });
    entry.timeRanges = newTimeRanges;
  });

  infoGroups = infoGroups.sort((a, b) => a.startSeconds - b.startSeconds);
  const numDates = infoGroups.map(group => group.timeRanges.length);
  return {
    times: infoGroups.map((group, i) =>
      Object({
        time: group.time,
        spaces: numDates[i] - 1,
        cancelled: group.cancelled,
        isTba: group.isTba,
      }),
    ),
    locations: infoGroups.map((group, i) =>
      Object({ location: group.location, spaces: numDates[i] - 1 }),
    ),
    profs: infoGroups.map((group, i) =>
      Object({ prof: group.prof, spaces: numDates[i] - 1 }),
    ),
    dates: infoGroups.map(group => group.timeRanges),
  };
};

const getStartingTab = termsOffered => {
  for (let i in termsOffered) {
    const term = termsOffered[i];
    const monthInt = term % 10;
    const year = 1900 + Math.floor(term / 10);
    const currentTime = moment();
    const termStart = moment(`0${monthInt}-${year}`, 'MM-YYYY').startOf(
      'month',
    );
    const termEnd = moment(`0${monthInt + 4}-${year}`, 'MM-YYYY').endOf(
      'month',
    );
    if (currentTime.isAfter(termStart) && currentTime.isBefore(termEnd)) {
      return parseInt(i);
    }
  }
  return 0;
};

const CourseSchedule = ({
  sections = [],
  courseCode,
  courseID,
  sectionSubscriptions,
  userEmail,
}) => {
  let termsOffered = sections.reduce((allTerms, curr) => {
    if (!allTerms.includes(curr.term_id)) {
      allTerms.push(curr.term_id);
    }
    return allTerms;
  }, []);

  let hasBell = {};
  termsOffered.forEach(term => {
    hasBell[term] = sections.some(section => {
      return (
        section.enrollment_total >= section.enrollment_capacity &&
        section.term_id === term
      );
    });
  });
  termsOffered = termsOffered.sort().reverse();

  const startingTab = getStartingTab(termsOffered);
  const [selectedTerm, setSelectedTerm] = useState(startingTab);

  if (sections.length === 0) {
    return null;
  }

  const subscribedSectionIDs = sectionSubscriptions.map(
    subscription => subscription.section_id,
  );

  const sectionsCleanedData = sections
    .map(s => ({
      section: s.section_name,
      campus: s.campus,
      class: s.class_number,
      term: s.term_id,
      enrolled: {
        course_id: courseID,
        course_code: courseCode,
        section_id: s.id,
        filled: s.enrollment_total,
        capacity: s.enrollment_capacity,
        hasBell: hasBell[s.term_id],
        selected: subscribedSectionIDs.includes(s.id),
        userEmail: userEmail,
      },
      cancelled: sections.reduce((isCancelled, current) => {
        return (
          isCancelled ||
          (current.term_id === s.term_id &&
            current.meetings.reduce((meetingCancelled, current) => {
              return meetingCancelled || current.is_cancelled;
            }, false))
        );
      }, false),
      // Every grouping contains a single time of day, location, and instructor
      // and the classes that occur with those parameters.
      ...getInfoGroupings(s.meetings),
    }))
    .sort((a, b) => {
      const sectionTypeA = a.section.split(' ')[0];
      const sectionTypeB = b.section.split(' ')[0];
      if (sectionOrder[sectionTypeA] === sectionOrder[sectionTypeB]) {
        return a.section.localeCompare(b.section);
      } else {
        return sectionOrder[sectionTypeA] - sectionOrder[sectionTypeB];
      }
    });

  const courseExams = processSectionExams(sections, courseCode);
  const tabList = termsOffered.map(term => {
    return {
      title: termCodeToDate(term),
      render: () => (
        <>
          <ScheduleTableWrapper>
            <Table
              cellPadding="4px 0"
              columns={courseScheduleTableColumns}
              data={sectionsCleanedData.filter(c => c.term === term)}
              getRowProps={row => {
                if (row) {
                  return { disabled: row.original.cancelled };
                }
              }}
            />
          </ScheduleTableWrapper>
          <FinalExamsTableWrapper hasExams={courseExams.length > 0}>
            <FinalExamsText>Final Exams</FinalExamsText>
            <FinalExamTable courses={courseExams} includeCode={false} />
          </FinalExamsTableWrapper>
        </>
      ),
    };
  });

  return (
    <CourseScheduleWrapper>
      <CollapsibleContainer
        title="Course Schedule"
        centerHeader={false}
        margin="0"
        headerBorder
        bigTitle
      >
        <TabContainer
          initialSelectedTab={startingTab}
          tabList={tabList}
          contentPadding={'0'}
          borderRadius={false}
          onChange={setSelectedTerm}
        />
      </CollapsibleContainer>
      {tabList.length > 0 && (
        <LastUpdatedSchedule
          margin={'8px 0 32px 0'}
          courseCode={courseCode}
          term={termsOffered[selectedTerm]}
        />
      )}
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
      section_name: PropTypes.string,
      term_id: PropTypes.number,
    }),
  ),
};

export default CourseSchedule;
