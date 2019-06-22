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

/* GraphQL Queries */
import {GET_COURSE} from '../../../graphql/queries/course/Course.jsx';

const CoursePage = ({ match }) => {
  const courseID = match.params.courseID;

  return (
    <CoursePageWrapper>
      <Query query={GET_COURSE} variables={{id: courseID}}>
        {({ loading, error, data }) => {
          if (loading) { return <div>Loading...</div>; }
          if (error) { return <div>Error</div>; }
          
          const course = data.course[0]
          return (
            <>
              <Navbar />
              <CourseInfoBox course={course} />
              <ColumnWrapper>
                <Column1>
                  <CourseSchedule />
                </Column1>
                <Column2>
                  <ExtraInfoBox />
                </Column2>
              </ColumnWrapper>
            </>
          );
        }}
      </Query>
    </CoursePageWrapper>
  );
};

export default withRouter(CoursePage);
