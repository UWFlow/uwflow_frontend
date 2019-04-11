import React from 'react';
import { Redirect } from 'react-router-dom';

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

export default NoMatchRedirect;