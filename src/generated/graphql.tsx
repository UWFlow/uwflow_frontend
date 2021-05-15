import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  smallint: any;
  numeric: any;
  timestamptz: any;
  date: any;
  _text: any;
  tsvector: any;
  _int4: any;
  join_source: any;
};

/** expression to compare columns of type _int4. All fields are combined with logical 'AND'. */
export type _Int4_Comparison_Exp = {
  _eq?: Maybe<Scalars['_int4']>;
  _gt?: Maybe<Scalars['_int4']>;
  _gte?: Maybe<Scalars['_int4']>;
  _in?: Maybe<Array<Scalars['_int4']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_int4']>;
  _lte?: Maybe<Scalars['_int4']>;
  _neq?: Maybe<Scalars['_int4']>;
  _nin?: Maybe<Array<Scalars['_int4']>>;
};

/** expression to compare columns of type _text. All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['_text']>;
  _gt?: Maybe<Scalars['_text']>;
  _gte?: Maybe<Scalars['_text']>;
  _in?: Maybe<Array<Scalars['_text']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['_text']>;
  _lte?: Maybe<Scalars['_text']>;
  _neq?: Maybe<Scalars['_text']>;
  _nin?: Maybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets = {
  __typename?: 'aggregate_course_easy_buckets';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** aggregated selection of "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Aggregate = {
  __typename?: 'aggregate_course_easy_buckets_aggregate';
  aggregate?: Maybe<Aggregate_Course_Easy_Buckets_Aggregate_Fields>;
  nodes: Array<Aggregate_Course_Easy_Buckets>;
};

/** aggregate fields of "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Aggregate_Fields = {
  __typename?: 'aggregate_course_easy_buckets_aggregate_fields';
  avg?: Maybe<Aggregate_Course_Easy_Buckets_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Course_Easy_Buckets_Max_Fields>;
  min?: Maybe<Aggregate_Course_Easy_Buckets_Min_Fields>;
  stddev?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Course_Easy_Buckets_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Course_Easy_Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Course_Easy_Buckets_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Course_Easy_Buckets_Variance_Fields>;
};

/** aggregate fields of "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Course_Easy_Buckets_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Course_Easy_Buckets_Max_Order_By>;
  min?: Maybe<Aggregate_Course_Easy_Buckets_Min_Order_By>;
  stddev?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Course_Easy_Buckets_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Course_Easy_Buckets_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Course_Easy_Buckets_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Course_Easy_Buckets_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Course_Easy_Buckets_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Course_Easy_Buckets_Avg_Fields = {
  __typename?: 'aggregate_course_easy_buckets_avg_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Avg_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table
 * "aggregate.course_easy_buckets". All fields are combined with a logical 'AND'.
 */
export type Aggregate_Course_Easy_Buckets_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>>>;
  count?: Maybe<Bigint_Comparison_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  value?: Maybe<Smallint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Course_Easy_Buckets_Max_Fields = {
  __typename?: 'aggregate_course_easy_buckets_max_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Max_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Course_Easy_Buckets_Min_Fields = {
  __typename?: 'aggregate_course_easy_buckets_min_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Min_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** select columns of table "aggregate.course_easy_buckets" */
export enum Aggregate_Course_Easy_Buckets_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  Value = 'value',
}

/** aggregate stddev on columns */
export type Aggregate_Course_Easy_Buckets_Stddev_Fields = {
  __typename?: 'aggregate_course_easy_buckets_stddev_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Stddev_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Course_Easy_Buckets_Stddev_Pop_Fields = {
  __typename?: 'aggregate_course_easy_buckets_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Stddev_Pop_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Course_Easy_Buckets_Stddev_Samp_Fields = {
  __typename?: 'aggregate_course_easy_buckets_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Stddev_Samp_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Course_Easy_Buckets_Sum_Fields = {
  __typename?: 'aggregate_course_easy_buckets_sum_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Sum_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Course_Easy_Buckets_Var_Pop_Fields = {
  __typename?: 'aggregate_course_easy_buckets_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Var_Pop_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Course_Easy_Buckets_Var_Samp_Fields = {
  __typename?: 'aggregate_course_easy_buckets_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Var_Samp_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Course_Easy_Buckets_Variance_Fields = {
  __typename?: 'aggregate_course_easy_buckets_variance_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.course_easy_buckets" */
export type Aggregate_Course_Easy_Buckets_Variance_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.course_rating" */
export type Aggregate_Course_Rating = {
  __typename?: 'aggregate_course_rating';
  comment_count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  easy?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** aggregated selection of "aggregate.course_rating" */
export type Aggregate_Course_Rating_Aggregate = {
  __typename?: 'aggregate_course_rating_aggregate';
  aggregate?: Maybe<Aggregate_Course_Rating_Aggregate_Fields>;
  nodes: Array<Aggregate_Course_Rating>;
};

/** aggregate fields of "aggregate.course_rating" */
export type Aggregate_Course_Rating_Aggregate_Fields = {
  __typename?: 'aggregate_course_rating_aggregate_fields';
  avg?: Maybe<Aggregate_Course_Rating_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Course_Rating_Max_Fields>;
  min?: Maybe<Aggregate_Course_Rating_Min_Fields>;
  stddev?: Maybe<Aggregate_Course_Rating_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Course_Rating_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Course_Rating_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Course_Rating_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Course_Rating_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Course_Rating_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Course_Rating_Variance_Fields>;
};

/** aggregate fields of "aggregate.course_rating" */
export type Aggregate_Course_Rating_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Course_Rating_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Course_Rating_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Course_Rating_Max_Order_By>;
  min?: Maybe<Aggregate_Course_Rating_Min_Order_By>;
  stddev?: Maybe<Aggregate_Course_Rating_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Course_Rating_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Course_Rating_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Course_Rating_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Course_Rating_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Course_Rating_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Course_Rating_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Course_Rating_Avg_Fields = {
  __typename?: 'aggregate_course_rating_avg_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Avg_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "aggregate.course_rating". All fields are combined with a logical 'AND'. */
export type Aggregate_Course_Rating_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Course_Rating_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Course_Rating_Bool_Exp>>>;
  comment_count?: Maybe<Bigint_Comparison_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  easy?: Maybe<Numeric_Comparison_Exp>;
  filled_count?: Maybe<Bigint_Comparison_Exp>;
  liked?: Maybe<Numeric_Comparison_Exp>;
  useful?: Maybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Course_Rating_Max_Fields = {
  __typename?: 'aggregate_course_rating_max_fields';
  comment_count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  easy?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Max_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Course_Rating_Min_Fields = {
  __typename?: 'aggregate_course_rating_min_fields';
  comment_count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  easy?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Min_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.course_rating" */
export type Aggregate_Course_Rating_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** select columns of table "aggregate.course_rating" */
export enum Aggregate_Course_Rating_Select_Column {
  /** column name */
  CommentCount = 'comment_count',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  Easy = 'easy',
  /** column name */
  FilledCount = 'filled_count',
  /** column name */
  Liked = 'liked',
  /** column name */
  Useful = 'useful',
}

/** aggregate stddev on columns */
export type Aggregate_Course_Rating_Stddev_Fields = {
  __typename?: 'aggregate_course_rating_stddev_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Stddev_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Course_Rating_Stddev_Pop_Fields = {
  __typename?: 'aggregate_course_rating_stddev_pop_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Stddev_Pop_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Course_Rating_Stddev_Samp_Fields = {
  __typename?: 'aggregate_course_rating_stddev_samp_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Stddev_Samp_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Course_Rating_Sum_Fields = {
  __typename?: 'aggregate_course_rating_sum_fields';
  comment_count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  easy?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Sum_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Course_Rating_Var_Pop_Fields = {
  __typename?: 'aggregate_course_rating_var_pop_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Var_Pop_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Course_Rating_Var_Samp_Fields = {
  __typename?: 'aggregate_course_rating_var_samp_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Var_Samp_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Course_Rating_Variance_Fields = {
  __typename?: 'aggregate_course_rating_variance_fields';
  comment_count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.course_rating" */
export type Aggregate_Course_Rating_Variance_Order_By = {
  comment_count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating = {
  __typename?: 'aggregate_course_review_rating';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Aggregate = {
  __typename?: 'aggregate_course_review_rating_aggregate';
  aggregate?: Maybe<Aggregate_Course_Review_Rating_Aggregate_Fields>;
  nodes: Array<Aggregate_Course_Review_Rating>;
};

/** aggregate fields of "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Aggregate_Fields = {
  __typename?: 'aggregate_course_review_rating_aggregate_fields';
  avg?: Maybe<Aggregate_Course_Review_Rating_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Course_Review_Rating_Max_Fields>;
  min?: Maybe<Aggregate_Course_Review_Rating_Min_Fields>;
  stddev?: Maybe<Aggregate_Course_Review_Rating_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Course_Review_Rating_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Course_Review_Rating_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Course_Review_Rating_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Course_Review_Rating_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Course_Review_Rating_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Course_Review_Rating_Variance_Fields>;
};

/** aggregate fields of "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Course_Review_Rating_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Course_Review_Rating_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Course_Review_Rating_Max_Order_By>;
  min?: Maybe<Aggregate_Course_Review_Rating_Min_Order_By>;
  stddev?: Maybe<Aggregate_Course_Review_Rating_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Course_Review_Rating_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Course_Review_Rating_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Course_Review_Rating_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Course_Review_Rating_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Course_Review_Rating_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Course_Review_Rating_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Course_Review_Rating_Avg_Fields = {
  __typename?: 'aggregate_course_review_rating_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table
 * "aggregate.course_review_rating". All fields are combined with a logical 'AND'.
 */
export type Aggregate_Course_Review_Rating_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Course_Review_Rating_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Course_Review_Rating_Bool_Exp>>>;
  review_id?: Maybe<Int_Comparison_Exp>;
  upvote_count?: Maybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Course_Review_Rating_Max_Fields = {
  __typename?: 'aggregate_course_review_rating_max_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Max_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Course_Review_Rating_Min_Fields = {
  __typename?: 'aggregate_course_review_rating_min_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Min_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** select columns of table "aggregate.course_review_rating" */
export enum Aggregate_Course_Review_Rating_Select_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UpvoteCount = 'upvote_count',
}

/** aggregate stddev on columns */
export type Aggregate_Course_Review_Rating_Stddev_Fields = {
  __typename?: 'aggregate_course_review_rating_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Course_Review_Rating_Stddev_Pop_Fields = {
  __typename?: 'aggregate_course_review_rating_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Course_Review_Rating_Stddev_Samp_Fields = {
  __typename?: 'aggregate_course_review_rating_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Course_Review_Rating_Sum_Fields = {
  __typename?: 'aggregate_course_review_rating_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Course_Review_Rating_Var_Pop_Fields = {
  __typename?: 'aggregate_course_review_rating_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Course_Review_Rating_Var_Samp_Fields = {
  __typename?: 'aggregate_course_review_rating_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Course_Review_Rating_Variance_Fields = {
  __typename?: 'aggregate_course_review_rating_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.course_review_rating" */
export type Aggregate_Course_Review_Rating_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets = {
  __typename?: 'aggregate_course_useful_buckets';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** aggregated selection of "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Aggregate = {
  __typename?: 'aggregate_course_useful_buckets_aggregate';
  aggregate?: Maybe<Aggregate_Course_Useful_Buckets_Aggregate_Fields>;
  nodes: Array<Aggregate_Course_Useful_Buckets>;
};

/** aggregate fields of "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Aggregate_Fields = {
  __typename?: 'aggregate_course_useful_buckets_aggregate_fields';
  avg?: Maybe<Aggregate_Course_Useful_Buckets_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Course_Useful_Buckets_Max_Fields>;
  min?: Maybe<Aggregate_Course_Useful_Buckets_Min_Fields>;
  stddev?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Course_Useful_Buckets_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Course_Useful_Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Course_Useful_Buckets_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Course_Useful_Buckets_Variance_Fields>;
};

/** aggregate fields of "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Course_Useful_Buckets_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Course_Useful_Buckets_Max_Order_By>;
  min?: Maybe<Aggregate_Course_Useful_Buckets_Min_Order_By>;
  stddev?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Course_Useful_Buckets_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Course_Useful_Buckets_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Course_Useful_Buckets_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Course_Useful_Buckets_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Course_Useful_Buckets_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Course_Useful_Buckets_Avg_Fields = {
  __typename?: 'aggregate_course_useful_buckets_avg_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Avg_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table
 * "aggregate.course_useful_buckets". All fields are combined with a logical 'AND'.
 */
export type Aggregate_Course_Useful_Buckets_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>>>;
  count?: Maybe<Bigint_Comparison_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  value?: Maybe<Smallint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Course_Useful_Buckets_Max_Fields = {
  __typename?: 'aggregate_course_useful_buckets_max_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Max_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Course_Useful_Buckets_Min_Fields = {
  __typename?: 'aggregate_course_useful_buckets_min_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Min_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** select columns of table "aggregate.course_useful_buckets" */
export enum Aggregate_Course_Useful_Buckets_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  Value = 'value',
}

/** aggregate stddev on columns */
export type Aggregate_Course_Useful_Buckets_Stddev_Fields = {
  __typename?: 'aggregate_course_useful_buckets_stddev_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Stddev_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Course_Useful_Buckets_Stddev_Pop_Fields = {
  __typename?: 'aggregate_course_useful_buckets_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Stddev_Pop_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Course_Useful_Buckets_Stddev_Samp_Fields = {
  __typename?: 'aggregate_course_useful_buckets_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Stddev_Samp_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Course_Useful_Buckets_Sum_Fields = {
  __typename?: 'aggregate_course_useful_buckets_sum_fields';
  count?: Maybe<Scalars['bigint']>;
  course_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Sum_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Course_Useful_Buckets_Var_Pop_Fields = {
  __typename?: 'aggregate_course_useful_buckets_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Var_Pop_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Course_Useful_Buckets_Var_Samp_Fields = {
  __typename?: 'aggregate_course_useful_buckets_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Var_Samp_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Course_Useful_Buckets_Variance_Fields = {
  __typename?: 'aggregate_course_useful_buckets_variance_fields';
  count?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.course_useful_buckets" */
export type Aggregate_Course_Useful_Buckets_Variance_Order_By = {
  count?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets = {
  __typename?: 'aggregate_prof_clear_buckets';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** aggregated selection of "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Aggregate = {
  __typename?: 'aggregate_prof_clear_buckets_aggregate';
  aggregate?: Maybe<Aggregate_Prof_Clear_Buckets_Aggregate_Fields>;
  nodes: Array<Aggregate_Prof_Clear_Buckets>;
};

/** aggregate fields of "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Aggregate_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_aggregate_fields';
  avg?: Maybe<Aggregate_Prof_Clear_Buckets_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Prof_Clear_Buckets_Max_Fields>;
  min?: Maybe<Aggregate_Prof_Clear_Buckets_Min_Fields>;
  stddev?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Prof_Clear_Buckets_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Prof_Clear_Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Prof_Clear_Buckets_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Prof_Clear_Buckets_Variance_Fields>;
};

/** aggregate fields of "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Prof_Clear_Buckets_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Prof_Clear_Buckets_Max_Order_By>;
  min?: Maybe<Aggregate_Prof_Clear_Buckets_Min_Order_By>;
  stddev?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Prof_Clear_Buckets_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Prof_Clear_Buckets_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Prof_Clear_Buckets_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Prof_Clear_Buckets_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Prof_Clear_Buckets_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Prof_Clear_Buckets_Avg_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_avg_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Avg_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table "aggregate.prof_clear_buckets".
 * All fields are combined with a logical 'AND'.
 */
export type Aggregate_Prof_Clear_Buckets_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>>>;
  count?: Maybe<Bigint_Comparison_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
  value?: Maybe<Smallint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Prof_Clear_Buckets_Max_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_max_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Max_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Prof_Clear_Buckets_Min_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_min_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Min_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** select columns of table "aggregate.prof_clear_buckets" */
export enum Aggregate_Prof_Clear_Buckets_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  Value = 'value',
}

/** aggregate stddev on columns */
export type Aggregate_Prof_Clear_Buckets_Stddev_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_stddev_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Stddev_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Prof_Clear_Buckets_Stddev_Pop_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Stddev_Pop_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Prof_Clear_Buckets_Stddev_Samp_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Stddev_Samp_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Prof_Clear_Buckets_Sum_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_sum_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Sum_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Prof_Clear_Buckets_Var_Pop_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Var_Pop_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Prof_Clear_Buckets_Var_Samp_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Var_Samp_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Prof_Clear_Buckets_Variance_Fields = {
  __typename?: 'aggregate_prof_clear_buckets_variance_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.prof_clear_buckets" */
export type Aggregate_Prof_Clear_Buckets_Variance_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets = {
  __typename?: 'aggregate_prof_engaging_buckets';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** aggregated selection of "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Aggregate = {
  __typename?: 'aggregate_prof_engaging_buckets_aggregate';
  aggregate?: Maybe<Aggregate_Prof_Engaging_Buckets_Aggregate_Fields>;
  nodes: Array<Aggregate_Prof_Engaging_Buckets>;
};

/** aggregate fields of "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Aggregate_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_aggregate_fields';
  avg?: Maybe<Aggregate_Prof_Engaging_Buckets_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Prof_Engaging_Buckets_Max_Fields>;
  min?: Maybe<Aggregate_Prof_Engaging_Buckets_Min_Fields>;
  stddev?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Prof_Engaging_Buckets_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Prof_Engaging_Buckets_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Prof_Engaging_Buckets_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Prof_Engaging_Buckets_Variance_Fields>;
};

/** aggregate fields of "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Prof_Engaging_Buckets_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Prof_Engaging_Buckets_Max_Order_By>;
  min?: Maybe<Aggregate_Prof_Engaging_Buckets_Min_Order_By>;
  stddev?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Prof_Engaging_Buckets_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Prof_Engaging_Buckets_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Prof_Engaging_Buckets_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Prof_Engaging_Buckets_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Prof_Engaging_Buckets_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Prof_Engaging_Buckets_Avg_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_avg_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Avg_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table
 * "aggregate.prof_engaging_buckets". All fields are combined with a logical 'AND'.
 */
export type Aggregate_Prof_Engaging_Buckets_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>>>;
  count?: Maybe<Bigint_Comparison_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
  value?: Maybe<Smallint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Prof_Engaging_Buckets_Max_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_max_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Max_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Prof_Engaging_Buckets_Min_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_min_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Min_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** select columns of table "aggregate.prof_engaging_buckets" */
export enum Aggregate_Prof_Engaging_Buckets_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  Value = 'value',
}

/** aggregate stddev on columns */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_stddev_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Pop_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_stddev_pop_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Pop_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Samp_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_stddev_samp_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Stddev_Samp_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Prof_Engaging_Buckets_Sum_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_sum_fields';
  count?: Maybe<Scalars['bigint']>;
  prof_id?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Sum_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Prof_Engaging_Buckets_Var_Pop_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_var_pop_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Var_Pop_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Prof_Engaging_Buckets_Var_Samp_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_var_samp_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Var_Samp_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Prof_Engaging_Buckets_Variance_Fields = {
  __typename?: 'aggregate_prof_engaging_buckets_variance_fields';
  count?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.prof_engaging_buckets" */
export type Aggregate_Prof_Engaging_Buckets_Variance_Order_By = {
  count?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.prof_rating" */
export type Aggregate_Prof_Rating = {
  __typename?: 'aggregate_prof_rating';
  clear?: Maybe<Scalars['numeric']>;
  comment_count?: Maybe<Scalars['bigint']>;
  engaging?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Aggregate = {
  __typename?: 'aggregate_prof_rating_aggregate';
  aggregate?: Maybe<Aggregate_Prof_Rating_Aggregate_Fields>;
  nodes: Array<Aggregate_Prof_Rating>;
};

/** aggregate fields of "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Aggregate_Fields = {
  __typename?: 'aggregate_prof_rating_aggregate_fields';
  avg?: Maybe<Aggregate_Prof_Rating_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Prof_Rating_Max_Fields>;
  min?: Maybe<Aggregate_Prof_Rating_Min_Fields>;
  stddev?: Maybe<Aggregate_Prof_Rating_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Prof_Rating_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Prof_Rating_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Prof_Rating_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Prof_Rating_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Prof_Rating_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Prof_Rating_Variance_Fields>;
};

/** aggregate fields of "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Prof_Rating_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Prof_Rating_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Prof_Rating_Max_Order_By>;
  min?: Maybe<Aggregate_Prof_Rating_Min_Order_By>;
  stddev?: Maybe<Aggregate_Prof_Rating_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Prof_Rating_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Prof_Rating_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Prof_Rating_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Prof_Rating_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Prof_Rating_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Prof_Rating_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Prof_Rating_Avg_Fields = {
  __typename?: 'aggregate_prof_rating_avg_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Avg_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "aggregate.prof_rating". All fields are combined with a logical 'AND'. */
export type Aggregate_Prof_Rating_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Prof_Rating_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Prof_Rating_Bool_Exp>>>;
  clear?: Maybe<Numeric_Comparison_Exp>;
  comment_count?: Maybe<Bigint_Comparison_Exp>;
  engaging?: Maybe<Numeric_Comparison_Exp>;
  filled_count?: Maybe<Bigint_Comparison_Exp>;
  liked?: Maybe<Numeric_Comparison_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Prof_Rating_Max_Fields = {
  __typename?: 'aggregate_prof_rating_max_fields';
  clear?: Maybe<Scalars['numeric']>;
  comment_count?: Maybe<Scalars['bigint']>;
  engaging?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Max_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Prof_Rating_Min_Fields = {
  __typename?: 'aggregate_prof_rating_min_fields';
  clear?: Maybe<Scalars['numeric']>;
  comment_count?: Maybe<Scalars['bigint']>;
  engaging?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Min_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** select columns of table "aggregate.prof_rating" */
export enum Aggregate_Prof_Rating_Select_Column {
  /** column name */
  Clear = 'clear',
  /** column name */
  CommentCount = 'comment_count',
  /** column name */
  Engaging = 'engaging',
  /** column name */
  FilledCount = 'filled_count',
  /** column name */
  Liked = 'liked',
  /** column name */
  ProfId = 'prof_id',
}

/** aggregate stddev on columns */
export type Aggregate_Prof_Rating_Stddev_Fields = {
  __typename?: 'aggregate_prof_rating_stddev_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Stddev_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Prof_Rating_Stddev_Pop_Fields = {
  __typename?: 'aggregate_prof_rating_stddev_pop_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Stddev_Pop_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Prof_Rating_Stddev_Samp_Fields = {
  __typename?: 'aggregate_prof_rating_stddev_samp_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Stddev_Samp_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Prof_Rating_Sum_Fields = {
  __typename?: 'aggregate_prof_rating_sum_fields';
  clear?: Maybe<Scalars['numeric']>;
  comment_count?: Maybe<Scalars['bigint']>;
  engaging?: Maybe<Scalars['numeric']>;
  filled_count?: Maybe<Scalars['bigint']>;
  liked?: Maybe<Scalars['numeric']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Sum_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Prof_Rating_Var_Pop_Fields = {
  __typename?: 'aggregate_prof_rating_var_pop_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Var_Pop_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Prof_Rating_Var_Samp_Fields = {
  __typename?: 'aggregate_prof_rating_var_samp_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Var_Samp_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Prof_Rating_Variance_Fields = {
  __typename?: 'aggregate_prof_rating_variance_fields';
  clear?: Maybe<Scalars['Float']>;
  comment_count?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  filled_count?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.prof_rating" */
export type Aggregate_Prof_Rating_Variance_Order_By = {
  clear?: Maybe<Order_By>;
  comment_count?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  filled_count?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** columns and relationships of "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating = {
  __typename?: 'aggregate_prof_review_rating';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Aggregate = {
  __typename?: 'aggregate_prof_review_rating_aggregate';
  aggregate?: Maybe<Aggregate_Prof_Review_Rating_Aggregate_Fields>;
  nodes: Array<Aggregate_Prof_Review_Rating>;
};

/** aggregate fields of "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Aggregate_Fields = {
  __typename?: 'aggregate_prof_review_rating_aggregate_fields';
  avg?: Maybe<Aggregate_Prof_Review_Rating_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Aggregate_Prof_Review_Rating_Max_Fields>;
  min?: Maybe<Aggregate_Prof_Review_Rating_Min_Fields>;
  stddev?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Fields>;
  stddev_pop?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Samp_Fields>;
  sum?: Maybe<Aggregate_Prof_Review_Rating_Sum_Fields>;
  var_pop?: Maybe<Aggregate_Prof_Review_Rating_Var_Pop_Fields>;
  var_samp?: Maybe<Aggregate_Prof_Review_Rating_Var_Samp_Fields>;
  variance?: Maybe<Aggregate_Prof_Review_Rating_Variance_Fields>;
};

/** aggregate fields of "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Aggregate_Prof_Review_Rating_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Aggregate_Order_By = {
  avg?: Maybe<Aggregate_Prof_Review_Rating_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Aggregate_Prof_Review_Rating_Max_Order_By>;
  min?: Maybe<Aggregate_Prof_Review_Rating_Min_Order_By>;
  stddev?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Order_By>;
  stddev_pop?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Aggregate_Prof_Review_Rating_Stddev_Samp_Order_By>;
  sum?: Maybe<Aggregate_Prof_Review_Rating_Sum_Order_By>;
  var_pop?: Maybe<Aggregate_Prof_Review_Rating_Var_Pop_Order_By>;
  var_samp?: Maybe<Aggregate_Prof_Review_Rating_Var_Samp_Order_By>;
  variance?: Maybe<Aggregate_Prof_Review_Rating_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Aggregate_Prof_Review_Rating_Avg_Fields = {
  __typename?: 'aggregate_prof_review_rating_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table "aggregate.prof_review_rating".
 * All fields are combined with a logical 'AND'.
 */
export type Aggregate_Prof_Review_Rating_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>>>;
  _not?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>>>;
  review_id?: Maybe<Int_Comparison_Exp>;
  upvote_count?: Maybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Aggregate_Prof_Review_Rating_Max_Fields = {
  __typename?: 'aggregate_prof_review_rating_max_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Max_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Aggregate_Prof_Review_Rating_Min_Fields = {
  __typename?: 'aggregate_prof_review_rating_min_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Min_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** ordering options when selecting data from "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** select columns of table "aggregate.prof_review_rating" */
export enum Aggregate_Prof_Review_Rating_Select_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UpvoteCount = 'upvote_count',
}

/** aggregate stddev on columns */
export type Aggregate_Prof_Review_Rating_Stddev_Fields = {
  __typename?: 'aggregate_prof_review_rating_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Aggregate_Prof_Review_Rating_Stddev_Pop_Fields = {
  __typename?: 'aggregate_prof_review_rating_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Aggregate_Prof_Review_Rating_Stddev_Samp_Fields = {
  __typename?: 'aggregate_prof_review_rating_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Aggregate_Prof_Review_Rating_Sum_Fields = {
  __typename?: 'aggregate_prof_review_rating_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
  upvote_count?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Aggregate_Prof_Review_Rating_Var_Pop_Fields = {
  __typename?: 'aggregate_prof_review_rating_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Aggregate_Prof_Review_Rating_Var_Samp_Fields = {
  __typename?: 'aggregate_prof_review_rating_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Aggregate_Prof_Review_Rating_Variance_Fields = {
  __typename?: 'aggregate_prof_review_rating_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
  upvote_count?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "aggregate.prof_review_rating" */
export type Aggregate_Prof_Review_Rating_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
  upvote_count?: Maybe<Order_By>;
};

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "course" */
export type Course = {
  __typename?: 'course';
  antireqs?: Maybe<Scalars['String']>;
  /** An array relationship */
  antirequisites: Array<Course_Antirequisite>;
  /** An aggregated array relationship */
  antirequisites_aggregate: Course_Antirequisite_Aggregate;
  authoritative: Scalars['Boolean'];
  code: Scalars['String'];
  coreqs?: Maybe<Scalars['String']>;
  /** An array relationship */
  course_easy_buckets: Array<Aggregate_Course_Easy_Buckets>;
  /** An aggregated array relationship */
  course_easy_buckets_aggregate: Aggregate_Course_Easy_Buckets_Aggregate;
  /** An array relationship */
  course_useful_buckets: Array<Aggregate_Course_Useful_Buckets>;
  /** An aggregated array relationship */
  course_useful_buckets_aggregate: Aggregate_Course_Useful_Buckets_Aggregate;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  postrequisites: Array<Course_Postrequisite>;
  /** An aggregated array relationship */
  postrequisites_aggregate: Course_Postrequisite_Aggregate;
  prereqs?: Maybe<Scalars['String']>;
  /** An array relationship */
  prerequisites: Array<Course_Prerequisite>;
  /** An aggregated array relationship */
  prerequisites_aggregate: Course_Prerequisite_Aggregate;
  /** An array relationship */
  profs_teaching: Array<Prof_Teaches_Course>;
  /** An aggregated array relationship */
  profs_teaching_aggregate: Prof_Teaches_Course_Aggregate;
  /** An object relationship */
  rating?: Maybe<Aggregate_Course_Rating>;
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregated array relationship */
  reviews_aggregate: Review_Aggregate;
  /** An array relationship */
  sections: Array<Course_Section>;
  /** An aggregated array relationship */
  sections_aggregate: Course_Section_Aggregate;
};

/** columns and relationships of "course" */
export type CourseAntirequisitesArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseAntirequisites_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseCourse_Easy_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseCourse_Easy_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseCourse_Useful_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseCourse_Useful_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CoursePostrequisitesArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CoursePostrequisites_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CoursePrerequisitesArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CoursePrerequisites_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseProfs_TeachingArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseProfs_Teaching_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseReviewsArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseReviews_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseSectionsArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** columns and relationships of "course" */
export type CourseSections_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** aggregated selection of "course" */
export type Course_Aggregate = {
  __typename?: 'course_aggregate';
  aggregate?: Maybe<Course_Aggregate_Fields>;
  nodes: Array<Course>;
};

/** aggregate fields of "course" */
export type Course_Aggregate_Fields = {
  __typename?: 'course_aggregate_fields';
  avg?: Maybe<Course_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Max_Fields>;
  min?: Maybe<Course_Min_Fields>;
  stddev?: Maybe<Course_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Sum_Fields>;
  var_pop?: Maybe<Course_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Var_Samp_Fields>;
  variance?: Maybe<Course_Variance_Fields>;
};

/** aggregate fields of "course" */
export type Course_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course" */
export type Course_Aggregate_Order_By = {
  avg?: Maybe<Course_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Max_Order_By>;
  min?: Maybe<Course_Min_Order_By>;
  stddev?: Maybe<Course_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Sum_Order_By>;
  var_pop?: Maybe<Course_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Var_Samp_Order_By>;
  variance?: Maybe<Course_Variance_Order_By>;
};

/** columns and relationships of "course_antirequisite" */
export type Course_Antirequisite = {
  __typename?: 'course_antirequisite';
  /** An object relationship */
  antirequisite?: Maybe<Course>;
  antirequisite_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "course_antirequisite" */
export type Course_Antirequisite_Aggregate = {
  __typename?: 'course_antirequisite_aggregate';
  aggregate?: Maybe<Course_Antirequisite_Aggregate_Fields>;
  nodes: Array<Course_Antirequisite>;
};

/** aggregate fields of "course_antirequisite" */
export type Course_Antirequisite_Aggregate_Fields = {
  __typename?: 'course_antirequisite_aggregate_fields';
  avg?: Maybe<Course_Antirequisite_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Antirequisite_Max_Fields>;
  min?: Maybe<Course_Antirequisite_Min_Fields>;
  stddev?: Maybe<Course_Antirequisite_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Antirequisite_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Antirequisite_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Antirequisite_Sum_Fields>;
  var_pop?: Maybe<Course_Antirequisite_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Antirequisite_Var_Samp_Fields>;
  variance?: Maybe<Course_Antirequisite_Variance_Fields>;
};

/** aggregate fields of "course_antirequisite" */
export type Course_Antirequisite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_antirequisite" */
export type Course_Antirequisite_Aggregate_Order_By = {
  avg?: Maybe<Course_Antirequisite_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Antirequisite_Max_Order_By>;
  min?: Maybe<Course_Antirequisite_Min_Order_By>;
  stddev?: Maybe<Course_Antirequisite_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Antirequisite_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Antirequisite_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Antirequisite_Sum_Order_By>;
  var_pop?: Maybe<Course_Antirequisite_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Antirequisite_Var_Samp_Order_By>;
  variance?: Maybe<Course_Antirequisite_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_antirequisite" */
export type Course_Antirequisite_Arr_Rel_Insert_Input = {
  data: Array<Course_Antirequisite_Insert_Input>;
  on_conflict?: Maybe<Course_Antirequisite_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Antirequisite_Avg_Fields = {
  __typename?: 'course_antirequisite_avg_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Avg_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_antirequisite". All fields are combined with a logical 'AND'. */
export type Course_Antirequisite_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Antirequisite_Bool_Exp>>>;
  _not?: Maybe<Course_Antirequisite_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Antirequisite_Bool_Exp>>>;
  antirequisite?: Maybe<Course_Bool_Exp>;
  antirequisite_id?: Maybe<Int_Comparison_Exp>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_antirequisite" */
export enum Course_Antirequisite_Constraint {
  /** unique or primary key constraint */
  AntirequisiteUnique = 'antirequisite_unique',
}

/** input type for incrementing integer column in table "course_antirequisite" */
export type Course_Antirequisite_Inc_Input = {
  antirequisite_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_antirequisite" */
export type Course_Antirequisite_Insert_Input = {
  antirequisite?: Maybe<Course_Obj_Rel_Insert_Input>;
  antirequisite_id?: Maybe<Scalars['Int']>;
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Course_Antirequisite_Max_Fields = {
  __typename?: 'course_antirequisite_max_fields';
  antirequisite_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Max_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Antirequisite_Min_Fields = {
  __typename?: 'course_antirequisite_min_fields';
  antirequisite_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Min_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_antirequisite" */
export type Course_Antirequisite_Mutation_Response = {
  __typename?: 'course_antirequisite_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Antirequisite>;
};

/** input type for inserting object relation for remote table "course_antirequisite" */
export type Course_Antirequisite_Obj_Rel_Insert_Input = {
  data: Course_Antirequisite_Insert_Input;
  on_conflict?: Maybe<Course_Antirequisite_On_Conflict>;
};

/** on conflict condition type for table "course_antirequisite" */
export type Course_Antirequisite_On_Conflict = {
  constraint: Course_Antirequisite_Constraint;
  update_columns: Array<Course_Antirequisite_Update_Column>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** ordering options when selecting data from "course_antirequisite" */
export type Course_Antirequisite_Order_By = {
  antirequisite?: Maybe<Course_Order_By>;
  antirequisite_id?: Maybe<Order_By>;
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
};

/** select columns of table "course_antirequisite" */
export enum Course_Antirequisite_Select_Column {
  /** column name */
  AntirequisiteId = 'antirequisite_id',
  /** column name */
  CourseId = 'course_id',
}

/** input type for updating data in table "course_antirequisite" */
export type Course_Antirequisite_Set_Input = {
  antirequisite_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Course_Antirequisite_Stddev_Fields = {
  __typename?: 'course_antirequisite_stddev_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Stddev_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Antirequisite_Stddev_Pop_Fields = {
  __typename?: 'course_antirequisite_stddev_pop_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Stddev_Pop_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Antirequisite_Stddev_Samp_Fields = {
  __typename?: 'course_antirequisite_stddev_samp_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Stddev_Samp_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Antirequisite_Sum_Fields = {
  __typename?: 'course_antirequisite_sum_fields';
  antirequisite_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Sum_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** update columns of table "course_antirequisite" */
export enum Course_Antirequisite_Update_Column {
  /** column name */
  AntirequisiteId = 'antirequisite_id',
  /** column name */
  CourseId = 'course_id',
}

/** aggregate var_pop on columns */
export type Course_Antirequisite_Var_Pop_Fields = {
  __typename?: 'course_antirequisite_var_pop_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Var_Pop_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Antirequisite_Var_Samp_Fields = {
  __typename?: 'course_antirequisite_var_samp_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Var_Samp_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Antirequisite_Variance_Fields = {
  __typename?: 'course_antirequisite_variance_fields';
  antirequisite_id?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_antirequisite" */
export type Course_Antirequisite_Variance_Order_By = {
  antirequisite_id?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
};

/** input type for inserting array relation for remote table "course" */
export type Course_Arr_Rel_Insert_Input = {
  data: Array<Course_Insert_Input>;
  on_conflict?: Maybe<Course_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Avg_Fields = {
  __typename?: 'course_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course" */
export type Course_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course". All fields are combined with a logical 'AND'. */
export type Course_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Bool_Exp>>>;
  _not?: Maybe<Course_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Bool_Exp>>>;
  antireqs?: Maybe<String_Comparison_Exp>;
  antirequisites?: Maybe<Course_Antirequisite_Bool_Exp>;
  authoritative?: Maybe<Boolean_Comparison_Exp>;
  code?: Maybe<String_Comparison_Exp>;
  coreqs?: Maybe<String_Comparison_Exp>;
  course_easy_buckets?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
  course_useful_buckets?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  postrequisites?: Maybe<Course_Postrequisite_Bool_Exp>;
  prereqs?: Maybe<String_Comparison_Exp>;
  prerequisites?: Maybe<Course_Prerequisite_Bool_Exp>;
  profs_teaching?: Maybe<Prof_Teaches_Course_Bool_Exp>;
  rating?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
  reviews?: Maybe<Review_Bool_Exp>;
  sections?: Maybe<Course_Section_Bool_Exp>;
};

/** unique or primary key constraints on table "course" */
export enum Course_Constraint {
  /** unique or primary key constraint */
  CourseCodeUnique = 'course_code_unique',
  /** unique or primary key constraint */
  CoursePkey = 'course_pkey',
}

/** input type for incrementing integer column in table "course" */
export type Course_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course" */
export type Course_Insert_Input = {
  antireqs?: Maybe<Scalars['String']>;
  antirequisites?: Maybe<Course_Antirequisite_Arr_Rel_Insert_Input>;
  authoritative?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  coreqs?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  postrequisites?: Maybe<Course_Postrequisite_Arr_Rel_Insert_Input>;
  prereqs?: Maybe<Scalars['String']>;
  prerequisites?: Maybe<Course_Prerequisite_Arr_Rel_Insert_Input>;
  reviews?: Maybe<Review_Arr_Rel_Insert_Input>;
  sections?: Maybe<Course_Section_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Course_Max_Fields = {
  __typename?: 'course_max_fields';
  antireqs?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  coreqs?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  prereqs?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "course" */
export type Course_Max_Order_By = {
  antireqs?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  coreqs?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prereqs?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Min_Fields = {
  __typename?: 'course_min_fields';
  antireqs?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  coreqs?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  prereqs?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "course" */
export type Course_Min_Order_By = {
  antireqs?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  coreqs?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prereqs?: Maybe<Order_By>;
};

/** response of any mutation on the table "course" */
export type Course_Mutation_Response = {
  __typename?: 'course_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course>;
};

/** input type for inserting object relation for remote table "course" */
export type Course_Obj_Rel_Insert_Input = {
  data: Course_Insert_Input;
  on_conflict?: Maybe<Course_On_Conflict>;
};

/** on conflict condition type for table "course" */
export type Course_On_Conflict = {
  constraint: Course_Constraint;
  update_columns: Array<Course_Update_Column>;
  where?: Maybe<Course_Bool_Exp>;
};

/** ordering options when selecting data from "course" */
export type Course_Order_By = {
  antireqs?: Maybe<Order_By>;
  antirequisites_aggregate?: Maybe<Course_Antirequisite_Aggregate_Order_By>;
  authoritative?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  coreqs?: Maybe<Order_By>;
  course_easy_buckets_aggregate?: Maybe<
    Aggregate_Course_Easy_Buckets_Aggregate_Order_By
  >;
  course_useful_buckets_aggregate?: Maybe<
    Aggregate_Course_Useful_Buckets_Aggregate_Order_By
  >;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  postrequisites_aggregate?: Maybe<Course_Postrequisite_Aggregate_Order_By>;
  prereqs?: Maybe<Order_By>;
  prerequisites_aggregate?: Maybe<Course_Prerequisite_Aggregate_Order_By>;
  profs_teaching_aggregate?: Maybe<Prof_Teaches_Course_Aggregate_Order_By>;
  rating?: Maybe<Aggregate_Course_Rating_Order_By>;
  reviews_aggregate?: Maybe<Review_Aggregate_Order_By>;
  sections_aggregate?: Maybe<Course_Section_Aggregate_Order_By>;
};

/** primary key columns input for table: "course" */
export type Course_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "course_postrequisite" */
export type Course_Postrequisite = {
  __typename?: 'course_postrequisite';
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite?: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  postrequisite?: Maybe<Course>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "course_postrequisite" */
export type Course_Postrequisite_Aggregate = {
  __typename?: 'course_postrequisite_aggregate';
  aggregate?: Maybe<Course_Postrequisite_Aggregate_Fields>;
  nodes: Array<Course_Postrequisite>;
};

/** aggregate fields of "course_postrequisite" */
export type Course_Postrequisite_Aggregate_Fields = {
  __typename?: 'course_postrequisite_aggregate_fields';
  avg?: Maybe<Course_Postrequisite_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Postrequisite_Max_Fields>;
  min?: Maybe<Course_Postrequisite_Min_Fields>;
  stddev?: Maybe<Course_Postrequisite_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Postrequisite_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Postrequisite_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Postrequisite_Sum_Fields>;
  var_pop?: Maybe<Course_Postrequisite_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Postrequisite_Var_Samp_Fields>;
  variance?: Maybe<Course_Postrequisite_Variance_Fields>;
};

/** aggregate fields of "course_postrequisite" */
export type Course_Postrequisite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_postrequisite" */
export type Course_Postrequisite_Aggregate_Order_By = {
  avg?: Maybe<Course_Postrequisite_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Postrequisite_Max_Order_By>;
  min?: Maybe<Course_Postrequisite_Min_Order_By>;
  stddev?: Maybe<Course_Postrequisite_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Postrequisite_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Postrequisite_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Postrequisite_Sum_Order_By>;
  var_pop?: Maybe<Course_Postrequisite_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Postrequisite_Var_Samp_Order_By>;
  variance?: Maybe<Course_Postrequisite_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_postrequisite" */
export type Course_Postrequisite_Arr_Rel_Insert_Input = {
  data: Array<Course_Postrequisite_Insert_Input>;
};

/** aggregate avg on columns */
export type Course_Postrequisite_Avg_Fields = {
  __typename?: 'course_postrequisite_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_postrequisite". All fields are combined with a logical 'AND'. */
export type Course_Postrequisite_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Postrequisite_Bool_Exp>>>;
  _not?: Maybe<Course_Postrequisite_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Postrequisite_Bool_Exp>>>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  is_corequisite?: Maybe<Boolean_Comparison_Exp>;
  postrequisite?: Maybe<Course_Bool_Exp>;
  postrequisite_id?: Maybe<Int_Comparison_Exp>;
};

/** input type for incrementing integer column in table "course_postrequisite" */
export type Course_Postrequisite_Inc_Input = {
  course_id?: Maybe<Scalars['Int']>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_postrequisite" */
export type Course_Postrequisite_Insert_Input = {
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite?: Maybe<Scalars['Boolean']>;
  postrequisite?: Maybe<Course_Obj_Rel_Insert_Input>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Course_Postrequisite_Max_Fields = {
  __typename?: 'course_postrequisite_max_fields';
  course_id?: Maybe<Scalars['Int']>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Max_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Postrequisite_Min_Fields = {
  __typename?: 'course_postrequisite_min_fields';
  course_id?: Maybe<Scalars['Int']>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Min_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_postrequisite" */
export type Course_Postrequisite_Mutation_Response = {
  __typename?: 'course_postrequisite_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Postrequisite>;
};

/** input type for inserting object relation for remote table "course_postrequisite" */
export type Course_Postrequisite_Obj_Rel_Insert_Input = {
  data: Course_Postrequisite_Insert_Input;
};

/** ordering options when selecting data from "course_postrequisite" */
export type Course_Postrequisite_Order_By = {
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  is_corequisite?: Maybe<Order_By>;
  postrequisite?: Maybe<Course_Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** select columns of table "course_postrequisite" */
export enum Course_Postrequisite_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  IsCorequisite = 'is_corequisite',
  /** column name */
  PostrequisiteId = 'postrequisite_id',
}

/** input type for updating data in table "course_postrequisite" */
export type Course_Postrequisite_Set_Input = {
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite?: Maybe<Scalars['Boolean']>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Course_Postrequisite_Stddev_Fields = {
  __typename?: 'course_postrequisite_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Postrequisite_Stddev_Pop_Fields = {
  __typename?: 'course_postrequisite_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Postrequisite_Stddev_Samp_Fields = {
  __typename?: 'course_postrequisite_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Postrequisite_Sum_Fields = {
  __typename?: 'course_postrequisite_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  postrequisite_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Course_Postrequisite_Var_Pop_Fields = {
  __typename?: 'course_postrequisite_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Postrequisite_Var_Samp_Fields = {
  __typename?: 'course_postrequisite_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Postrequisite_Variance_Fields = {
  __typename?: 'course_postrequisite_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  postrequisite_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_postrequisite" */
export type Course_Postrequisite_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  postrequisite_id?: Maybe<Order_By>;
};

/** columns and relationships of "course_prerequisite" */
export type Course_Prerequisite = {
  __typename?: 'course_prerequisite';
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite: Scalars['Boolean'];
  /** An object relationship */
  prerequisite?: Maybe<Course>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "course_prerequisite" */
export type Course_Prerequisite_Aggregate = {
  __typename?: 'course_prerequisite_aggregate';
  aggregate?: Maybe<Course_Prerequisite_Aggregate_Fields>;
  nodes: Array<Course_Prerequisite>;
};

/** aggregate fields of "course_prerequisite" */
export type Course_Prerequisite_Aggregate_Fields = {
  __typename?: 'course_prerequisite_aggregate_fields';
  avg?: Maybe<Course_Prerequisite_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Prerequisite_Max_Fields>;
  min?: Maybe<Course_Prerequisite_Min_Fields>;
  stddev?: Maybe<Course_Prerequisite_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Prerequisite_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Prerequisite_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Prerequisite_Sum_Fields>;
  var_pop?: Maybe<Course_Prerequisite_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Prerequisite_Var_Samp_Fields>;
  variance?: Maybe<Course_Prerequisite_Variance_Fields>;
};

/** aggregate fields of "course_prerequisite" */
export type Course_Prerequisite_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_prerequisite" */
export type Course_Prerequisite_Aggregate_Order_By = {
  avg?: Maybe<Course_Prerequisite_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Prerequisite_Max_Order_By>;
  min?: Maybe<Course_Prerequisite_Min_Order_By>;
  stddev?: Maybe<Course_Prerequisite_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Prerequisite_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Prerequisite_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Prerequisite_Sum_Order_By>;
  var_pop?: Maybe<Course_Prerequisite_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Prerequisite_Var_Samp_Order_By>;
  variance?: Maybe<Course_Prerequisite_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_prerequisite" */
export type Course_Prerequisite_Arr_Rel_Insert_Input = {
  data: Array<Course_Prerequisite_Insert_Input>;
  on_conflict?: Maybe<Course_Prerequisite_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Prerequisite_Avg_Fields = {
  __typename?: 'course_prerequisite_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_prerequisite". All fields are combined with a logical 'AND'. */
export type Course_Prerequisite_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Prerequisite_Bool_Exp>>>;
  _not?: Maybe<Course_Prerequisite_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Prerequisite_Bool_Exp>>>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  is_corequisite?: Maybe<Boolean_Comparison_Exp>;
  prerequisite?: Maybe<Course_Bool_Exp>;
  prerequisite_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_prerequisite" */
export enum Course_Prerequisite_Constraint {
  /** unique or primary key constraint */
  PrerequisiteUnique = 'prerequisite_unique',
}

/** input type for incrementing integer column in table "course_prerequisite" */
export type Course_Prerequisite_Inc_Input = {
  course_id?: Maybe<Scalars['Int']>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_prerequisite" */
export type Course_Prerequisite_Insert_Input = {
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite?: Maybe<Scalars['Boolean']>;
  prerequisite?: Maybe<Course_Obj_Rel_Insert_Input>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Course_Prerequisite_Max_Fields = {
  __typename?: 'course_prerequisite_max_fields';
  course_id?: Maybe<Scalars['Int']>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Max_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Prerequisite_Min_Fields = {
  __typename?: 'course_prerequisite_min_fields';
  course_id?: Maybe<Scalars['Int']>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Min_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_prerequisite" */
export type Course_Prerequisite_Mutation_Response = {
  __typename?: 'course_prerequisite_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Prerequisite>;
};

/** input type for inserting object relation for remote table "course_prerequisite" */
export type Course_Prerequisite_Obj_Rel_Insert_Input = {
  data: Course_Prerequisite_Insert_Input;
  on_conflict?: Maybe<Course_Prerequisite_On_Conflict>;
};

/** on conflict condition type for table "course_prerequisite" */
export type Course_Prerequisite_On_Conflict = {
  constraint: Course_Prerequisite_Constraint;
  update_columns: Array<Course_Prerequisite_Update_Column>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** ordering options when selecting data from "course_prerequisite" */
export type Course_Prerequisite_Order_By = {
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  is_corequisite?: Maybe<Order_By>;
  prerequisite?: Maybe<Course_Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** select columns of table "course_prerequisite" */
export enum Course_Prerequisite_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  IsCorequisite = 'is_corequisite',
  /** column name */
  PrerequisiteId = 'prerequisite_id',
}

/** input type for updating data in table "course_prerequisite" */
export type Course_Prerequisite_Set_Input = {
  course_id?: Maybe<Scalars['Int']>;
  is_corequisite?: Maybe<Scalars['Boolean']>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Course_Prerequisite_Stddev_Fields = {
  __typename?: 'course_prerequisite_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Prerequisite_Stddev_Pop_Fields = {
  __typename?: 'course_prerequisite_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Prerequisite_Stddev_Samp_Fields = {
  __typename?: 'course_prerequisite_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Prerequisite_Sum_Fields = {
  __typename?: 'course_prerequisite_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  prerequisite_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** update columns of table "course_prerequisite" */
export enum Course_Prerequisite_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  IsCorequisite = 'is_corequisite',
  /** column name */
  PrerequisiteId = 'prerequisite_id',
}

/** aggregate var_pop on columns */
export type Course_Prerequisite_Var_Pop_Fields = {
  __typename?: 'course_prerequisite_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Prerequisite_Var_Samp_Fields = {
  __typename?: 'course_prerequisite_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Prerequisite_Variance_Fields = {
  __typename?: 'course_prerequisite_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  prerequisite_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_prerequisite" */
export type Course_Prerequisite_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  prerequisite_id?: Maybe<Order_By>;
};

/** columns and relationships of "course_review_upvote" */
export type Course_Review_Upvote = {
  __typename?: 'course_review_upvote';
  review_id: Scalars['Int'];
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "course_review_upvote" */
export type Course_Review_Upvote_Aggregate = {
  __typename?: 'course_review_upvote_aggregate';
  aggregate?: Maybe<Course_Review_Upvote_Aggregate_Fields>;
  nodes: Array<Course_Review_Upvote>;
};

/** aggregate fields of "course_review_upvote" */
export type Course_Review_Upvote_Aggregate_Fields = {
  __typename?: 'course_review_upvote_aggregate_fields';
  avg?: Maybe<Course_Review_Upvote_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Review_Upvote_Max_Fields>;
  min?: Maybe<Course_Review_Upvote_Min_Fields>;
  stddev?: Maybe<Course_Review_Upvote_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Review_Upvote_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Review_Upvote_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Review_Upvote_Sum_Fields>;
  var_pop?: Maybe<Course_Review_Upvote_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Review_Upvote_Var_Samp_Fields>;
  variance?: Maybe<Course_Review_Upvote_Variance_Fields>;
};

/** aggregate fields of "course_review_upvote" */
export type Course_Review_Upvote_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_review_upvote" */
export type Course_Review_Upvote_Aggregate_Order_By = {
  avg?: Maybe<Course_Review_Upvote_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Review_Upvote_Max_Order_By>;
  min?: Maybe<Course_Review_Upvote_Min_Order_By>;
  stddev?: Maybe<Course_Review_Upvote_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Review_Upvote_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Review_Upvote_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Review_Upvote_Sum_Order_By>;
  var_pop?: Maybe<Course_Review_Upvote_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Review_Upvote_Var_Samp_Order_By>;
  variance?: Maybe<Course_Review_Upvote_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_review_upvote" */
export type Course_Review_Upvote_Arr_Rel_Insert_Input = {
  data: Array<Course_Review_Upvote_Insert_Input>;
  on_conflict?: Maybe<Course_Review_Upvote_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Review_Upvote_Avg_Fields = {
  __typename?: 'course_review_upvote_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_review_upvote". All fields are combined with a logical 'AND'. */
export type Course_Review_Upvote_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Review_Upvote_Bool_Exp>>>;
  _not?: Maybe<Course_Review_Upvote_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Review_Upvote_Bool_Exp>>>;
  review_id?: Maybe<Int_Comparison_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_review_upvote" */
export enum Course_Review_Upvote_Constraint {
  /** unique or primary key constraint */
  CourseReviewUpvoteUnique = 'course_review_upvote_unique',
}

/** input type for incrementing integer column in table "course_review_upvote" */
export type Course_Review_Upvote_Inc_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_review_upvote" */
export type Course_Review_Upvote_Insert_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Course_Review_Upvote_Max_Fields = {
  __typename?: 'course_review_upvote_max_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Max_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Review_Upvote_Min_Fields = {
  __typename?: 'course_review_upvote_min_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Min_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_review_upvote" */
export type Course_Review_Upvote_Mutation_Response = {
  __typename?: 'course_review_upvote_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Review_Upvote>;
};

/** input type for inserting object relation for remote table "course_review_upvote" */
export type Course_Review_Upvote_Obj_Rel_Insert_Input = {
  data: Course_Review_Upvote_Insert_Input;
  on_conflict?: Maybe<Course_Review_Upvote_On_Conflict>;
};

/** on conflict condition type for table "course_review_upvote" */
export type Course_Review_Upvote_On_Conflict = {
  constraint: Course_Review_Upvote_Constraint;
  update_columns: Array<Course_Review_Upvote_Update_Column>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** ordering options when selecting data from "course_review_upvote" */
export type Course_Review_Upvote_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "course_review_upvote" */
export enum Course_Review_Upvote_Select_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "course_review_upvote" */
export type Course_Review_Upvote_Set_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Course_Review_Upvote_Stddev_Fields = {
  __typename?: 'course_review_upvote_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Review_Upvote_Stddev_Pop_Fields = {
  __typename?: 'course_review_upvote_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Review_Upvote_Stddev_Samp_Fields = {
  __typename?: 'course_review_upvote_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Review_Upvote_Sum_Fields = {
  __typename?: 'course_review_upvote_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "course_review_upvote" */
export enum Course_Review_Upvote_Update_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Course_Review_Upvote_Var_Pop_Fields = {
  __typename?: 'course_review_upvote_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Review_Upvote_Var_Samp_Fields = {
  __typename?: 'course_review_upvote_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Review_Upvote_Variance_Fields = {
  __typename?: 'course_review_upvote_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_review_upvote" */
export type Course_Review_Upvote_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** columns and relationships of "course_search_index" */
export type Course_Search_Index = {
  __typename?: 'course_search_index';
  code?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['Int']>;
  course_letters?: Maybe<Scalars['String']>;
  document?: Maybe<Scalars['tsvector']>;
  easy?: Maybe<Scalars['numeric']>;
  has_prereqs?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  prof_ids?: Maybe<Scalars['_int4']>;
  ratings?: Maybe<Scalars['bigint']>;
  terms?: Maybe<Scalars['_int4']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** aggregated selection of "course_search_index" */
export type Course_Search_Index_Aggregate = {
  __typename?: 'course_search_index_aggregate';
  aggregate?: Maybe<Course_Search_Index_Aggregate_Fields>;
  nodes: Array<Course_Search_Index>;
};

/** aggregate fields of "course_search_index" */
export type Course_Search_Index_Aggregate_Fields = {
  __typename?: 'course_search_index_aggregate_fields';
  avg?: Maybe<Course_Search_Index_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Search_Index_Max_Fields>;
  min?: Maybe<Course_Search_Index_Min_Fields>;
  stddev?: Maybe<Course_Search_Index_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Search_Index_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Search_Index_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Search_Index_Sum_Fields>;
  var_pop?: Maybe<Course_Search_Index_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Search_Index_Var_Samp_Fields>;
  variance?: Maybe<Course_Search_Index_Variance_Fields>;
};

/** aggregate fields of "course_search_index" */
export type Course_Search_Index_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Search_Index_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_search_index" */
export type Course_Search_Index_Aggregate_Order_By = {
  avg?: Maybe<Course_Search_Index_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Search_Index_Max_Order_By>;
  min?: Maybe<Course_Search_Index_Min_Order_By>;
  stddev?: Maybe<Course_Search_Index_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Search_Index_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Search_Index_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Search_Index_Sum_Order_By>;
  var_pop?: Maybe<Course_Search_Index_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Search_Index_Var_Samp_Order_By>;
  variance?: Maybe<Course_Search_Index_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Course_Search_Index_Avg_Fields = {
  __typename?: 'course_search_index_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_search_index" */
export type Course_Search_Index_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_search_index". All fields are combined with a logical 'AND'. */
export type Course_Search_Index_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Search_Index_Bool_Exp>>>;
  _not?: Maybe<Course_Search_Index_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Search_Index_Bool_Exp>>>;
  code?: Maybe<String_Comparison_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  course_letters?: Maybe<String_Comparison_Exp>;
  document?: Maybe<Tsvector_Comparison_Exp>;
  easy?: Maybe<Numeric_Comparison_Exp>;
  has_prereqs?: Maybe<Boolean_Comparison_Exp>;
  liked?: Maybe<Numeric_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  prof_ids?: Maybe<_Int4_Comparison_Exp>;
  ratings?: Maybe<Bigint_Comparison_Exp>;
  terms?: Maybe<_Int4_Comparison_Exp>;
  useful?: Maybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Course_Search_Index_Max_Fields = {
  __typename?: 'course_search_index_max_fields';
  code?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['Int']>;
  course_letters?: Maybe<Scalars['String']>;
  easy?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  ratings?: Maybe<Scalars['bigint']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "course_search_index" */
export type Course_Search_Index_Max_Order_By = {
  code?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_letters?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Search_Index_Min_Fields = {
  __typename?: 'course_search_index_min_fields';
  code?: Maybe<Scalars['String']>;
  course_id?: Maybe<Scalars['Int']>;
  course_letters?: Maybe<Scalars['String']>;
  easy?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  ratings?: Maybe<Scalars['bigint']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "course_search_index" */
export type Course_Search_Index_Min_Order_By = {
  code?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_letters?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** ordering options when selecting data from "course_search_index" */
export type Course_Search_Index_Order_By = {
  code?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_letters?: Maybe<Order_By>;
  document?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  has_prereqs?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prof_ids?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  terms?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** select columns of table "course_search_index" */
export enum Course_Search_Index_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseLetters = 'course_letters',
  /** column name */
  Document = 'document',
  /** column name */
  Easy = 'easy',
  /** column name */
  HasPrereqs = 'has_prereqs',
  /** column name */
  Liked = 'liked',
  /** column name */
  Name = 'name',
  /** column name */
  ProfIds = 'prof_ids',
  /** column name */
  Ratings = 'ratings',
  /** column name */
  Terms = 'terms',
  /** column name */
  Useful = 'useful',
}

/** aggregate stddev on columns */
export type Course_Search_Index_Stddev_Fields = {
  __typename?: 'course_search_index_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_search_index" */
export type Course_Search_Index_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Search_Index_Stddev_Pop_Fields = {
  __typename?: 'course_search_index_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_search_index" */
export type Course_Search_Index_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Search_Index_Stddev_Samp_Fields = {
  __typename?: 'course_search_index_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_search_index" */
export type Course_Search_Index_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Search_Index_Sum_Fields = {
  __typename?: 'course_search_index_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  easy?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  ratings?: Maybe<Scalars['bigint']>;
  useful?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "course_search_index" */
export type Course_Search_Index_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Course_Search_Index_Var_Pop_Fields = {
  __typename?: 'course_search_index_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_search_index" */
export type Course_Search_Index_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Search_Index_Var_Samp_Fields = {
  __typename?: 'course_search_index_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_search_index" */
export type Course_Search_Index_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Search_Index_Variance_Fields = {
  __typename?: 'course_search_index_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  easy?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
  useful?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_search_index" */
export type Course_Search_Index_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  easy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
  useful?: Maybe<Order_By>;
};

/** columns and relationships of "course_section" */
export type Course_Section = {
  __typename?: 'course_section';
  class_number: Scalars['Int'];
  /** An object relationship */
  course: Course;
  course_id: Scalars['Int'];
  enrollment_capacity: Scalars['Int'];
  enrollment_total: Scalars['Int'];
  /** An array relationship */
  exams: Array<Section_Exam>;
  /** An aggregated array relationship */
  exams_aggregate: Section_Exam_Aggregate;
  id: Scalars['Int'];
  /** An array relationship */
  meetings: Array<Section_Meeting>;
  /** An aggregated array relationship */
  meetings_aggregate: Section_Meeting_Aggregate;
  section_name: Scalars['String'];
  term_id: Scalars['Int'];
  updated_at: Scalars['timestamptz'];
};

/** columns and relationships of "course_section" */
export type Course_SectionExamsArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** columns and relationships of "course_section" */
export type Course_SectionExams_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** columns and relationships of "course_section" */
export type Course_SectionMeetingsArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** columns and relationships of "course_section" */
export type Course_SectionMeetings_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** aggregated selection of "course_section" */
export type Course_Section_Aggregate = {
  __typename?: 'course_section_aggregate';
  aggregate?: Maybe<Course_Section_Aggregate_Fields>;
  nodes: Array<Course_Section>;
};

/** aggregate fields of "course_section" */
export type Course_Section_Aggregate_Fields = {
  __typename?: 'course_section_aggregate_fields';
  avg?: Maybe<Course_Section_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Course_Section_Max_Fields>;
  min?: Maybe<Course_Section_Min_Fields>;
  stddev?: Maybe<Course_Section_Stddev_Fields>;
  stddev_pop?: Maybe<Course_Section_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Course_Section_Stddev_Samp_Fields>;
  sum?: Maybe<Course_Section_Sum_Fields>;
  var_pop?: Maybe<Course_Section_Var_Pop_Fields>;
  var_samp?: Maybe<Course_Section_Var_Samp_Fields>;
  variance?: Maybe<Course_Section_Variance_Fields>;
};

/** aggregate fields of "course_section" */
export type Course_Section_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Course_Section_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_section" */
export type Course_Section_Aggregate_Order_By = {
  avg?: Maybe<Course_Section_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Course_Section_Max_Order_By>;
  min?: Maybe<Course_Section_Min_Order_By>;
  stddev?: Maybe<Course_Section_Stddev_Order_By>;
  stddev_pop?: Maybe<Course_Section_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Course_Section_Stddev_Samp_Order_By>;
  sum?: Maybe<Course_Section_Sum_Order_By>;
  var_pop?: Maybe<Course_Section_Var_Pop_Order_By>;
  var_samp?: Maybe<Course_Section_Var_Samp_Order_By>;
  variance?: Maybe<Course_Section_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_section" */
export type Course_Section_Arr_Rel_Insert_Input = {
  data: Array<Course_Section_Insert_Input>;
  on_conflict?: Maybe<Course_Section_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Section_Avg_Fields = {
  __typename?: 'course_section_avg_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_section" */
export type Course_Section_Avg_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_section". All fields are combined with a logical 'AND'. */
export type Course_Section_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Course_Section_Bool_Exp>>>;
  _not?: Maybe<Course_Section_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Course_Section_Bool_Exp>>>;
  class_number?: Maybe<Int_Comparison_Exp>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  enrollment_capacity?: Maybe<Int_Comparison_Exp>;
  enrollment_total?: Maybe<Int_Comparison_Exp>;
  exams?: Maybe<Section_Exam_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  meetings?: Maybe<Section_Meeting_Bool_Exp>;
  section_name?: Maybe<String_Comparison_Exp>;
  term_id?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_section" */
export enum Course_Section_Constraint {
  /** unique or primary key constraint */
  ClassNumberUniqueToTerm = 'class_number_unique_to_term',
  /** unique or primary key constraint */
  CourseSectionPkey = 'course_section_pkey',
}

/** input type for incrementing integer column in table "course_section" */
export type Course_Section_Inc_Input = {
  class_number?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  term_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_section" */
export type Course_Section_Insert_Input = {
  class_number?: Maybe<Scalars['Int']>;
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  exams?: Maybe<Section_Exam_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  meetings?: Maybe<Section_Meeting_Arr_Rel_Insert_Input>;
  section_name?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Course_Section_Max_Fields = {
  __typename?: 'course_section_max_fields';
  class_number?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  section_name?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "course_section" */
export type Course_Section_Max_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  section_name?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Section_Min_Fields = {
  __typename?: 'course_section_min_fields';
  class_number?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  section_name?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "course_section" */
export type Course_Section_Min_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  section_name?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_section" */
export type Course_Section_Mutation_Response = {
  __typename?: 'course_section_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Course_Section>;
};

/** input type for inserting object relation for remote table "course_section" */
export type Course_Section_Obj_Rel_Insert_Input = {
  data: Course_Section_Insert_Input;
  on_conflict?: Maybe<Course_Section_On_Conflict>;
};

/** on conflict condition type for table "course_section" */
export type Course_Section_On_Conflict = {
  constraint: Course_Section_Constraint;
  update_columns: Array<Course_Section_Update_Column>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** ordering options when selecting data from "course_section" */
export type Course_Section_Order_By = {
  class_number?: Maybe<Order_By>;
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  exams_aggregate?: Maybe<Section_Exam_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  meetings_aggregate?: Maybe<Section_Meeting_Aggregate_Order_By>;
  section_name?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "course_section" */
export type Course_Section_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "course_section" */
export enum Course_Section_Select_Column {
  /** column name */
  ClassNumber = 'class_number',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  EnrollmentCapacity = 'enrollment_capacity',
  /** column name */
  EnrollmentTotal = 'enrollment_total',
  /** column name */
  Id = 'id',
  /** column name */
  SectionName = 'section_name',
  /** column name */
  TermId = 'term_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "course_section" */
export type Course_Section_Set_Input = {
  class_number?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  section_name?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Course_Section_Stddev_Fields = {
  __typename?: 'course_section_stddev_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_section" */
export type Course_Section_Stddev_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Section_Stddev_Pop_Fields = {
  __typename?: 'course_section_stddev_pop_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_section" */
export type Course_Section_Stddev_Pop_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Section_Stddev_Samp_Fields = {
  __typename?: 'course_section_stddev_samp_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_section" */
export type Course_Section_Stddev_Samp_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Section_Sum_Fields = {
  __typename?: 'course_section_sum_fields';
  class_number?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  enrollment_capacity?: Maybe<Scalars['Int']>;
  enrollment_total?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  term_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_section" */
export type Course_Section_Sum_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** update columns of table "course_section" */
export enum Course_Section_Update_Column {
  /** column name */
  ClassNumber = 'class_number',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  EnrollmentCapacity = 'enrollment_capacity',
  /** column name */
  EnrollmentTotal = 'enrollment_total',
  /** column name */
  Id = 'id',
  /** column name */
  SectionName = 'section_name',
  /** column name */
  TermId = 'term_id',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Course_Section_Var_Pop_Fields = {
  __typename?: 'course_section_var_pop_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_section" */
export type Course_Section_Var_Pop_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Section_Var_Samp_Fields = {
  __typename?: 'course_section_var_samp_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_section" */
export type Course_Section_Var_Samp_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Section_Variance_Fields = {
  __typename?: 'course_section_variance_fields';
  class_number?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  enrollment_capacity?: Maybe<Scalars['Float']>;
  enrollment_total?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_section" */
export type Course_Section_Variance_Order_By = {
  class_number?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  enrollment_capacity?: Maybe<Order_By>;
  enrollment_total?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
};

/** select columns of table "course" */
export enum Course_Select_Column {
  /** column name */
  Antireqs = 'antireqs',
  /** column name */
  Authoritative = 'authoritative',
  /** column name */
  Code = 'code',
  /** column name */
  Coreqs = 'coreqs',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Prereqs = 'prereqs',
}

/** input type for updating data in table "course" */
export type Course_Set_Input = {
  antireqs?: Maybe<Scalars['String']>;
  authoritative?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  coreqs?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  prereqs?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Course_Stddev_Fields = {
  __typename?: 'course_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course" */
export type Course_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Stddev_Pop_Fields = {
  __typename?: 'course_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course" */
export type Course_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Stddev_Samp_Fields = {
  __typename?: 'course_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course" */
export type Course_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Sum_Fields = {
  __typename?: 'course_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course" */
export type Course_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "course" */
export enum Course_Update_Column {
  /** column name */
  Antireqs = 'antireqs',
  /** column name */
  Authoritative = 'authoritative',
  /** column name */
  Code = 'code',
  /** column name */
  Coreqs = 'coreqs',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Prereqs = 'prereqs',
}

/** aggregate var_pop on columns */
export type Course_Var_Pop_Fields = {
  __typename?: 'course_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course" */
export type Course_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Var_Samp_Fields = {
  __typename?: 'course_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course" */
export type Course_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Variance_Fields = {
  __typename?: 'course_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course" */
export type Course_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: Maybe<Scalars['date']>;
  _gt?: Maybe<Scalars['date']>;
  _gte?: Maybe<Scalars['date']>;
  _in?: Maybe<Array<Scalars['date']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['date']>;
  _lte?: Maybe<Scalars['date']>;
  _neq?: Maybe<Scalars['date']>;
  _nin?: Maybe<Array<Scalars['date']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type join_source. All fields are combined with logical 'AND'. */
export type Join_Source_Comparison_Exp = {
  _eq?: Maybe<Scalars['join_source']>;
  _gt?: Maybe<Scalars['join_source']>;
  _gte?: Maybe<Scalars['join_source']>;
  _in?: Maybe<Array<Scalars['join_source']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['join_source']>;
  _lte?: Maybe<Scalars['join_source']>;
  _neq?: Maybe<Scalars['join_source']>;
  _nin?: Maybe<Array<Scalars['join_source']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "course" */
  delete_course?: Maybe<Course_Mutation_Response>;
  /** delete data from the table: "course_antirequisite" */
  delete_course_antirequisite?: Maybe<Course_Antirequisite_Mutation_Response>;
  /** delete single row from the table: "course" */
  delete_course_by_pk?: Maybe<Course>;
  /** delete data from the table: "course_postrequisite" */
  delete_course_postrequisite?: Maybe<Course_Postrequisite_Mutation_Response>;
  /** delete data from the table: "course_prerequisite" */
  delete_course_prerequisite?: Maybe<Course_Prerequisite_Mutation_Response>;
  /** delete data from the table: "course_review_upvote" */
  delete_course_review_upvote?: Maybe<Course_Review_Upvote_Mutation_Response>;
  /** delete data from the table: "course_section" */
  delete_course_section?: Maybe<Course_Section_Mutation_Response>;
  /** delete single row from the table: "course_section" */
  delete_course_section_by_pk?: Maybe<Course_Section>;
  /** delete data from the table: "prof" */
  delete_prof?: Maybe<Prof_Mutation_Response>;
  /** delete single row from the table: "prof" */
  delete_prof_by_pk?: Maybe<Prof>;
  /** delete data from the table: "prof_review_upvote" */
  delete_prof_review_upvote?: Maybe<Prof_Review_Upvote_Mutation_Response>;
  /** delete data from the table: "queue.section_subscribed" */
  delete_queue_section_subscribed?: Maybe<
    Queue_Section_Subscribed_Mutation_Response
  >;
  /** delete single row from the table: "queue.section_subscribed" */
  delete_queue_section_subscribed_by_pk?: Maybe<Queue_Section_Subscribed>;
  /** delete data from the table: "review" */
  delete_review?: Maybe<Review_Mutation_Response>;
  /** delete single row from the table: "review" */
  delete_review_by_pk?: Maybe<Review>;
  /** delete data from the table: "review_user_id" */
  delete_review_user_id?: Maybe<Review_User_Id_Mutation_Response>;
  /** delete data from the table: "section_exam" */
  delete_section_exam?: Maybe<Section_Exam_Mutation_Response>;
  /** delete data from the table: "section_meeting" */
  delete_section_meeting?: Maybe<Section_Meeting_Mutation_Response>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "user_course_taken" */
  delete_user_course_taken?: Maybe<User_Course_Taken_Mutation_Response>;
  /** delete data from the table: "user_schedule" */
  delete_user_schedule?: Maybe<User_Schedule_Mutation_Response>;
  /** delete data from the table: "user_shortlist" */
  delete_user_shortlist?: Maybe<User_Shortlist_Mutation_Response>;
  /** insert data into the table: "course" */
  insert_course?: Maybe<Course_Mutation_Response>;
  /** insert data into the table: "course_antirequisite" */
  insert_course_antirequisite?: Maybe<Course_Antirequisite_Mutation_Response>;
  /** insert a single row into the table: "course_antirequisite" */
  insert_course_antirequisite_one?: Maybe<Course_Antirequisite>;
  /** insert a single row into the table: "course" */
  insert_course_one?: Maybe<Course>;
  /** insert data into the table: "course_postrequisite" */
  insert_course_postrequisite?: Maybe<Course_Postrequisite_Mutation_Response>;
  /** insert a single row into the table: "course_postrequisite" */
  insert_course_postrequisite_one?: Maybe<Course_Postrequisite>;
  /** insert data into the table: "course_prerequisite" */
  insert_course_prerequisite?: Maybe<Course_Prerequisite_Mutation_Response>;
  /** insert a single row into the table: "course_prerequisite" */
  insert_course_prerequisite_one?: Maybe<Course_Prerequisite>;
  /** insert data into the table: "course_review_upvote" */
  insert_course_review_upvote?: Maybe<Course_Review_Upvote_Mutation_Response>;
  /** insert a single row into the table: "course_review_upvote" */
  insert_course_review_upvote_one?: Maybe<Course_Review_Upvote>;
  /** insert data into the table: "course_section" */
  insert_course_section?: Maybe<Course_Section_Mutation_Response>;
  /** insert a single row into the table: "course_section" */
  insert_course_section_one?: Maybe<Course_Section>;
  /** insert data into the table: "prof" */
  insert_prof?: Maybe<Prof_Mutation_Response>;
  /** insert a single row into the table: "prof" */
  insert_prof_one?: Maybe<Prof>;
  /** insert data into the table: "prof_review_upvote" */
  insert_prof_review_upvote?: Maybe<Prof_Review_Upvote_Mutation_Response>;
  /** insert a single row into the table: "prof_review_upvote" */
  insert_prof_review_upvote_one?: Maybe<Prof_Review_Upvote>;
  /** insert data into the table: "queue.section_subscribed" */
  insert_queue_section_subscribed?: Maybe<
    Queue_Section_Subscribed_Mutation_Response
  >;
  /** insert a single row into the table: "queue.section_subscribed" */
  insert_queue_section_subscribed_one?: Maybe<Queue_Section_Subscribed>;
  /** insert data into the table: "review" */
  insert_review?: Maybe<Review_Mutation_Response>;
  /** insert a single row into the table: "review" */
  insert_review_one?: Maybe<Review>;
  /** insert data into the table: "review_user_id" */
  insert_review_user_id?: Maybe<Review_User_Id_Mutation_Response>;
  /** insert a single row into the table: "review_user_id" */
  insert_review_user_id_one?: Maybe<Review_User_Id>;
  /** insert data into the table: "section_exam" */
  insert_section_exam?: Maybe<Section_Exam_Mutation_Response>;
  /** insert a single row into the table: "section_exam" */
  insert_section_exam_one?: Maybe<Section_Exam>;
  /** insert data into the table: "section_meeting" */
  insert_section_meeting?: Maybe<Section_Meeting_Mutation_Response>;
  /** insert a single row into the table: "section_meeting" */
  insert_section_meeting_one?: Maybe<Section_Meeting>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert data into the table: "user_course_taken" */
  insert_user_course_taken?: Maybe<User_Course_Taken_Mutation_Response>;
  /** insert a single row into the table: "user_course_taken" */
  insert_user_course_taken_one?: Maybe<User_Course_Taken>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "user_schedule" */
  insert_user_schedule?: Maybe<User_Schedule_Mutation_Response>;
  /** insert a single row into the table: "user_schedule" */
  insert_user_schedule_one?: Maybe<User_Schedule>;
  /** insert data into the table: "user_shortlist" */
  insert_user_shortlist?: Maybe<User_Shortlist_Mutation_Response>;
  /** insert a single row into the table: "user_shortlist" */
  insert_user_shortlist_one?: Maybe<User_Shortlist>;
  /** update data of the table: "course" */
  update_course?: Maybe<Course_Mutation_Response>;
  /** update data of the table: "course_antirequisite" */
  update_course_antirequisite?: Maybe<Course_Antirequisite_Mutation_Response>;
  /** update single row of the table: "course" */
  update_course_by_pk?: Maybe<Course>;
  /** update data of the table: "course_postrequisite" */
  update_course_postrequisite?: Maybe<Course_Postrequisite_Mutation_Response>;
  /** update data of the table: "course_prerequisite" */
  update_course_prerequisite?: Maybe<Course_Prerequisite_Mutation_Response>;
  /** update data of the table: "course_review_upvote" */
  update_course_review_upvote?: Maybe<Course_Review_Upvote_Mutation_Response>;
  /** update data of the table: "course_section" */
  update_course_section?: Maybe<Course_Section_Mutation_Response>;
  /** update single row of the table: "course_section" */
  update_course_section_by_pk?: Maybe<Course_Section>;
  /** update data of the table: "prof" */
  update_prof?: Maybe<Prof_Mutation_Response>;
  /** update single row of the table: "prof" */
  update_prof_by_pk?: Maybe<Prof>;
  /** update data of the table: "prof_review_upvote" */
  update_prof_review_upvote?: Maybe<Prof_Review_Upvote_Mutation_Response>;
  /** update data of the table: "queue.section_subscribed" */
  update_queue_section_subscribed?: Maybe<
    Queue_Section_Subscribed_Mutation_Response
  >;
  /** update single row of the table: "queue.section_subscribed" */
  update_queue_section_subscribed_by_pk?: Maybe<Queue_Section_Subscribed>;
  /** update data of the table: "review" */
  update_review?: Maybe<Review_Mutation_Response>;
  /** update single row of the table: "review" */
  update_review_by_pk?: Maybe<Review>;
  /** update data of the table: "review_user_id" */
  update_review_user_id?: Maybe<Review_User_Id_Mutation_Response>;
  /** update data of the table: "section_exam" */
  update_section_exam?: Maybe<Section_Exam_Mutation_Response>;
  /** update data of the table: "section_meeting" */
  update_section_meeting?: Maybe<Section_Meeting_Mutation_Response>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "user_course_taken" */
  update_user_course_taken?: Maybe<User_Course_Taken_Mutation_Response>;
  /** update data of the table: "user_schedule" */
  update_user_schedule?: Maybe<User_Schedule_Mutation_Response>;
  /** update data of the table: "user_shortlist" */
  update_user_shortlist?: Maybe<User_Shortlist_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_CourseArgs = {
  where: Course_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_AntirequisiteArgs = {
  where: Course_Antirequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Course_PostrequisiteArgs = {
  where: Course_Postrequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_PrerequisiteArgs = {
  where: Course_Prerequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_Review_UpvoteArgs = {
  where: Course_Review_Upvote_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_SectionArgs = {
  where: Course_Section_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Course_Section_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_ProfArgs = {
  where: Prof_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Prof_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Prof_Review_UpvoteArgs = {
  where: Prof_Review_Upvote_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Queue_Section_SubscribedArgs = {
  where: Queue_Section_Subscribed_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Queue_Section_Subscribed_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_ReviewArgs = {
  where: Review_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Review_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_Review_User_IdArgs = {
  where: Review_User_Id_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Section_ExamArgs = {
  where: Section_Exam_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Section_MeetingArgs = {
  where: Section_Meeting_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_User_Course_TakenArgs = {
  where: User_Course_Taken_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_ScheduleArgs = {
  where: User_Schedule_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_User_ShortlistArgs = {
  where: User_Shortlist_Bool_Exp;
};

/** mutation root */
export type Mutation_RootInsert_CourseArgs = {
  objects: Array<Course_Insert_Input>;
  on_conflict?: Maybe<Course_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_AntirequisiteArgs = {
  objects: Array<Course_Antirequisite_Insert_Input>;
  on_conflict?: Maybe<Course_Antirequisite_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Antirequisite_OneArgs = {
  object: Course_Antirequisite_Insert_Input;
  on_conflict?: Maybe<Course_Antirequisite_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_OneArgs = {
  object: Course_Insert_Input;
  on_conflict?: Maybe<Course_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_PostrequisiteArgs = {
  objects: Array<Course_Postrequisite_Insert_Input>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Postrequisite_OneArgs = {
  object: Course_Postrequisite_Insert_Input;
};

/** mutation root */
export type Mutation_RootInsert_Course_PrerequisiteArgs = {
  objects: Array<Course_Prerequisite_Insert_Input>;
  on_conflict?: Maybe<Course_Prerequisite_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Prerequisite_OneArgs = {
  object: Course_Prerequisite_Insert_Input;
  on_conflict?: Maybe<Course_Prerequisite_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Review_UpvoteArgs = {
  objects: Array<Course_Review_Upvote_Insert_Input>;
  on_conflict?: Maybe<Course_Review_Upvote_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Review_Upvote_OneArgs = {
  object: Course_Review_Upvote_Insert_Input;
  on_conflict?: Maybe<Course_Review_Upvote_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_SectionArgs = {
  objects: Array<Course_Section_Insert_Input>;
  on_conflict?: Maybe<Course_Section_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Course_Section_OneArgs = {
  object: Course_Section_Insert_Input;
  on_conflict?: Maybe<Course_Section_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ProfArgs = {
  objects: Array<Prof_Insert_Input>;
  on_conflict?: Maybe<Prof_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Prof_OneArgs = {
  object: Prof_Insert_Input;
  on_conflict?: Maybe<Prof_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Prof_Review_UpvoteArgs = {
  objects: Array<Prof_Review_Upvote_Insert_Input>;
  on_conflict?: Maybe<Prof_Review_Upvote_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Prof_Review_Upvote_OneArgs = {
  object: Prof_Review_Upvote_Insert_Input;
  on_conflict?: Maybe<Prof_Review_Upvote_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Queue_Section_SubscribedArgs = {
  objects: Array<Queue_Section_Subscribed_Insert_Input>;
  on_conflict?: Maybe<Queue_Section_Subscribed_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Queue_Section_Subscribed_OneArgs = {
  object: Queue_Section_Subscribed_Insert_Input;
  on_conflict?: Maybe<Queue_Section_Subscribed_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ReviewArgs = {
  objects: Array<Review_Insert_Input>;
  on_conflict?: Maybe<Review_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Review_OneArgs = {
  object: Review_Insert_Input;
  on_conflict?: Maybe<Review_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Review_User_IdArgs = {
  objects: Array<Review_User_Id_Insert_Input>;
};

/** mutation root */
export type Mutation_RootInsert_Review_User_Id_OneArgs = {
  object: Review_User_Id_Insert_Input;
};

/** mutation root */
export type Mutation_RootInsert_Section_ExamArgs = {
  objects: Array<Section_Exam_Insert_Input>;
  on_conflict?: Maybe<Section_Exam_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Section_Exam_OneArgs = {
  object: Section_Exam_Insert_Input;
  on_conflict?: Maybe<Section_Exam_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Section_MeetingArgs = {
  objects: Array<Section_Meeting_Insert_Input>;
};

/** mutation root */
export type Mutation_RootInsert_Section_Meeting_OneArgs = {
  object: Section_Meeting_Insert_Input;
};

/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Course_TakenArgs = {
  objects: Array<User_Course_Taken_Insert_Input>;
  on_conflict?: Maybe<User_Course_Taken_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Course_Taken_OneArgs = {
  object: User_Course_Taken_Insert_Input;
  on_conflict?: Maybe<User_Course_Taken_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_ScheduleArgs = {
  objects: Array<User_Schedule_Insert_Input>;
  on_conflict?: Maybe<User_Schedule_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Schedule_OneArgs = {
  object: User_Schedule_Insert_Input;
  on_conflict?: Maybe<User_Schedule_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_ShortlistArgs = {
  objects: Array<User_Shortlist_Insert_Input>;
  on_conflict?: Maybe<User_Shortlist_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_User_Shortlist_OneArgs = {
  object: User_Shortlist_Insert_Input;
  on_conflict?: Maybe<User_Shortlist_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_CourseArgs = {
  _inc?: Maybe<Course_Inc_Input>;
  _set?: Maybe<Course_Set_Input>;
  where: Course_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_AntirequisiteArgs = {
  _inc?: Maybe<Course_Antirequisite_Inc_Input>;
  _set?: Maybe<Course_Antirequisite_Set_Input>;
  where: Course_Antirequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_By_PkArgs = {
  _inc?: Maybe<Course_Inc_Input>;
  _set?: Maybe<Course_Set_Input>;
  pk_columns: Course_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Course_PostrequisiteArgs = {
  _inc?: Maybe<Course_Postrequisite_Inc_Input>;
  _set?: Maybe<Course_Postrequisite_Set_Input>;
  where: Course_Postrequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_PrerequisiteArgs = {
  _inc?: Maybe<Course_Prerequisite_Inc_Input>;
  _set?: Maybe<Course_Prerequisite_Set_Input>;
  where: Course_Prerequisite_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_Review_UpvoteArgs = {
  _inc?: Maybe<Course_Review_Upvote_Inc_Input>;
  _set?: Maybe<Course_Review_Upvote_Set_Input>;
  where: Course_Review_Upvote_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_SectionArgs = {
  _inc?: Maybe<Course_Section_Inc_Input>;
  _set?: Maybe<Course_Section_Set_Input>;
  where: Course_Section_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Course_Section_By_PkArgs = {
  _inc?: Maybe<Course_Section_Inc_Input>;
  _set?: Maybe<Course_Section_Set_Input>;
  pk_columns: Course_Section_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ProfArgs = {
  _inc?: Maybe<Prof_Inc_Input>;
  _set?: Maybe<Prof_Set_Input>;
  where: Prof_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Prof_By_PkArgs = {
  _inc?: Maybe<Prof_Inc_Input>;
  _set?: Maybe<Prof_Set_Input>;
  pk_columns: Prof_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Prof_Review_UpvoteArgs = {
  _inc?: Maybe<Prof_Review_Upvote_Inc_Input>;
  _set?: Maybe<Prof_Review_Upvote_Set_Input>;
  where: Prof_Review_Upvote_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Queue_Section_SubscribedArgs = {
  _inc?: Maybe<Queue_Section_Subscribed_Inc_Input>;
  _set?: Maybe<Queue_Section_Subscribed_Set_Input>;
  where: Queue_Section_Subscribed_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Queue_Section_Subscribed_By_PkArgs = {
  _inc?: Maybe<Queue_Section_Subscribed_Inc_Input>;
  _set?: Maybe<Queue_Section_Subscribed_Set_Input>;
  pk_columns: Queue_Section_Subscribed_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ReviewArgs = {
  _inc?: Maybe<Review_Inc_Input>;
  _set?: Maybe<Review_Set_Input>;
  where: Review_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Review_By_PkArgs = {
  _inc?: Maybe<Review_Inc_Input>;
  _set?: Maybe<Review_Set_Input>;
  pk_columns: Review_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Review_User_IdArgs = {
  _inc?: Maybe<Review_User_Id_Inc_Input>;
  _set?: Maybe<Review_User_Id_Set_Input>;
  where: Review_User_Id_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Section_ExamArgs = {
  _inc?: Maybe<Section_Exam_Inc_Input>;
  _set?: Maybe<Section_Exam_Set_Input>;
  where: Section_Exam_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Section_MeetingArgs = {
  _inc?: Maybe<Section_Meeting_Inc_Input>;
  _set?: Maybe<Section_Meeting_Set_Input>;
  where: Section_Meeting_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  where: User_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _inc?: Maybe<User_Inc_Input>;
  _set?: Maybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_User_Course_TakenArgs = {
  _inc?: Maybe<User_Course_Taken_Inc_Input>;
  _set?: Maybe<User_Course_Taken_Set_Input>;
  where: User_Course_Taken_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_ScheduleArgs = {
  _inc?: Maybe<User_Schedule_Inc_Input>;
  _set?: Maybe<User_Schedule_Set_Input>;
  where: User_Schedule_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_User_ShortlistArgs = {
  _inc?: Maybe<User_Shortlist_Inc_Input>;
  _set?: Maybe<User_Shortlist_Set_Input>;
  where: User_Shortlist_Bool_Exp;
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "prof" */
export type Prof = {
  __typename?: 'prof';
  code: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  picture_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  prof_clear_buckets: Array<Aggregate_Prof_Clear_Buckets>;
  /** An aggregated array relationship */
  prof_clear_buckets_aggregate: Aggregate_Prof_Clear_Buckets_Aggregate;
  /** An array relationship */
  prof_courses: Array<Prof_Teaches_Course>;
  /** An aggregated array relationship */
  prof_courses_aggregate: Prof_Teaches_Course_Aggregate;
  /** An array relationship */
  prof_engaging_buckets: Array<Aggregate_Prof_Engaging_Buckets>;
  /** An aggregated array relationship */
  prof_engaging_buckets_aggregate: Aggregate_Prof_Engaging_Buckets_Aggregate;
  /** An object relationship */
  rating?: Maybe<Aggregate_Prof_Rating>;
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregated array relationship */
  reviews_aggregate: Review_Aggregate;
};

/** columns and relationships of "prof" */
export type ProfProf_Clear_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfProf_Clear_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfProf_CoursesArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfProf_Courses_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfProf_Engaging_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfProf_Engaging_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfReviewsArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** columns and relationships of "prof" */
export type ProfReviews_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** aggregated selection of "prof" */
export type Prof_Aggregate = {
  __typename?: 'prof_aggregate';
  aggregate?: Maybe<Prof_Aggregate_Fields>;
  nodes: Array<Prof>;
};

/** aggregate fields of "prof" */
export type Prof_Aggregate_Fields = {
  __typename?: 'prof_aggregate_fields';
  avg?: Maybe<Prof_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Prof_Max_Fields>;
  min?: Maybe<Prof_Min_Fields>;
  stddev?: Maybe<Prof_Stddev_Fields>;
  stddev_pop?: Maybe<Prof_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Prof_Stddev_Samp_Fields>;
  sum?: Maybe<Prof_Sum_Fields>;
  var_pop?: Maybe<Prof_Var_Pop_Fields>;
  var_samp?: Maybe<Prof_Var_Samp_Fields>;
  variance?: Maybe<Prof_Variance_Fields>;
};

/** aggregate fields of "prof" */
export type Prof_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prof_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "prof" */
export type Prof_Aggregate_Order_By = {
  avg?: Maybe<Prof_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Prof_Max_Order_By>;
  min?: Maybe<Prof_Min_Order_By>;
  stddev?: Maybe<Prof_Stddev_Order_By>;
  stddev_pop?: Maybe<Prof_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Prof_Stddev_Samp_Order_By>;
  sum?: Maybe<Prof_Sum_Order_By>;
  var_pop?: Maybe<Prof_Var_Pop_Order_By>;
  var_samp?: Maybe<Prof_Var_Samp_Order_By>;
  variance?: Maybe<Prof_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "prof" */
export type Prof_Arr_Rel_Insert_Input = {
  data: Array<Prof_Insert_Input>;
  on_conflict?: Maybe<Prof_On_Conflict>;
};

/** aggregate avg on columns */
export type Prof_Avg_Fields = {
  __typename?: 'prof_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "prof" */
export type Prof_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "prof". All fields are combined with a logical 'AND'. */
export type Prof_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Prof_Bool_Exp>>>;
  _not?: Maybe<Prof_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Prof_Bool_Exp>>>;
  code?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  picture_url?: Maybe<String_Comparison_Exp>;
  prof_clear_buckets?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
  prof_courses?: Maybe<Prof_Teaches_Course_Bool_Exp>;
  prof_engaging_buckets?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
  rating?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
  reviews?: Maybe<Review_Bool_Exp>;
};

/** unique or primary key constraints on table "prof" */
export enum Prof_Constraint {
  /** unique or primary key constraint */
  ProfCodeUnique = 'prof_code_unique',
  /** unique or primary key constraint */
  ProfPkey = 'prof_pkey',
}

/** input type for incrementing integer column in table "prof" */
export type Prof_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "prof" */
export type Prof_Insert_Input = {
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  reviews?: Maybe<Review_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Prof_Max_Fields = {
  __typename?: 'prof_max_fields';
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "prof" */
export type Prof_Max_Order_By = {
  code?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Prof_Min_Fields = {
  __typename?: 'prof_min_fields';
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "prof" */
export type Prof_Min_Order_By = {
  code?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
};

/** response of any mutation on the table "prof" */
export type Prof_Mutation_Response = {
  __typename?: 'prof_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Prof>;
};

/** input type for inserting object relation for remote table "prof" */
export type Prof_Obj_Rel_Insert_Input = {
  data: Prof_Insert_Input;
  on_conflict?: Maybe<Prof_On_Conflict>;
};

/** on conflict condition type for table "prof" */
export type Prof_On_Conflict = {
  constraint: Prof_Constraint;
  update_columns: Array<Prof_Update_Column>;
  where?: Maybe<Prof_Bool_Exp>;
};

/** ordering options when selecting data from "prof" */
export type Prof_Order_By = {
  code?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  prof_clear_buckets_aggregate?: Maybe<
    Aggregate_Prof_Clear_Buckets_Aggregate_Order_By
  >;
  prof_courses_aggregate?: Maybe<Prof_Teaches_Course_Aggregate_Order_By>;
  prof_engaging_buckets_aggregate?: Maybe<
    Aggregate_Prof_Engaging_Buckets_Aggregate_Order_By
  >;
  rating?: Maybe<Aggregate_Prof_Rating_Order_By>;
  reviews_aggregate?: Maybe<Review_Aggregate_Order_By>;
};

/** primary key columns input for table: "prof" */
export type Prof_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "prof_review_upvote" */
export type Prof_Review_Upvote = {
  __typename?: 'prof_review_upvote';
  review_id: Scalars['Int'];
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "prof_review_upvote" */
export type Prof_Review_Upvote_Aggregate = {
  __typename?: 'prof_review_upvote_aggregate';
  aggregate?: Maybe<Prof_Review_Upvote_Aggregate_Fields>;
  nodes: Array<Prof_Review_Upvote>;
};

/** aggregate fields of "prof_review_upvote" */
export type Prof_Review_Upvote_Aggregate_Fields = {
  __typename?: 'prof_review_upvote_aggregate_fields';
  avg?: Maybe<Prof_Review_Upvote_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Prof_Review_Upvote_Max_Fields>;
  min?: Maybe<Prof_Review_Upvote_Min_Fields>;
  stddev?: Maybe<Prof_Review_Upvote_Stddev_Fields>;
  stddev_pop?: Maybe<Prof_Review_Upvote_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Prof_Review_Upvote_Stddev_Samp_Fields>;
  sum?: Maybe<Prof_Review_Upvote_Sum_Fields>;
  var_pop?: Maybe<Prof_Review_Upvote_Var_Pop_Fields>;
  var_samp?: Maybe<Prof_Review_Upvote_Var_Samp_Fields>;
  variance?: Maybe<Prof_Review_Upvote_Variance_Fields>;
};

/** aggregate fields of "prof_review_upvote" */
export type Prof_Review_Upvote_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "prof_review_upvote" */
export type Prof_Review_Upvote_Aggregate_Order_By = {
  avg?: Maybe<Prof_Review_Upvote_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Prof_Review_Upvote_Max_Order_By>;
  min?: Maybe<Prof_Review_Upvote_Min_Order_By>;
  stddev?: Maybe<Prof_Review_Upvote_Stddev_Order_By>;
  stddev_pop?: Maybe<Prof_Review_Upvote_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Prof_Review_Upvote_Stddev_Samp_Order_By>;
  sum?: Maybe<Prof_Review_Upvote_Sum_Order_By>;
  var_pop?: Maybe<Prof_Review_Upvote_Var_Pop_Order_By>;
  var_samp?: Maybe<Prof_Review_Upvote_Var_Samp_Order_By>;
  variance?: Maybe<Prof_Review_Upvote_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "prof_review_upvote" */
export type Prof_Review_Upvote_Arr_Rel_Insert_Input = {
  data: Array<Prof_Review_Upvote_Insert_Input>;
  on_conflict?: Maybe<Prof_Review_Upvote_On_Conflict>;
};

/** aggregate avg on columns */
export type Prof_Review_Upvote_Avg_Fields = {
  __typename?: 'prof_review_upvote_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "prof_review_upvote". All fields are combined with a logical 'AND'. */
export type Prof_Review_Upvote_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Prof_Review_Upvote_Bool_Exp>>>;
  _not?: Maybe<Prof_Review_Upvote_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Prof_Review_Upvote_Bool_Exp>>>;
  review_id?: Maybe<Int_Comparison_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "prof_review_upvote" */
export enum Prof_Review_Upvote_Constraint {
  /** unique or primary key constraint */
  ProfReviewUpvoteUnique = 'prof_review_upvote_unique',
}

/** input type for incrementing integer column in table "prof_review_upvote" */
export type Prof_Review_Upvote_Inc_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "prof_review_upvote" */
export type Prof_Review_Upvote_Insert_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Prof_Review_Upvote_Max_Fields = {
  __typename?: 'prof_review_upvote_max_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Max_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Prof_Review_Upvote_Min_Fields = {
  __typename?: 'prof_review_upvote_min_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Min_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "prof_review_upvote" */
export type Prof_Review_Upvote_Mutation_Response = {
  __typename?: 'prof_review_upvote_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Prof_Review_Upvote>;
};

/** input type for inserting object relation for remote table "prof_review_upvote" */
export type Prof_Review_Upvote_Obj_Rel_Insert_Input = {
  data: Prof_Review_Upvote_Insert_Input;
  on_conflict?: Maybe<Prof_Review_Upvote_On_Conflict>;
};

/** on conflict condition type for table "prof_review_upvote" */
export type Prof_Review_Upvote_On_Conflict = {
  constraint: Prof_Review_Upvote_Constraint;
  update_columns: Array<Prof_Review_Upvote_Update_Column>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** ordering options when selecting data from "prof_review_upvote" */
export type Prof_Review_Upvote_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "prof_review_upvote" */
export enum Prof_Review_Upvote_Select_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "prof_review_upvote" */
export type Prof_Review_Upvote_Set_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Prof_Review_Upvote_Stddev_Fields = {
  __typename?: 'prof_review_upvote_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Prof_Review_Upvote_Stddev_Pop_Fields = {
  __typename?: 'prof_review_upvote_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Prof_Review_Upvote_Stddev_Samp_Fields = {
  __typename?: 'prof_review_upvote_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Prof_Review_Upvote_Sum_Fields = {
  __typename?: 'prof_review_upvote_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "prof_review_upvote" */
export enum Prof_Review_Upvote_Update_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Prof_Review_Upvote_Var_Pop_Fields = {
  __typename?: 'prof_review_upvote_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Prof_Review_Upvote_Var_Samp_Fields = {
  __typename?: 'prof_review_upvote_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Prof_Review_Upvote_Variance_Fields = {
  __typename?: 'prof_review_upvote_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "prof_review_upvote" */
export type Prof_Review_Upvote_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** columns and relationships of "prof_search_index" */
export type Prof_Search_Index = {
  __typename?: 'prof_search_index';
  clear?: Maybe<Scalars['numeric']>;
  code?: Maybe<Scalars['String']>;
  course_codes?: Maybe<Scalars['_text']>;
  course_ids?: Maybe<Scalars['_int4']>;
  document?: Maybe<Scalars['tsvector']>;
  engaging?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "prof_search_index" */
export type Prof_Search_Index_Aggregate = {
  __typename?: 'prof_search_index_aggregate';
  aggregate?: Maybe<Prof_Search_Index_Aggregate_Fields>;
  nodes: Array<Prof_Search_Index>;
};

/** aggregate fields of "prof_search_index" */
export type Prof_Search_Index_Aggregate_Fields = {
  __typename?: 'prof_search_index_aggregate_fields';
  avg?: Maybe<Prof_Search_Index_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Prof_Search_Index_Max_Fields>;
  min?: Maybe<Prof_Search_Index_Min_Fields>;
  stddev?: Maybe<Prof_Search_Index_Stddev_Fields>;
  stddev_pop?: Maybe<Prof_Search_Index_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Prof_Search_Index_Stddev_Samp_Fields>;
  sum?: Maybe<Prof_Search_Index_Sum_Fields>;
  var_pop?: Maybe<Prof_Search_Index_Var_Pop_Fields>;
  var_samp?: Maybe<Prof_Search_Index_Var_Samp_Fields>;
  variance?: Maybe<Prof_Search_Index_Variance_Fields>;
};

/** aggregate fields of "prof_search_index" */
export type Prof_Search_Index_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "prof_search_index" */
export type Prof_Search_Index_Aggregate_Order_By = {
  avg?: Maybe<Prof_Search_Index_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Prof_Search_Index_Max_Order_By>;
  min?: Maybe<Prof_Search_Index_Min_Order_By>;
  stddev?: Maybe<Prof_Search_Index_Stddev_Order_By>;
  stddev_pop?: Maybe<Prof_Search_Index_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Prof_Search_Index_Stddev_Samp_Order_By>;
  sum?: Maybe<Prof_Search_Index_Sum_Order_By>;
  var_pop?: Maybe<Prof_Search_Index_Var_Pop_Order_By>;
  var_samp?: Maybe<Prof_Search_Index_Var_Samp_Order_By>;
  variance?: Maybe<Prof_Search_Index_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Prof_Search_Index_Avg_Fields = {
  __typename?: 'prof_search_index_avg_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "prof_search_index" */
export type Prof_Search_Index_Avg_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "prof_search_index". All fields are combined with a logical 'AND'. */
export type Prof_Search_Index_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Prof_Search_Index_Bool_Exp>>>;
  _not?: Maybe<Prof_Search_Index_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Prof_Search_Index_Bool_Exp>>>;
  clear?: Maybe<Numeric_Comparison_Exp>;
  code?: Maybe<String_Comparison_Exp>;
  course_codes?: Maybe<_Text_Comparison_Exp>;
  course_ids?: Maybe<_Int4_Comparison_Exp>;
  document?: Maybe<Tsvector_Comparison_Exp>;
  engaging?: Maybe<Numeric_Comparison_Exp>;
  liked?: Maybe<Numeric_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
  ratings?: Maybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type Prof_Search_Index_Max_Fields = {
  __typename?: 'prof_search_index_max_fields';
  clear?: Maybe<Scalars['numeric']>;
  code?: Maybe<Scalars['String']>;
  engaging?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['bigint']>;
};

/** order by max() on columns of table "prof_search_index" */
export type Prof_Search_Index_Max_Order_By = {
  clear?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Prof_Search_Index_Min_Fields = {
  __typename?: 'prof_search_index_min_fields';
  clear?: Maybe<Scalars['numeric']>;
  code?: Maybe<Scalars['String']>;
  engaging?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['bigint']>;
};

/** order by min() on columns of table "prof_search_index" */
export type Prof_Search_Index_Min_Order_By = {
  clear?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** ordering options when selecting data from "prof_search_index" */
export type Prof_Search_Index_Order_By = {
  clear?: Maybe<Order_By>;
  code?: Maybe<Order_By>;
  course_codes?: Maybe<Order_By>;
  course_ids?: Maybe<Order_By>;
  document?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** select columns of table "prof_search_index" */
export enum Prof_Search_Index_Select_Column {
  /** column name */
  Clear = 'clear',
  /** column name */
  Code = 'code',
  /** column name */
  CourseCodes = 'course_codes',
  /** column name */
  CourseIds = 'course_ids',
  /** column name */
  Document = 'document',
  /** column name */
  Engaging = 'engaging',
  /** column name */
  Liked = 'liked',
  /** column name */
  Name = 'name',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  Ratings = 'ratings',
}

/** aggregate stddev on columns */
export type Prof_Search_Index_Stddev_Fields = {
  __typename?: 'prof_search_index_stddev_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "prof_search_index" */
export type Prof_Search_Index_Stddev_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Prof_Search_Index_Stddev_Pop_Fields = {
  __typename?: 'prof_search_index_stddev_pop_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "prof_search_index" */
export type Prof_Search_Index_Stddev_Pop_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Prof_Search_Index_Stddev_Samp_Fields = {
  __typename?: 'prof_search_index_stddev_samp_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "prof_search_index" */
export type Prof_Search_Index_Stddev_Samp_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Prof_Search_Index_Sum_Fields = {
  __typename?: 'prof_search_index_sum_fields';
  clear?: Maybe<Scalars['numeric']>;
  engaging?: Maybe<Scalars['numeric']>;
  liked?: Maybe<Scalars['numeric']>;
  prof_id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "prof_search_index" */
export type Prof_Search_Index_Sum_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Prof_Search_Index_Var_Pop_Fields = {
  __typename?: 'prof_search_index_var_pop_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "prof_search_index" */
export type Prof_Search_Index_Var_Pop_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Prof_Search_Index_Var_Samp_Fields = {
  __typename?: 'prof_search_index_var_samp_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "prof_search_index" */
export type Prof_Search_Index_Var_Samp_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Prof_Search_Index_Variance_Fields = {
  __typename?: 'prof_search_index_variance_fields';
  clear?: Maybe<Scalars['Float']>;
  engaging?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "prof_search_index" */
export type Prof_Search_Index_Variance_Order_By = {
  clear?: Maybe<Order_By>;
  engaging?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  ratings?: Maybe<Order_By>;
};

/** select columns of table "prof" */
export enum Prof_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PictureUrl = 'picture_url',
}

/** input type for updating data in table "prof" */
export type Prof_Set_Input = {
  code?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Prof_Stddev_Fields = {
  __typename?: 'prof_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "prof" */
export type Prof_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Prof_Stddev_Pop_Fields = {
  __typename?: 'prof_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "prof" */
export type Prof_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Prof_Stddev_Samp_Fields = {
  __typename?: 'prof_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "prof" */
export type Prof_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Prof_Sum_Fields = {
  __typename?: 'prof_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "prof" */
export type Prof_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "prof_teaches_course" */
export type Prof_Teaches_Course = {
  __typename?: 'prof_teaches_course';
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  prof?: Maybe<Prof>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "prof_teaches_course" */
export type Prof_Teaches_Course_Aggregate = {
  __typename?: 'prof_teaches_course_aggregate';
  aggregate?: Maybe<Prof_Teaches_Course_Aggregate_Fields>;
  nodes: Array<Prof_Teaches_Course>;
};

/** aggregate fields of "prof_teaches_course" */
export type Prof_Teaches_Course_Aggregate_Fields = {
  __typename?: 'prof_teaches_course_aggregate_fields';
  avg?: Maybe<Prof_Teaches_Course_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Prof_Teaches_Course_Max_Fields>;
  min?: Maybe<Prof_Teaches_Course_Min_Fields>;
  stddev?: Maybe<Prof_Teaches_Course_Stddev_Fields>;
  stddev_pop?: Maybe<Prof_Teaches_Course_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Prof_Teaches_Course_Stddev_Samp_Fields>;
  sum?: Maybe<Prof_Teaches_Course_Sum_Fields>;
  var_pop?: Maybe<Prof_Teaches_Course_Var_Pop_Fields>;
  var_samp?: Maybe<Prof_Teaches_Course_Var_Samp_Fields>;
  variance?: Maybe<Prof_Teaches_Course_Variance_Fields>;
};

/** aggregate fields of "prof_teaches_course" */
export type Prof_Teaches_Course_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "prof_teaches_course" */
export type Prof_Teaches_Course_Aggregate_Order_By = {
  avg?: Maybe<Prof_Teaches_Course_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Prof_Teaches_Course_Max_Order_By>;
  min?: Maybe<Prof_Teaches_Course_Min_Order_By>;
  stddev?: Maybe<Prof_Teaches_Course_Stddev_Order_By>;
  stddev_pop?: Maybe<Prof_Teaches_Course_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Prof_Teaches_Course_Stddev_Samp_Order_By>;
  sum?: Maybe<Prof_Teaches_Course_Sum_Order_By>;
  var_pop?: Maybe<Prof_Teaches_Course_Var_Pop_Order_By>;
  var_samp?: Maybe<Prof_Teaches_Course_Var_Samp_Order_By>;
  variance?: Maybe<Prof_Teaches_Course_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Prof_Teaches_Course_Avg_Fields = {
  __typename?: 'prof_teaches_course_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "prof_teaches_course". All fields are combined with a logical 'AND'. */
export type Prof_Teaches_Course_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Prof_Teaches_Course_Bool_Exp>>>;
  _not?: Maybe<Prof_Teaches_Course_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Prof_Teaches_Course_Bool_Exp>>>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  prof?: Maybe<Prof_Bool_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Prof_Teaches_Course_Max_Fields = {
  __typename?: 'prof_teaches_course_max_fields';
  course_id?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Max_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Prof_Teaches_Course_Min_Fields = {
  __typename?: 'prof_teaches_course_min_fields';
  course_id?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Min_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "prof_teaches_course" */
export type Prof_Teaches_Course_Order_By = {
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  prof?: Maybe<Prof_Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** select columns of table "prof_teaches_course" */
export enum Prof_Teaches_Course_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  ProfId = 'prof_id',
}

/** aggregate stddev on columns */
export type Prof_Teaches_Course_Stddev_Fields = {
  __typename?: 'prof_teaches_course_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Prof_Teaches_Course_Stddev_Pop_Fields = {
  __typename?: 'prof_teaches_course_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Prof_Teaches_Course_Stddev_Samp_Fields = {
  __typename?: 'prof_teaches_course_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Prof_Teaches_Course_Sum_Fields = {
  __typename?: 'prof_teaches_course_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Prof_Teaches_Course_Var_Pop_Fields = {
  __typename?: 'prof_teaches_course_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Prof_Teaches_Course_Var_Samp_Fields = {
  __typename?: 'prof_teaches_course_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Prof_Teaches_Course_Variance_Fields = {
  __typename?: 'prof_teaches_course_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "prof_teaches_course" */
export type Prof_Teaches_Course_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
};

/** update columns of table "prof" */
export enum Prof_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PictureUrl = 'picture_url',
}

/** aggregate var_pop on columns */
export type Prof_Var_Pop_Fields = {
  __typename?: 'prof_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "prof" */
export type Prof_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Prof_Var_Samp_Fields = {
  __typename?: 'prof_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "prof" */
export type Prof_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Prof_Variance_Fields = {
  __typename?: 'prof_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "prof" */
export type Prof_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "aggregate.course_easy_buckets" */
  aggregate_course_easy_buckets: Array<Aggregate_Course_Easy_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.course_easy_buckets" */
  aggregate_course_easy_buckets_aggregate: Aggregate_Course_Easy_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.course_rating" */
  aggregate_course_rating: Array<Aggregate_Course_Rating>;
  /** fetch aggregated fields from the table: "aggregate.course_rating" */
  aggregate_course_rating_aggregate: Aggregate_Course_Rating_Aggregate;
  /** fetch data from the table: "aggregate.course_review_rating" */
  aggregate_course_review_rating: Array<Aggregate_Course_Review_Rating>;
  /** fetch aggregated fields from the table: "aggregate.course_review_rating" */
  aggregate_course_review_rating_aggregate: Aggregate_Course_Review_Rating_Aggregate;
  /** fetch data from the table: "aggregate.course_useful_buckets" */
  aggregate_course_useful_buckets: Array<Aggregate_Course_Useful_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.course_useful_buckets" */
  aggregate_course_useful_buckets_aggregate: Aggregate_Course_Useful_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_clear_buckets" */
  aggregate_prof_clear_buckets: Array<Aggregate_Prof_Clear_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.prof_clear_buckets" */
  aggregate_prof_clear_buckets_aggregate: Aggregate_Prof_Clear_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_engaging_buckets" */
  aggregate_prof_engaging_buckets: Array<Aggregate_Prof_Engaging_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.prof_engaging_buckets" */
  aggregate_prof_engaging_buckets_aggregate: Aggregate_Prof_Engaging_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_rating" */
  aggregate_prof_rating: Array<Aggregate_Prof_Rating>;
  /** fetch aggregated fields from the table: "aggregate.prof_rating" */
  aggregate_prof_rating_aggregate: Aggregate_Prof_Rating_Aggregate;
  /** fetch data from the table: "aggregate.prof_review_rating" */
  aggregate_prof_review_rating: Array<Aggregate_Prof_Review_Rating>;
  /** fetch aggregated fields from the table: "aggregate.prof_review_rating" */
  aggregate_prof_review_rating_aggregate: Aggregate_Prof_Review_Rating_Aggregate;
  /** fetch data from the table: "course" */
  course: Array<Course>;
  /** fetch aggregated fields from the table: "course" */
  course_aggregate: Course_Aggregate;
  /** fetch data from the table: "course_antirequisite" */
  course_antirequisite: Array<Course_Antirequisite>;
  /** fetch aggregated fields from the table: "course_antirequisite" */
  course_antirequisite_aggregate: Course_Antirequisite_Aggregate;
  /** fetch data from the table: "course" using primary key columns */
  course_by_pk?: Maybe<Course>;
  /** fetch data from the table: "course_postrequisite" */
  course_postrequisite: Array<Course_Postrequisite>;
  /** fetch aggregated fields from the table: "course_postrequisite" */
  course_postrequisite_aggregate: Course_Postrequisite_Aggregate;
  /** fetch data from the table: "course_prerequisite" */
  course_prerequisite: Array<Course_Prerequisite>;
  /** fetch aggregated fields from the table: "course_prerequisite" */
  course_prerequisite_aggregate: Course_Prerequisite_Aggregate;
  /** fetch data from the table: "course_review_upvote" */
  course_review_upvote: Array<Course_Review_Upvote>;
  /** fetch aggregated fields from the table: "course_review_upvote" */
  course_review_upvote_aggregate: Course_Review_Upvote_Aggregate;
  /** fetch data from the table: "course_search_index" */
  course_search_index: Array<Course_Search_Index>;
  /** fetch aggregated fields from the table: "course_search_index" */
  course_search_index_aggregate: Course_Search_Index_Aggregate;
  /** fetch data from the table: "course_section" */
  course_section: Array<Course_Section>;
  /** fetch aggregated fields from the table: "course_section" */
  course_section_aggregate: Course_Section_Aggregate;
  /** fetch data from the table: "course_section" using primary key columns */
  course_section_by_pk?: Maybe<Course_Section>;
  /** fetch data from the table: "prof" */
  prof: Array<Prof>;
  /** fetch aggregated fields from the table: "prof" */
  prof_aggregate: Prof_Aggregate;
  /** fetch data from the table: "prof" using primary key columns */
  prof_by_pk?: Maybe<Prof>;
  /** fetch data from the table: "prof_review_upvote" */
  prof_review_upvote: Array<Prof_Review_Upvote>;
  /** fetch aggregated fields from the table: "prof_review_upvote" */
  prof_review_upvote_aggregate: Prof_Review_Upvote_Aggregate;
  /** fetch data from the table: "prof_search_index" */
  prof_search_index: Array<Prof_Search_Index>;
  /** fetch aggregated fields from the table: "prof_search_index" */
  prof_search_index_aggregate: Prof_Search_Index_Aggregate;
  /** fetch data from the table: "prof_teaches_course" */
  prof_teaches_course: Array<Prof_Teaches_Course>;
  /** fetch aggregated fields from the table: "prof_teaches_course" */
  prof_teaches_course_aggregate: Prof_Teaches_Course_Aggregate;
  /** fetch data from the table: "queue.section_subscribed" */
  queue_section_subscribed: Array<Queue_Section_Subscribed>;
  /** fetch aggregated fields from the table: "queue.section_subscribed" */
  queue_section_subscribed_aggregate: Queue_Section_Subscribed_Aggregate;
  /** fetch data from the table: "queue.section_subscribed" using primary key columns */
  queue_section_subscribed_by_pk?: Maybe<Queue_Section_Subscribed>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: Review_Aggregate;
  /** fetch data from the table: "review_author" */
  review_author: Array<Review_Author>;
  /** fetch aggregated fields from the table: "review_author" */
  review_author_aggregate: Review_Author_Aggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table: "review_user_id" */
  review_user_id: Array<Review_User_Id>;
  /** fetch aggregated fields from the table: "review_user_id" */
  review_user_id_aggregate: Review_User_Id_Aggregate;
  /** execute function "search_courses" which returns "course_search_index" */
  search_courses: Array<Course_Search_Index>;
  /** execute function "search_courses" and query aggregates on result of table type "course_search_index" */
  search_courses_aggregate: Course_Search_Index_Aggregate;
  /** execute function "search_profs" which returns "prof_search_index" */
  search_profs: Array<Prof_Search_Index>;
  /** execute function "search_profs" and query aggregates on result of table type "prof_search_index" */
  search_profs_aggregate: Prof_Search_Index_Aggregate;
  /** fetch data from the table: "section_exam" */
  section_exam: Array<Section_Exam>;
  /** fetch aggregated fields from the table: "section_exam" */
  section_exam_aggregate: Section_Exam_Aggregate;
  /** fetch data from the table: "section_meeting" */
  section_meeting: Array<Section_Meeting>;
  /** fetch aggregated fields from the table: "section_meeting" */
  section_meeting_aggregate: Section_Meeting_Aggregate;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_course_taken" */
  user_course_taken: Array<User_Course_Taken>;
  /** fetch aggregated fields from the table: "user_course_taken" */
  user_course_taken_aggregate: User_Course_Taken_Aggregate;
  /** fetch data from the table: "user_schedule" */
  user_schedule: Array<User_Schedule>;
  /** fetch aggregated fields from the table: "user_schedule" */
  user_schedule_aggregate: User_Schedule_Aggregate;
  /** fetch data from the table: "user_shortlist" */
  user_shortlist: Array<User_Shortlist>;
  /** fetch aggregated fields from the table: "user_shortlist" */
  user_shortlist_aggregate: User_Shortlist_Aggregate;
};

/** query root */
export type Query_RootAggregate_Course_Easy_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Easy_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Review_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Review_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Useful_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Course_Useful_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Clear_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Clear_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Engaging_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Engaging_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Review_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootAggregate_Prof_Review_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
};

/** query root */
export type Query_RootCourseArgs = {
  distinct_on?: Maybe<Array<Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Order_By>>;
  where?: Maybe<Course_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Order_By>>;
  where?: Maybe<Course_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_AntirequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Antirequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootCourse_PostrequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Postrequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_PrerequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Prerequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Review_UpvoteArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Review_Upvote_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Search_IndexArgs = {
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Search_Index_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_SectionArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Section_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** query root */
export type Query_RootCourse_Section_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootProfArgs = {
  distinct_on?: Maybe<Array<Prof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Order_By>>;
  where?: Maybe<Prof_Bool_Exp>;
};

/** query root */
export type Query_RootProf_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Order_By>>;
  where?: Maybe<Prof_Bool_Exp>;
};

/** query root */
export type Query_RootProf_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootProf_Review_UpvoteArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** query root */
export type Query_RootProf_Review_Upvote_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** query root */
export type Query_RootProf_Search_IndexArgs = {
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootProf_Search_Index_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootProf_Teaches_CourseArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** query root */
export type Query_RootProf_Teaches_Course_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** query root */
export type Query_RootQueue_Section_SubscribedArgs = {
  distinct_on?: Maybe<Array<Queue_Section_Subscribed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Queue_Section_Subscribed_Order_By>>;
  where?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
};

/** query root */
export type Query_RootQueue_Section_Subscribed_AggregateArgs = {
  distinct_on?: Maybe<Array<Queue_Section_Subscribed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Queue_Section_Subscribed_Order_By>>;
  where?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
};

/** query root */
export type Query_RootQueue_Section_Subscribed_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootReviewArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** query root */
export type Query_RootReview_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** query root */
export type Query_RootReview_AuthorArgs = {
  distinct_on?: Maybe<Array<Review_Author_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Author_Order_By>>;
  where?: Maybe<Review_Author_Bool_Exp>;
};

/** query root */
export type Query_RootReview_Author_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Author_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Author_Order_By>>;
  where?: Maybe<Review_Author_Bool_Exp>;
};

/** query root */
export type Query_RootReview_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootReview_User_IdArgs = {
  distinct_on?: Maybe<Array<Review_User_Id_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_User_Id_Order_By>>;
  where?: Maybe<Review_User_Id_Bool_Exp>;
};

/** query root */
export type Query_RootReview_User_Id_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_User_Id_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_User_Id_Order_By>>;
  where?: Maybe<Review_User_Id_Bool_Exp>;
};

/** query root */
export type Query_RootSearch_CoursesArgs = {
  args: Search_Courses_Args;
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootSearch_Courses_AggregateArgs = {
  args: Search_Courses_Args;
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootSearch_ProfsArgs = {
  args: Search_Profs_Args;
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootSearch_Profs_AggregateArgs = {
  args: Search_Profs_Args;
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** query root */
export type Query_RootSection_ExamArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** query root */
export type Query_RootSection_Exam_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** query root */
export type Query_RootSection_MeetingArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** query root */
export type Query_RootSection_Meeting_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};

/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};

/** query root */
export type Query_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootUser_Course_TakenArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Course_Taken_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** query root */
export type Query_RootUser_ScheduleArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Schedule_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** query root */
export type Query_RootUser_ShortlistArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** query root */
export type Query_RootUser_Shortlist_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** columns and relationships of "queue.section_subscribed" */
export type Queue_Section_Subscribed = {
  __typename?: 'queue_section_subscribed';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** An object relationship */
  section: Course_Section;
  section_id: Scalars['Int'];
  seen_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['Int'];
};

/** aggregated selection of "queue.section_subscribed" */
export type Queue_Section_Subscribed_Aggregate = {
  __typename?: 'queue_section_subscribed_aggregate';
  aggregate?: Maybe<Queue_Section_Subscribed_Aggregate_Fields>;
  nodes: Array<Queue_Section_Subscribed>;
};

/** aggregate fields of "queue.section_subscribed" */
export type Queue_Section_Subscribed_Aggregate_Fields = {
  __typename?: 'queue_section_subscribed_aggregate_fields';
  avg?: Maybe<Queue_Section_Subscribed_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Queue_Section_Subscribed_Max_Fields>;
  min?: Maybe<Queue_Section_Subscribed_Min_Fields>;
  stddev?: Maybe<Queue_Section_Subscribed_Stddev_Fields>;
  stddev_pop?: Maybe<Queue_Section_Subscribed_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Queue_Section_Subscribed_Stddev_Samp_Fields>;
  sum?: Maybe<Queue_Section_Subscribed_Sum_Fields>;
  var_pop?: Maybe<Queue_Section_Subscribed_Var_Pop_Fields>;
  var_samp?: Maybe<Queue_Section_Subscribed_Var_Samp_Fields>;
  variance?: Maybe<Queue_Section_Subscribed_Variance_Fields>;
};

/** aggregate fields of "queue.section_subscribed" */
export type Queue_Section_Subscribed_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Queue_Section_Subscribed_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Aggregate_Order_By = {
  avg?: Maybe<Queue_Section_Subscribed_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Queue_Section_Subscribed_Max_Order_By>;
  min?: Maybe<Queue_Section_Subscribed_Min_Order_By>;
  stddev?: Maybe<Queue_Section_Subscribed_Stddev_Order_By>;
  stddev_pop?: Maybe<Queue_Section_Subscribed_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Queue_Section_Subscribed_Stddev_Samp_Order_By>;
  sum?: Maybe<Queue_Section_Subscribed_Sum_Order_By>;
  var_pop?: Maybe<Queue_Section_Subscribed_Var_Pop_Order_By>;
  var_samp?: Maybe<Queue_Section_Subscribed_Var_Samp_Order_By>;
  variance?: Maybe<Queue_Section_Subscribed_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Arr_Rel_Insert_Input = {
  data: Array<Queue_Section_Subscribed_Insert_Input>;
  on_conflict?: Maybe<Queue_Section_Subscribed_On_Conflict>;
};

/** aggregate avg on columns */
export type Queue_Section_Subscribed_Avg_Fields = {
  __typename?: 'queue_section_subscribed_avg_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Avg_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "queue.section_subscribed". All fields are combined with a logical 'AND'. */
export type Queue_Section_Subscribed_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Queue_Section_Subscribed_Bool_Exp>>>;
  _not?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Queue_Section_Subscribed_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  section?: Maybe<Course_Section_Bool_Exp>;
  section_id?: Maybe<Int_Comparison_Exp>;
  seen_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "queue.section_subscribed" */
export enum Queue_Section_Subscribed_Constraint {
  /** unique or primary key constraint */
  SectionSubscribedPkey = 'section_subscribed_pkey',
  /** unique or primary key constraint */
  SectionSubscribedUnique = 'section_subscribed_unique',
}

/** input type for incrementing integer column in table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  section?: Maybe<Course_Section_Obj_Rel_Insert_Input>;
  section_id?: Maybe<Scalars['Int']>;
  seen_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Queue_Section_Subscribed_Max_Fields = {
  __typename?: 'queue_section_subscribed_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  seen_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  seen_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Queue_Section_Subscribed_Min_Fields = {
  __typename?: 'queue_section_subscribed_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  seen_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  seen_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Mutation_Response = {
  __typename?: 'queue_section_subscribed_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Queue_Section_Subscribed>;
};

/** input type for inserting object relation for remote table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Obj_Rel_Insert_Input = {
  data: Queue_Section_Subscribed_Insert_Input;
  on_conflict?: Maybe<Queue_Section_Subscribed_On_Conflict>;
};

/** on conflict condition type for table "queue.section_subscribed" */
export type Queue_Section_Subscribed_On_Conflict = {
  constraint: Queue_Section_Subscribed_Constraint;
  update_columns: Array<Queue_Section_Subscribed_Update_Column>;
  where?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
};

/** ordering options when selecting data from "queue.section_subscribed" */
export type Queue_Section_Subscribed_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  section?: Maybe<Course_Section_Order_By>;
  section_id?: Maybe<Order_By>;
  seen_at?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "queue.section_subscribed" */
export type Queue_Section_Subscribed_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "queue.section_subscribed" */
export enum Queue_Section_Subscribed_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  SectionId = 'section_id',
  /** column name */
  SeenAt = 'seen_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  seen_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Queue_Section_Subscribed_Stddev_Fields = {
  __typename?: 'queue_section_subscribed_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Queue_Section_Subscribed_Stddev_Pop_Fields = {
  __typename?: 'queue_section_subscribed_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Queue_Section_Subscribed_Stddev_Samp_Fields = {
  __typename?: 'queue_section_subscribed_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Queue_Section_Subscribed_Sum_Fields = {
  __typename?: 'queue_section_subscribed_sum_fields';
  id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Sum_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "queue.section_subscribed" */
export enum Queue_Section_Subscribed_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  SectionId = 'section_id',
  /** column name */
  SeenAt = 'seen_at',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type Queue_Section_Subscribed_Var_Pop_Fields = {
  __typename?: 'queue_section_subscribed_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Queue_Section_Subscribed_Var_Samp_Fields = {
  __typename?: 'queue_section_subscribed_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Queue_Section_Subscribed_Variance_Fields = {
  __typename?: 'queue_section_subscribed_variance_fields';
  id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "queue.section_subscribed" */
export type Queue_Section_Subscribed_Variance_Order_By = {
  id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** columns and relationships of "review" */
export type Review = {
  __typename?: 'review';
  /** An object relationship */
  author?: Maybe<Review_Author>;
  /** An object relationship */
  course?: Maybe<Course>;
  course_comment?: Maybe<Scalars['String']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  course_review_rating?: Maybe<Aggregate_Course_Review_Rating>;
  /** An array relationship */
  course_review_upvotes: Array<Course_Review_Upvote>;
  /** An aggregated array relationship */
  course_review_upvotes_aggregate: Course_Review_Upvote_Aggregate;
  course_useful?: Maybe<Scalars['smallint']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  legacy: Scalars['Boolean'];
  liked?: Maybe<Scalars['smallint']>;
  /** An object relationship */
  prof?: Maybe<Prof>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  /** An object relationship */
  prof_review_rating?: Maybe<Aggregate_Prof_Review_Rating>;
  /** An array relationship */
  prof_review_upvotes: Array<Prof_Review_Upvote>;
  /** An aggregated array relationship */
  prof_review_upvotes_aggregate: Prof_Review_Upvote_Aggregate;
  public: Scalars['Boolean'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<Review_User_Id>;
  user_id?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "review" */
export type ReviewCourse_Review_UpvotesArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** columns and relationships of "review" */
export type ReviewCourse_Review_Upvotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** columns and relationships of "review" */
export type ReviewProf_Review_UpvotesArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** columns and relationships of "review" */
export type ReviewProf_Review_Upvotes_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** aggregated selection of "review" */
export type Review_Aggregate = {
  __typename?: 'review_aggregate';
  aggregate?: Maybe<Review_Aggregate_Fields>;
  nodes: Array<Review>;
};

/** aggregate fields of "review" */
export type Review_Aggregate_Fields = {
  __typename?: 'review_aggregate_fields';
  avg?: Maybe<Review_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Review_Max_Fields>;
  min?: Maybe<Review_Min_Fields>;
  stddev?: Maybe<Review_Stddev_Fields>;
  stddev_pop?: Maybe<Review_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Review_Stddev_Samp_Fields>;
  sum?: Maybe<Review_Sum_Fields>;
  var_pop?: Maybe<Review_Var_Pop_Fields>;
  var_samp?: Maybe<Review_Var_Samp_Fields>;
  variance?: Maybe<Review_Variance_Fields>;
};

/** aggregate fields of "review" */
export type Review_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Review_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "review" */
export type Review_Aggregate_Order_By = {
  avg?: Maybe<Review_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Review_Max_Order_By>;
  min?: Maybe<Review_Min_Order_By>;
  stddev?: Maybe<Review_Stddev_Order_By>;
  stddev_pop?: Maybe<Review_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Review_Stddev_Samp_Order_By>;
  sum?: Maybe<Review_Sum_Order_By>;
  var_pop?: Maybe<Review_Var_Pop_Order_By>;
  var_samp?: Maybe<Review_Var_Samp_Order_By>;
  variance?: Maybe<Review_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "review" */
export type Review_Arr_Rel_Insert_Input = {
  data: Array<Review_Insert_Input>;
  on_conflict?: Maybe<Review_On_Conflict>;
};

/** columns and relationships of "review_author" */
export type Review_Author = {
  __typename?: 'review_author';
  full_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  review_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "review_author" */
export type Review_Author_Aggregate = {
  __typename?: 'review_author_aggregate';
  aggregate?: Maybe<Review_Author_Aggregate_Fields>;
  nodes: Array<Review_Author>;
};

/** aggregate fields of "review_author" */
export type Review_Author_Aggregate_Fields = {
  __typename?: 'review_author_aggregate_fields';
  avg?: Maybe<Review_Author_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Review_Author_Max_Fields>;
  min?: Maybe<Review_Author_Min_Fields>;
  stddev?: Maybe<Review_Author_Stddev_Fields>;
  stddev_pop?: Maybe<Review_Author_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Review_Author_Stddev_Samp_Fields>;
  sum?: Maybe<Review_Author_Sum_Fields>;
  var_pop?: Maybe<Review_Author_Var_Pop_Fields>;
  var_samp?: Maybe<Review_Author_Var_Samp_Fields>;
  variance?: Maybe<Review_Author_Variance_Fields>;
};

/** aggregate fields of "review_author" */
export type Review_Author_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Review_Author_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "review_author" */
export type Review_Author_Aggregate_Order_By = {
  avg?: Maybe<Review_Author_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Review_Author_Max_Order_By>;
  min?: Maybe<Review_Author_Min_Order_By>;
  stddev?: Maybe<Review_Author_Stddev_Order_By>;
  stddev_pop?: Maybe<Review_Author_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Review_Author_Stddev_Samp_Order_By>;
  sum?: Maybe<Review_Author_Sum_Order_By>;
  var_pop?: Maybe<Review_Author_Var_Pop_Order_By>;
  var_samp?: Maybe<Review_Author_Var_Samp_Order_By>;
  variance?: Maybe<Review_Author_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Review_Author_Avg_Fields = {
  __typename?: 'review_author_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "review_author" */
export type Review_Author_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "review_author". All fields are combined with a logical 'AND'. */
export type Review_Author_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Review_Author_Bool_Exp>>>;
  _not?: Maybe<Review_Author_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Review_Author_Bool_Exp>>>;
  full_name?: Maybe<String_Comparison_Exp>;
  picture_url?: Maybe<String_Comparison_Exp>;
  program?: Maybe<String_Comparison_Exp>;
  review_id?: Maybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Review_Author_Max_Fields = {
  __typename?: 'review_author_max_fields';
  full_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  review_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "review_author" */
export type Review_Author_Max_Order_By = {
  full_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  review_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Review_Author_Min_Fields = {
  __typename?: 'review_author_min_fields';
  full_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  review_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "review_author" */
export type Review_Author_Min_Order_By = {
  full_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  review_id?: Maybe<Order_By>;
};

/** ordering options when selecting data from "review_author" */
export type Review_Author_Order_By = {
  full_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  review_id?: Maybe<Order_By>;
};

/** select columns of table "review_author" */
export enum Review_Author_Select_Column {
  /** column name */
  FullName = 'full_name',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Program = 'program',
  /** column name */
  ReviewId = 'review_id',
}

/** aggregate stddev on columns */
export type Review_Author_Stddev_Fields = {
  __typename?: 'review_author_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "review_author" */
export type Review_Author_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Review_Author_Stddev_Pop_Fields = {
  __typename?: 'review_author_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "review_author" */
export type Review_Author_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Review_Author_Stddev_Samp_Fields = {
  __typename?: 'review_author_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "review_author" */
export type Review_Author_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Review_Author_Sum_Fields = {
  __typename?: 'review_author_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "review_author" */
export type Review_Author_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Review_Author_Var_Pop_Fields = {
  __typename?: 'review_author_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "review_author" */
export type Review_Author_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Review_Author_Var_Samp_Fields = {
  __typename?: 'review_author_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "review_author" */
export type Review_Author_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Review_Author_Variance_Fields = {
  __typename?: 'review_author_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "review_author" */
export type Review_Author_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
};

/** aggregate avg on columns */
export type Review_Avg_Fields = {
  __typename?: 'review_avg_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "review" */
export type Review_Avg_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "review". All fields are combined with a logical 'AND'. */
export type Review_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Review_Bool_Exp>>>;
  _not?: Maybe<Review_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Review_Bool_Exp>>>;
  author?: Maybe<Review_Author_Bool_Exp>;
  course?: Maybe<Course_Bool_Exp>;
  course_comment?: Maybe<String_Comparison_Exp>;
  course_easy?: Maybe<Smallint_Comparison_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  course_review_rating?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
  course_review_upvotes?: Maybe<Course_Review_Upvote_Bool_Exp>;
  course_useful?: Maybe<Smallint_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  legacy?: Maybe<Boolean_Comparison_Exp>;
  liked?: Maybe<Smallint_Comparison_Exp>;
  prof?: Maybe<Prof_Bool_Exp>;
  prof_clear?: Maybe<Smallint_Comparison_Exp>;
  prof_comment?: Maybe<String_Comparison_Exp>;
  prof_engaging?: Maybe<Smallint_Comparison_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
  prof_review_rating?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
  prof_review_upvotes?: Maybe<Prof_Review_Upvote_Bool_Exp>;
  public?: Maybe<Boolean_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Review_User_Id_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "review" */
export enum Review_Constraint {
  /** unique or primary key constraint */
  CourseUniquelyReviewed = 'course_uniquely_reviewed',
  /** unique or primary key constraint */
  ReviewPkey = 'review_pkey',
}

/** input type for incrementing integer column in table "review" */
export type Review_Inc_Input = {
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_useful?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "review" */
export type Review_Insert_Input = {
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_comment?: Maybe<Scalars['String']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_review_upvotes?: Maybe<Course_Review_Upvote_Arr_Rel_Insert_Input>;
  course_useful?: Maybe<Scalars['smallint']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  legacy?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['smallint']>;
  prof?: Maybe<Prof_Obj_Rel_Insert_Input>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  prof_review_upvotes?: Maybe<Prof_Review_Upvote_Arr_Rel_Insert_Input>;
  public?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Review_User_Id_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Review_Max_Fields = {
  __typename?: 'review_max_fields';
  course_comment?: Maybe<Scalars['String']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_useful?: Maybe<Scalars['smallint']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "review" */
export type Review_Max_Order_By = {
  course_comment?: Maybe<Order_By>;
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_comment?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Review_Min_Fields = {
  __typename?: 'review_min_fields';
  course_comment?: Maybe<Scalars['String']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_useful?: Maybe<Scalars['smallint']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "review" */
export type Review_Min_Order_By = {
  course_comment?: Maybe<Order_By>;
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_comment?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "review" */
export type Review_Mutation_Response = {
  __typename?: 'review_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Review>;
};

/** input type for inserting object relation for remote table "review" */
export type Review_Obj_Rel_Insert_Input = {
  data: Review_Insert_Input;
  on_conflict?: Maybe<Review_On_Conflict>;
};

/** on conflict condition type for table "review" */
export type Review_On_Conflict = {
  constraint: Review_Constraint;
  update_columns: Array<Review_Update_Column>;
  where?: Maybe<Review_Bool_Exp>;
};

/** ordering options when selecting data from "review" */
export type Review_Order_By = {
  author?: Maybe<Review_Author_Order_By>;
  course?: Maybe<Course_Order_By>;
  course_comment?: Maybe<Order_By>;
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_review_rating?: Maybe<Aggregate_Course_Review_Rating_Order_By>;
  course_review_upvotes_aggregate?: Maybe<
    Course_Review_Upvote_Aggregate_Order_By
  >;
  course_useful?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  legacy?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof?: Maybe<Prof_Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_comment?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  prof_review_rating?: Maybe<Aggregate_Prof_Review_Rating_Order_By>;
  prof_review_upvotes_aggregate?: Maybe<Prof_Review_Upvote_Aggregate_Order_By>;
  public?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Review_User_Id_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "review" */
export type Review_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "review" */
export enum Review_Select_Column {
  /** column name */
  CourseComment = 'course_comment',
  /** column name */
  CourseEasy = 'course_easy',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseUseful = 'course_useful',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Legacy = 'legacy',
  /** column name */
  Liked = 'liked',
  /** column name */
  ProfClear = 'prof_clear',
  /** column name */
  ProfComment = 'prof_comment',
  /** column name */
  ProfEngaging = 'prof_engaging',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  Public = 'public',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "review" */
export type Review_Set_Input = {
  course_comment?: Maybe<Scalars['String']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_useful?: Maybe<Scalars['smallint']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  legacy?: Maybe<Scalars['Boolean']>;
  liked?: Maybe<Scalars['smallint']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  public?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Review_Stddev_Fields = {
  __typename?: 'review_stddev_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "review" */
export type Review_Stddev_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Review_Stddev_Pop_Fields = {
  __typename?: 'review_stddev_pop_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "review" */
export type Review_Stddev_Pop_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Review_Stddev_Samp_Fields = {
  __typename?: 'review_stddev_samp_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "review" */
export type Review_Stddev_Samp_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Review_Sum_Fields = {
  __typename?: 'review_sum_fields';
  course_easy?: Maybe<Scalars['smallint']>;
  course_id?: Maybe<Scalars['Int']>;
  course_useful?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "review" */
export type Review_Sum_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "review" */
export enum Review_Update_Column {
  /** column name */
  CourseComment = 'course_comment',
  /** column name */
  CourseEasy = 'course_easy',
  /** column name */
  CourseId = 'course_id',
  /** column name */
  CourseUseful = 'course_useful',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Legacy = 'legacy',
  /** column name */
  Liked = 'liked',
  /** column name */
  ProfClear = 'prof_clear',
  /** column name */
  ProfComment = 'prof_comment',
  /** column name */
  ProfEngaging = 'prof_engaging',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  Public = 'public',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** columns and relationships of "review_user_id" */
export type Review_User_Id = {
  __typename?: 'review_user_id';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "review_user_id" */
export type Review_User_Id_Aggregate = {
  __typename?: 'review_user_id_aggregate';
  aggregate?: Maybe<Review_User_Id_Aggregate_Fields>;
  nodes: Array<Review_User_Id>;
};

/** aggregate fields of "review_user_id" */
export type Review_User_Id_Aggregate_Fields = {
  __typename?: 'review_user_id_aggregate_fields';
  avg?: Maybe<Review_User_Id_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Review_User_Id_Max_Fields>;
  min?: Maybe<Review_User_Id_Min_Fields>;
  stddev?: Maybe<Review_User_Id_Stddev_Fields>;
  stddev_pop?: Maybe<Review_User_Id_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Review_User_Id_Stddev_Samp_Fields>;
  sum?: Maybe<Review_User_Id_Sum_Fields>;
  var_pop?: Maybe<Review_User_Id_Var_Pop_Fields>;
  var_samp?: Maybe<Review_User_Id_Var_Samp_Fields>;
  variance?: Maybe<Review_User_Id_Variance_Fields>;
};

/** aggregate fields of "review_user_id" */
export type Review_User_Id_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Review_User_Id_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "review_user_id" */
export type Review_User_Id_Aggregate_Order_By = {
  avg?: Maybe<Review_User_Id_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Review_User_Id_Max_Order_By>;
  min?: Maybe<Review_User_Id_Min_Order_By>;
  stddev?: Maybe<Review_User_Id_Stddev_Order_By>;
  stddev_pop?: Maybe<Review_User_Id_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Review_User_Id_Stddev_Samp_Order_By>;
  sum?: Maybe<Review_User_Id_Sum_Order_By>;
  var_pop?: Maybe<Review_User_Id_Var_Pop_Order_By>;
  var_samp?: Maybe<Review_User_Id_Var_Samp_Order_By>;
  variance?: Maybe<Review_User_Id_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "review_user_id" */
export type Review_User_Id_Arr_Rel_Insert_Input = {
  data: Array<Review_User_Id_Insert_Input>;
};

/** aggregate avg on columns */
export type Review_User_Id_Avg_Fields = {
  __typename?: 'review_user_id_avg_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "review_user_id" */
export type Review_User_Id_Avg_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "review_user_id". All fields are combined with a logical 'AND'. */
export type Review_User_Id_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Review_User_Id_Bool_Exp>>>;
  _not?: Maybe<Review_User_Id_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Review_User_Id_Bool_Exp>>>;
  review_id?: Maybe<Int_Comparison_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** input type for incrementing integer column in table "review_user_id" */
export type Review_User_Id_Inc_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "review_user_id" */
export type Review_User_Id_Insert_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Review_User_Id_Max_Fields = {
  __typename?: 'review_user_id_max_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "review_user_id" */
export type Review_User_Id_Max_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Review_User_Id_Min_Fields = {
  __typename?: 'review_user_id_min_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "review_user_id" */
export type Review_User_Id_Min_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "review_user_id" */
export type Review_User_Id_Mutation_Response = {
  __typename?: 'review_user_id_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Review_User_Id>;
};

/** input type for inserting object relation for remote table "review_user_id" */
export type Review_User_Id_Obj_Rel_Insert_Input = {
  data: Review_User_Id_Insert_Input;
};

/** ordering options when selecting data from "review_user_id" */
export type Review_User_Id_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "review_user_id" */
export enum Review_User_Id_Select_Column {
  /** column name */
  ReviewId = 'review_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "review_user_id" */
export type Review_User_Id_Set_Input = {
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Review_User_Id_Stddev_Fields = {
  __typename?: 'review_user_id_stddev_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "review_user_id" */
export type Review_User_Id_Stddev_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Review_User_Id_Stddev_Pop_Fields = {
  __typename?: 'review_user_id_stddev_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "review_user_id" */
export type Review_User_Id_Stddev_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Review_User_Id_Stddev_Samp_Fields = {
  __typename?: 'review_user_id_stddev_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "review_user_id" */
export type Review_User_Id_Stddev_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Review_User_Id_Sum_Fields = {
  __typename?: 'review_user_id_sum_fields';
  review_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "review_user_id" */
export type Review_User_Id_Sum_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Review_User_Id_Var_Pop_Fields = {
  __typename?: 'review_user_id_var_pop_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "review_user_id" */
export type Review_User_Id_Var_Pop_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Review_User_Id_Var_Samp_Fields = {
  __typename?: 'review_user_id_var_samp_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "review_user_id" */
export type Review_User_Id_Var_Samp_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Review_User_Id_Variance_Fields = {
  __typename?: 'review_user_id_variance_fields';
  review_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "review_user_id" */
export type Review_User_Id_Variance_Order_By = {
  review_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Review_Var_Pop_Fields = {
  __typename?: 'review_var_pop_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "review" */
export type Review_Var_Pop_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Review_Var_Samp_Fields = {
  __typename?: 'review_var_samp_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "review" */
export type Review_Var_Samp_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Review_Variance_Fields = {
  __typename?: 'review_variance_fields';
  course_easy?: Maybe<Scalars['Float']>;
  course_id?: Maybe<Scalars['Float']>;
  course_useful?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liked?: Maybe<Scalars['Float']>;
  prof_clear?: Maybe<Scalars['Float']>;
  prof_engaging?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "review" */
export type Review_Variance_Order_By = {
  course_easy?: Maybe<Order_By>;
  course_id?: Maybe<Order_By>;
  course_useful?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  liked?: Maybe<Order_By>;
  prof_clear?: Maybe<Order_By>;
  prof_engaging?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

export type Search_Courses_Args = {
  code_only?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['String']>;
};

export type Search_Profs_Args = {
  code_only?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['String']>;
};

/** columns and relationships of "section_exam" */
export type Section_Exam = {
  __typename?: 'section_exam';
  date?: Maybe<Scalars['date']>;
  day?: Maybe<Scalars['String']>;
  end_seconds?: Maybe<Scalars['Int']>;
  is_tba: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  section_id: Scalars['Int'];
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "section_exam" */
export type Section_Exam_Aggregate = {
  __typename?: 'section_exam_aggregate';
  aggregate?: Maybe<Section_Exam_Aggregate_Fields>;
  nodes: Array<Section_Exam>;
};

/** aggregate fields of "section_exam" */
export type Section_Exam_Aggregate_Fields = {
  __typename?: 'section_exam_aggregate_fields';
  avg?: Maybe<Section_Exam_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Section_Exam_Max_Fields>;
  min?: Maybe<Section_Exam_Min_Fields>;
  stddev?: Maybe<Section_Exam_Stddev_Fields>;
  stddev_pop?: Maybe<Section_Exam_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Section_Exam_Stddev_Samp_Fields>;
  sum?: Maybe<Section_Exam_Sum_Fields>;
  var_pop?: Maybe<Section_Exam_Var_Pop_Fields>;
  var_samp?: Maybe<Section_Exam_Var_Samp_Fields>;
  variance?: Maybe<Section_Exam_Variance_Fields>;
};

/** aggregate fields of "section_exam" */
export type Section_Exam_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Section_Exam_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "section_exam" */
export type Section_Exam_Aggregate_Order_By = {
  avg?: Maybe<Section_Exam_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Section_Exam_Max_Order_By>;
  min?: Maybe<Section_Exam_Min_Order_By>;
  stddev?: Maybe<Section_Exam_Stddev_Order_By>;
  stddev_pop?: Maybe<Section_Exam_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Section_Exam_Stddev_Samp_Order_By>;
  sum?: Maybe<Section_Exam_Sum_Order_By>;
  var_pop?: Maybe<Section_Exam_Var_Pop_Order_By>;
  var_samp?: Maybe<Section_Exam_Var_Samp_Order_By>;
  variance?: Maybe<Section_Exam_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "section_exam" */
export type Section_Exam_Arr_Rel_Insert_Input = {
  data: Array<Section_Exam_Insert_Input>;
  on_conflict?: Maybe<Section_Exam_On_Conflict>;
};

/** aggregate avg on columns */
export type Section_Exam_Avg_Fields = {
  __typename?: 'section_exam_avg_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "section_exam" */
export type Section_Exam_Avg_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "section_exam". All fields are combined with a logical 'AND'. */
export type Section_Exam_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Section_Exam_Bool_Exp>>>;
  _not?: Maybe<Section_Exam_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Section_Exam_Bool_Exp>>>;
  date?: Maybe<Date_Comparison_Exp>;
  day?: Maybe<String_Comparison_Exp>;
  end_seconds?: Maybe<Int_Comparison_Exp>;
  is_tba?: Maybe<Boolean_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  section_id?: Maybe<Int_Comparison_Exp>;
  start_seconds?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "section_exam" */
export enum Section_Exam_Constraint {
  /** unique or primary key constraint */
  ExamUniqueToSection = 'exam_unique_to_section',
}

/** input type for incrementing integer column in table "section_exam" */
export type Section_Exam_Inc_Input = {
  end_seconds?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "section_exam" */
export type Section_Exam_Insert_Input = {
  date?: Maybe<Scalars['date']>;
  day?: Maybe<Scalars['String']>;
  end_seconds?: Maybe<Scalars['Int']>;
  is_tba?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Section_Exam_Max_Fields = {
  __typename?: 'section_exam_max_fields';
  date?: Maybe<Scalars['date']>;
  day?: Maybe<Scalars['String']>;
  end_seconds?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "section_exam" */
export type Section_Exam_Max_Order_By = {
  date?: Maybe<Order_By>;
  day?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Section_Exam_Min_Fields = {
  __typename?: 'section_exam_min_fields';
  date?: Maybe<Scalars['date']>;
  day?: Maybe<Scalars['String']>;
  end_seconds?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "section_exam" */
export type Section_Exam_Min_Order_By = {
  date?: Maybe<Order_By>;
  day?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** response of any mutation on the table "section_exam" */
export type Section_Exam_Mutation_Response = {
  __typename?: 'section_exam_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Section_Exam>;
};

/** input type for inserting object relation for remote table "section_exam" */
export type Section_Exam_Obj_Rel_Insert_Input = {
  data: Section_Exam_Insert_Input;
  on_conflict?: Maybe<Section_Exam_On_Conflict>;
};

/** on conflict condition type for table "section_exam" */
export type Section_Exam_On_Conflict = {
  constraint: Section_Exam_Constraint;
  update_columns: Array<Section_Exam_Update_Column>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** ordering options when selecting data from "section_exam" */
export type Section_Exam_Order_By = {
  date?: Maybe<Order_By>;
  day?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  is_tba?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** select columns of table "section_exam" */
export enum Section_Exam_Select_Column {
  /** column name */
  Date = 'date',
  /** column name */
  Day = 'day',
  /** column name */
  EndSeconds = 'end_seconds',
  /** column name */
  IsTba = 'is_tba',
  /** column name */
  Location = 'location',
  /** column name */
  SectionId = 'section_id',
  /** column name */
  StartSeconds = 'start_seconds',
}

/** input type for updating data in table "section_exam" */
export type Section_Exam_Set_Input = {
  date?: Maybe<Scalars['date']>;
  day?: Maybe<Scalars['String']>;
  end_seconds?: Maybe<Scalars['Int']>;
  is_tba?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Section_Exam_Stddev_Fields = {
  __typename?: 'section_exam_stddev_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "section_exam" */
export type Section_Exam_Stddev_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Section_Exam_Stddev_Pop_Fields = {
  __typename?: 'section_exam_stddev_pop_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "section_exam" */
export type Section_Exam_Stddev_Pop_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Section_Exam_Stddev_Samp_Fields = {
  __typename?: 'section_exam_stddev_samp_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "section_exam" */
export type Section_Exam_Stddev_Samp_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Section_Exam_Sum_Fields = {
  __typename?: 'section_exam_sum_fields';
  end_seconds?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "section_exam" */
export type Section_Exam_Sum_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** update columns of table "section_exam" */
export enum Section_Exam_Update_Column {
  /** column name */
  Date = 'date',
  /** column name */
  Day = 'day',
  /** column name */
  EndSeconds = 'end_seconds',
  /** column name */
  IsTba = 'is_tba',
  /** column name */
  Location = 'location',
  /** column name */
  SectionId = 'section_id',
  /** column name */
  StartSeconds = 'start_seconds',
}

/** aggregate var_pop on columns */
export type Section_Exam_Var_Pop_Fields = {
  __typename?: 'section_exam_var_pop_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "section_exam" */
export type Section_Exam_Var_Pop_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Section_Exam_Var_Samp_Fields = {
  __typename?: 'section_exam_var_samp_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "section_exam" */
export type Section_Exam_Var_Samp_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Section_Exam_Variance_Fields = {
  __typename?: 'section_exam_variance_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "section_exam" */
export type Section_Exam_Variance_Order_By = {
  end_seconds?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** columns and relationships of "section_meeting" */
export type Section_Meeting = {
  __typename?: 'section_meeting';
  days: Scalars['_text'];
  end_date: Scalars['date'];
  end_seconds?: Maybe<Scalars['Int']>;
  is_cancelled: Scalars['Boolean'];
  is_closed: Scalars['Boolean'];
  is_tba: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  /** An object relationship */
  prof?: Maybe<Prof>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id: Scalars['Int'];
  start_date: Scalars['date'];
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "section_meeting" */
export type Section_Meeting_Aggregate = {
  __typename?: 'section_meeting_aggregate';
  aggregate?: Maybe<Section_Meeting_Aggregate_Fields>;
  nodes: Array<Section_Meeting>;
};

/** aggregate fields of "section_meeting" */
export type Section_Meeting_Aggregate_Fields = {
  __typename?: 'section_meeting_aggregate_fields';
  avg?: Maybe<Section_Meeting_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Section_Meeting_Max_Fields>;
  min?: Maybe<Section_Meeting_Min_Fields>;
  stddev?: Maybe<Section_Meeting_Stddev_Fields>;
  stddev_pop?: Maybe<Section_Meeting_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Section_Meeting_Stddev_Samp_Fields>;
  sum?: Maybe<Section_Meeting_Sum_Fields>;
  var_pop?: Maybe<Section_Meeting_Var_Pop_Fields>;
  var_samp?: Maybe<Section_Meeting_Var_Samp_Fields>;
  variance?: Maybe<Section_Meeting_Variance_Fields>;
};

/** aggregate fields of "section_meeting" */
export type Section_Meeting_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Section_Meeting_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "section_meeting" */
export type Section_Meeting_Aggregate_Order_By = {
  avg?: Maybe<Section_Meeting_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Section_Meeting_Max_Order_By>;
  min?: Maybe<Section_Meeting_Min_Order_By>;
  stddev?: Maybe<Section_Meeting_Stddev_Order_By>;
  stddev_pop?: Maybe<Section_Meeting_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Section_Meeting_Stddev_Samp_Order_By>;
  sum?: Maybe<Section_Meeting_Sum_Order_By>;
  var_pop?: Maybe<Section_Meeting_Var_Pop_Order_By>;
  var_samp?: Maybe<Section_Meeting_Var_Samp_Order_By>;
  variance?: Maybe<Section_Meeting_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "section_meeting" */
export type Section_Meeting_Arr_Rel_Insert_Input = {
  data: Array<Section_Meeting_Insert_Input>;
};

/** aggregate avg on columns */
export type Section_Meeting_Avg_Fields = {
  __typename?: 'section_meeting_avg_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "section_meeting" */
export type Section_Meeting_Avg_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "section_meeting". All fields are combined with a logical 'AND'. */
export type Section_Meeting_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Section_Meeting_Bool_Exp>>>;
  _not?: Maybe<Section_Meeting_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Section_Meeting_Bool_Exp>>>;
  days?: Maybe<_Text_Comparison_Exp>;
  end_date?: Maybe<Date_Comparison_Exp>;
  end_seconds?: Maybe<Int_Comparison_Exp>;
  is_cancelled?: Maybe<Boolean_Comparison_Exp>;
  is_closed?: Maybe<Boolean_Comparison_Exp>;
  is_tba?: Maybe<Boolean_Comparison_Exp>;
  location?: Maybe<String_Comparison_Exp>;
  prof?: Maybe<Prof_Bool_Exp>;
  prof_id?: Maybe<Int_Comparison_Exp>;
  section_id?: Maybe<Int_Comparison_Exp>;
  start_date?: Maybe<Date_Comparison_Exp>;
  start_seconds?: Maybe<Int_Comparison_Exp>;
};

/** input type for incrementing integer column in table "section_meeting" */
export type Section_Meeting_Inc_Input = {
  end_seconds?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "section_meeting" */
export type Section_Meeting_Insert_Input = {
  days?: Maybe<Scalars['_text']>;
  end_date?: Maybe<Scalars['date']>;
  end_seconds?: Maybe<Scalars['Int']>;
  is_cancelled?: Maybe<Scalars['Boolean']>;
  is_closed?: Maybe<Scalars['Boolean']>;
  is_tba?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  prof?: Maybe<Prof_Obj_Rel_Insert_Input>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Section_Meeting_Max_Fields = {
  __typename?: 'section_meeting_max_fields';
  end_date?: Maybe<Scalars['date']>;
  end_seconds?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "section_meeting" */
export type Section_Meeting_Max_Order_By = {
  end_date?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Section_Meeting_Min_Fields = {
  __typename?: 'section_meeting_min_fields';
  end_date?: Maybe<Scalars['date']>;
  end_seconds?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "section_meeting" */
export type Section_Meeting_Min_Order_By = {
  end_date?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** response of any mutation on the table "section_meeting" */
export type Section_Meeting_Mutation_Response = {
  __typename?: 'section_meeting_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Section_Meeting>;
};

/** input type for inserting object relation for remote table "section_meeting" */
export type Section_Meeting_Obj_Rel_Insert_Input = {
  data: Section_Meeting_Insert_Input;
};

/** ordering options when selecting data from "section_meeting" */
export type Section_Meeting_Order_By = {
  days?: Maybe<Order_By>;
  end_date?: Maybe<Order_By>;
  end_seconds?: Maybe<Order_By>;
  is_cancelled?: Maybe<Order_By>;
  is_closed?: Maybe<Order_By>;
  is_tba?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  prof?: Maybe<Prof_Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_date?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** select columns of table "section_meeting" */
export enum Section_Meeting_Select_Column {
  /** column name */
  Days = 'days',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  EndSeconds = 'end_seconds',
  /** column name */
  IsCancelled = 'is_cancelled',
  /** column name */
  IsClosed = 'is_closed',
  /** column name */
  IsTba = 'is_tba',
  /** column name */
  Location = 'location',
  /** column name */
  ProfId = 'prof_id',
  /** column name */
  SectionId = 'section_id',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  StartSeconds = 'start_seconds',
}

/** input type for updating data in table "section_meeting" */
export type Section_Meeting_Set_Input = {
  days?: Maybe<Scalars['_text']>;
  end_date?: Maybe<Scalars['date']>;
  end_seconds?: Maybe<Scalars['Int']>;
  is_cancelled?: Maybe<Scalars['Boolean']>;
  is_closed?: Maybe<Scalars['Boolean']>;
  is_tba?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['String']>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['date']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Section_Meeting_Stddev_Fields = {
  __typename?: 'section_meeting_stddev_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "section_meeting" */
export type Section_Meeting_Stddev_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Section_Meeting_Stddev_Pop_Fields = {
  __typename?: 'section_meeting_stddev_pop_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "section_meeting" */
export type Section_Meeting_Stddev_Pop_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Section_Meeting_Stddev_Samp_Fields = {
  __typename?: 'section_meeting_stddev_samp_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "section_meeting" */
export type Section_Meeting_Stddev_Samp_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Section_Meeting_Sum_Fields = {
  __typename?: 'section_meeting_sum_fields';
  end_seconds?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
  section_id?: Maybe<Scalars['Int']>;
  start_seconds?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "section_meeting" */
export type Section_Meeting_Sum_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Section_Meeting_Var_Pop_Fields = {
  __typename?: 'section_meeting_var_pop_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "section_meeting" */
export type Section_Meeting_Var_Pop_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Section_Meeting_Var_Samp_Fields = {
  __typename?: 'section_meeting_var_samp_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "section_meeting" */
export type Section_Meeting_Var_Samp_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Section_Meeting_Variance_Fields = {
  __typename?: 'section_meeting_variance_fields';
  end_seconds?: Maybe<Scalars['Float']>;
  prof_id?: Maybe<Scalars['Float']>;
  section_id?: Maybe<Scalars['Float']>;
  start_seconds?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "section_meeting" */
export type Section_Meeting_Variance_Order_By = {
  end_seconds?: Maybe<Order_By>;
  prof_id?: Maybe<Order_By>;
  section_id?: Maybe<Order_By>;
  start_seconds?: Maybe<Order_By>;
};

/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: Maybe<Scalars['smallint']>;
  _gt?: Maybe<Scalars['smallint']>;
  _gte?: Maybe<Scalars['smallint']>;
  _in?: Maybe<Array<Scalars['smallint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['smallint']>;
  _lte?: Maybe<Scalars['smallint']>;
  _neq?: Maybe<Scalars['smallint']>;
  _nin?: Maybe<Array<Scalars['smallint']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "aggregate.course_easy_buckets" */
  aggregate_course_easy_buckets: Array<Aggregate_Course_Easy_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.course_easy_buckets" */
  aggregate_course_easy_buckets_aggregate: Aggregate_Course_Easy_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.course_rating" */
  aggregate_course_rating: Array<Aggregate_Course_Rating>;
  /** fetch aggregated fields from the table: "aggregate.course_rating" */
  aggregate_course_rating_aggregate: Aggregate_Course_Rating_Aggregate;
  /** fetch data from the table: "aggregate.course_review_rating" */
  aggregate_course_review_rating: Array<Aggregate_Course_Review_Rating>;
  /** fetch aggregated fields from the table: "aggregate.course_review_rating" */
  aggregate_course_review_rating_aggregate: Aggregate_Course_Review_Rating_Aggregate;
  /** fetch data from the table: "aggregate.course_useful_buckets" */
  aggregate_course_useful_buckets: Array<Aggregate_Course_Useful_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.course_useful_buckets" */
  aggregate_course_useful_buckets_aggregate: Aggregate_Course_Useful_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_clear_buckets" */
  aggregate_prof_clear_buckets: Array<Aggregate_Prof_Clear_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.prof_clear_buckets" */
  aggregate_prof_clear_buckets_aggregate: Aggregate_Prof_Clear_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_engaging_buckets" */
  aggregate_prof_engaging_buckets: Array<Aggregate_Prof_Engaging_Buckets>;
  /** fetch aggregated fields from the table: "aggregate.prof_engaging_buckets" */
  aggregate_prof_engaging_buckets_aggregate: Aggregate_Prof_Engaging_Buckets_Aggregate;
  /** fetch data from the table: "aggregate.prof_rating" */
  aggregate_prof_rating: Array<Aggregate_Prof_Rating>;
  /** fetch aggregated fields from the table: "aggregate.prof_rating" */
  aggregate_prof_rating_aggregate: Aggregate_Prof_Rating_Aggregate;
  /** fetch data from the table: "aggregate.prof_review_rating" */
  aggregate_prof_review_rating: Array<Aggregate_Prof_Review_Rating>;
  /** fetch aggregated fields from the table: "aggregate.prof_review_rating" */
  aggregate_prof_review_rating_aggregate: Aggregate_Prof_Review_Rating_Aggregate;
  /** fetch data from the table: "course" */
  course: Array<Course>;
  /** fetch aggregated fields from the table: "course" */
  course_aggregate: Course_Aggregate;
  /** fetch data from the table: "course_antirequisite" */
  course_antirequisite: Array<Course_Antirequisite>;
  /** fetch aggregated fields from the table: "course_antirequisite" */
  course_antirequisite_aggregate: Course_Antirequisite_Aggregate;
  /** fetch data from the table: "course" using primary key columns */
  course_by_pk?: Maybe<Course>;
  /** fetch data from the table: "course_postrequisite" */
  course_postrequisite: Array<Course_Postrequisite>;
  /** fetch aggregated fields from the table: "course_postrequisite" */
  course_postrequisite_aggregate: Course_Postrequisite_Aggregate;
  /** fetch data from the table: "course_prerequisite" */
  course_prerequisite: Array<Course_Prerequisite>;
  /** fetch aggregated fields from the table: "course_prerequisite" */
  course_prerequisite_aggregate: Course_Prerequisite_Aggregate;
  /** fetch data from the table: "course_review_upvote" */
  course_review_upvote: Array<Course_Review_Upvote>;
  /** fetch aggregated fields from the table: "course_review_upvote" */
  course_review_upvote_aggregate: Course_Review_Upvote_Aggregate;
  /** fetch data from the table: "course_search_index" */
  course_search_index: Array<Course_Search_Index>;
  /** fetch aggregated fields from the table: "course_search_index" */
  course_search_index_aggregate: Course_Search_Index_Aggregate;
  /** fetch data from the table: "course_section" */
  course_section: Array<Course_Section>;
  /** fetch aggregated fields from the table: "course_section" */
  course_section_aggregate: Course_Section_Aggregate;
  /** fetch data from the table: "course_section" using primary key columns */
  course_section_by_pk?: Maybe<Course_Section>;
  /** fetch data from the table: "prof" */
  prof: Array<Prof>;
  /** fetch aggregated fields from the table: "prof" */
  prof_aggregate: Prof_Aggregate;
  /** fetch data from the table: "prof" using primary key columns */
  prof_by_pk?: Maybe<Prof>;
  /** fetch data from the table: "prof_review_upvote" */
  prof_review_upvote: Array<Prof_Review_Upvote>;
  /** fetch aggregated fields from the table: "prof_review_upvote" */
  prof_review_upvote_aggregate: Prof_Review_Upvote_Aggregate;
  /** fetch data from the table: "prof_search_index" */
  prof_search_index: Array<Prof_Search_Index>;
  /** fetch aggregated fields from the table: "prof_search_index" */
  prof_search_index_aggregate: Prof_Search_Index_Aggregate;
  /** fetch data from the table: "prof_teaches_course" */
  prof_teaches_course: Array<Prof_Teaches_Course>;
  /** fetch aggregated fields from the table: "prof_teaches_course" */
  prof_teaches_course_aggregate: Prof_Teaches_Course_Aggregate;
  /** fetch data from the table: "queue.section_subscribed" */
  queue_section_subscribed: Array<Queue_Section_Subscribed>;
  /** fetch aggregated fields from the table: "queue.section_subscribed" */
  queue_section_subscribed_aggregate: Queue_Section_Subscribed_Aggregate;
  /** fetch data from the table: "queue.section_subscribed" using primary key columns */
  queue_section_subscribed_by_pk?: Maybe<Queue_Section_Subscribed>;
  /** fetch data from the table: "review" */
  review: Array<Review>;
  /** fetch aggregated fields from the table: "review" */
  review_aggregate: Review_Aggregate;
  /** fetch data from the table: "review_author" */
  review_author: Array<Review_Author>;
  /** fetch aggregated fields from the table: "review_author" */
  review_author_aggregate: Review_Author_Aggregate;
  /** fetch data from the table: "review" using primary key columns */
  review_by_pk?: Maybe<Review>;
  /** fetch data from the table: "review_user_id" */
  review_user_id: Array<Review_User_Id>;
  /** fetch aggregated fields from the table: "review_user_id" */
  review_user_id_aggregate: Review_User_Id_Aggregate;
  /** execute function "search_courses" which returns "course_search_index" */
  search_courses: Array<Course_Search_Index>;
  /** execute function "search_courses" and query aggregates on result of table type "course_search_index" */
  search_courses_aggregate: Course_Search_Index_Aggregate;
  /** execute function "search_profs" which returns "prof_search_index" */
  search_profs: Array<Prof_Search_Index>;
  /** execute function "search_profs" and query aggregates on result of table type "prof_search_index" */
  search_profs_aggregate: Prof_Search_Index_Aggregate;
  /** fetch data from the table: "section_exam" */
  section_exam: Array<Section_Exam>;
  /** fetch aggregated fields from the table: "section_exam" */
  section_exam_aggregate: Section_Exam_Aggregate;
  /** fetch data from the table: "section_meeting" */
  section_meeting: Array<Section_Meeting>;
  /** fetch aggregated fields from the table: "section_meeting" */
  section_meeting_aggregate: Section_Meeting_Aggregate;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_course_taken" */
  user_course_taken: Array<User_Course_Taken>;
  /** fetch aggregated fields from the table: "user_course_taken" */
  user_course_taken_aggregate: User_Course_Taken_Aggregate;
  /** fetch data from the table: "user_schedule" */
  user_schedule: Array<User_Schedule>;
  /** fetch aggregated fields from the table: "user_schedule" */
  user_schedule_aggregate: User_Schedule_Aggregate;
  /** fetch data from the table: "user_shortlist" */
  user_shortlist: Array<User_Shortlist>;
  /** fetch aggregated fields from the table: "user_shortlist" */
  user_shortlist_aggregate: User_Shortlist_Aggregate;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Easy_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Easy_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Easy_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Easy_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Easy_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Review_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Review_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Course_Review_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Useful_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Course_Useful_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Course_Useful_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Course_Useful_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Course_Useful_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Clear_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Clear_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Clear_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Clear_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Engaging_BucketsArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Engaging_Buckets_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Engaging_Buckets_Order_By>>;
  where?: Maybe<Aggregate_Prof_Engaging_Buckets_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Review_RatingArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAggregate_Prof_Review_Rating_AggregateArgs = {
  distinct_on?: Maybe<Array<Aggregate_Prof_Review_Rating_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Aggregate_Prof_Review_Rating_Order_By>>;
  where?: Maybe<Aggregate_Prof_Review_Rating_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourseArgs = {
  distinct_on?: Maybe<Array<Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Order_By>>;
  where?: Maybe<Course_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Order_By>>;
  where?: Maybe<Course_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_AntirequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Antirequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Antirequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Antirequisite_Order_By>>;
  where?: Maybe<Course_Antirequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootCourse_PostrequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Postrequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Postrequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Postrequisite_Order_By>>;
  where?: Maybe<Course_Postrequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_PrerequisiteArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Prerequisite_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Prerequisite_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Prerequisite_Order_By>>;
  where?: Maybe<Course_Prerequisite_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Review_UpvoteArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Review_Upvote_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Review_Upvote_Order_By>>;
  where?: Maybe<Course_Review_Upvote_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Search_IndexArgs = {
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Search_Index_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_SectionArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Section_AggregateArgs = {
  distinct_on?: Maybe<Array<Course_Section_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Section_Order_By>>;
  where?: Maybe<Course_Section_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootCourse_Section_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootProfArgs = {
  distinct_on?: Maybe<Array<Prof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Order_By>>;
  where?: Maybe<Prof_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Order_By>>;
  where?: Maybe<Prof_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootProf_Review_UpvoteArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_Review_Upvote_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Review_Upvote_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Review_Upvote_Order_By>>;
  where?: Maybe<Prof_Review_Upvote_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_Search_IndexArgs = {
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_Search_Index_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_Teaches_CourseArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProf_Teaches_Course_AggregateArgs = {
  distinct_on?: Maybe<Array<Prof_Teaches_Course_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Teaches_Course_Order_By>>;
  where?: Maybe<Prof_Teaches_Course_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQueue_Section_SubscribedArgs = {
  distinct_on?: Maybe<Array<Queue_Section_Subscribed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Queue_Section_Subscribed_Order_By>>;
  where?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQueue_Section_Subscribed_AggregateArgs = {
  distinct_on?: Maybe<Array<Queue_Section_Subscribed_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Queue_Section_Subscribed_Order_By>>;
  where?: Maybe<Queue_Section_Subscribed_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQueue_Section_Subscribed_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootReviewArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootReview_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootReview_AuthorArgs = {
  distinct_on?: Maybe<Array<Review_Author_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Author_Order_By>>;
  where?: Maybe<Review_Author_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootReview_Author_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Author_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Author_Order_By>>;
  where?: Maybe<Review_Author_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootReview_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootReview_User_IdArgs = {
  distinct_on?: Maybe<Array<Review_User_Id_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_User_Id_Order_By>>;
  where?: Maybe<Review_User_Id_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootReview_User_Id_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_User_Id_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_User_Id_Order_By>>;
  where?: Maybe<Review_User_Id_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSearch_CoursesArgs = {
  args: Search_Courses_Args;
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSearch_Courses_AggregateArgs = {
  args: Search_Courses_Args;
  distinct_on?: Maybe<Array<Course_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Course_Search_Index_Order_By>>;
  where?: Maybe<Course_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSearch_ProfsArgs = {
  args: Search_Profs_Args;
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSearch_Profs_AggregateArgs = {
  args: Search_Profs_Args;
  distinct_on?: Maybe<Array<Prof_Search_Index_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Prof_Search_Index_Order_By>>;
  where?: Maybe<Prof_Search_Index_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSection_ExamArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSection_Exam_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Exam_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Exam_Order_By>>;
  where?: Maybe<Section_Exam_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSection_MeetingArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSection_Meeting_AggregateArgs = {
  distinct_on?: Maybe<Array<Section_Meeting_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Section_Meeting_Order_By>>;
  where?: Maybe<Section_Meeting_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Order_By>>;
  where?: Maybe<User_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootUser_Course_TakenArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Course_Taken_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_ScheduleArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Schedule_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_ShortlistArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootUser_Shortlist_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** expression to compare columns of type tsvector. All fields are combined with logical 'AND'. */
export type Tsvector_Comparison_Exp = {
  _eq?: Maybe<Scalars['tsvector']>;
  _gt?: Maybe<Scalars['tsvector']>;
  _gte?: Maybe<Scalars['tsvector']>;
  _in?: Maybe<Array<Scalars['tsvector']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['tsvector']>;
  _lte?: Maybe<Scalars['tsvector']>;
  _neq?: Maybe<Scalars['tsvector']>;
  _nin?: Maybe<Array<Scalars['tsvector']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  /** An array relationship */
  courses_taken: Array<User_Course_Taken>;
  /** An aggregated array relationship */
  courses_taken_aggregate: User_Course_Taken_Aggregate;
  email?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  full_name: Scalars['String'];
  id: Scalars['Int'];
  join_date: Scalars['timestamptz'];
  join_source: Scalars['join_source'];
  last_name: Scalars['String'];
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  /** An array relationship */
  reviews: Array<Review>;
  /** An aggregated array relationship */
  reviews_aggregate: Review_Aggregate;
  /** An array relationship */
  schedule: Array<User_Schedule>;
  /** An aggregated array relationship */
  schedule_aggregate: User_Schedule_Aggregate;
  secret_id: Scalars['String'];
  /** An array relationship */
  shortlist: Array<User_Shortlist>;
  /** An aggregated array relationship */
  shortlist_aggregate: User_Shortlist_Aggregate;
};

/** columns and relationships of "user" */
export type UserCourses_TakenArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserCourses_Taken_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Course_Taken_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Course_Taken_Order_By>>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserReviewsArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserReviews_AggregateArgs = {
  distinct_on?: Maybe<Array<Review_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Review_Order_By>>;
  where?: Maybe<Review_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserScheduleArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserSchedule_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Schedule_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Schedule_Order_By>>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserShortlistArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserShortlist_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Shortlist_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Shortlist_Order_By>>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};

/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  avg?: Maybe<User_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Max_Order_By>;
  min?: Maybe<User_Min_Order_By>;
  stddev?: Maybe<User_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Sum_Order_By>;
  var_pop?: Maybe<User_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Var_Samp_Order_By>;
  variance?: Maybe<User_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user" */
export type User_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  _not?: Maybe<User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>;
  courses_taken?: Maybe<User_Course_Taken_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  full_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  join_date?: Maybe<Timestamptz_Comparison_Exp>;
  join_source?: Maybe<Join_Source_Comparison_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  picture_url?: Maybe<String_Comparison_Exp>;
  program?: Maybe<String_Comparison_Exp>;
  reviews?: Maybe<Review_Bool_Exp>;
  schedule?: Maybe<User_Schedule_Bool_Exp>;
  secret_id?: Maybe<String_Comparison_Exp>;
  shortlist?: Maybe<User_Shortlist_Bool_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserPkey = 'user_pkey',
  /** unique or primary key constraint */
  UserSecretIdKey = 'user_secret_id_key',
}

/** columns and relationships of "user_course_taken" */
export type User_Course_Taken = {
  __typename?: 'user_course_taken';
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  term_id: Scalars['Int'];
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "user_course_taken" */
export type User_Course_Taken_Aggregate = {
  __typename?: 'user_course_taken_aggregate';
  aggregate?: Maybe<User_Course_Taken_Aggregate_Fields>;
  nodes: Array<User_Course_Taken>;
};

/** aggregate fields of "user_course_taken" */
export type User_Course_Taken_Aggregate_Fields = {
  __typename?: 'user_course_taken_aggregate_fields';
  avg?: Maybe<User_Course_Taken_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Course_Taken_Max_Fields>;
  min?: Maybe<User_Course_Taken_Min_Fields>;
  stddev?: Maybe<User_Course_Taken_Stddev_Fields>;
  stddev_pop?: Maybe<User_Course_Taken_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Course_Taken_Stddev_Samp_Fields>;
  sum?: Maybe<User_Course_Taken_Sum_Fields>;
  var_pop?: Maybe<User_Course_Taken_Var_Pop_Fields>;
  var_samp?: Maybe<User_Course_Taken_Var_Samp_Fields>;
  variance?: Maybe<User_Course_Taken_Variance_Fields>;
};

/** aggregate fields of "user_course_taken" */
export type User_Course_Taken_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Course_Taken_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_course_taken" */
export type User_Course_Taken_Aggregate_Order_By = {
  avg?: Maybe<User_Course_Taken_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Course_Taken_Max_Order_By>;
  min?: Maybe<User_Course_Taken_Min_Order_By>;
  stddev?: Maybe<User_Course_Taken_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Course_Taken_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Course_Taken_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Course_Taken_Sum_Order_By>;
  var_pop?: Maybe<User_Course_Taken_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Course_Taken_Var_Samp_Order_By>;
  variance?: Maybe<User_Course_Taken_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_course_taken" */
export type User_Course_Taken_Arr_Rel_Insert_Input = {
  data: Array<User_Course_Taken_Insert_Input>;
  on_conflict?: Maybe<User_Course_Taken_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Course_Taken_Avg_Fields = {
  __typename?: 'user_course_taken_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_course_taken" */
export type User_Course_Taken_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_course_taken". All fields are combined with a logical 'AND'. */
export type User_Course_Taken_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Course_Taken_Bool_Exp>>>;
  _not?: Maybe<User_Course_Taken_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Course_Taken_Bool_Exp>>>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  level?: Maybe<String_Comparison_Exp>;
  term_id?: Maybe<Int_Comparison_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_course_taken" */
export enum User_Course_Taken_Constraint {
  /** unique or primary key constraint */
  CourseUniquelyTaken = 'course_uniquely_taken',
}

/** input type for incrementing integer column in table "user_course_taken" */
export type User_Course_Taken_Inc_Input = {
  course_id?: Maybe<Scalars['Int']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_course_taken" */
export type User_Course_Taken_Insert_Input = {
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Course_Taken_Max_Fields = {
  __typename?: 'user_course_taken_max_fields';
  course_id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_course_taken" */
export type User_Course_Taken_Max_Order_By = {
  course_id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Course_Taken_Min_Fields = {
  __typename?: 'user_course_taken_min_fields';
  course_id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_course_taken" */
export type User_Course_Taken_Min_Order_By = {
  course_id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_course_taken" */
export type User_Course_Taken_Mutation_Response = {
  __typename?: 'user_course_taken_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Course_Taken>;
};

/** input type for inserting object relation for remote table "user_course_taken" */
export type User_Course_Taken_Obj_Rel_Insert_Input = {
  data: User_Course_Taken_Insert_Input;
  on_conflict?: Maybe<User_Course_Taken_On_Conflict>;
};

/** on conflict condition type for table "user_course_taken" */
export type User_Course_Taken_On_Conflict = {
  constraint: User_Course_Taken_Constraint;
  update_columns: Array<User_Course_Taken_Update_Column>;
  where?: Maybe<User_Course_Taken_Bool_Exp>;
};

/** ordering options when selecting data from "user_course_taken" */
export type User_Course_Taken_Order_By = {
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user_course_taken" */
export enum User_Course_Taken_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  Level = 'level',
  /** column name */
  TermId = 'term_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_course_taken" */
export type User_Course_Taken_Set_Input = {
  course_id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['String']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Course_Taken_Stddev_Fields = {
  __typename?: 'user_course_taken_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_course_taken" */
export type User_Course_Taken_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Course_Taken_Stddev_Pop_Fields = {
  __typename?: 'user_course_taken_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_course_taken" */
export type User_Course_Taken_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Course_Taken_Stddev_Samp_Fields = {
  __typename?: 'user_course_taken_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_course_taken" */
export type User_Course_Taken_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Course_Taken_Sum_Fields = {
  __typename?: 'user_course_taken_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  term_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_course_taken" */
export type User_Course_Taken_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "user_course_taken" */
export enum User_Course_Taken_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  Level = 'level',
  /** column name */
  TermId = 'term_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type User_Course_Taken_Var_Pop_Fields = {
  __typename?: 'user_course_taken_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_course_taken" */
export type User_Course_Taken_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Course_Taken_Var_Samp_Fields = {
  __typename?: 'user_course_taken_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_course_taken" */
export type User_Course_Taken_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Course_Taken_Variance_Fields = {
  __typename?: 'user_course_taken_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  term_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_course_taken" */
export type User_Course_Taken_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  term_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** input type for incrementing integer column in table "user" */
export type User_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  courses_taken?: Maybe<User_Course_Taken_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  join_date?: Maybe<Scalars['timestamptz']>;
  join_source?: Maybe<Scalars['join_source']>;
  last_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  reviews?: Maybe<Review_Arr_Rel_Insert_Input>;
  schedule?: Maybe<User_Schedule_Arr_Rel_Insert_Input>;
  secret_id?: Maybe<Scalars['String']>;
  shortlist?: Maybe<User_Shortlist_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  join_date?: Maybe<Scalars['timestamptz']>;
  last_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  secret_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  full_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_date?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  secret_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  join_date?: Maybe<Scalars['timestamptz']>;
  last_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  secret_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  full_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_date?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  secret_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  on_conflict?: Maybe<User_On_Conflict>;
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns: Array<User_Update_Column>;
  where?: Maybe<User_Bool_Exp>;
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  courses_taken_aggregate?: Maybe<User_Course_Taken_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  full_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  join_date?: Maybe<Order_By>;
  join_source?: Maybe<Order_By>;
  last_name?: Maybe<Order_By>;
  picture_url?: Maybe<Order_By>;
  program?: Maybe<Order_By>;
  reviews_aggregate?: Maybe<Review_Aggregate_Order_By>;
  schedule_aggregate?: Maybe<User_Schedule_Aggregate_Order_By>;
  secret_id?: Maybe<Order_By>;
  shortlist_aggregate?: Maybe<User_Shortlist_Aggregate_Order_By>;
};

/** primary key columns input for table: "user" */
export type User_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** columns and relationships of "user_schedule" */
export type User_Schedule = {
  __typename?: 'user_schedule';
  /** An object relationship */
  section: Course_Section;
  section_id: Scalars['Int'];
  /** An object relationship */
  user: User;
  user_id: Scalars['Int'];
};

/** aggregated selection of "user_schedule" */
export type User_Schedule_Aggregate = {
  __typename?: 'user_schedule_aggregate';
  aggregate?: Maybe<User_Schedule_Aggregate_Fields>;
  nodes: Array<User_Schedule>;
};

/** aggregate fields of "user_schedule" */
export type User_Schedule_Aggregate_Fields = {
  __typename?: 'user_schedule_aggregate_fields';
  avg?: Maybe<User_Schedule_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Schedule_Max_Fields>;
  min?: Maybe<User_Schedule_Min_Fields>;
  stddev?: Maybe<User_Schedule_Stddev_Fields>;
  stddev_pop?: Maybe<User_Schedule_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Schedule_Stddev_Samp_Fields>;
  sum?: Maybe<User_Schedule_Sum_Fields>;
  var_pop?: Maybe<User_Schedule_Var_Pop_Fields>;
  var_samp?: Maybe<User_Schedule_Var_Samp_Fields>;
  variance?: Maybe<User_Schedule_Variance_Fields>;
};

/** aggregate fields of "user_schedule" */
export type User_Schedule_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Schedule_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_schedule" */
export type User_Schedule_Aggregate_Order_By = {
  avg?: Maybe<User_Schedule_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Schedule_Max_Order_By>;
  min?: Maybe<User_Schedule_Min_Order_By>;
  stddev?: Maybe<User_Schedule_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Schedule_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Schedule_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Schedule_Sum_Order_By>;
  var_pop?: Maybe<User_Schedule_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Schedule_Var_Samp_Order_By>;
  variance?: Maybe<User_Schedule_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_schedule" */
export type User_Schedule_Arr_Rel_Insert_Input = {
  data: Array<User_Schedule_Insert_Input>;
  on_conflict?: Maybe<User_Schedule_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Schedule_Avg_Fields = {
  __typename?: 'user_schedule_avg_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_schedule" */
export type User_Schedule_Avg_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_schedule". All fields are combined with a logical 'AND'. */
export type User_Schedule_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Schedule_Bool_Exp>>>;
  _not?: Maybe<User_Schedule_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Schedule_Bool_Exp>>>;
  section?: Maybe<Course_Section_Bool_Exp>;
  section_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<User_Bool_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_schedule" */
export enum User_Schedule_Constraint {
  /** unique or primary key constraint */
  SectionUniquelyTaken = 'section_uniquely_taken',
}

/** input type for incrementing integer column in table "user_schedule" */
export type User_Schedule_Inc_Input = {
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_schedule" */
export type User_Schedule_Insert_Input = {
  section?: Maybe<Course_Section_Obj_Rel_Insert_Input>;
  section_id?: Maybe<Scalars['Int']>;
  user?: Maybe<User_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Schedule_Max_Fields = {
  __typename?: 'user_schedule_max_fields';
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_schedule" */
export type User_Schedule_Max_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Schedule_Min_Fields = {
  __typename?: 'user_schedule_min_fields';
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_schedule" */
export type User_Schedule_Min_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_schedule" */
export type User_Schedule_Mutation_Response = {
  __typename?: 'user_schedule_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Schedule>;
};

/** input type for inserting object relation for remote table "user_schedule" */
export type User_Schedule_Obj_Rel_Insert_Input = {
  data: User_Schedule_Insert_Input;
  on_conflict?: Maybe<User_Schedule_On_Conflict>;
};

/** on conflict condition type for table "user_schedule" */
export type User_Schedule_On_Conflict = {
  constraint: User_Schedule_Constraint;
  update_columns: Array<User_Schedule_Update_Column>;
  where?: Maybe<User_Schedule_Bool_Exp>;
};

/** ordering options when selecting data from "user_schedule" */
export type User_Schedule_Order_By = {
  section?: Maybe<Course_Section_Order_By>;
  section_id?: Maybe<Order_By>;
  user?: Maybe<User_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user_schedule" */
export enum User_Schedule_Select_Column {
  /** column name */
  SectionId = 'section_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_schedule" */
export type User_Schedule_Set_Input = {
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Schedule_Stddev_Fields = {
  __typename?: 'user_schedule_stddev_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_schedule" */
export type User_Schedule_Stddev_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Schedule_Stddev_Pop_Fields = {
  __typename?: 'user_schedule_stddev_pop_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_schedule" */
export type User_Schedule_Stddev_Pop_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Schedule_Stddev_Samp_Fields = {
  __typename?: 'user_schedule_stddev_samp_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_schedule" */
export type User_Schedule_Stddev_Samp_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Schedule_Sum_Fields = {
  __typename?: 'user_schedule_sum_fields';
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_schedule" */
export type User_Schedule_Sum_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "user_schedule" */
export enum User_Schedule_Update_Column {
  /** column name */
  SectionId = 'section_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type User_Schedule_Var_Pop_Fields = {
  __typename?: 'user_schedule_var_pop_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_schedule" */
export type User_Schedule_Var_Pop_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Schedule_Var_Samp_Fields = {
  __typename?: 'user_schedule_var_samp_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_schedule" */
export type User_Schedule_Var_Samp_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Schedule_Variance_Fields = {
  __typename?: 'user_schedule_variance_fields';
  section_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_schedule" */
export type User_Schedule_Variance_Order_By = {
  section_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  JoinDate = 'join_date',
  /** column name */
  JoinSource = 'join_source',
  /** column name */
  LastName = 'last_name',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Program = 'program',
  /** column name */
  SecretId = 'secret_id',
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  join_date?: Maybe<Scalars['timestamptz']>;
  join_source?: Maybe<Scalars['join_source']>;
  last_name?: Maybe<Scalars['String']>;
  picture_url?: Maybe<Scalars['String']>;
  program?: Maybe<Scalars['String']>;
  secret_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user_shortlist" */
export type User_Shortlist = {
  __typename?: 'user_shortlist';
  /** An object relationship */
  course?: Maybe<Course>;
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregated selection of "user_shortlist" */
export type User_Shortlist_Aggregate = {
  __typename?: 'user_shortlist_aggregate';
  aggregate?: Maybe<User_Shortlist_Aggregate_Fields>;
  nodes: Array<User_Shortlist>;
};

/** aggregate fields of "user_shortlist" */
export type User_Shortlist_Aggregate_Fields = {
  __typename?: 'user_shortlist_aggregate_fields';
  avg?: Maybe<User_Shortlist_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<User_Shortlist_Max_Fields>;
  min?: Maybe<User_Shortlist_Min_Fields>;
  stddev?: Maybe<User_Shortlist_Stddev_Fields>;
  stddev_pop?: Maybe<User_Shortlist_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Shortlist_Stddev_Samp_Fields>;
  sum?: Maybe<User_Shortlist_Sum_Fields>;
  var_pop?: Maybe<User_Shortlist_Var_Pop_Fields>;
  var_samp?: Maybe<User_Shortlist_Var_Samp_Fields>;
  variance?: Maybe<User_Shortlist_Variance_Fields>;
};

/** aggregate fields of "user_shortlist" */
export type User_Shortlist_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Shortlist_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_shortlist" */
export type User_Shortlist_Aggregate_Order_By = {
  avg?: Maybe<User_Shortlist_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<User_Shortlist_Max_Order_By>;
  min?: Maybe<User_Shortlist_Min_Order_By>;
  stddev?: Maybe<User_Shortlist_Stddev_Order_By>;
  stddev_pop?: Maybe<User_Shortlist_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<User_Shortlist_Stddev_Samp_Order_By>;
  sum?: Maybe<User_Shortlist_Sum_Order_By>;
  var_pop?: Maybe<User_Shortlist_Var_Pop_Order_By>;
  var_samp?: Maybe<User_Shortlist_Var_Samp_Order_By>;
  variance?: Maybe<User_Shortlist_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_shortlist" */
export type User_Shortlist_Arr_Rel_Insert_Input = {
  data: Array<User_Shortlist_Insert_Input>;
  on_conflict?: Maybe<User_Shortlist_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Shortlist_Avg_Fields = {
  __typename?: 'user_shortlist_avg_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_shortlist" */
export type User_Shortlist_Avg_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_shortlist". All fields are combined with a logical 'AND'. */
export type User_Shortlist_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Shortlist_Bool_Exp>>>;
  _not?: Maybe<User_Shortlist_Bool_Exp>;
  _or?: Maybe<Array<Maybe<User_Shortlist_Bool_Exp>>>;
  course?: Maybe<Course_Bool_Exp>;
  course_id?: Maybe<Int_Comparison_Exp>;
  user_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_shortlist" */
export enum User_Shortlist_Constraint {
  /** unique or primary key constraint */
  CourseUniquelyShortlisted = 'course_uniquely_shortlisted',
}

/** input type for incrementing integer column in table "user_shortlist" */
export type User_Shortlist_Inc_Input = {
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_shortlist" */
export type User_Shortlist_Insert_Input = {
  course?: Maybe<Course_Obj_Rel_Insert_Input>;
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type User_Shortlist_Max_Fields = {
  __typename?: 'user_shortlist_max_fields';
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_shortlist" */
export type User_Shortlist_Max_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type User_Shortlist_Min_Fields = {
  __typename?: 'user_shortlist_min_fields';
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_shortlist" */
export type User_Shortlist_Min_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "user_shortlist" */
export type User_Shortlist_Mutation_Response = {
  __typename?: 'user_shortlist_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<User_Shortlist>;
};

/** input type for inserting object relation for remote table "user_shortlist" */
export type User_Shortlist_Obj_Rel_Insert_Input = {
  data: User_Shortlist_Insert_Input;
  on_conflict?: Maybe<User_Shortlist_On_Conflict>;
};

/** on conflict condition type for table "user_shortlist" */
export type User_Shortlist_On_Conflict = {
  constraint: User_Shortlist_Constraint;
  update_columns: Array<User_Shortlist_Update_Column>;
  where?: Maybe<User_Shortlist_Bool_Exp>;
};

/** ordering options when selecting data from "user_shortlist" */
export type User_Shortlist_Order_By = {
  course?: Maybe<Course_Order_By>;
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user_shortlist" */
export enum User_Shortlist_Select_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "user_shortlist" */
export type User_Shortlist_Set_Input = {
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type User_Shortlist_Stddev_Fields = {
  __typename?: 'user_shortlist_stddev_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_shortlist" */
export type User_Shortlist_Stddev_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Shortlist_Stddev_Pop_Fields = {
  __typename?: 'user_shortlist_stddev_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_shortlist" */
export type User_Shortlist_Stddev_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Shortlist_Stddev_Samp_Fields = {
  __typename?: 'user_shortlist_stddev_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_shortlist" */
export type User_Shortlist_Stddev_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Shortlist_Sum_Fields = {
  __typename?: 'user_shortlist_sum_fields';
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_shortlist" */
export type User_Shortlist_Sum_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** update columns of table "user_shortlist" */
export enum User_Shortlist_Update_Column {
  /** column name */
  CourseId = 'course_id',
  /** column name */
  UserId = 'user_id',
}

/** aggregate var_pop on columns */
export type User_Shortlist_Var_Pop_Fields = {
  __typename?: 'user_shortlist_var_pop_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_shortlist" */
export type User_Shortlist_Var_Pop_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Shortlist_Var_Samp_Fields = {
  __typename?: 'user_shortlist_var_samp_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_shortlist" */
export type User_Shortlist_Var_Samp_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Shortlist_Variance_Fields = {
  __typename?: 'user_shortlist_variance_fields';
  course_id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_shortlist" */
export type User_Shortlist_Variance_Order_By = {
  course_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user" */
export type User_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user" */
export type User_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user" */
export type User_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user" */
export type User_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  JoinDate = 'join_date',
  /** column name */
  JoinSource = 'join_source',
  /** column name */
  LastName = 'last_name',
  /** column name */
  PictureUrl = 'picture_url',
  /** column name */
  Program = 'program',
  /** column name */
  SecretId = 'secret_id',
}

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user" */
export type User_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user" */
export type User_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user" */
export type User_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

export type CourseInfoFragment = { __typename?: 'course' } & Pick<
  Course,
  'id' | 'code' | 'name' | 'description'
> & {
    profs_teaching: Array<
      { __typename?: 'prof_teaches_course' } & {
        prof?: Maybe<
          { __typename?: 'prof' } & Pick<Prof, 'id' | 'code' | 'name'> & {
              rating?: Maybe<
                { __typename?: 'aggregate_prof_rating' } & Pick<
                  Aggregate_Prof_Rating,
                  'liked' | 'comment_count'
                >
              >;
            }
        >;
      }
    >;
  };

export type CourseTermFragment = { __typename?: 'course' } & Pick<
  Course,
  'id'
> & {
    sections: Array<
      { __typename?: 'course_section' } & Pick<Course_Section, 'id' | 'term_id'>
    >;
  };

export type CourseScheduleFragment = { __typename?: 'course' } & Pick<
  Course,
  'id'
> & {
    sections: Array<
      { __typename?: 'course_section' } & Pick<
        Course_Section,
        | 'id'
        | 'enrollment_capacity'
        | 'enrollment_total'
        | 'class_number'
        | 'section_name'
        | 'term_id'
        | 'updated_at'
      > & {
          meetings: Array<
            { __typename?: 'section_meeting' } & Pick<
              Section_Meeting,
              | 'days'
              | 'start_date'
              | 'end_date'
              | 'start_seconds'
              | 'end_seconds'
              | 'location'
              | 'is_closed'
              | 'is_cancelled'
              | 'is_tba'
            > & {
                prof?: Maybe<
                  { __typename?: 'prof' } & Pick<Prof, 'id' | 'code' | 'name'>
                >;
              }
          >;
          exams: Array<
            { __typename?: 'section_exam' } & Pick<
              Section_Exam,
              | 'date'
              | 'day'
              | 'end_seconds'
              | 'is_tba'
              | 'location'
              | 'section_id'
              | 'start_seconds'
            >
          >;
        }
    >;
  };

export type CourseRequirementsFragment = { __typename?: 'course' } & Pick<
  Course,
  'id' | 'antireqs' | 'prereqs' | 'coreqs'
> & {
    postrequisites: Array<
      { __typename?: 'course_postrequisite' } & {
        postrequisite?: Maybe<
          { __typename?: 'course' } & Pick<Course, 'id' | 'code' | 'name'>
        >;
      }
    >;
  };

export type CourseRatingFragment = { __typename?: 'course' } & Pick<
  Course,
  'id'
> & {
    rating?: Maybe<
      { __typename?: 'aggregate_course_rating' } & Pick<
        Aggregate_Course_Rating,
        'liked' | 'easy' | 'useful' | 'filled_count' | 'comment_count'
      >
    >;
  };

export type ProfInfoFragment = { __typename?: 'prof' } & Pick<
  Prof,
  'id' | 'name' | 'code'
>;

export type ProfCoursesTaughtFragment = { __typename?: 'prof' } & Pick<
  Prof,
  'id'
> & {
    prof_courses: Array<
      { __typename?: 'prof_teaches_course' } & {
        course?: Maybe<{ __typename?: 'course' } & Pick<Course, 'id' | 'code'>>;
      }
    >;
  };

export type ProfRatingFragment = { __typename?: 'prof' } & Pick<Prof, 'id'> & {
    rating?: Maybe<
      { __typename?: 'aggregate_prof_rating' } & Pick<
        Aggregate_Prof_Rating,
        'liked' | 'clear' | 'engaging' | 'filled_count' | 'comment_count'
      >
    >;
  };

export type ReviewInfoFragment = { __typename?: 'review' } & Pick<
  Review,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'public'
  | 'liked'
  | 'course_comment'
  | 'course_easy'
  | 'course_useful'
  | 'prof_engaging'
  | 'prof_comment'
  | 'prof_clear'
  | 'course_id'
  | 'prof_id'
> & {
    author?: Maybe<
      { __typename?: 'review_author' } & Pick<
        Review_Author,
        'full_name' | 'picture_url' | 'program'
      >
    >;
    course?: Maybe<
      { __typename?: 'course' } & Pick<Course, 'id' | 'code' | 'name'> & {
          profs_teaching: Array<
            { __typename?: 'prof_teaches_course' } & {
              prof?: Maybe<{ __typename?: 'prof' } & Pick<Prof, 'id' | 'name'>>;
            }
          >;
          rating?: Maybe<
            { __typename?: 'aggregate_course_rating' } & Pick<
              Aggregate_Course_Rating,
              'liked'
            >
          >;
        }
    >;
    prof?: Maybe<
      { __typename?: 'prof' } & Pick<
        Prof,
        'id' | 'name' | 'code' | 'picture_url'
      > & {
          rating?: Maybe<
            { __typename?: 'aggregate_prof_rating' } & Pick<
              Aggregate_Prof_Rating,
              'liked'
            >
          >;
        }
    >;
  };

export type ReviewUpdateInfoFragment = { __typename?: 'review' } & Pick<
  Review,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'public'
  | 'liked'
  | 'course_comment'
  | 'course_easy'
  | 'course_useful'
  | 'prof_engaging'
  | 'prof_comment'
  | 'prof_clear'
  | 'course_id'
  | 'prof_id'
>;

export type ReviewVoteCountsFragment = { __typename?: 'review' } & Pick<
  Review,
  'id'
> & {
    course_review_rating?: Maybe<
      { __typename?: 'aggregate_course_review_rating' } & Pick<
        Aggregate_Course_Review_Rating,
        'upvote_count'
      >
    >;
    prof_review_rating?: Maybe<
      { __typename?: 'aggregate_prof_review_rating' } & Pick<
        Aggregate_Prof_Review_Rating,
        'upvote_count'
      >
    >;
  };

export type UserReviewFieldsFragment = { __typename?: 'review' } & Pick<
  Review,
  'id'
> & {
    course_review_upvotes: Array<
      { __typename?: 'course_review_upvote' } & Pick<
        Course_Review_Upvote,
        'user_id'
      >
    >;
    prof_review_upvotes: Array<
      { __typename?: 'prof_review_upvote' } & Pick<
        Prof_Review_Upvote,
        'user_id'
      >
    >;
    user?: Maybe<
      { __typename?: 'review_user_id' } & Pick<Review_User_Id, 'user_id'>
    >;
  };

export type ReviewProfsFragment = { __typename?: 'review' } & Pick<
  Review,
  'id' | 'course_id'
> & {
    prof?: Maybe<{ __typename?: 'prof' } & Pick<Prof, 'id' | 'name' | 'code'>>;
  };

export type CourseSearchFragment = {
  __typename?: 'course_search_index';
} & Pick<
  Course_Search_Index,
  | 'course_id'
  | 'name'
  | 'code'
  | 'useful'
  | 'terms'
  | 'ratings'
  | 'prof_ids'
  | 'liked'
  | 'easy'
  | 'has_prereqs'
>;

export type ProfSearchFragment = { __typename?: 'prof_search_index' } & Pick<
  Prof_Search_Index,
  | 'prof_id'
  | 'name'
  | 'code'
  | 'clear'
  | 'course_ids'
  | 'course_codes'
  | 'engaging'
  | 'liked'
  | 'ratings'
>;

export type UserInfoFragment = { __typename?: 'user' } & Pick<
  User,
  'id' | 'full_name' | 'program' | 'picture_url' | 'secret_id' | 'email'
>;

export type UserShortlistFragment = { __typename?: 'user' } & Pick<
  User,
  'id'
> & {
    shortlist: Array<
      { __typename?: 'user_shortlist' } & Pick<
        User_Shortlist,
        'course_id' | 'user_id'
      > & {
          course?: Maybe<
            { __typename?: 'course' } & Pick<Course, 'id' | 'code' | 'name'>
          >;
        }
    >;
  };

export type UserScheduleFragment = { __typename?: 'user' } & Pick<
  User,
  'id'
> & {
    schedule: Array<
      { __typename?: 'user_schedule' } & {
        section: { __typename?: 'course_section' } & Pick<
          Course_Section,
          'id' | 'section_name'
        > & {
            exams: Array<
              { __typename?: 'section_exam' } & Pick<
                Section_Exam,
                'date' | 'day' | 'location' | 'start_seconds' | 'end_seconds'
              >
            >;
            meetings: Array<
              { __typename?: 'section_meeting' } & Pick<
                Section_Meeting,
                | 'days'
                | 'end_date'
                | 'end_seconds'
                | 'is_cancelled'
                | 'location'
                | 'section_id'
                | 'start_date'
                | 'start_seconds'
              > & {
                  prof?: Maybe<
                    { __typename?: 'prof' } & Pick<Prof, 'id' | 'name'>
                  >;
                }
            >;
            course: { __typename?: 'course' } & Pick<
              Course,
              'id' | 'name' | 'code'
            >;
          };
      }
    >;
  };

export type UserCoursesTakenFragment = {
  __typename?: 'user_course_taken';
} & Pick<User_Course_Taken, 'term_id' | 'course_id'> & {
    course?: Maybe<
      { __typename?: 'course' } & Pick<Course, 'id' | 'code' | 'name'> & {
          rating?: Maybe<
            { __typename?: 'aggregate_course_rating' } & Pick<
              Aggregate_Course_Rating,
              'liked'
            >
          >;
          profs_teaching: Array<
            { __typename?: 'prof_teaches_course' } & {
              prof?: Maybe<
                { __typename?: 'prof' } & Pick<Prof, 'id' | 'code' | 'name'>
              >;
            }
          >;
          sections: Array<
            { __typename?: 'course_section' } & Pick<
              Course_Section,
              'id' | 'term_id' | 'updated_at'
            > & {
                exams: Array<
                  { __typename?: 'section_exam' } & Pick<
                    Section_Exam,
                    | 'date'
                    | 'day'
                    | 'end_seconds'
                    | 'is_tba'
                    | 'location'
                    | 'section_id'
                    | 'start_seconds'
                  >
                >;
              }
          >;
        }
    >;
  };

export type UpdateUserEmailMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
}>;

export type UpdateUserEmailMutation = { __typename?: 'mutation_root' } & {
  update_user?: Maybe<
    { __typename?: 'user_mutation_response' } & Pick<
      User_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<{ __typename?: 'user' } & Pick<User, 'id' | 'email'>>;
      }
  >;
};

export type UpsertReviewMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
  public?: Maybe<Scalars['Boolean']>;
  course_easy?: Maybe<Scalars['smallint']>;
  course_useful?: Maybe<Scalars['smallint']>;
  course_comment?: Maybe<Scalars['String']>;
  prof_clear?: Maybe<Scalars['smallint']>;
  prof_engaging?: Maybe<Scalars['smallint']>;
  prof_comment?: Maybe<Scalars['String']>;
}>;

export type UpsertReviewMutation = { __typename?: 'mutation_root' } & {
  insert_review?: Maybe<
    { __typename?: 'review_mutation_response' } & {
      returning: Array<{ __typename?: 'review' } & ReviewUpdateInfoFragment>;
    }
  >;
};

export type DeleteReviewMutationVariables = Exact<{
  review_id?: Maybe<Scalars['Int']>;
}>;

export type DeleteReviewMutation = { __typename?: 'mutation_root' } & {
  delete_review?: Maybe<
    { __typename?: 'review_mutation_response' } & {
      returning: Array<{ __typename?: 'review' } & ReviewUpdateInfoFragment>;
    }
  >;
};

export type UpsertLikedReviewMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
  liked?: Maybe<Scalars['smallint']>;
}>;

export type UpsertLikedReviewMutation = { __typename?: 'mutation_root' } & {
  insert_review?: Maybe<
    { __typename?: 'review_mutation_response' } & {
      returning: Array<
        { __typename?: 'review' } & Pick<Review, 'id' | 'liked'>
      >;
    }
  >;
};

export type InsertSectionSubscriptionMutationVariables = Exact<{
  section_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type InsertSectionSubscriptionMutation = {
  __typename?: 'mutation_root';
} & {
  insert_queue_section_subscribed?: Maybe<
    { __typename?: 'queue_section_subscribed_mutation_response' } & Pick<
      Queue_Section_Subscribed_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type DeleteSectionSubscriptionMutationVariables = Exact<{
  section_id?: Maybe<Scalars['Int']>;
}>;

export type DeleteSectionSubscriptionMutation = {
  __typename?: 'mutation_root';
} & {
  delete_queue_section_subscribed?: Maybe<
    { __typename?: 'queue_section_subscribed_mutation_response' } & Pick<
      Queue_Section_Subscribed_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type InsertUserShortlistMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  course_id?: Maybe<Scalars['Int']>;
}>;

export type InsertUserShortlistMutation = { __typename?: 'mutation_root' } & {
  insert_user_shortlist?: Maybe<
    { __typename?: 'user_shortlist_mutation_response' } & Pick<
      User_Shortlist_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type DeleteUserShortlistMutationVariables = Exact<{
  course_id?: Maybe<Scalars['Int']>;
}>;

export type DeleteUserShortlistMutation = { __typename?: 'mutation_root' } & {
  delete_user_shortlist?: Maybe<
    { __typename?: 'user_shortlist_mutation_response' } & Pick<
      User_Shortlist_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type InsertCourseReviewVoteMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['Int']>;
}>;

export type InsertCourseReviewVoteMutation = {
  __typename?: 'mutation_root';
} & {
  insert_course_review_upvote?: Maybe<
    { __typename?: 'course_review_upvote_mutation_response' } & Pick<
      Course_Review_Upvote_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type DeleteCourseReviewVoteMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['Int']>;
}>;

export type DeleteCourseReviewVoteMutation = {
  __typename?: 'mutation_root';
} & {
  delete_course_review_upvote?: Maybe<
    { __typename?: 'course_review_upvote_mutation_response' } & Pick<
      Course_Review_Upvote_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type InsertProfReviewVoteMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['Int']>;
}>;

export type InsertProfReviewVoteMutation = { __typename?: 'mutation_root' } & {
  insert_prof_review_upvote?: Maybe<
    { __typename?: 'prof_review_upvote_mutation_response' } & Pick<
      Prof_Review_Upvote_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type Delete_Prof_Review_VoteMutationVariables = Exact<{
  user_id?: Maybe<Scalars['Int']>;
  review_id?: Maybe<Scalars['Int']>;
}>;

export type Delete_Prof_Review_VoteMutation = {
  __typename?: 'mutation_root';
} & {
  delete_prof_review_upvote?: Maybe<
    { __typename?: 'prof_review_upvote_mutation_response' } & Pick<
      Prof_Review_Upvote_Mutation_Response,
      'affected_rows'
    >
  >;
};

export type GetCourseQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type GetCourseQuery = { __typename?: 'query_root' } & {
  course: Array<
    { __typename?: 'course' } & CourseInfoFragment &
      CourseScheduleFragment &
      CourseRequirementsFragment &
      CourseRatingFragment
  >;
};

export type GetCourseWithUserDataQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type GetCourseWithUserDataQuery = { __typename?: 'query_root' } & {
  course: Array<
    { __typename?: 'course' } & CourseInfoFragment &
      CourseScheduleFragment &
      CourseRequirementsFragment &
      CourseRatingFragment
  >;
  user_shortlist: Array<
    { __typename?: 'user_shortlist' } & Pick<
      User_Shortlist,
      'course_id' | 'user_id'
    >
  >;
  user_course_taken: Array<
    { __typename?: 'user_course_taken' } & Pick<
      User_Course_Taken,
      'term_id' | 'course_id'
    >
  >;
  queue_section_subscribed: Array<
    { __typename?: 'queue_section_subscribed' } & Pick<
      Queue_Section_Subscribed,
      'section_id' | 'user_id'
    >
  >;
  review: Array<{ __typename?: 'review' } & ReviewInfoFragment>;
  user: Array<{ __typename?: 'user' } & Pick<User, 'email'>>;
};

export type RefetchCourseShortlistQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type RefetchCourseShortlistQuery = { __typename?: 'query_root' } & {
  user_shortlist: Array<
    { __typename?: 'user_shortlist' } & Pick<
      User_Shortlist,
      'course_id' | 'user_id'
    >
  >;
};

export type RefetchRatingsQueryVariables = Exact<{
  course_id?: Maybe<Scalars['Int']>;
  prof_id?: Maybe<Scalars['Int']>;
}>;

export type RefetchRatingsQuery = { __typename?: 'query_root' } & {
  course: Array<{ __typename?: 'course' } & CourseRatingFragment>;
  prof: Array<{ __typename?: 'prof' } & ProfRatingFragment>;
};

export type RefetchSectionSubscriptionsQueryVariables = Exact<{
  course_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type RefetchSectionSubscriptionsQuery = { __typename?: 'query_root' } & {
  queue_section_subscribed: Array<
    { __typename?: 'queue_section_subscribed' } & Pick<
      Queue_Section_Subscribed,
      'section_id' | 'user_id'
    >
  >;
};

export type RefetchCourseReviewsQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
}>;

export type RefetchCourseReviewsQuery = { __typename?: 'query_root' } & {
  review: Array<{ __typename?: 'review' } & ReviewInfoFragment>;
};

export type CourseReviewsQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type CourseReviewsQuery = { __typename?: 'query_root' } & {
  review: Array<
    { __typename?: 'review' } & ReviewInfoFragment & ReviewVoteCountsFragment
  >;
};

export type CourseReviewsWithUserDataQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type CourseReviewsWithUserDataQuery = { __typename?: 'query_root' } & {
  review: Array<
    { __typename?: 'review' } & ReviewInfoFragment &
      ReviewVoteCountsFragment &
      UserReviewFieldsFragment
  >;
};

export type RefetchCourseReviewUpvoteQueryVariables = Exact<{
  review_id?: Maybe<Scalars['Int']>;
}>;

export type RefetchCourseReviewUpvoteQuery = { __typename?: 'query_root' } & {
  review: Array<{ __typename?: 'review' } & ReviewVoteCountsFragment>;
};

export type CourseReviewProfsQueryVariables = Exact<{
  id?: Maybe<Array<Scalars['Int']>>;
}>;

export type CourseReviewProfsQuery = { __typename?: 'query_root' } & {
  review: Array<{ __typename?: 'review' } & ReviewProfsFragment>;
};

export type ExploreAllQueryVariables = Exact<{ [key: string]: never }>;

export type ExploreAllQuery = { __typename?: 'query_root' } & {
  course_search_index: Array<
    { __typename?: 'course_search_index' } & CourseSearchFragment
  >;
  prof_search_index: Array<
    { __typename?: 'prof_search_index' } & ProfSearchFragment
  >;
};

export type ExploreQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
  code_only?: Maybe<Scalars['Boolean']>;
}>;

export type ExploreQuery = { __typename?: 'query_root' } & {
  search_courses: Array<
    { __typename?: 'course_search_index' } & CourseSearchFragment
  >;
  search_profs: Array<
    { __typename?: 'prof_search_index' } & ProfSearchFragment
  >;
};

export type GetProfQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
}>;

export type GetProfQuery = { __typename?: 'query_root' } & {
  prof: Array<
    { __typename?: 'prof' } & ProfInfoFragment &
      ProfCoursesTaughtFragment &
      ProfRatingFragment
  >;
};

export type ProfReviewsQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type ProfReviewsQuery = { __typename?: 'query_root' } & {
  review: Array<
    { __typename?: 'review' } & ReviewInfoFragment & ReviewVoteCountsFragment
  >;
};

export type ProfReviewsWithUserDataQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type ProfReviewsWithUserDataQuery = { __typename?: 'query_root' } & {
  review: Array<
    { __typename?: 'review' } & ReviewInfoFragment &
      ReviewVoteCountsFragment &
      UserReviewFieldsFragment
  >;
};

export type Refetch_Prof_Review_UpvoteQueryVariables = Exact<{
  review_id?: Maybe<Scalars['Int']>;
}>;

export type Refetch_Prof_Review_UpvoteQuery = { __typename?: 'query_root' } & {
  review: Array<{ __typename?: 'review' } & ReviewVoteCountsFragment>;
};

export type GetUserQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type GetUserQuery = { __typename?: 'query_root' } & {
  user: Array<
    { __typename?: 'user' } & UserInfoFragment &
      UserShortlistFragment &
      UserScheduleFragment
  >;
  user_course_taken: Array<
    { __typename?: 'user_course_taken' } & UserCoursesTakenFragment
  >;
  review: Array<{ __typename?: 'review' } & ReviewInfoFragment>;
};

export type RefetchUserShortlistQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type RefetchUserShortlistQuery = { __typename?: 'query_root' } & {
  user: Array<
    { __typename?: 'user' } & Pick<User, 'id'> & UserShortlistFragment
  >;
};

export type RefetchUserReviewQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;

export type RefetchUserReviewQuery = { __typename?: 'query_root' } & {
  review: Array<{ __typename?: 'review' } & ReviewInfoFragment>;
};

export const CourseInfoFragmentDoc = gql`
  fragment CourseInfo on course {
    id
    code
    name
    description
    profs_teaching {
      prof {
        id
        code
        name
        rating {
          liked
          comment_count
        }
      }
    }
  }
`;
export const CourseTermFragmentDoc = gql`
  fragment CourseTerm on course {
    id
    sections {
      id
      term_id
    }
  }
`;
export const CourseScheduleFragmentDoc = gql`
  fragment CourseSchedule on course {
    id
    sections {
      id
      enrollment_capacity
      enrollment_total
      class_number
      section_name
      term_id
      updated_at
      meetings {
        days
        start_date
        end_date
        start_seconds
        end_seconds
        location
        prof {
          id
          code
          name
        }
        is_closed
        is_cancelled
        is_tba
      }
      exams {
        date
        day
        end_seconds
        is_tba
        location
        section_id
        start_seconds
      }
    }
  }
`;
export const CourseRequirementsFragmentDoc = gql`
  fragment CourseRequirements on course {
    id
    antireqs
    prereqs
    coreqs
    postrequisites {
      postrequisite {
        id
        code
        name
      }
    }
  }
`;
export const CourseRatingFragmentDoc = gql`
  fragment CourseRating on course {
    id
    rating {
      liked
      easy
      useful
      filled_count
      comment_count
    }
  }
`;
export const ProfInfoFragmentDoc = gql`
  fragment ProfInfo on prof {
    id
    name
    code
  }
`;
export const ProfCoursesTaughtFragmentDoc = gql`
  fragment ProfCoursesTaught on prof {
    id
    prof_courses {
      course {
        id
        code
      }
    }
  }
`;
export const ProfRatingFragmentDoc = gql`
  fragment ProfRating on prof {
    id
    rating {
      liked
      clear
      engaging
      filled_count
      comment_count
    }
  }
`;
export const ReviewInfoFragmentDoc = gql`
  fragment ReviewInfo on review {
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
      rating {
        liked
      }
    }
    prof_id
    prof {
      id
      name
      code
      picture_url
      rating {
        liked
      }
    }
  }
`;
export const ReviewUpdateInfoFragmentDoc = gql`
  fragment ReviewUpdateInfo on review {
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
`;
export const ReviewVoteCountsFragmentDoc = gql`
  fragment ReviewVoteCounts on review {
    id
    course_review_rating {
      upvote_count
    }
    prof_review_rating {
      upvote_count
    }
  }
`;
export const UserReviewFieldsFragmentDoc = gql`
  fragment UserReviewFields on review {
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
`;
export const ReviewProfsFragmentDoc = gql`
  fragment ReviewProfs on review {
    id
    prof {
      id
      name
      code
    }
    course_id
  }
`;
export const CourseSearchFragmentDoc = gql`
  fragment CourseSearch on course_search_index {
    course_id
    name
    code
    useful
    terms
    ratings
    prof_ids
    liked
    easy
    has_prereqs
  }
`;
export const ProfSearchFragmentDoc = gql`
  fragment ProfSearch on prof_search_index {
    prof_id
    name
    code
    clear
    course_ids
    course_codes
    engaging
    liked
    ratings
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on user {
    id
    full_name
    program
    picture_url
    secret_id
    email
  }
`;
export const UserShortlistFragmentDoc = gql`
  fragment UserShortlist on user {
    id
    shortlist {
      course_id
      user_id
      course {
        id
        code
        name
      }
    }
  }
`;
export const UserScheduleFragmentDoc = gql`
  fragment UserSchedule on user {
    id
    schedule {
      section {
        id
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
          location
          prof {
            id
            name
          }
          section_id
          start_date
          start_seconds
        }
        section_name
        course {
          id
          name
          code
        }
      }
    }
  }
`;
export const UserCoursesTakenFragmentDoc = gql`
  fragment UserCoursesTaken on user_course_taken {
    term_id
    course_id
    course {
      id
      code
      name
      rating {
        liked
      }
      profs_teaching {
        prof {
          id
          code
          name
        }
      }
      sections {
        id
        term_id
        updated_at
        exams {
          date
          day
          end_seconds
          is_tba
          location
          section_id
          start_seconds
        }
      }
    }
  }
`;
export const UpdateUserEmailDocument = gql`
  mutation updateUserEmail($user_id: Int, $email: String) {
    update_user(where: { id: { _eq: $user_id } }, _set: { email: $email }) {
      affected_rows
      returning {
        id
        email
      }
    }
  }
`;
export type UpdateUserEmailMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>;

/**
 * __useUpdateUserEmailMutation__
 *
 * To run a mutation, you first call `useUpdateUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserEmailMutation, { data, loading, error }] = useUpdateUserEmailMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserEmailMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserEmailMutation,
    UpdateUserEmailMutationVariables
  >(UpdateUserEmailDocument, baseOptions);
}
export type UpdateUserEmailMutationHookResult = ReturnType<
  typeof useUpdateUserEmailMutation
>;
export type UpdateUserEmailMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserEmailMutation
>;
export type UpdateUserEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables
>;
export const UpsertReviewDocument = gql`
  mutation upsertReview(
    $user_id: Int
    $course_id: Int
    $prof_id: Int
    $liked: smallint
    $public: Boolean
    $course_easy: smallint
    $course_useful: smallint
    $course_comment: String
    $prof_clear: smallint
    $prof_engaging: smallint
    $prof_comment: String
  ) {
    insert_review(
      objects: {
        user_id: $user_id
        course_id: $course_id
        prof_id: $prof_id
        liked: $liked
        public: $public
        course_easy: $course_easy
        course_useful: $course_useful
        course_comment: $course_comment
        prof_clear: $prof_clear
        prof_engaging: $prof_engaging
        prof_comment: $prof_comment
      }
      on_conflict: {
        constraint: course_uniquely_reviewed
        update_columns: [
          prof_id
          liked
          course_easy
          course_useful
          course_comment
          prof_clear
          prof_engaging
          prof_comment
          public
        ]
      }
    ) {
      returning {
        ...ReviewUpdateInfo
      }
    }
  }
  ${ReviewUpdateInfoFragmentDoc}
`;
export type UpsertReviewMutationFn = ApolloReactCommon.MutationFunction<
  UpsertReviewMutation,
  UpsertReviewMutationVariables
>;

/**
 * __useUpsertReviewMutation__
 *
 * To run a mutation, you first call `useUpsertReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertReviewMutation, { data, loading, error }] = useUpsertReviewMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      course_id: // value for 'course_id'
 *      prof_id: // value for 'prof_id'
 *      liked: // value for 'liked'
 *      public: // value for 'public'
 *      course_easy: // value for 'course_easy'
 *      course_useful: // value for 'course_useful'
 *      course_comment: // value for 'course_comment'
 *      prof_clear: // value for 'prof_clear'
 *      prof_engaging: // value for 'prof_engaging'
 *      prof_comment: // value for 'prof_comment'
 *   },
 * });
 */
export function useUpsertReviewMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertReviewMutation,
    UpsertReviewMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertReviewMutation,
    UpsertReviewMutationVariables
  >(UpsertReviewDocument, baseOptions);
}
export type UpsertReviewMutationHookResult = ReturnType<
  typeof useUpsertReviewMutation
>;
export type UpsertReviewMutationResult = ApolloReactCommon.MutationResult<
  UpsertReviewMutation
>;
export type UpsertReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertReviewMutation,
  UpsertReviewMutationVariables
>;
export const DeleteReviewDocument = gql`
  mutation deleteReview($review_id: Int) {
    delete_review(where: { id: { _eq: $review_id } }) {
      returning {
        ...ReviewUpdateInfo
      }
    }
  }
  ${ReviewUpdateInfoFragmentDoc}
`;
export type DeleteReviewMutationFn = ApolloReactCommon.MutationFunction<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useDeleteReviewMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteReviewMutation,
    DeleteReviewMutationVariables
  >(DeleteReviewDocument, baseOptions);
}
export type DeleteReviewMutationHookResult = ReturnType<
  typeof useDeleteReviewMutation
>;
export type DeleteReviewMutationResult = ApolloReactCommon.MutationResult<
  DeleteReviewMutation
>;
export type DeleteReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteReviewMutation,
  DeleteReviewMutationVariables
>;
export const UpsertLikedReviewDocument = gql`
  mutation upsertLikedReview($user_id: Int, $course_id: Int, $liked: smallint) {
    insert_review(
      objects: {
        user_id: $user_id
        course_id: $course_id
        liked: $liked
        public: false
      }
      on_conflict: {
        constraint: course_uniquely_reviewed
        update_columns: [liked]
      }
    ) {
      returning {
        id
        liked
      }
    }
  }
`;
export type UpsertLikedReviewMutationFn = ApolloReactCommon.MutationFunction<
  UpsertLikedReviewMutation,
  UpsertLikedReviewMutationVariables
>;

/**
 * __useUpsertLikedReviewMutation__
 *
 * To run a mutation, you first call `useUpsertLikedReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertLikedReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertLikedReviewMutation, { data, loading, error }] = useUpsertLikedReviewMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      course_id: // value for 'course_id'
 *      liked: // value for 'liked'
 *   },
 * });
 */
export function useUpsertLikedReviewMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertLikedReviewMutation,
    UpsertLikedReviewMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpsertLikedReviewMutation,
    UpsertLikedReviewMutationVariables
  >(UpsertLikedReviewDocument, baseOptions);
}
export type UpsertLikedReviewMutationHookResult = ReturnType<
  typeof useUpsertLikedReviewMutation
>;
export type UpsertLikedReviewMutationResult = ApolloReactCommon.MutationResult<
  UpsertLikedReviewMutation
>;
export type UpsertLikedReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertLikedReviewMutation,
  UpsertLikedReviewMutationVariables
>;
export const InsertSectionSubscriptionDocument = gql`
  mutation insertSectionSubscription($section_id: Int, $user_id: Int) {
    insert_queue_section_subscribed(
      objects: { section_id: $section_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;
export type InsertSectionSubscriptionMutationFn = ApolloReactCommon.MutationFunction<
  InsertSectionSubscriptionMutation,
  InsertSectionSubscriptionMutationVariables
>;

/**
 * __useInsertSectionSubscriptionMutation__
 *
 * To run a mutation, you first call `useInsertSectionSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertSectionSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertSectionSubscriptionMutation, { data, loading, error }] = useInsertSectionSubscriptionMutation({
 *   variables: {
 *      section_id: // value for 'section_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInsertSectionSubscriptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertSectionSubscriptionMutation,
    InsertSectionSubscriptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InsertSectionSubscriptionMutation,
    InsertSectionSubscriptionMutationVariables
  >(InsertSectionSubscriptionDocument, baseOptions);
}
export type InsertSectionSubscriptionMutationHookResult = ReturnType<
  typeof useInsertSectionSubscriptionMutation
>;
export type InsertSectionSubscriptionMutationResult = ApolloReactCommon.MutationResult<
  InsertSectionSubscriptionMutation
>;
export type InsertSectionSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertSectionSubscriptionMutation,
  InsertSectionSubscriptionMutationVariables
>;
export const DeleteSectionSubscriptionDocument = gql`
  mutation deleteSectionSubscription($section_id: Int) {
    delete_queue_section_subscribed(
      where: { section_id: { _eq: $section_id } }
    ) {
      affected_rows
    }
  }
`;
export type DeleteSectionSubscriptionMutationFn = ApolloReactCommon.MutationFunction<
  DeleteSectionSubscriptionMutation,
  DeleteSectionSubscriptionMutationVariables
>;

/**
 * __useDeleteSectionSubscriptionMutation__
 *
 * To run a mutation, you first call `useDeleteSectionSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectionSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectionSubscriptionMutation, { data, loading, error }] = useDeleteSectionSubscriptionMutation({
 *   variables: {
 *      section_id: // value for 'section_id'
 *   },
 * });
 */
export function useDeleteSectionSubscriptionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteSectionSubscriptionMutation,
    DeleteSectionSubscriptionMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteSectionSubscriptionMutation,
    DeleteSectionSubscriptionMutationVariables
  >(DeleteSectionSubscriptionDocument, baseOptions);
}
export type DeleteSectionSubscriptionMutationHookResult = ReturnType<
  typeof useDeleteSectionSubscriptionMutation
>;
export type DeleteSectionSubscriptionMutationResult = ApolloReactCommon.MutationResult<
  DeleteSectionSubscriptionMutation
>;
export type DeleteSectionSubscriptionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteSectionSubscriptionMutation,
  DeleteSectionSubscriptionMutationVariables
>;
export const InsertUserShortlistDocument = gql`
  mutation insertUserShortlist($user_id: Int, $course_id: Int) {
    insert_user_shortlist(
      objects: { course_id: $course_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;
export type InsertUserShortlistMutationFn = ApolloReactCommon.MutationFunction<
  InsertUserShortlistMutation,
  InsertUserShortlistMutationVariables
>;

/**
 * __useInsertUserShortlistMutation__
 *
 * To run a mutation, you first call `useInsertUserShortlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertUserShortlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertUserShortlistMutation, { data, loading, error }] = useInsertUserShortlistMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      course_id: // value for 'course_id'
 *   },
 * });
 */
export function useInsertUserShortlistMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertUserShortlistMutation,
    InsertUserShortlistMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InsertUserShortlistMutation,
    InsertUserShortlistMutationVariables
  >(InsertUserShortlistDocument, baseOptions);
}
export type InsertUserShortlistMutationHookResult = ReturnType<
  typeof useInsertUserShortlistMutation
>;
export type InsertUserShortlistMutationResult = ApolloReactCommon.MutationResult<
  InsertUserShortlistMutation
>;
export type InsertUserShortlistMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertUserShortlistMutation,
  InsertUserShortlistMutationVariables
>;
export const DeleteUserShortlistDocument = gql`
  mutation deleteUserShortlist($course_id: Int) {
    delete_user_shortlist(where: { course_id: { _eq: $course_id } }) {
      affected_rows
    }
  }
`;
export type DeleteUserShortlistMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUserShortlistMutation,
  DeleteUserShortlistMutationVariables
>;

/**
 * __useDeleteUserShortlistMutation__
 *
 * To run a mutation, you first call `useDeleteUserShortlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserShortlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserShortlistMutation, { data, loading, error }] = useDeleteUserShortlistMutation({
 *   variables: {
 *      course_id: // value for 'course_id'
 *   },
 * });
 */
export function useDeleteUserShortlistMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUserShortlistMutation,
    DeleteUserShortlistMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteUserShortlistMutation,
    DeleteUserShortlistMutationVariables
  >(DeleteUserShortlistDocument, baseOptions);
}
export type DeleteUserShortlistMutationHookResult = ReturnType<
  typeof useDeleteUserShortlistMutation
>;
export type DeleteUserShortlistMutationResult = ApolloReactCommon.MutationResult<
  DeleteUserShortlistMutation
>;
export type DeleteUserShortlistMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUserShortlistMutation,
  DeleteUserShortlistMutationVariables
>;
export const InsertCourseReviewVoteDocument = gql`
  mutation insertCourseReviewVote($user_id: Int, $review_id: Int) {
    insert_course_review_upvote(
      objects: { review_id: $review_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;
export type InsertCourseReviewVoteMutationFn = ApolloReactCommon.MutationFunction<
  InsertCourseReviewVoteMutation,
  InsertCourseReviewVoteMutationVariables
>;

/**
 * __useInsertCourseReviewVoteMutation__
 *
 * To run a mutation, you first call `useInsertCourseReviewVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertCourseReviewVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertCourseReviewVoteMutation, { data, loading, error }] = useInsertCourseReviewVoteMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useInsertCourseReviewVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertCourseReviewVoteMutation,
    InsertCourseReviewVoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InsertCourseReviewVoteMutation,
    InsertCourseReviewVoteMutationVariables
  >(InsertCourseReviewVoteDocument, baseOptions);
}
export type InsertCourseReviewVoteMutationHookResult = ReturnType<
  typeof useInsertCourseReviewVoteMutation
>;
export type InsertCourseReviewVoteMutationResult = ApolloReactCommon.MutationResult<
  InsertCourseReviewVoteMutation
>;
export type InsertCourseReviewVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertCourseReviewVoteMutation,
  InsertCourseReviewVoteMutationVariables
>;
export const DeleteCourseReviewVoteDocument = gql`
  mutation deleteCourseReviewVote($user_id: Int, $review_id: Int) {
    delete_course_review_upvote(
      where: { user_id: { _eq: $user_id }, review_id: { _eq: $review_id } }
    ) {
      affected_rows
    }
  }
`;
export type DeleteCourseReviewVoteMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCourseReviewVoteMutation,
  DeleteCourseReviewVoteMutationVariables
>;

/**
 * __useDeleteCourseReviewVoteMutation__
 *
 * To run a mutation, you first call `useDeleteCourseReviewVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseReviewVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseReviewVoteMutation, { data, loading, error }] = useDeleteCourseReviewVoteMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useDeleteCourseReviewVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCourseReviewVoteMutation,
    DeleteCourseReviewVoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteCourseReviewVoteMutation,
    DeleteCourseReviewVoteMutationVariables
  >(DeleteCourseReviewVoteDocument, baseOptions);
}
export type DeleteCourseReviewVoteMutationHookResult = ReturnType<
  typeof useDeleteCourseReviewVoteMutation
>;
export type DeleteCourseReviewVoteMutationResult = ApolloReactCommon.MutationResult<
  DeleteCourseReviewVoteMutation
>;
export type DeleteCourseReviewVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteCourseReviewVoteMutation,
  DeleteCourseReviewVoteMutationVariables
>;
export const InsertProfReviewVoteDocument = gql`
  mutation insertProfReviewVote($user_id: Int, $review_id: Int) {
    insert_prof_review_upvote(
      objects: { review_id: $review_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;
export type InsertProfReviewVoteMutationFn = ApolloReactCommon.MutationFunction<
  InsertProfReviewVoteMutation,
  InsertProfReviewVoteMutationVariables
>;

/**
 * __useInsertProfReviewVoteMutation__
 *
 * To run a mutation, you first call `useInsertProfReviewVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProfReviewVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProfReviewVoteMutation, { data, loading, error }] = useInsertProfReviewVoteMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useInsertProfReviewVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InsertProfReviewVoteMutation,
    InsertProfReviewVoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    InsertProfReviewVoteMutation,
    InsertProfReviewVoteMutationVariables
  >(InsertProfReviewVoteDocument, baseOptions);
}
export type InsertProfReviewVoteMutationHookResult = ReturnType<
  typeof useInsertProfReviewVoteMutation
>;
export type InsertProfReviewVoteMutationResult = ApolloReactCommon.MutationResult<
  InsertProfReviewVoteMutation
>;
export type InsertProfReviewVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InsertProfReviewVoteMutation,
  InsertProfReviewVoteMutationVariables
>;
export const Delete_Prof_Review_VoteDocument = gql`
  mutation DELETE_PROF_REVIEW_VOTE($user_id: Int, $review_id: Int) {
    delete_prof_review_upvote(
      where: { user_id: { _eq: $user_id }, review_id: { _eq: $review_id } }
    ) {
      affected_rows
    }
  }
`;
export type Delete_Prof_Review_VoteMutationFn = ApolloReactCommon.MutationFunction<
  Delete_Prof_Review_VoteMutation,
  Delete_Prof_Review_VoteMutationVariables
>;

/**
 * __useDelete_Prof_Review_VoteMutation__
 *
 * To run a mutation, you first call `useDelete_Prof_Review_VoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelete_Prof_Review_VoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProfReviewVoteMutation, { data, loading, error }] = useDelete_Prof_Review_VoteMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useDelete_Prof_Review_VoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Delete_Prof_Review_VoteMutation,
    Delete_Prof_Review_VoteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    Delete_Prof_Review_VoteMutation,
    Delete_Prof_Review_VoteMutationVariables
  >(Delete_Prof_Review_VoteDocument, baseOptions);
}
export type Delete_Prof_Review_VoteMutationHookResult = ReturnType<
  typeof useDelete_Prof_Review_VoteMutation
>;
export type Delete_Prof_Review_VoteMutationResult = ApolloReactCommon.MutationResult<
  Delete_Prof_Review_VoteMutation
>;
export type Delete_Prof_Review_VoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Delete_Prof_Review_VoteMutation,
  Delete_Prof_Review_VoteMutationVariables
>;
export const GetCourseDocument = gql`
  query getCourse($code: String, $user_id: Int) {
    course(where: { code: { _eq: $code } }) {
      ...CourseInfo
      ...CourseSchedule
      ...CourseRequirements
      ...CourseRating
    }
  }
  ${CourseInfoFragmentDoc}
  ${CourseScheduleFragmentDoc}
  ${CourseRequirementsFragmentDoc}
  ${CourseRatingFragmentDoc}
`;

/**
 * __useGetCourseQuery__
 *
 * To run a query within a React component, call `useGetCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseQuery({
 *   variables: {
 *      code: // value for 'code'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetCourseQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCourseQuery,
    GetCourseQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    baseOptions,
  );
}
export function useGetCourseLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCourseQuery,
    GetCourseQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCourseQuery, GetCourseQueryVariables>(
    GetCourseDocument,
    baseOptions,
  );
}
export type GetCourseQueryHookResult = ReturnType<typeof useGetCourseQuery>;
export type GetCourseLazyQueryHookResult = ReturnType<
  typeof useGetCourseLazyQuery
>;
export type GetCourseQueryResult = ApolloReactCommon.QueryResult<
  GetCourseQuery,
  GetCourseQueryVariables
>;
export const GetCourseWithUserDataDocument = gql`
  query getCourseWithUserData($code: String, $user_id: Int) {
    course(where: { code: { _eq: $code } }) {
      ...CourseInfo
      ...CourseSchedule
      ...CourseRequirements
      ...CourseRating
    }
    user_shortlist(
      where: { user_id: { _eq: $user_id }, course: { code: { _eq: $code } } }
    ) {
      course_id
      user_id
    }
    user_course_taken(
      where: { course: { code: { _eq: $code } }, user_id: { _eq: $user_id } }
    ) {
      term_id
      course_id
    }
    queue_section_subscribed(
      where: {
        section: { course: { code: { _eq: $code } } }
        user_id: { _eq: $user_id }
      }
    ) {
      section_id
      user_id
    }
    review(
      where: {
        course: { code: { _eq: $code } }
        user: { user_id: { _eq: $user_id } }
      }
    ) {
      ...ReviewInfo
    }
    user {
      email
    }
  }
  ${CourseInfoFragmentDoc}
  ${CourseScheduleFragmentDoc}
  ${CourseRequirementsFragmentDoc}
  ${CourseRatingFragmentDoc}
  ${ReviewInfoFragmentDoc}
`;

/**
 * __useGetCourseWithUserDataQuery__
 *
 * To run a query within a React component, call `useGetCourseWithUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseWithUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseWithUserDataQuery({
 *   variables: {
 *      code: // value for 'code'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetCourseWithUserDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCourseWithUserDataQuery,
    GetCourseWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetCourseWithUserDataQuery,
    GetCourseWithUserDataQueryVariables
  >(GetCourseWithUserDataDocument, baseOptions);
}
export function useGetCourseWithUserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCourseWithUserDataQuery,
    GetCourseWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetCourseWithUserDataQuery,
    GetCourseWithUserDataQueryVariables
  >(GetCourseWithUserDataDocument, baseOptions);
}
export type GetCourseWithUserDataQueryHookResult = ReturnType<
  typeof useGetCourseWithUserDataQuery
>;
export type GetCourseWithUserDataLazyQueryHookResult = ReturnType<
  typeof useGetCourseWithUserDataLazyQuery
>;
export type GetCourseWithUserDataQueryResult = ApolloReactCommon.QueryResult<
  GetCourseWithUserDataQuery,
  GetCourseWithUserDataQueryVariables
>;
export const RefetchCourseShortlistDocument = gql`
  query refetchCourseShortlist($code: String, $user_id: Int) {
    user_shortlist(
      where: { user_id: { _eq: $user_id }, course: { code: { _eq: $code } } }
    ) {
      course_id
      user_id
    }
  }
`;

/**
 * __useRefetchCourseShortlistQuery__
 *
 * To run a query within a React component, call `useRefetchCourseShortlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchCourseShortlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchCourseShortlistQuery({
 *   variables: {
 *      code: // value for 'code'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useRefetchCourseShortlistQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchCourseShortlistQuery,
    RefetchCourseShortlistQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchCourseShortlistQuery,
    RefetchCourseShortlistQueryVariables
  >(RefetchCourseShortlistDocument, baseOptions);
}
export function useRefetchCourseShortlistLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchCourseShortlistQuery,
    RefetchCourseShortlistQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchCourseShortlistQuery,
    RefetchCourseShortlistQueryVariables
  >(RefetchCourseShortlistDocument, baseOptions);
}
export type RefetchCourseShortlistQueryHookResult = ReturnType<
  typeof useRefetchCourseShortlistQuery
>;
export type RefetchCourseShortlistLazyQueryHookResult = ReturnType<
  typeof useRefetchCourseShortlistLazyQuery
>;
export type RefetchCourseShortlistQueryResult = ApolloReactCommon.QueryResult<
  RefetchCourseShortlistQuery,
  RefetchCourseShortlistQueryVariables
>;
export const RefetchRatingsDocument = gql`
  query refetchRatings($course_id: Int, $prof_id: Int) {
    course(where: { id: { _eq: $course_id } }) {
      ...CourseRating
    }
    prof(where: { id: { _eq: $prof_id } }) {
      ...ProfRating
    }
  }
  ${CourseRatingFragmentDoc}
  ${ProfRatingFragmentDoc}
`;

/**
 * __useRefetchRatingsQuery__
 *
 * To run a query within a React component, call `useRefetchRatingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchRatingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchRatingsQuery({
 *   variables: {
 *      course_id: // value for 'course_id'
 *      prof_id: // value for 'prof_id'
 *   },
 * });
 */
export function useRefetchRatingsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchRatingsQuery,
    RefetchRatingsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchRatingsQuery,
    RefetchRatingsQueryVariables
  >(RefetchRatingsDocument, baseOptions);
}
export function useRefetchRatingsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchRatingsQuery,
    RefetchRatingsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchRatingsQuery,
    RefetchRatingsQueryVariables
  >(RefetchRatingsDocument, baseOptions);
}
export type RefetchRatingsQueryHookResult = ReturnType<
  typeof useRefetchRatingsQuery
>;
export type RefetchRatingsLazyQueryHookResult = ReturnType<
  typeof useRefetchRatingsLazyQuery
>;
export type RefetchRatingsQueryResult = ApolloReactCommon.QueryResult<
  RefetchRatingsQuery,
  RefetchRatingsQueryVariables
>;
export const RefetchSectionSubscriptionsDocument = gql`
  query refetchSectionSubscriptions($course_id: Int, $user_id: Int) {
    queue_section_subscribed(
      where: {
        section: { course_id: { _eq: $course_id } }
        user_id: { _eq: $user_id }
      }
    ) {
      section_id
      user_id
    }
  }
`;

/**
 * __useRefetchSectionSubscriptionsQuery__
 *
 * To run a query within a React component, call `useRefetchSectionSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchSectionSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchSectionSubscriptionsQuery({
 *   variables: {
 *      course_id: // value for 'course_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useRefetchSectionSubscriptionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchSectionSubscriptionsQuery,
    RefetchSectionSubscriptionsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchSectionSubscriptionsQuery,
    RefetchSectionSubscriptionsQueryVariables
  >(RefetchSectionSubscriptionsDocument, baseOptions);
}
export function useRefetchSectionSubscriptionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchSectionSubscriptionsQuery,
    RefetchSectionSubscriptionsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchSectionSubscriptionsQuery,
    RefetchSectionSubscriptionsQueryVariables
  >(RefetchSectionSubscriptionsDocument, baseOptions);
}
export type RefetchSectionSubscriptionsQueryHookResult = ReturnType<
  typeof useRefetchSectionSubscriptionsQuery
>;
export type RefetchSectionSubscriptionsLazyQueryHookResult = ReturnType<
  typeof useRefetchSectionSubscriptionsLazyQuery
>;
export type RefetchSectionSubscriptionsQueryResult = ApolloReactCommon.QueryResult<
  RefetchSectionSubscriptionsQuery,
  RefetchSectionSubscriptionsQueryVariables
>;
export const RefetchCourseReviewsDocument = gql`
  query refetchCourseReviews($code: String, $user_id: Int) {
    review(
      where: {
        course: { code: { _eq: $code } }
        user: { user_id: { _eq: $user_id } }
      }
    ) {
      ...ReviewInfo
    }
  }
  ${ReviewInfoFragmentDoc}
`;

/**
 * __useRefetchCourseReviewsQuery__
 *
 * To run a query within a React component, call `useRefetchCourseReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchCourseReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchCourseReviewsQuery({
 *   variables: {
 *      code: // value for 'code'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useRefetchCourseReviewsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchCourseReviewsQuery,
    RefetchCourseReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchCourseReviewsQuery,
    RefetchCourseReviewsQueryVariables
  >(RefetchCourseReviewsDocument, baseOptions);
}
export function useRefetchCourseReviewsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchCourseReviewsQuery,
    RefetchCourseReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchCourseReviewsQuery,
    RefetchCourseReviewsQueryVariables
  >(RefetchCourseReviewsDocument, baseOptions);
}
export type RefetchCourseReviewsQueryHookResult = ReturnType<
  typeof useRefetchCourseReviewsQuery
>;
export type RefetchCourseReviewsLazyQueryHookResult = ReturnType<
  typeof useRefetchCourseReviewsLazyQuery
>;
export type RefetchCourseReviewsQueryResult = ApolloReactCommon.QueryResult<
  RefetchCourseReviewsQuery,
  RefetchCourseReviewsQueryVariables
>;
export const CourseReviewsDocument = gql`
  query courseReviews($id: Int) {
    review(
      where: {
        course_id: { _eq: $id }
        _or: [
          { course_comment: { _is_null: false } }
          { prof_comment: { _is_null: false } }
        ]
      }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
    }
  }
  ${ReviewInfoFragmentDoc}
  ${ReviewVoteCountsFragmentDoc}
`;

/**
 * __useCourseReviewsQuery__
 *
 * To run a query within a React component, call `useCourseReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseReviewsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseReviewsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CourseReviewsQuery,
    CourseReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    CourseReviewsQuery,
    CourseReviewsQueryVariables
  >(CourseReviewsDocument, baseOptions);
}
export function useCourseReviewsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CourseReviewsQuery,
    CourseReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CourseReviewsQuery,
    CourseReviewsQueryVariables
  >(CourseReviewsDocument, baseOptions);
}
export type CourseReviewsQueryHookResult = ReturnType<
  typeof useCourseReviewsQuery
>;
export type CourseReviewsLazyQueryHookResult = ReturnType<
  typeof useCourseReviewsLazyQuery
>;
export type CourseReviewsQueryResult = ApolloReactCommon.QueryResult<
  CourseReviewsQuery,
  CourseReviewsQueryVariables
>;
export const CourseReviewsWithUserDataDocument = gql`
  query courseReviewsWithUserData($id: Int) {
    review(
      where: {
        course_id: { _eq: $id }
        _or: [
          { course_comment: { _is_null: false } }
          { prof_comment: { _is_null: false } }
        ]
      }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
      ...UserReviewFields
    }
  }
  ${ReviewInfoFragmentDoc}
  ${ReviewVoteCountsFragmentDoc}
  ${UserReviewFieldsFragmentDoc}
`;

/**
 * __useCourseReviewsWithUserDataQuery__
 *
 * To run a query within a React component, call `useCourseReviewsWithUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseReviewsWithUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseReviewsWithUserDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseReviewsWithUserDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CourseReviewsWithUserDataQuery,
    CourseReviewsWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    CourseReviewsWithUserDataQuery,
    CourseReviewsWithUserDataQueryVariables
  >(CourseReviewsWithUserDataDocument, baseOptions);
}
export function useCourseReviewsWithUserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CourseReviewsWithUserDataQuery,
    CourseReviewsWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CourseReviewsWithUserDataQuery,
    CourseReviewsWithUserDataQueryVariables
  >(CourseReviewsWithUserDataDocument, baseOptions);
}
export type CourseReviewsWithUserDataQueryHookResult = ReturnType<
  typeof useCourseReviewsWithUserDataQuery
>;
export type CourseReviewsWithUserDataLazyQueryHookResult = ReturnType<
  typeof useCourseReviewsWithUserDataLazyQuery
>;
export type CourseReviewsWithUserDataQueryResult = ApolloReactCommon.QueryResult<
  CourseReviewsWithUserDataQuery,
  CourseReviewsWithUserDataQueryVariables
>;
export const RefetchCourseReviewUpvoteDocument = gql`
  query refetchCourseReviewUpvote($review_id: Int) {
    review(where: { id: { _eq: $review_id } }) {
      ...ReviewVoteCounts
    }
  }
  ${ReviewVoteCountsFragmentDoc}
`;

/**
 * __useRefetchCourseReviewUpvoteQuery__
 *
 * To run a query within a React component, call `useRefetchCourseReviewUpvoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchCourseReviewUpvoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchCourseReviewUpvoteQuery({
 *   variables: {
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useRefetchCourseReviewUpvoteQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchCourseReviewUpvoteQuery,
    RefetchCourseReviewUpvoteQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchCourseReviewUpvoteQuery,
    RefetchCourseReviewUpvoteQueryVariables
  >(RefetchCourseReviewUpvoteDocument, baseOptions);
}
export function useRefetchCourseReviewUpvoteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchCourseReviewUpvoteQuery,
    RefetchCourseReviewUpvoteQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchCourseReviewUpvoteQuery,
    RefetchCourseReviewUpvoteQueryVariables
  >(RefetchCourseReviewUpvoteDocument, baseOptions);
}
export type RefetchCourseReviewUpvoteQueryHookResult = ReturnType<
  typeof useRefetchCourseReviewUpvoteQuery
>;
export type RefetchCourseReviewUpvoteLazyQueryHookResult = ReturnType<
  typeof useRefetchCourseReviewUpvoteLazyQuery
>;
export type RefetchCourseReviewUpvoteQueryResult = ApolloReactCommon.QueryResult<
  RefetchCourseReviewUpvoteQuery,
  RefetchCourseReviewUpvoteQueryVariables
>;
export const CourseReviewProfsDocument = gql`
  query courseReviewProfs($id: [Int!]) {
    review(
      where: {
        course_id: { _in: $id }
        prof_id: { _is_null: false }
        prof_comment: { _is_null: false }
      }
    ) {
      ...ReviewProfs
    }
  }
  ${ReviewProfsFragmentDoc}
`;

/**
 * __useCourseReviewProfsQuery__
 *
 * To run a query within a React component, call `useCourseReviewProfsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseReviewProfsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseReviewProfsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseReviewProfsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CourseReviewProfsQuery,
    CourseReviewProfsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    CourseReviewProfsQuery,
    CourseReviewProfsQueryVariables
  >(CourseReviewProfsDocument, baseOptions);
}
export function useCourseReviewProfsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CourseReviewProfsQuery,
    CourseReviewProfsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CourseReviewProfsQuery,
    CourseReviewProfsQueryVariables
  >(CourseReviewProfsDocument, baseOptions);
}
export type CourseReviewProfsQueryHookResult = ReturnType<
  typeof useCourseReviewProfsQuery
>;
export type CourseReviewProfsLazyQueryHookResult = ReturnType<
  typeof useCourseReviewProfsLazyQuery
>;
export type CourseReviewProfsQueryResult = ApolloReactCommon.QueryResult<
  CourseReviewProfsQuery,
  CourseReviewProfsQueryVariables
>;
export const ExploreAllDocument = gql`
  query exploreAll {
    course_search_index {
      ...CourseSearch
    }
    prof_search_index {
      ...ProfSearch
    }
  }
  ${CourseSearchFragmentDoc}
  ${ProfSearchFragmentDoc}
`;

/**
 * __useExploreAllQuery__
 *
 * To run a query within a React component, call `useExploreAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useExploreAllQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ExploreAllQuery,
    ExploreAllQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ExploreAllQuery, ExploreAllQueryVariables>(
    ExploreAllDocument,
    baseOptions,
  );
}
export function useExploreAllLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ExploreAllQuery,
    ExploreAllQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ExploreAllQuery,
    ExploreAllQueryVariables
  >(ExploreAllDocument, baseOptions);
}
export type ExploreAllQueryHookResult = ReturnType<typeof useExploreAllQuery>;
export type ExploreAllLazyQueryHookResult = ReturnType<
  typeof useExploreAllLazyQuery
>;
export type ExploreAllQueryResult = ApolloReactCommon.QueryResult<
  ExploreAllQuery,
  ExploreAllQueryVariables
>;
export const ExploreDocument = gql`
  query explore($query: String, $code_only: Boolean) {
    search_courses(args: { query: $query, code_only: $code_only }) {
      ...CourseSearch
    }
    search_profs(args: { query: $query, code_only: $code_only }) {
      ...ProfSearch
    }
  }
  ${CourseSearchFragmentDoc}
  ${ProfSearchFragmentDoc}
`;

/**
 * __useExploreQuery__
 *
 * To run a query within a React component, call `useExploreQuery` and pass it any options that fit your needs.
 * When your component renders, `useExploreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExploreQuery({
 *   variables: {
 *      query: // value for 'query'
 *      code_only: // value for 'code_only'
 *   },
 * });
 */
export function useExploreQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ExploreQuery,
    ExploreQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ExploreQuery, ExploreQueryVariables>(
    ExploreDocument,
    baseOptions,
  );
}
export function useExploreLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ExploreQuery,
    ExploreQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ExploreQuery, ExploreQueryVariables>(
    ExploreDocument,
    baseOptions,
  );
}
export type ExploreQueryHookResult = ReturnType<typeof useExploreQuery>;
export type ExploreLazyQueryHookResult = ReturnType<typeof useExploreLazyQuery>;
export type ExploreQueryResult = ApolloReactCommon.QueryResult<
  ExploreQuery,
  ExploreQueryVariables
>;
export const GetProfDocument = gql`
  query getProf($code: String) {
    prof(where: { code: { _eq: $code } }) {
      ...ProfInfo
      ...ProfCoursesTaught
      ...ProfRating
    }
  }
  ${ProfInfoFragmentDoc}
  ${ProfCoursesTaughtFragmentDoc}
  ${ProfRatingFragmentDoc}
`;

/**
 * __useGetProfQuery__
 *
 * To run a query within a React component, call `useGetProfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetProfQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProfQuery,
    GetProfQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetProfQuery, GetProfQueryVariables>(
    GetProfDocument,
    baseOptions,
  );
}
export function useGetProfLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProfQuery,
    GetProfQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetProfQuery, GetProfQueryVariables>(
    GetProfDocument,
    baseOptions,
  );
}
export type GetProfQueryHookResult = ReturnType<typeof useGetProfQuery>;
export type GetProfLazyQueryHookResult = ReturnType<typeof useGetProfLazyQuery>;
export type GetProfQueryResult = ApolloReactCommon.QueryResult<
  GetProfQuery,
  GetProfQueryVariables
>;
export const ProfReviewsDocument = gql`
  query profReviews($id: Int) {
    review(
      where: { prof_id: { _eq: $id }, prof_comment: { _is_null: false } }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
    }
  }
  ${ReviewInfoFragmentDoc}
  ${ReviewVoteCountsFragmentDoc}
`;

/**
 * __useProfReviewsQuery__
 *
 * To run a query within a React component, call `useProfReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfReviewsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfReviewsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProfReviewsQuery,
    ProfReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ProfReviewsQuery, ProfReviewsQueryVariables>(
    ProfReviewsDocument,
    baseOptions,
  );
}
export function useProfReviewsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProfReviewsQuery,
    ProfReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ProfReviewsQuery,
    ProfReviewsQueryVariables
  >(ProfReviewsDocument, baseOptions);
}
export type ProfReviewsQueryHookResult = ReturnType<typeof useProfReviewsQuery>;
export type ProfReviewsLazyQueryHookResult = ReturnType<
  typeof useProfReviewsLazyQuery
>;
export type ProfReviewsQueryResult = ApolloReactCommon.QueryResult<
  ProfReviewsQuery,
  ProfReviewsQueryVariables
>;
export const ProfReviewsWithUserDataDocument = gql`
  query profReviewsWithUserData($id: Int) {
    review(
      where: { prof_id: { _eq: $id }, prof_comment: { _is_null: false } }
    ) {
      ...ReviewInfo
      ...ReviewVoteCounts
      ...UserReviewFields
    }
  }
  ${ReviewInfoFragmentDoc}
  ${ReviewVoteCountsFragmentDoc}
  ${UserReviewFieldsFragmentDoc}
`;

/**
 * __useProfReviewsWithUserDataQuery__
 *
 * To run a query within a React component, call `useProfReviewsWithUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfReviewsWithUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfReviewsWithUserDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfReviewsWithUserDataQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ProfReviewsWithUserDataQuery,
    ProfReviewsWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    ProfReviewsWithUserDataQuery,
    ProfReviewsWithUserDataQueryVariables
  >(ProfReviewsWithUserDataDocument, baseOptions);
}
export function useProfReviewsWithUserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ProfReviewsWithUserDataQuery,
    ProfReviewsWithUserDataQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    ProfReviewsWithUserDataQuery,
    ProfReviewsWithUserDataQueryVariables
  >(ProfReviewsWithUserDataDocument, baseOptions);
}
export type ProfReviewsWithUserDataQueryHookResult = ReturnType<
  typeof useProfReviewsWithUserDataQuery
>;
export type ProfReviewsWithUserDataLazyQueryHookResult = ReturnType<
  typeof useProfReviewsWithUserDataLazyQuery
>;
export type ProfReviewsWithUserDataQueryResult = ApolloReactCommon.QueryResult<
  ProfReviewsWithUserDataQuery,
  ProfReviewsWithUserDataQueryVariables
>;
export const Refetch_Prof_Review_UpvoteDocument = gql`
  query REFETCH_PROF_REVIEW_UPVOTE($review_id: Int) {
    review(where: { id: { _eq: $review_id } }) {
      ...ReviewVoteCounts
    }
  }
  ${ReviewVoteCountsFragmentDoc}
`;

/**
 * __useRefetch_Prof_Review_UpvoteQuery__
 *
 * To run a query within a React component, call `useRefetch_Prof_Review_UpvoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetch_Prof_Review_UpvoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetch_Prof_Review_UpvoteQuery({
 *   variables: {
 *      review_id: // value for 'review_id'
 *   },
 * });
 */
export function useRefetch_Prof_Review_UpvoteQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Refetch_Prof_Review_UpvoteQuery,
    Refetch_Prof_Review_UpvoteQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    Refetch_Prof_Review_UpvoteQuery,
    Refetch_Prof_Review_UpvoteQueryVariables
  >(Refetch_Prof_Review_UpvoteDocument, baseOptions);
}
export function useRefetch_Prof_Review_UpvoteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Refetch_Prof_Review_UpvoteQuery,
    Refetch_Prof_Review_UpvoteQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    Refetch_Prof_Review_UpvoteQuery,
    Refetch_Prof_Review_UpvoteQueryVariables
  >(Refetch_Prof_Review_UpvoteDocument, baseOptions);
}
export type Refetch_Prof_Review_UpvoteQueryHookResult = ReturnType<
  typeof useRefetch_Prof_Review_UpvoteQuery
>;
export type Refetch_Prof_Review_UpvoteLazyQueryHookResult = ReturnType<
  typeof useRefetch_Prof_Review_UpvoteLazyQuery
>;
export type Refetch_Prof_Review_UpvoteQueryResult = ApolloReactCommon.QueryResult<
  Refetch_Prof_Review_UpvoteQuery,
  Refetch_Prof_Review_UpvoteQueryVariables
>;
export const GetUserDocument = gql`
  query getUser($id: Int) {
    user(where: { id: { _eq: $id } }) {
      ...UserInfo
      ...UserShortlist
      ...UserSchedule
    }
    user_course_taken(where: { user_id: { _eq: $id } }) {
      ...UserCoursesTaken
    }
    review(where: { user: { user_id: { _eq: $id } } }) {
      ...ReviewInfo
    }
  }
  ${UserInfoFragmentDoc}
  ${UserShortlistFragmentDoc}
  ${UserScheduleFragmentDoc}
  ${UserCoursesTakenFragmentDoc}
  ${ReviewInfoFragmentDoc}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const RefetchUserShortlistDocument = gql`
  query refetchUserShortlist($id: Int) {
    user(where: { id: { _eq: $id } }) {
      id
      ...UserShortlist
    }
  }
  ${UserShortlistFragmentDoc}
`;

/**
 * __useRefetchUserShortlistQuery__
 *
 * To run a query within a React component, call `useRefetchUserShortlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchUserShortlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchUserShortlistQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRefetchUserShortlistQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchUserShortlistQuery,
    RefetchUserShortlistQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchUserShortlistQuery,
    RefetchUserShortlistQueryVariables
  >(RefetchUserShortlistDocument, baseOptions);
}
export function useRefetchUserShortlistLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchUserShortlistQuery,
    RefetchUserShortlistQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchUserShortlistQuery,
    RefetchUserShortlistQueryVariables
  >(RefetchUserShortlistDocument, baseOptions);
}
export type RefetchUserShortlistQueryHookResult = ReturnType<
  typeof useRefetchUserShortlistQuery
>;
export type RefetchUserShortlistLazyQueryHookResult = ReturnType<
  typeof useRefetchUserShortlistLazyQuery
>;
export type RefetchUserShortlistQueryResult = ApolloReactCommon.QueryResult<
  RefetchUserShortlistQuery,
  RefetchUserShortlistQueryVariables
>;
export const RefetchUserReviewDocument = gql`
  query refetchUserReview($id: Int) {
    review(where: { user: { user_id: { _eq: $id } } }) {
      ...ReviewInfo
    }
  }
  ${ReviewInfoFragmentDoc}
`;

/**
 * __useRefetchUserReviewQuery__
 *
 * To run a query within a React component, call `useRefetchUserReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefetchUserReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRefetchUserReviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRefetchUserReviewQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    RefetchUserReviewQuery,
    RefetchUserReviewQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    RefetchUserReviewQuery,
    RefetchUserReviewQueryVariables
  >(RefetchUserReviewDocument, baseOptions);
}
export function useRefetchUserReviewLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    RefetchUserReviewQuery,
    RefetchUserReviewQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    RefetchUserReviewQuery,
    RefetchUserReviewQueryVariables
  >(RefetchUserReviewDocument, baseOptions);
}
export type RefetchUserReviewQueryHookResult = ReturnType<
  typeof useRefetchUserReviewQuery
>;
export type RefetchUserReviewLazyQueryHookResult = ReturnType<
  typeof useRefetchUserReviewLazyQuery
>;
export type RefetchUserReviewQueryResult = ApolloReactCommon.QueryResult<
  RefetchUserReviewQuery,
  RefetchUserReviewQueryVariables
>;
