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
