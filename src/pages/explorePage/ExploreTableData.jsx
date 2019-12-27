import React from 'react';
import { CourseCode, ProfName } from './styles/ExplorePage';

import { formatCourseCode, processRating } from '../../utils/Misc';
import { getCoursePageRoute, getProfPageRoute } from '../../Routes';

export const courseColumns = [
  {
    Header: 'Course code',
    accessor: 'code',
    align: 'left',
    minWidth: 120,
    Cell: ({ cell }) => (
      <CourseCode to={getCoursePageRoute(cell.value)}>
        {formatCourseCode(cell.value)}
      </CourseCode>
    ),
    style: {
      whiteSpace: 'nowrap',
    },
  },
  {
    Header: 'Course name',
    accessor: 'name',
    align: 'left',
  },
  {
    Header: 'Ratings',
    accessor: 'ratings',
    align: 'right',
    minWidth: 88,
  },
  {
    Header: 'Useful',
    accessor: 'useful',
    align: 'right',
    minWidth: 88,
    Cell: ({ cell }) => processRating(cell.value),
  },
  {
    Header: 'Easy',
    accessor: 'easy',
    align: 'right',
    minWidth: 80,
    Cell: ({ cell }) => processRating(cell.value),
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    minWidth: 88,
    Cell: ({ cell }) => processRating(cell.value),
  },
];

export const profColumns = [
  {
    Header: 'Professor name',
    accessor: 'code_name',
    align: 'left',
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
    minWidth: 80,
  },
  {
    Header: 'Clear',
    accessor: 'clear',
    align: 'right',
    minWidth: 72,
    Cell: ({ cell }) => processRating(cell.value),
  },
  {
    Header: 'Engaging',
    accessor: 'engaging',
    align: 'right',
    minWidth: 80,
    Cell: ({ cell }) => processRating(cell.value),
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    minWidth: 72,
    Cell: ({ cell }) => processRating(cell.value),
  },
];
