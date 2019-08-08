import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import RadioButton from '../common/RadioButton';
import MultiSelectButton from '../common/MultiSelectButton';
import DiscreteSlider from '../common/discreteSlider/DiscreteSlider';
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
  NumRatingsText,
  BoldText,
  ResetButton,
  HeaderButtonWrapper
} from './styles/SearchFilter';

const courseNumberOptions = [1, 2, 3, 4, 6, 7, 8].map(
  (num) => <span><BoldText>{num}</BoldText>XX</span>
);

const SearchFilter = ({
  filterState,
  setCourseNumbers,
  setCurrentTerm,
  setNextTerm,
  setNumRatings,
  setCourseTaught,
  resetFilters,
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
      <HeaderButtonWrapper>
        <SearchFilterHeader>Filter your results</SearchFilterHeader>
        <ResetButton onClick={resetFilters}>Reset</ResetButton>
      </HeaderButtonWrapper>
      {courseSearch ? (
        <>
          <SearchFilterSection>
            <SearchFilterText>Course code</SearchFilterText>
            <MultiSelectButton
              options={courseNumberOptions}
              selected={filterState.courseNumbers}
              onClick={(idx) => {
                setCourseNumbers([
                  ...filterState.courseNumbers.slice(0, idx),
                  !filterState.courseNumbers[idx], 
                  ...filterState.courseNumbers.slice(idx + 1)
                ])
              }}
            />
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
    courseNumbers: PropTypes.arrayOf(PropTypes.bool),
    numRatings: PropTypes.number,
    currentTerm: PropTypes.bool,
    nextTerm: PropTypes.bool,
    courseTaught: PropTypes.number,
  }).isRequired,
  setCourseNumbers: PropTypes.func.isRequired,
  setCurrentTerm: PropTypes.func.isRequired,
  setNextTerm: PropTypes.func.isRequired,
  setNumRatings: PropTypes.func.isRequired,
  setCourseTaught: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  courseSearch: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired
}

export default withTheme(SearchFilter);
