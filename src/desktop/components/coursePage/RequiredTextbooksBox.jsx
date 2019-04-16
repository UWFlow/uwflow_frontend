import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Selectors */
import { getRequiredTextbooks } from '../../../../data/CourseReducer';

const mapStateToProps = (state, { courseID }) => ({
  requiredTextbooks: getRequiredTextbooks(state, courseID),
});

const RequiredTextbooksBox = ({ requiredTextbooks }) => {
  return <div />;
};

export default connect(mapStateToProps)(RequiredTextbooksBox);
