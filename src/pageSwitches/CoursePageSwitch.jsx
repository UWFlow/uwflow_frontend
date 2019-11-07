import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../data/reducers/AuthReducer';

/* Child Components */
import DesktopCoursePage from '../pages/coursePage/CoursePage';
import LoadingSpinner from '../components/display/LoadingSpinner';
import NotFoundPage from '../desktop/components/notFoundPage/NotFoundPage';

/* Queries */
import { buildCourseQuery } from '../graphql/queries/course/Course';
import { getUserId } from '../utils/Auth';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

export const CoursePageSwitch = ({ isDesktopPage, match, isLoggedIn }) => {
  const courseCode = match.params.courseCode.toLowerCase();
  const query = buildCourseQuery(isLoggedIn, getUserId());

  const { loading, error, data } = useQuery(query, {
    variables: { code: courseCode },
  });

  return loading ? (
    <LoadingSpinner />
  ) : error || !data || !data.course || data.course.length === 0 ? (
    <NotFoundPage text="Sorry, we couldn't find that course!" />
  ) : isDesktopPage ? (
    <DesktopCoursePage data={data} />
  ) : (
    <DesktopCoursePage data={data} />
  );
};

CoursePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({ courseCode: PropTypes.string }),
  }),
};

export default withRouter(connect(mapStateToProps)(CoursePageSwitch));
