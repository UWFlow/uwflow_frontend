import React from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopCoursePage from '../desktop/components/coursePage/CoursePage';
import MobileCoursePage from '../mobile/components/coursePage/CoursePage';

/* Queries */
import { GET_COURSE } from '../graphql/queries/course/Course';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const CoursePageSwitch = ({ isDesktopPage, match }) => {
  const courseID = match.params.courseID;
  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { id: courseID },
  });
  return isDesktopPage ? (
    <DesktopCoursePage loading={loading} error={error} data={data} />
  ) : (
    <MobileCoursePage loading={loading} error={error} data={data} />
  );
};

CoursePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({ courseID: PropTypes.string }),
  }),
};

export default withRouter(connect(mapStateToProps)(CoursePageSwitch));
