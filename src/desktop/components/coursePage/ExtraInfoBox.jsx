import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getRequiredTextbooks } from '../../../data/reducers/CourseReducer';

/* Styled Components */
import { ExtraInfoBoxWrapper } from './styles/CoursePage';

const mapStateToProps = (state, { courseID }) => ({
  requiredTextbooks: getRequiredTextbooks(state, courseID),
});

const ExtraInfoBox = ({ requiredTextbooks }) => {
  return <ExtraInfoBoxWrapper>Extra Info Box</ExtraInfoBoxWrapper>;
};

export default connect(mapStateToProps)(ExtraInfoBox);
