
import React from 'react';

import { getSearchContext } from './SearchContext';

const SearchConsumer = ({ children }) => {
  const SearchContext = getSearchContext();
  return (
    <SearchContext.Consumer>
      {(context) => children(context.searchClient)};
    </SearchContext.Consumer>
  );
};

export default SearchConsumer;