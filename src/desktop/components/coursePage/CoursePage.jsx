import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

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

const CoursePage = ({ match }) => {
  const courseID = match.params.courseID;

  return (
    <CoursePageWrapper>
      <Navbar />
      <CourseInfoBox courseID={courseID} />
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

export default withRouter(CoursePage);
