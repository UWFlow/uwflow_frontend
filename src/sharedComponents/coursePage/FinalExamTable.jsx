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
    maxWidth: 112,
    Cell:  ({cell}) => (
      <CourseCode to={getCoursePageRoute(cell.value)}>
        {splitCourseCode(cell.value)}
      </CourseCode>
    ),
  },
  {
    Header: 'Section(s)',
    accessor: 'sections',
    maxWidth: 112,
    Cell:  ({cell}) => (
    <>
      {cell.value.map((v, idx) =>
        <span key={idx}>{v}{idx === v.length - 1 ? '' : ','}</span>
      )}
    </>),
  },
  {
    Header: 'Time',
    accessor: 'time',
    maxWidth: 160,
  },
  {
    Header: 'Date',
    accessor: 'date',
    maxWidth: 160,
  },
  {
    Header: 'Location',
    accessor: 'location'
  },
]

const FinalExamTable = ({ courses }) => {
  return (
    <Table
        columns={examColumns}
        data={courses}
    />
  );
};

FinalExamTable.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string
  })),
};

export default FinalExamTable;
