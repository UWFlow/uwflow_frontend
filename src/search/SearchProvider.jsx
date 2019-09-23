
import React from 'react';

import { getSearchContext } from './SearchContext';

const SearchProvider = ({
  searchClient,
  children
}) => {
  const SearchContext = getSearchContext();
  return (
    <SearchContext.Consumer>
      {(context = {}) => {
        if (context.searchClient !== searchClient) {
          context = Object.assign({}, context, { searchClient });
        }

        return (
          <SearchContext.Provider value={context}>
            {children}
          </SearchContext.Provider>
        );
      }}
    </SearchContext.Consumer>
  );
};

export default SearchProvider;