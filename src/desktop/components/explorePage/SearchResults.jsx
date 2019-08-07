import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';


const SearchResults = ({ results, courseSearch }) => {
  return (
    <SearchResultsWrapper>
      Search Results
    </SearchResultsWrapper>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  courseSearch: PropTypes.bool.isRequired
}

export default SearchResults;
