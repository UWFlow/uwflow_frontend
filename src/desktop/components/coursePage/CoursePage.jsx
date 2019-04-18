import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Child Components */
import Navbar from '../common/Navbar';
import CourseInfoBox from './CourseInfoBox';
import CourseSchedule from './CourseSchedule';
import ExtraInfoBox from './ExtraInfoBox';

/* Styled Components */
import {
  CoursePageWrapper,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/CoursePage';

const mapStateToProps = state => ({});

const CoursePage = () => {
  return (
    <CoursePageWrapper>
      <Navbar />
      <CourseInfoBox />
      <ColumnWrapper>
        <Column1>
          <CourseSchedule />
        </Column1>
        <Column2>
          <ExtraInfoBox />
        </Column2>
      </ColumnWrapper>
    </CoursePageWrapper>
  );
};

export default connect(mapStateToProps)(CoursePage);
