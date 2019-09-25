
import React, { createContext, useContext } from 'react';

export const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ searchWorker, children }) => (
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

export default SearchProvider;
