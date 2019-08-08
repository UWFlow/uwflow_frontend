import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import DiscreteSlider from '../common/discreteSlider/DiscreteSlider';
import RadioButton from '../common/RadioButton';
import DropdownList from '../common/dropdownList/DropdownList';

/* Styled Components */
import {
  SearchFilterWrapper,
  SearchFilterHeader,
  SearchFilterText,
  SearchFilterSection,
  RadioButtonWrapper,
  CourseFilterDropdown,
  NumRatingsWrapper,
  NumRatingsText
} from './styles/SearchFilter';

const SearchFilter = ({
  filterState,
  setCurrentTerm,
  setNextTerm,
  setNumRatings,
  setCourseTaught,
  ratingFilters,
  courseSearch,
  theme
}) => {

  const ratingSlider = (
    <>
      <NumRatingsWrapper>
        <SearchFilterText>Min # of ratings</SearchFilterText>
        <NumRatingsText>&ge; {ratingFilters[filterState.numRatings]} ratings</NumRatingsText>
      </NumRatingsWrapper>
      <DiscreteSlider
        numNodes={ratingFilters.length}
        currentNode={filterState.numRatings}
        color={theme.primary}
        onUpdate={value => setNumRatings(value[0])}
        showTicks={false}
      />
    </>
  );

  return (
    <SearchFilterWrapper>
      <SearchFilterHeader>Filter your results</SearchFilterHeader>
      {courseSearch ? (
        <>
          <SearchFilterSection>
            <SearchFilterText>Course code</SearchFilterText>
          </SearchFilterSection>
          <SearchFilterSection>
            {ratingSlider}
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Offered in</SearchFilterText>
            <RadioButtonWrapper>
              <RadioButton
                color={theme.primary}
                selected={filterState.currentTerm}
                options={['Current Term']}
                margin="8px 0 0 0"
                onClick={() => setCurrentTerm(!filterState.currentTerm)}
                toggle
              />
              <RadioButton
                color={theme.primary}
                selected={filterState.nextTerm}
                options={['Next Term']}
                margin="8px 0 0 0"
                onClick={() => setNextTerm(!filterState.nextTerm)}
                toggle
              />
            </RadioButtonWrapper>
          </SearchFilterSection>
        </>
      ) : (
        <>
          <SearchFilterSection>
            {ratingSlider}
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>
              Show professors that
              <br />
              teach:
              <CourseFilterDropdown>
                <DropdownList
                  selectedIndex={filterState.courseTaught}
                  options={['any courses', 'ECE 105', 'MATH 239']}
                  color={theme.courses}
                  onChange={idx => setCourseTaught(idx)}
                />
              </CourseFilterDropdown>
            </SearchFilterText>
          </SearchFilterSection>
        </>
      )}
    </SearchFilterWrapper>
  );
};

SearchFilter.propTypes = {
  filterState: PropTypes.shape({
    numRatings: PropTypes.number.isRequired,
    currentTerm: PropTypes.bool.isRequired,
    nextTerm: PropTypes.bool.isRequired,
    courseTaught: PropTypes.number.isRequired,
  }).isRequired,
  setCurrentTerm: PropTypes.func.isRequired,
  setNextTerm: PropTypes.func.isRequired,
  setNumRatings: PropTypes.func.isRequired,
  setCourseTaught: PropTypes.func.isRequired,
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  courseSearch: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme(SearchFilter);
