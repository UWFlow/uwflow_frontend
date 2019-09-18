
import React, { useEffect } from 'react';
import { withApollo } from 'react-apollo';

import { getSearchContext } from './SearchContext';

const SearchProvider = ({
  client: apolloClient,
  searchClient,
  children
}) => {  
  useEffect(() => {
    searchClient.buildIndices(apolloClient);
  }, [searchClient, apolloClient]);

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

export default withApollo(SearchProvider);