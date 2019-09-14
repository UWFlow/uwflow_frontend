import React from 'react';

let searchContext;

export function getSearchContext() {
  if (!searchContext) {
    searchContext = React.createContext({});
  }
  return searchContext;
}

export function resetSearchContext() {
  searchContext = React.createContext({});
}
