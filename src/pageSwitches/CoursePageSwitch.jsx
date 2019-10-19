import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../data/reducers/AuthReducer';

/* Child Components */
import DesktopCoursePage from '../desktop/components/coursePage/CoursePage';
import MobileCoursePage from '../mobile/components/coursePage/CoursePage';

/* Queries */
import { buildCourseQuery } from '../graphql/queries/course/Course';
import { getUserId } from '../utils/Auth';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state)
});

export const CoursePageSwitch = ({ isDesktopPage, match, isLoggedIn }) => {
  const courseCode = match.params.courseID.toLowerCase();
  const query = buildCourseQuery(isLoggedIn, getUserId());

  const { loading, error, data } = useQuery(query, {
    variables: { code: courseCode },
  });

  console.log(data);

  return isDesktopPage ? (
    <DesktopCoursePage
      loading={loading}
      error={error}
      data={data}
    />
  ) : (
    <MobileCoursePage
      loading={loading}
      error={error}
      data={data}
    />
  );
};

CoursePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({ courseID: PropTypes.string }),
  }),
};

export default withRouter(connect(mapStateToProps)(CoursePageSwitch));
