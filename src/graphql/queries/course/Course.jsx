import gql from 'graphql-tag';

import CourseFragment from "../../fragments/course/CourseFragment.jsx";

export const GET_COURSE = gql`
  query GET_COURSE($id: Int) {
    course(where: {id: {_eq: $id}}) {
      ...CourseInfoFragment
    }
  }
  ${CourseFragment.courseInfo}
`;

export const GET_ALL_COURSES_SHALLOW = gql`
  query GET_ALL_COURSES_SHALLOW {
    course {
      ...ShallowCourseInfoFragment
    }
  }
  ${CourseFragment.shallowCourseInfo}
`;