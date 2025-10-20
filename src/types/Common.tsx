import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
  hasRoomAvailable: boolean;
  hasOnlineSection: boolean;
};

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type SearchFilterStateKey = keyof SearchFilterState;

export type CourseSearchResult = {
  id: number;
  code: string;
  name: string;
  ratings: number;
  liked: number;
  easy: number;
  useful: number;
  terms: number[];
  terms_with_seats: number[];
  terms_with_online_section: number[];
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
