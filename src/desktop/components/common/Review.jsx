import React from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  ReviewWrapper,
  ReviewTextWrapper,
  ReviewMetricsWrapper,
} from './styles/Review';

const mapStateToProps = state => ({});

/*
metrics: Array<{
  name: string
  choice: boolean or null
}>
*/
const Review = ({ upvotes, review, reviewer, metrics }) => {
  return (
    <ReviewWrapper>
      <ReviewTextWrapper>Review Text</ReviewTextWrapper>
      <ReviewMetricsWrapper>Metrics</ReviewMetricsWrapper>
    </ReviewWrapper>
  );
};

export default connect(mapStateToProps)(Review);
