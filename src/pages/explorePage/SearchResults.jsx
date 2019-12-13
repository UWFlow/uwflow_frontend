import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/display/Table';
import TabContainer from '../../components/display/TabContainer';
import { courseColumns, profColumns } from './ExploreTableData';

import { getCurrentTermCode, getNextTermCode } from '../../utils/Misc';

import { SearchResultsContent } from './styles/SearchResults';

const currentTermCode = getCurrentTermCode();
const nextTermCode = getNextTermCode();

const SearchResults = ({
  filterState,
  data,
  exploreTab,
  setExploreTab,
  ratingFilters,
  profCourses,
  loading,
}) => {
  const [numRendered, setNumRendered] = useState(50);

  useEffect(() => {
    setNumRendered(50);
  }, [exploreTab]);

  const courses = data
    ? data.course.map(course =>
        Object({
          id: course.id,
          code: course.code,
          name: course.name,
          description: course.description,
          ratings: course.rating ? course.rating.filled_count : 0,
          liked: course.rating ? course.rating.liked : null,
          easy: course.rating ? course.rating.easy : null,
          useful: course.rating ? course.rating.useful : null,
          sections: course.sections,
        }),
      )
    : [];

  const profs = data
    ? data.prof.map(prof =>
        Object({
          code_name: {
            code: prof.code,
            name: prof.name,
          },
          ratings: prof.rating ? prof.rating.filled_count : 0,
          liked: prof.rating ? prof.rating.liked : null,
          clear: prof.rating ? prof.rating.clear : null,
          engaging: prof.rating ? prof.rating.engaging : null,
          courses: prof.prof_courses.map(course => course.code),
        }),
      )
    : [];

  const courseCodeRegex = useCallback(() => {
    let regexStr = '';
    for (let i = filterState.courseCodes.length - 1; i >= 0; i--) {
      if (filterState.courseCodes[i]) {
        regexStr += `|${
          i < filterState.courseCodes.length - 1 ? i + 1 : '[5-8]'
        }`;
      }
    }
    regexStr = regexStr === '' ? 'a^' : `(${regexStr.slice(1)})([0-9]{2})`;
    return new RegExp(regexStr);
  }, [filterState]);

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        course =>
          courseCodeRegex().test(course.code) &&
          course.ratings >= ratingFilters[filterState.numCourseRatings] &&
          (!filterState.currentTerm ||
            (filterState.currentTerm &&
              course.sections &&
              course.sections.some(
                section => Number(section.term_id) === currentTermCode,
              ))) &&
          (!filterState.nextTerm ||
            (filterState.nextTerm &&
              course.sections &&
              course.sections.some(
                section => Number(section.term_id) === nextTermCode,
              ))),
      ),
    [courses, filterState, ratingFilters],
  );

  const filteredProfs = useMemo(
    () =>
      profs.filter(
        prof =>
          prof.ratings >= ratingFilters[filterState.numProfRatings] &&
          (filterState.courseTaught === 0 ||
            prof.courses.includes(profCourses[filterState.courseTaught])),
      ),
    [profs, filterState, ratingFilters],
  );

  const courseSearch = exploreTab === 0;

  const results = () => (
    <SearchResultsContent>
      <Table
        cellPadding="16px 0"
        data={
          courseSearch
            ? filteredCourses.slice(0, numRendered)
            : filteredProfs.slice(0, numRendered)
        }
        columns={courseSearch ? courseColumns : profColumns}
        rightAlignIndex={courseSearch ? 2 : 1}
        loading={loading}
        fetchMore={() =>
          setNumRendered(
            Math.min(
              numRendered + 50,
              courseSearch ? filteredCourses.length : filteredProfs.length,
            ),
          )
        }
        doneFetching={
          courseSearch
            ? filteredCourses.length >= numRendered
            : filteredProfs.length >= numRendered
        }
        fetchOffset={2000}
        sortable
      />
    </SearchResultsContent>
  );

  return (
    <TabContainer
      tabList={[
        {
          onClick: () => setExploreTab(0),
          title: `Courses ${data ? `(${filteredCourses.length})` : ''}`,
          render: results,
        },
        {
          onClick: () => setExploreTab(1),
          title: `Profs ${data ? `(${filteredProfs.length})` : ''}`,
          render: results,
        },
      ]}
      initialSelectedTab={exploreTab}
      contentPadding="0"
    />
  );
};

SearchResults.propTypes = {
  filterState: PropTypes.object.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResults;
