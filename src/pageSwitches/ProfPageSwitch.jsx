import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import PropTypes from 'prop-types';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopProfPage from '../desktop/components/profPage/ProfPage';
import MobileProfPage from '../mobile/components/profPage/ProfPage';
import LoadingSpinner from '../components/display/LoadingSpinner';
import NotFoundPage from '../desktop/components/notFoundPage/NotFoundPage';

/* Queries */
import { GET_PROF } from '../graphql/queries/prof/Prof';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const ProfPageSwitch = ({ isDesktopPage, match }) => {
  const profCode = match.params.profCode.toLowerCase();
  const { loading, error, data } = useQuery(GET_PROF, {
    variables: { code: profCode },
  });

  return loading ? (
    <LoadingSpinner />
  ) : error || !data || data.prof.length === 0 ? (
    <NotFoundPage text="Sorry, we couldn't find that professor!" />
  ) : isDesktopPage ? (
    <DesktopProfPage data={data} />
  ) : (
    <MobileProfPage data={data} />
  );
};

ProfPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({ profCode: PropTypes.string }),
  }),
};

export default withRouter(connect(mapStateToProps)(ProfPageSwitch));
