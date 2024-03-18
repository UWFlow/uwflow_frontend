import { Moment } from 'moment';

/* Table */
export type TableSortBy = {
  id: string;
  desc: boolean;
};

/* Textbox */
export type TextBoxOptions = {
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  color?: string;
  name?: string;
  padding?: number;
  type?: string;
  width?: string;
};

/* Explore Page */
export type SearchFilterState = {
  courseCodes: boolean[];
  numCourseRatings: number;
  numProfRatings: number;
  currentTerm: boolean;
  nextTerm: boolean;
  courseTaught: number;
  hasPrereqs: boolean;
};

export type SearchFilterStateURL = {
  exclude: (number | null)[];
  minCourseRatings: number | null;
  minProfRatings: number | null;
  courseTaught: number | null;
  currentTerm: boolean | null;
  nextTerm: boolean | null;
  noPrereqs: boolean | null;
};

export type CourseSearchResult = {
  id: number;
  code: string;
  name: string;
  ratings: number;
  liked: number;
  easy: number;
  useful: number;
  terms: number[];
  has_prereqs: boolean;
};

export type ProfSearchResult = {
  id: number;
  code_name: {
    code: string;
    name: string;
  };
  ratings: number;
  liked: number;
  clear: number;
  engaging: number;
  courses: Set<string>;
};

/* Profile Page */
export type ScheduleInterval = {
  start: Moment;
  end: Moment;
  courseCode: string;
  section: string;
  location?: string | null;
  truncate?: 'left' | 'right';
};

export type EventsByDate = { [date: string]: ScheduleInterval[] };
