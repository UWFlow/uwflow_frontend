import React, { createContext, useContext, useEffect, useState } from 'react';

import { LAST_INDEXED_ID, SEARCH_DATA_ID } from 'constants/Search';
import { millisecondsPerDay } from 'utils/Misc';

export const SearchContext = createContext();
export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ searchWorker, children }) => {
  const [shouldReindex, setShouldReindex] = useState(false);

  useEffect(() => {
    // build indices
    searchWorker.postMessage({
      type: 'build',
      searchData: localStorage.getItem(SEARCH_DATA_ID),
      lastIndexedDate: localStorage.getItem(LAST_INDEXED_ID),
    });

    searchWorker.addEventListener('message', (event) => {
      const { type } = event.data;
      if (type === 'data') {
        const { searchData, lastIndexedDate } = event.data;
        const indexedDate = lastIndexedDate === null ? lastIndexedDate : Date();
        localStorage.setItem(SEARCH_DATA_ID, searchData);
        localStorage.setItem(LAST_INDEXED_ID, indexedDate);

        // reload if index is more than 1 day old
        if (
          new Date().getTime() - new Date(indexedDate).getTime() >
          millisecondsPerDay
        ) {
          setShouldReindex(true);
        }
      }
    });
  }, [searchWorker]);

  // reindex data
  useEffect(() => {
    if (!shouldReindex) {
      return;
    }

    localStorage.removeItem(LAST_INDEXED_ID);
    localStorage.removeItem(SEARCH_DATA_ID);
    searchWorker.postMessage({
      type: 'build',
      searchData: null,
      lastIndexedDate: null,
    });
    setShouldReindex(false);
  }, [shouldReindex, searchWorker]);

  return (
    <SearchContext.Consumer>
      {(context = {}) => {
        if (context.searchWorker !== searchWorker) {
          context = { ...context, searchWorker };
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
