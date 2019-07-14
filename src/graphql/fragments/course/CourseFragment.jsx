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
      course_easy_buckets_aggregate {
        aggregate {
          avg {
            easy
          }
        }
      }
      course_liked_buckets_aggregate(where: { liked: { _is_null: false } }) {
        aggregate {
          avg {
            liked
          }
          sum {
            count
          }
        }
      }
      course_useful_buckets_aggregate {
        aggregate {
          avg {
            useful
          }
        }
      }
      textbooks
      sections
      prereqs
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
