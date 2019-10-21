import React from 'react';
import { CourseCode, ProfName } from './styles/ExplorePage';

import { splitCourseCode } from '../../../utils/Misc';
import { getCoursePageRoute, getProfPageRoute } from '../../../Routes';

export const courseColumns = [
  {
    Header: 'Course code',
    accessor: 'code',
    align: 'left',
    maxWidth: 120,
    Cell: ({ cell }) => (
      <CourseCode to={getCoursePageRoute(cell.value)}>{
        splitCourseCode(cell.value)}
      </CourseCode>
    ),
  },
  {
    Header: 'Course Name',
    accessor: 'name',
    align: 'left',
    maxWidth: 128
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'right',
    maxWidth: 80,
  },
  {
    Header: 'Useful',
    accessor: 'useful',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`
  },
  {
    Header: 'Easy',
    accessor: 'easy',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`
  },
];

export const profColumns = [
  {
    Header: 'Professor name',
    accessor: 'code_name',
    align: 'left',
    maxWidth: 160,
    Cell: ({ cell }) => (
      <ProfName to={getProfPageRoute(cell.value.code)}>
        {cell.value.name}
      </ProfName>
    ),
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'right',
    maxWidth: 80,
  },
  {
    Header: 'Clear',
    accessor: 'clear',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`,
  },
  {
    Header: 'Engaging',
    accessor: 'engaging',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`,
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    maxWidth: 64,
    Cell: ({ cell }) => `${Math.round(cell.value * 100)}%`,
  },
];
