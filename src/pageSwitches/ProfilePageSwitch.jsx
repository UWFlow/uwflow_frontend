import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';
import { isLoggedIn } from '../utils/Auth';

/* Child Components */
import DesktopProfilePage from '../desktop/components/profilePage/ProfilePage';
import MobileProfilePage from '../mobile/components/profilePage/ProfilePage';

/* Queries */
import { GET_USER } from '../graphql/queries/profile/User';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../Routes';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const ProfilePageSwitch = ({ isDesktopPage, history }) => {
  if (!isLoggedIn()) {
    history.push(LANDING_PAGE_ROUTE);
  }
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: localStorage.getItem('user_id') } });

  return isDesktopPage ? (
    <DesktopProfilePage loading={loading} error={error} data={data} />
  ) : (
    <MobileProfilePage loading={loading} error={error} data={data} />
  );
};

ProfilePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default withRouter(connect(mapStateToProps)(ProfilePageSwitch));
