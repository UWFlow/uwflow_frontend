import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { CourseCode } from './styles/FinalExamTable';

import Table from '../display/Table';
import { getCoursePageRoute } from '../../Routes';
import { splitCourseCode } from '../../utils/Misc';

const examColumns = [
  {
    Header: 'Course',
    accessor: 'code',
    maxWidth: 120,
    Cell: ({ cell }) => (
      <CourseCode to={getCoursePageRoute(cell.value)}>
        {splitCourseCode(cell.value)}
      </CourseCode>
    ),
  },
  {
    Header: 'Section(s)',
    accessor: 'sections',
    maxWidth: 174,
    Cell: ({ cell }) => cell.value.join(', '),
  },
  {
    Header: 'Time',
    accessor: 'time',
    maxWidth: 136,
  },
  {
    Header: 'Date',
    accessor: 'date',
    maxWidth: 120,
  },
  {
    Header: 'Location',
    accessor: 'location',
    maxWidth: 160,
  },
];

const FinalExamTable = ({ courses, includeCode = true }) => {
  return (
    <Table
      columns={includeCode ? examColumns : examColumns.slice(1)}
      data={courses}
    />
  );
};

FinalExamTable.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      sections: PropTypes.arrayOf(PropTypes.string),
      time: PropTypes.string,
      date: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
};

export default FinalExamTable;
