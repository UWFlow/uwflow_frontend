import React, { useState } from 'react';
import moment from 'moment/moment';

import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import CollapsibleContainer from 'components/display/CollapsibleContainer';
import TabContainer from 'components/display/TabContainer';
import Table from 'components/display/Table';
import { secsToTime, termCodeToDate, weekDayLetters } from 'utils/Misc';

import {
  CourseScheduleWrapper,
  ScheduleTableWrapper,
} from './styles/CourseSchedule';
import { courseScheduleTableColumns } from './CourseScheduleTableColumns';

// sectionCodes are all the section codes that exist at UW,
// in the order they should appear in a course schedule.
const sectionCodes = [
  // theoretical components
  'LEC', // lecture: the usual lecture format.
  'OLN', // online: rare term for online lectures. [ACINTY]
  'RDG', // reading: independent study under ~1-1 supervision. [CS 690B in 1201]
  // interactive components
  'CLN', // clinic: analysis of cases. [OPTOM, PHARM]
  'DIS', // discussion: group discussions under supervision. [PSCI 231]
  'ORL', // oral conversation: practicing a foreign language. [FR 192]
  'SEM', // seminar: less format lecture + project/paper presentations. [SE 101]
  // practical components
  'ESS', // essay: just writing essays, apparently... [ENGL 495]
  'FLD', // field studies: work with primary materials in the field. [EARTH 260]
  'FLT', // flight training: planes! [AVIA]
  'LAB', // laboratory: practical tasks, often with special equipment. [ECE 240]
  'PRA', // practicum: supervised placement in a work setting. [SWREN]
  'PRJ', // project: the student independently produces a deliverable. [WKRPT]
  'STU', // studio: coaching based on applied skill execution. [FINE 100]
  'WRK', // work term: co-op. [COOP]
  'WSP', // workshop: independent project work under supervision [SVENT]
  // supplementary components
  'TUT', // tutorial: usually a TA going over sample problems.
  // examination components
  'ENS', // ensemble: evaluation of musical performance. [MUSIC]
  'TST', // test: usually mid-term exam.
];

// sectionOrder maps each section code to its index in sectionCodes.
const sectionOrder = sectionCodes.reduce((map, type, i) => {
  map[type] = i;
  return map;
}, {});

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

const getInfoGroupings = (meetings) => {
  const groupedByTimeOfDay = meetings.reduce((groupings, curr) => {
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
  Object.entries(groupedByTimeOfDay).forEach((entry) => {
    entry[1].timeRanges.sort((a, b) => a.startDate > b.startDate);
    infoGroups.push(entry[1]);
  });

  // Merge and sort days of week for timeRanges that occur in the same date range
  infoGroups.forEach((entry) => {
    const newTimeRanges = [];
    let newDays = [];
    entry.timeRanges.forEach((currRange, i) => {
      if (i < entry.timeRanges.length - 1) {
        const nextRange = entry.timeRanges[i + 1];
        if (
          currRange.startDate === nextRange.startDate &&
          currRange.endDate === nextRange.endDate
        ) {
          currRange.days.forEach((day) => {
            if (!newDays.includes(day)) {
              newDays.push(day);
            }
          });
          return;
        }
      }

      currRange.days.forEach((day) => {
        if (!newDays.includes(day) && weekDayLetters.includes(day)) {
          newDays.push(day);
        }
      });

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
  const numDates = infoGroups.map((group) => group.timeRanges.length);
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
    dates: infoGroups.map((group) => group.timeRanges),
  };
};

const getStartingTab = (termsOffered) => {
  for (let i = 0; i < termsOffered.length; i += 1) {
    const term = termsOffered[i];
    const month = term % 10;
    const year = 1900 + Math.floor(term / 10);
    const currentTime = moment();
    const termStart = moment(`${month}-${year}`, 'MM-YYYY');
    const displayStart = termStart.clone().subtract(2, 'months');
    const displayEnd = termStart.clone().add(2, 'months');
    if (currentTime.isBetween(displayStart, displayEnd)) {
      return i;
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

  const hasBell = {};
  termsOffered.forEach((term) => {
    hasBell[term] = sections.some((section) => {
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
    (subscription) => subscription.section_id,
  );

  const sectionsCleanedData = sections
    .map((s) => ({
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
        userEmail,
      },
      cancelled: sections.reduce((isCancelled, current) => {
        return (
          isCancelled ||
          (current.term_id === s.term_id &&
            current.meetings.reduce((cancelled, cur) => {
              return cancelled || cur.is_cancelled;
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
      }
      return sectionOrder[sectionTypeA] - sectionOrder[sectionTypeB];
    });

  const tabList = termsOffered.map((term) => {
    return {
      title: termCodeToDate(term),
      render: () => (
        <>
          <ScheduleTableWrapper>
            <Table
              cellPadding="4px 0"
              columns={courseScheduleTableColumns}
              data={sectionsCleanedData.filter((c) => c.term === term)}
              getRowProps={(row) =>
                row ? { disabled: row.original.cancelled } : {}
              }
            />
          </ScheduleTableWrapper>
        </>
      ),
      onClick: () => null,
    };
  });

  const updatedAt = moment.max(sections.map((s) => moment(s.updated_at)));

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
          updatedAt={updatedAt}
        />
      )}
    </CourseScheduleWrapper>
  );
};

export default CourseSchedule;
