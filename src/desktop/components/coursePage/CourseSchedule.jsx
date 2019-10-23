import React from 'react';
import PropTypes from 'prop-types';

/* Child Components */
import TabContainer from '../../../sharedComponents/display/TabContainer';
import Table from '../../../sharedComponents/display/Table';
import { courseScheduleTableColumns } from './CourseScheduleTableColumns';

/* Styled Components */
import { CourseScheduleWrapper } from './styles/CourseSchedule';

/* GraphQL Queries */
import { termCodeToDate } from '../../../utils/Misc';

const secsToTime = secs => {
  const t = Math.floor(secs / 3600) % 12;
  const h = t === 0 ? 12 : t;
  const m = Math.floor((secs % 3600) / 60) % 60;
  return `${h}:${m}${m === 0 ? 0 : ''} ${secs >= 3600 * 12 ? 'PM' : 'AM'}`;
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
    term: s.term,
    section: { section: s.section, numRows: s.meetings.length },
    class_number: s.class_number,
    enrolled: { capacity: s.enrollment_capacity, filled: s.enrollment_total },
    classes: s.meetings.map(cl => ({
      time: {
        start: secsToTime(cl.start_seconds),
        end: secsToTime(cl.end_seconds),
      },
      date: cl.days,
      location: cl.location,
      instructor: cl.prof_id,
    })),
  }));

  const tabList = termsOffered.map(term => {
    return {
      title: termCodeToDate(term),
      render: () => (
        <Table
          columns={courseScheduleTableColumns}
          data={sectionsCleanedData.filter(c => c.term === term)}
        />
      ),
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
