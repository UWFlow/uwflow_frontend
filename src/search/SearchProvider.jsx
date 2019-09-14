
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getSearchContext } from './SearchContext';

const SearchProvider = ({
  client,
  children
}) => {
  useEffect(() => {
    client.buildIndices();
  }, [client]);

  const SearchContext = getSearchContext();
  return (
    <SearchContext.Consumer>
      {(context = {}) => {
        if (context.client !== client) {
          context = Object.assign({}, context, { client });
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

SearchProvider.propTypes = {
  children: PropTypes.any
}

export default SearchProvider;