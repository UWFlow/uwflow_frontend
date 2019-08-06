import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import DiscreteSlider from '../common/discreteSlider/DiscreteSlider';

/* Styled Components */
import {
  SearchFilterWrapper,
  SearchFilterHeader,
  SearchFilterText,
  SearchFilterSection
} from './styles/SearchFilter';


const SearchFilter = ({ ratingFilters, type, theme }) => {
  const [numRatings, setNumRatings] = useState(0);
  const ratingFilterText = ratingFilters.map(rating => `≥ ${rating} ratings`);

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
            <DiscreteSlider
              numNodes={ratingFilters.length}
              currentNode={numRatings}
              nodeText={ratingFilterText}
              color={theme.primary}
              onUpdate={value => setNumRatings(value[0])}
              showTicks={false}
              margin="0 0 20px 0"
            />
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Offered in</SearchFilterText>
          </SearchFilterSection>
        </>
      ) : (
        <>
          <SearchFilterSection>
            <SearchFilterText>Min # of ratings</SearchFilterText>
            <DiscreteSlider
              numNodes={ratingFilters.length}
              currentNode={numRatings}
              nodeText={ratingFilterText}
              color={theme.primary}
              onUpdate={value => setNumRatings(value[0])}
              showTicks={false}
            />
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
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  type: PropTypes.oneOf(['course', 'prof']).isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme(SearchFilter);
