import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  SearchResultsWrapper
} from './styles/SearchResults';

import Table from '../common/Table';
import { courseColumns, profColumns } from './TableData';

const SearchResults = ({
  filterState,
  data,
  courseSearch,
  ratingFilters,
  profCourses
}) => {
  const courses = !!data ? data.course : [];
  const profs = !!data ? data.prof : [];

  const courseCodeRegex = useCallback(() => {
    let regexStr = '';
    for (let i = filterState.courseCodes.length - 1; i >= 0; i--) {
      if (filterState.courseCodes[i]) {
        regexStr += `|${i < filterState.courseCodes.length - 1 ? i + 1 : '[5-8]'}`;
      }
    }
    regexStr = regexStr === '' ? 'a^' : `(${regexStr.slice(1)})([0-9]{2})`;
    return new RegExp(regexStr);
  }, [filterState]);

  const filterCourses = () => {
    const regex = courseCodeRegex();
    return courses.filter(
      (course) => regex.test(course.code)
        && course.ratings >= ratingFilters[filterState.numCourseRatings]
    );
  };

  const filterProfs = () => {
    return profs.filter(prof =>
      prof.ratings >= ratingFilters[filterState.numProfRatings]
        && (filterState.courseTaught === 0
            || prof.courses.includes(profCourses[filterState.courseTaught]))
    )
  };

  return (
    <SearchResultsWrapper>
      <Table
        data={courseSearch ? filterCourses() : filterProfs()}
        columns={courseSearch ? courseColumns : profColumns}
        rightAlignIndex={courseSearch ? 2 : 1}
        sortable
      />
    </SearchResultsWrapper>
  );
};

SearchResults.propTypes = {
  filterState: PropTypes.shape({
    courseCodes: PropTypes.arrayOf(PropTypes.bool),
    numRatings: PropTypes.number,
    currentTerm: PropTypes.bool,
    nextTerm: PropTypes.bool,
    courseTaught: PropTypes.number,
  }).isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SearchResults;
