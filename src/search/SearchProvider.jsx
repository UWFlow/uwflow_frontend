
import React, { useEffect } from 'react';
import { withApollo } from 'react-apollo';
import searchWorker from './searchWorker';
import WebWorker from './workerSetup';

import { getSearchContext } from './SearchContext';

const SearchProvider = ({
  client: apolloClient,
  searchClient,
  children
}) => {
  useEffect(() => {
    // build index using background worker to not block the main thread
    const worker = new WebWorker(searchWorker);
    worker.addEventListener('message', async _ => {
      await searchClient.buildIndices(apolloClient);
    });

    worker.postMessage('');  
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