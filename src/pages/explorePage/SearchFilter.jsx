import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { X } from 'react-feather';

import RadioButton from 'components/input/RadioButton';
import MultiSelectButton from 'components/input/MultiSelectButton';
import DiscreteSlider from 'components/input/DiscreteSlider';
import DropdownList from 'components/input/DropdownList';

/* Styled Components */
import {
  termCodeToDate,
  getCurrentTermCode,
  getNextTermCode,
  formatCourseCode,
} from 'utils/Misc';
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
  XWrapper,
} from './styles/SearchFilter';

const courseNumberOptions = [1, 2, 3, 4].map((num) => (
  <span key={num}>
    <BoldText>{num}</BoldText>XX
  </span>
));
courseNumberOptions.push(
  <span>
    <BoldText>5</BoldText>XX+
  </span>,
);

const currentTermString = termCodeToDate(getCurrentTermCode());
const nextTermString = termCodeToDate(getNextTermCode());

const SearchFilter = ({
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
          &ge; {ratingFilters[numRatings]}{' '}
          {ratingFilters[numRatings] === 1 ? 'rating' : 'ratings'}
        </NumRatingsText>
      </NumRatingsWrapper>
      <DiscreteSlider
        numNodes={ratingFilters.length}
        currentNode={numRatings}
        color={theme.primary}
        onUpdate={(value) => setNumRatings(value[0])}
        showTicks={false}
        fullWidthMobile
      />
    </>
  );

  return (
    <SearchFilterWrapper>
      <HeaderButtonWrapper>
        <SearchFilterHeader>Filter your results</SearchFilterHeader>
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
                options={[`This term (${currentTermString})`]}
                margin="8px 16px 0 0"
                onClick={() => setCurrentTerm(!filterState.currentTerm)}
                toggle
              />
              <RadioButton
                color={theme.primary}
                selected={filterState.nextTerm}
                options={[`Next term (${nextTermString})`]}
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
                  options={profCourses.map((code) =>
                    code === 'all courses' ? code : formatCourseCode(code),
                  )}
                  color={theme.courses}
                  onChange={(idx) => setCourseTaught(idx)}
                  searchable
                />
              </CourseFilterDropdown>
            </SearchFilterText>
          </SearchFilterSection>
        </>
      )}
      <ResetButton
        onClick={resetFilters}
        onMouseDown={(e) => e.preventDefault()}
      >
        <XWrapper>
          <X size={16} />
        </XWrapper>
        Clear filter
      </ResetButton>
    </SearchFilterWrapper>
  );
};

SearchFilter.propTypes = {
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
