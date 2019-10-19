import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import RadioButton from '../../../sharedComponents/input/RadioButton';
import MultiSelectButton from '../../../sharedComponents/input/MultiSelectButton';
import DiscreteSlider from '../../../sharedComponents/discreteSlider/DiscreteSlider';
import DropdownList from '../../../sharedComponents/input/DropdownList';

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
  HeaderButtonWrapper,
} from './styles/SearchFilter';

let courseNumberOptions = [1, 2, 3, 4].map(num => (
  <span>
    <BoldText>{num}</BoldText>XX
  </span>
));
courseNumberOptions.push(
  <span>
    <BoldText>5</BoldText>XX+
  </span>,
);

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
  theme,
}) => {
  const numRatings = courseSearch
    ? filterState.numCourseRatings
    : filterState.numProfRatings;

  const ratingSlider = (
    <>
      <NumRatingsWrapper>
        <SearchFilterText>Min # of ratings</SearchFilterText>
        <NumRatingsText>
          &ge; {ratingFilters[numRatings]} ratings
        </NumRatingsText>
      </NumRatingsWrapper>
      <DiscreteSlider
        numNodes={ratingFilters.length}
        currentNode={numRatings}
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
              onClick={idx => {
                setCourseCodes([
                  ...filterState.courseCodes.slice(0, idx),
                  !filterState.courseCodes[idx],
                  ...filterState.courseCodes.slice(idx + 1),
                ]);
              }}
            />
          </SearchFilterSection>
          <SearchFilterSection>{ratingSlider}</SearchFilterSection>
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
          <SearchFilterSection>{ratingSlider}</SearchFilterSection>
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
  terms: PropTypes.array,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterState: PropTypes.object.isRequired,
  setCourseCodes: PropTypes.func.isRequired,
  setCurrentTerm: PropTypes.func.isRequired,
  setNextTerm: PropTypes.func.isRequired,
  setNumRatings: PropTypes.func.isRequired,
  setCourseTaught: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  courseSearch: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(SearchFilter);
