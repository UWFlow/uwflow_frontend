import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Routes */
import { LANDING_PAGE_ROUTE } from '../../../Routes';

const NoMatchRedirect = ({ location }) => {
  const { search, hash } = location;

  return (
    <Redirect
      to={{
        pathname: LANDING_PAGE_ROUTE,
        search,
        hash,
      }}
    />
  );
};

NoMatchRedirect.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string, hash: PropTypes.string })
}

export default NoMatchRedirect;