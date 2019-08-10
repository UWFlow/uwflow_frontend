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

let courseNumberOptions = [1, 2, 3, 4].map(
  (num) => <span><BoldText>{num}</BoldText>XX</span>
);
courseNumberOptions.push(<span><BoldText>6</BoldText>XX+</span>)

const SearchFilter = ({
  terms,
  profCourses,
  filterState,
  setCourseCodes,
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
              selected={filterState.courseCodes}
              onClick={(idx) => {
                setCourseCodes([
                  ...filterState.courseCodes.slice(0, idx),
                  !filterState.courseCodes[idx],
                  ...filterState.courseCodes.slice(idx + 1)
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
                options={[terms[0].text]}
                margin="8px 16px 0 0"
                onClick={() => setCurrentTerm(!filterState.currentTerm)}
                toggle
              />
              <RadioButton
                color={theme.primary}
                selected={filterState.nextTerm}
                options={[terms[1].text]}
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
                  options={profCourses}
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
  terms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  })).isRequired,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterState: PropTypes.shape({
    courseCodes: PropTypes.arrayOf(PropTypes.bool),
    numRatings: PropTypes.number,
    currentTerm: PropTypes.bool,
    nextTerm: PropTypes.bool,
    courseTaught: PropTypes.number,
  }).isRequired,
  setCourseCodes: PropTypes.func.isRequired,
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
