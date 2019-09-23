import React from 'react';
import SearchConsumer from './SearchConsumer';

export const withSearch = Component => (
  <SearchConsumer>
    {searchClient => (
      <Component {...props} searchClient={searchClient} />
    )}
  </SearchConsumer>
);