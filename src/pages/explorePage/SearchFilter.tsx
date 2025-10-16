import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { X } from 'react-feather';
import { useTheme } from 'styled-components';

import DropdownList from 'components/input/DropdownList';
import MultiSelectButton from 'components/input/MultiSelectButton';
import RadioButton from 'components/input/RadioButton';
import { SearchFilterState, SearchFilterStateKey } from 'types/Common';
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
  RadioButtonWrapper,
  ResetButton,
  SearchFilterHeader,
  SearchFilterSection,
  SearchFilterText,
  SearchFilterWrapper,
  XWrapper,
} from './styles/SearchFilter';
import RatingsSlider from './RatingSlider';

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
  setFilterState: Dispatch<SetStateAction<SearchFilterState>>;
  resetFilters: () => void;
  courseSearch: boolean;
};

const SearchFilter = ({
  profCourses,
  filterState,
  setFilterState: setFilter,
  resetFilters,
  courseSearch,
}: SearchFilterProps) => {
  const theme = useTheme();

  const {
    courseCodes,
    currentTerm,
    nextTerm,
    courseTaught,
    numCourseRatings,
    numProfRatings,
    hasRoomAvailable,
  } = filterState;

  const setFilterState = <K extends SearchFilterStateKey>(
    key: K,
    val: SearchFilterState[K],
  ) => {
    setFilter((prev) => {
      return { ...prev, key: val };
    });
  };

  useEffect(() => {
    if (!currentTerm && !nextTerm) {
      setFilterState('hasRoomAvailable', false);
    }
  }, [currentTerm, nextTerm]);

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
              selected={courseCodes}
              onClick={(idx) => {
                setFilterState('courseCodes', [
                  ...courseCodes.slice(0, idx),
                  !courseCodes[idx],
                  ...courseCodes.slice(idx + 1),
                ]);
              }}
            />
          </SearchFilterSection>
          <SearchFilterSection>
            <RatingsSlider
              currentIndex={numCourseRatings}
              setSlider={(val) => setFilterState('numCourseRatings', val)}
            />
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>Offered in</SearchFilterText>
            <RadioButtonWrapper>
              <RadioButton
                color={theme.primary}
                selected={currentTerm}
                options={[`This term (${currentTermString})`]}
                margin="8px 16px 0 0"
                onClick={() => {
                  setFilterState('currentTerm', !filterState.currentTerm);
                }}
                toggle
              />
              <RadioButton
                color={theme.primary}
                selected={nextTerm}
                options={[`Next term (${nextTermString})`]}
                margin="8px 0 0 0"
                onClick={() => {
                  setFilterState('nextTerm', !filterState.nextTerm);
                }}
                toggle
              />
            </RadioButtonWrapper>
          </SearchFilterSection>
          <SearchFilterSection style={{ marginTop: '24px' }}>
            <SearchFilterText>Requirements</SearchFilterText>
            {(filterState.currentTerm || filterState.nextTerm) && (
              <RadioButtonWrapper style={{ marginTop: '8px' }}>
                <RadioButton
                  color={theme.primary}
                  selected={hasRoomAvailable}
                  options={['Seats available']}
                  margin="8px 0 0 0"
                  onClick={() =>
                    setFilterState(
                      'hasRoomAvailable',
                      !filterState.hasRoomAvailable,
                    )
                  }
                  toggle
                />
              </RadioButtonWrapper>
            )}
          </SearchFilterSection>
        </>
      ) : (
        <>
          <SearchFilterSection>
            <RatingsSlider
              currentIndex={numProfRatings}
              setSlider={(val) => setFilterState('numProfRatings', val)}
            />
          </SearchFilterSection>
          <SearchFilterSection>
            <SearchFilterText>
              Show professors that
              <br />
              teach:
              <CourseFilterDropdown>
                <DropdownList
                  selectedIndex={courseTaught}
                  options={profCourses.map((code) =>
                    code === 'all courses' ? code : formatCourseCode(code),
                  )}
                  color={theme.courses}
                  onChange={(idx) => setFilterState('courseTaught', idx)}
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
