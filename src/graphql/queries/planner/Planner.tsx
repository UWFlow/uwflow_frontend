import { gql } from '@apollo/client';

// NOTE: types for these documents are hand-written below rather than
// generated: `bun run generate` needs a live Hasura instance that already has
// the checklist/user_course_plan migration applied. Regenerate and swap these
// out next time codegen is run.

export const GET_PLANNER_DATA = gql`
  query getPlannerData($id: Int) {
    user(where: { id: { _eq: $id } }) {
      id
      program
    }
    user_course_taken(where: { user_id: { _eq: $id } }) {
      term_id
      level
      course_id
      course {
        id
        code
        name
      }
    }
    user_course_plan(
      where: { user_id: { _eq: $id } }
      order_by: { course_id: asc }
    ) {
      term_id
      course_id
      course {
        id
        code
        name
        prerequisites {
          is_corequisite
          prerequisite {
            id
            code
          }
        }
      }
    }
    checklist(order_by: { name: asc }) {
      id
      name
      requirements
    }
  }
`;

// Every course, for the planner's "Add course" search. Cached and shared by
// Apollo between the dropdown and the page.
export const COURSE_DROPDOWN_ALL_QUERY = gql`
  query courseDropdownAll {
    course(order_by: { code: asc }) {
      id
      code
      name
    }
  }
`;

/* Hand-written result types (see note above). */

export type PlannerPrerequisite = {
  is_corequisite: boolean | null;
  prerequisite: { id: number; code: string } | null;
};

export type PlannerDataQuery = {
  user: { id: number; program: string | null }[];
  user_course_taken: {
    term_id: number;
    level: string | null;
    course_id: number;
    course: { id: number; code: string; name: string } | null;
  }[];
  user_course_plan: {
    term_id: number;
    course_id: number;
    course: {
      id: number;
      code: string;
      name: string;
      prerequisites: PlannerPrerequisite[];
    } | null;
  }[];
  checklist: {
    id: number;
    name: string;
    // Ordered categories of requirements; each requirement is a list of
    // alternative course codes ("one of").
    requirements: { category: string; courses: string[][] }[];
  }[];
};

export type PlannerDataQueryVariables = { id: number };

export type CourseDropdownAllQuery = {
  course: { id: number; code: string; name: string }[];
};
