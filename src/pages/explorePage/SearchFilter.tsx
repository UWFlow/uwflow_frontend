import React, { Dispatch, SetStateAction } from 'react';
import { X } from 'react-feather';
import { useTheme } from 'styled-components';

import DiscreteSlider from 'components/input/DiscreteSlider';
import DropdownList from 'components/input/DropdownList';
import MultiSelectButton from 'components/input/MultiSelectButton';
import RadioButton from 'components/input/RadioButton';
import { SearchFilterState } from 'types/Common';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import {
  BoldText,
  CourseFilterDropdown,
  HeaderButtonWrapper,
  NumRatingsText,
  NumRatingsWrapper,
  RadioButtonWrapper,
  ResetButton,
  SearchFilterHeader,
  SearchFilterSection,
  SearchFilterText,
  SearchFilterWrapper,
  XWrapper,
} from './styles/SearchFilter';

const courseNumberOptions = [1, 2, 3, 4]
  .map((num) => (
    <span key={num}>
      <BoldText>{num}</BoldText>XX
    </span>
  ))
  .concat(
    <span>
      <BoldText>5</BoldText>XX+
    </span>,
  );

const currentTermString = termCodeToDate(getCurrentTermCode());
const nextTermString = termCodeToDate(getNextTermCode());

type SearchFilterProps = {
  profCourses: string[];
  filterState: SearchFilterState;
  setCourseCodes: Dispatch<SetStateAction<boolean[]>>;
  setCurrentTerm: Dispatch<SetStateAction<boolean>>;
  setNextTerm: Dispatch<SetStateAction<boolean>>;
  setNumRatings: Dispatch<SetStateAction<number>>;
  setCourseTaught: Dispatch<SetStateAction<number>>;
  setHasPrereqs: Dispatch<SetStateAction<boolean>>;
  resetFilters: () => void;
  ratingFilters: number[];
  courseSearch: boolean;
};

const SearchFilter = ({
  profCourses,
  filterState,
  setCourseCodes,
  setCurrentTerm,
  setNextTerm,
  setNumRatings,
  setCourseTaught,
  setHasPrereqs,
  resetFilters,
  ratingFilters,
  courseSearch,
}: SearchFilterProps) => {
  const theme = useTheme();

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
        onUpdate={(values) => setNumRatings(values[0])}
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
          <SearchFilterSection style={{ marginTop: '24px' }}>
            <SearchFilterText>Requirements</SearchFilterText>
            <RadioButtonWrapper>
              <RadioButton
                color={theme.primary}
                selected={!filterState.hasPrereqs}
                options={['No prerequisites']}
                margin="8px 16px 0 0"
                onClick={() => setHasPrereqs(!filterState.hasPrereqs)}
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

export default SearchFilter;
