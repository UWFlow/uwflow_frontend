
import React, { createContext, useContext, useEffect } from 'react';

import { SEARCH_DATA_ID } from '../constants/Search';

export const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ searchWorker, children }) => {
  useEffect(() => {
    // build indices
    searchWorker.postMessage({
      type: 'build',
      searchData: localStorage.getItem(SEARCH_DATA_ID)
    });

    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'data') {
        const searchData = event.data.searchData;
        localStorage.setItem(SEARCH_DATA_ID, searchData);
      }
    });
  }, []);

  return (
    <SearchContext.Consumer>
      {(context = {}) => {
        if (context.searchWorker !== searchWorker) {
          context = Object.assign({}, context, { searchWorker });
        }

        return (
          <SearchContext.Provider value={context}>
            {children}
          </SearchContext.Provider>
        );
      }}
    </SearchContext.Consumer>
  );
}

export default SearchProvider;
