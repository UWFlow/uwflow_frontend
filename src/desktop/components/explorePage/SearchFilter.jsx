import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchFilterWrapper,
  SearchFilterHeader,
  SearchFilterText,
  SearchFilterSection
} from './styles/SearchFilter';


const SearchFilter = ({ type }) => {
  return (
    <SearchFilterWrapper>
      <SearchFilterHeader>Filter your results</SearchFilterHeader>
      {type === 'course' ? (
        <>
          <SearchFilterSection>
            <SearchFilterText>Course code</SearchFilterText>
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Min # of ratings</SearchFilterText>
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Offered in</SearchFilterText>
          </SearchFilterSection>
        </>
      ) : (
        <>
          <SearchFilterSection>
            <SearchFilterText>Min # of ratings</SearchFilterText>
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Show professors that teach:</SearchFilterText>
          </SearchFilterSection>
        </>
      )}
    </SearchFilterWrapper>
  );
};

SearchFilter.propTypes = {
  type: PropTypes.oneOf(['course', 'prof']).isRequired
}

export default SearchFilter;
