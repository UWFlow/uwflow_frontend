import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';
import { getIsLoggedIn } from '../data/reducers/AuthReducer';

/* Child Components */
import DesktopProfilePage from '../desktop/components/profilePage/ProfilePage';
import MobileProfilePage from '../mobile/components/profilePage/ProfilePage';
import LoadingSpinner from '../components/display/LoadingSpinner';

/* Queries */
import { GET_USER } from '../graphql/queries/profile/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../Routes';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
  isLoggedIn: getIsLoggedIn(state),
});

export const ProfilePageSwitch = ({ isDesktopPage, history, isLoggedIn }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('user_id') },
  });

  if (!isLoggedIn) {
    history.push(LANDING_PAGE_ROUTE);
  }

  return loading ? (
    <LoadingSpinner />
  ) : error || !data ? (
    <div>Error</div>
  ) : isDesktopPage ? (
    <DesktopProfilePage data={data} />
  ) : (
    <MobileProfilePage loading={loading} error={error} data={data} />
  );
};

ProfilePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps)(ProfilePageSwitch));
