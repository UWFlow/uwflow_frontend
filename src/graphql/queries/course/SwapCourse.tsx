import { gql } from '@apollo/client';

const COURSE_SECTION_FIELDS = `
  id
  section_name
  class_number
  term_id
  enrollment_capacity
  enrollment_total
  updated_at
  exams {
    date
    day
    location
    start_seconds
    end_seconds
  }
  meetings {
    days
    end_date
    end_seconds
    is_cancelled
    is_tba
    location
    section_id
    start_date
    start_seconds
    prof {
      id
      code
      name
      rating {
        clear
        engaging
      }
    }
  }
  course {
    id
    name
    code
  }
`;

export const GET_SECTIONS_BY_CLASS_NUMBERS = gql`
  query getSectionsByClassNumbers($classNumbers: [Int!]!, $termId: Int!) {
    course_section(
      where: {
        class_number: { _in: $classNumbers }
        term_id: { _eq: $termId }
      }
    ) {
      ${COURSE_SECTION_FIELDS}
    }
  }
`;

export const GET_COURSE_FOR_SWAP = gql`
  query getCourseForSwap($code: String!, $termId: Int!) {
    course_section(
      where: {
        course: { code: { _eq: $code } }
        term_id: { _eq: $termId }
      }
      order_by: { section_name: asc }
    ) {
      ${COURSE_SECTION_FIELDS}
    }
  }
`;

export const COURSE_DROPDOWN_TERM_QUERY = gql`
  query courseDropdownByTerm($termId: Int!) {
    course(
      where: { sections: { term_id: { _eq: $termId } } }
      order_by: { code: asc }
    ) {
      code
      name
    }
  }
`;

export type SwapProfRating = {
  clear: number | null;
  engaging: number | null;
};

export type SwapMeetingProf = {
  id: number;
  code: string;
  name: string;
  rating: SwapProfRating | null;
};

export type SwapMeeting = {
  days: string[];
  start_seconds: number | null;
  end_seconds: number | null;
  start_date: string;
  end_date: string;
  is_cancelled: boolean;
  is_tba: boolean;
  location: string | null;
  section_id: number;
  prof: SwapMeetingProf | null;
};

export type SwapSection = {
  id: number;
  section_name: string;
  class_number: number;
  term_id: number;
  enrollment_capacity: number;
  enrollment_total: number;
  updated_at: string;
  exams: Array<{
    date: string;
    day: string | null;
    location: string | null;
    start_seconds: number | null;
    end_seconds: number | null;
  }>;
  meetings: SwapMeeting[];
  course: { id: number; name: string | null; code: string };
};

export type GetSectionsByClassNumbersQuery = {
  course_section: SwapSection[];
};

export type GetCourseForSwapQuery = {
  course_section: SwapSection[];
};

export type GetCourseForSwapQueryVariables = {
  code: string;
  termId: number;
};
