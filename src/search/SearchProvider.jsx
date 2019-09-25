
import React, { createContext, useContext, useEffect } from 'react';

import { COURSE_INDEX_NAME, PROF_INDEX_NAME, COURSE_CODE_INDEX_NAME } from '../constants/Search';

export const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ searchWorker, children }) => {
  useEffect(() => {
    // build indices
    searchWorker.postMessage({
      type: 'build',
      indices: {
        courseIndex: localStorage.getItem(COURSE_INDEX_NAME),
        profIndex: localStorage.getItem(PROF_INDEX_NAME),
        courseCodeIndex: localStorage.getItem(COURSE_CODE_INDEX_NAME),
      }
    });

    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'indices') {
        const { courseIndex, profIndex, courseCodeIndex } = event.data.indices;
        localStorage.setItem(COURSE_INDEX_NAME, courseIndex);
        localStorage.setItem(PROF_INDEX_NAME, profIndex);
        localStorage.setItem(COURSE_CODE_INDEX_NAME, courseCodeIndex);
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
