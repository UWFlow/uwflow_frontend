import React from 'react';
import { CourseCode, ProfName } from './styles/ExplorePage';

import { splitCourseCode } from '../../../utils/Misc';

export const courseColumns = [
  {
    Header: 'Course code',
    accessor: 'code',
    align: 'left',
    maxWidth: 112,
    Cell: ({ cell }) => <CourseCode to={`/course/${cell.value}`}>{splitCourseCode(cell.value)}</CourseCode>,
  },
  {
    Header: 'Course Name',
    accessor: 'name',
    align: 'left'
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'right',
    maxWidth: 112,
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
    accessor: 'id_name',
    align: 'left',
    Cell: ({ cell }) => (
      <ProfName to={`/prof/${cell.value.id}`}>
        {cell.value.name}
      </ProfName>
    ),
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'left',
    maxWidth: 112,
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
