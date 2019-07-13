import gql from 'graphql-tag';

const CourseFragment = {
  courseInfo: gql`
    fragment CourseInfoFragment on course {
      id
      code
      name
      description
      course_reviews_aggregate {
        aggregate {
          count(columns: text)
        }
      }
      antireqs
      coreqs
      course_easy_buckets {
        count
      }
      course_liked_buckets {
        count
      }
      course_useful_buckets {
        count
      }
      textbooks
    }
  `,
  shallowCourseInfo: gql`
    fragment ShallowCourseInfoFragment on course {
      id
      code
      name
    }
  `,
};

export default CourseFragment;
