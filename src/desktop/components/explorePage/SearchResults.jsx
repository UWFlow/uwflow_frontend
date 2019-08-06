import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';


const SearchResults = ({ results = [], type }) => {
  return (
    <SearchResultsWrapper>
      Search Results
    </SearchResultsWrapper>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.oneOf(['course', 'prof']).isRequired
}

export default SearchResults;
