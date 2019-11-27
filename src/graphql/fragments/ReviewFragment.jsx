import gql from 'graphql-tag';

const ReviewFragment = {
  reviewInfo: gql`
    fragment ReviewInfoFragment on review {
      id
      created_at
      updated_at
      public
      liked
      course_comment
      course_easy
      course_useful
      prof_engaging
      prof_comment
      prof_clear
      author {
        full_name
        picture_url
        program
      }
      course_id
      course {
        id
        code
        name
        profs_teaching {
          prof {
            id
            name
          }
        }
        reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
      }
      prof_id
      prof {
        id
        name
        code
        picture_url
        reviews_aggregate {
          aggregate {
            avg {
              liked
            }
          }
        }
      }
    }
  `,
  reviewUpdateInfo: gql`
    fragment ReviewUpdateInfoFragment on review {
      id
      created_at
      updated_at
      public
      liked
      course_comment
      course_easy
      course_useful
      prof_engaging
      prof_comment
      prof_clear
      course_id
      prof_id
    }
  `,
  reviewVoteCounts: gql`
    fragment ReviewVoteCountsFragment on review {
      id
      course_review_rating {
        upvote_count
      }
      prof_review_rating {
        upvote_count
      }
    }
  `,
  userReviewFields: gql`
    fragment UserReviewFieldsFragment on review {
      id
      course_review_upvotes {
        user_id
      }
      prof_review_upvotes {
        user_id
      }
      user {
        user_id
      }
    }
  `,
  reviewAggregate: gql`
    fragment ReviewAggregateFragment on review_aggregate {
      aggregate {
        avg {
          liked
          course_easy
          course_useful
          prof_clear
          prof_engaging
        }
        count: count(columns: liked)
        course_comment_count: count(columns: course_comment)
        prof_comment_count: count(columns: prof_comment)
      }
    }
  `,
  profReviewAggregate: gql`
    fragment ProfReviewAggregateFragment on prof {
      id
      reviews_aggregate {
        aggregate {
          avg {
            liked
            prof_clear
            prof_engaging
          }
          count: count(columns: liked)
          prof_comment_count: count(columns: prof_comment)
        }
      }
    }
  `,
  courseReviewAggregate: gql`
    fragment CourseReviewAggregateFragment on course {
      id
      reviews_aggregate {
        aggregate {
          avg {
            liked
            course_easy
            course_useful
          }
          count: count(columns: liked)
          course_comment_count: count(columns: course_comment)
        }
      }
    }
  `
};

export default ReviewFragment;
