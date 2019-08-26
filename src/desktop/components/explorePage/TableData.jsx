import React from 'react';
import { CourseCode, ProfName } from './styles/ExplorePage';

export const courseColumns = [
  {
    Header: 'Course code',
    accessor: 'code',
    align: 'left',
    maxWidth: 112,
    Cell: ({ value }) => <CourseCode to={`/course/1`}>{value}</CourseCode>,
  },
  {
    Header: 'Course Name',
    accessor: 'name',
    align: 'left',
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
  },
  {
    Header: 'Easy',
    accessor: 'easy',
    align: 'right',
    maxWidth: 64,
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    maxWidth: 64,
  },
];

export const profColumns = [
  {
    Header: 'Professor name',
    accessor: 'name',
    align: 'left',
    Cell: ({ value }) => <ProfName to={`/prof/1`}>{value}</ProfName>,
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
  },
  {
    Header: 'Engaging',
    accessor: 'engaging',
    align: 'right',
    maxWidth: 64,
  },
  {
    Header: 'Liked',
    accessor: 'liked',
    align: 'right',
    maxWidth: 64,
  },
];
