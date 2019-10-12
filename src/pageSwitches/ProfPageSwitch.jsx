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

/* Queries */
import { GET_PROF } from '../graphql/queries/prof/Prof';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const ProfPageSwitch = ({ isDesktopPage, match }) => {
  const profID = match.params.profID;
  const { loading, error, data } = useQuery(GET_PROF, {
    variables: { id: profID },
  });
  return isDesktopPage ? (
    <DesktopProfPage
      loading={loading}
      error={error}
      data={data}
    />
  ) : (
    <MobileProfPage
      loading={loading}
      error={error}
      data={data}
    />
  );
};

ProfPageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({ courseID: PropTypes.string }),
  }),
};

export default withRouter(connect(mapStateToProps)(ProfPageSwitch));
