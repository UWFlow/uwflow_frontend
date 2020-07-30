import React, { useEffect, useMemo, useState } from 'react';

import TabContainer from 'components/display/TabContainer';
import Table from 'components/display/Table';
import { EXPLORE_COURSES_ERROR } from 'constants/Messages';
import { SEARCH_RESULTS_PER_PAGE } from 'constants/Search';
import { getCurrentTermCode, getNextTermCode } from 'utils/Misc';

import { ResultsError, SearchResultsContent } from './styles/SearchResults';
import { courseColumns, profColumns } from './ExploreTableData';

const currentTermCode = getCurrentTermCode();
const nextTermCode = getNextTermCode();

const compareNull = (a, b) => {
  if (a === null && b === null) {
    return 0;
  }
  if (a === null) {
    return 1;
  }
  return -1;
};

const numberSort = (a, b, desc) => {
  if (a === null || b === null) {
    return compareNull(a, b);
  }

  return desc ? a - b : b - a;
};

const stringSort = (a, b, desc) => {
  if (a === null || b === null) {
    return compareNull(a, b);
  }

  return desc ? b.localeCompare(a) : a.localeCompare(b);
};

const SearchResults = ({
  filterState,
  data,
  error,
  exploreTab,
  setExploreTab,
  ratingFilters,
  profCourses,
  loading,
  exploreAll,
}) => {
  const [numRendered, setNumRendered] = useState(SEARCH_RESULTS_PER_PAGE);
  const [courses, setCourses] = useState(null);
  const [profs, setProfs] = useState(null);
  const [tableState, setTableState] = useState({ sortBy: [] });

  useEffect(() => {
    setNumRendered(SEARCH_RESULTS_PER_PAGE);
  }, [exploreTab]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const newCourses = data[
      exploreAll ? 'course_search_index' : 'search_courses'
    ].map((result) =>
      Object({
        id: result.course_id,
        code: result.code,
        name: result.name,
        ratings: result.ratings,
        liked: result.liked,
        easy: result.easy,
        useful: result.useful,
        terms: result.terms,
      }),
    );

    const newProfs = data[
      exploreAll ? 'prof_search_index' : 'search_profs'
    ].map((result) =>
      Object({
        id: result.prof_id,
        code_name: {
          code: result.code,
          name: result.name,
        },
        ratings: result.ratings,
        liked: result.liked,
        clear: result.clear,
        engaging: result.engaging,
        courses: new Set(result.course_codes),
      }),
    );

    setCourses(newCourses);
    setProfs(newProfs);
  }, [data, exploreAll]);

  const courseCodeRegex = useMemo(() => {
    let regexStr = '';
    for (let i = filterState.courseCodes.length - 1; i >= 0; i -= 1) {
      if (filterState.courseCodes[i]) {
        regexStr += `|${
          i < filterState.courseCodes.length - 1 ? i + 1 : '[5-8]'
        }`;
      }
    }
    regexStr =
      regexStr === '' ? 'a^' : `[a-z|A-Z]+(${regexStr.slice(1)})([0-9]*)`;
    return new RegExp(regexStr);
  }, [filterState]);

  const filteredCourses = courses
    ? courses.filter(
        (course) =>
          courseCodeRegex.test(course.code) &&
          course.ratings >= ratingFilters[filterState.numCourseRatings] &&
          (!filterState.currentTerm ||
            (filterState.currentTerm &&
              course.terms.some((term) => Number(term) === currentTermCode))) &&
          (!filterState.nextTerm ||
            (filterState.nextTerm &&
              course.terms.some((term) => Number(term) === nextTermCode))),
      )
    : [];

  const filteredProfs = profs
    ? profs.filter(
        (prof) =>
          prof.ratings >= ratingFilters[filterState.numProfRatings] &&
          (filterState.courseTaught === 0 ||
            prof.courses.has(profCourses[filterState.courseTaught])),
      )
    : [];

  const courseSearch = exploreTab === 0;

  const resultsToReturn = useMemo(() => {
    let filtered = courseSearch ? filteredCourses : filteredProfs;
    if (tableState.sortBy.length > 0) {
      const { id: sortKey, desc } = tableState.sortBy[0];
      filtered = filtered.sort((a, b) =>
        ['code', 'name'].includes(sortKey)
          ? stringSort(a[sortKey], b[sortKey], desc)
          : sortKey === 'code_name' && a[sortKey] && a[sortKey].name
          ? stringSort(a[sortKey].name, b[sortKey].name, desc)
          : numberSort(a[sortKey], b[sortKey], desc),
      );
    }
    return filtered;
  }, [courseSearch, filteredCourses, filteredProfs, tableState.sortBy]);

  const tableProps = {
    cellPadding: '16px 0',
    loading: loading || courses === null || profs === null,
    sortable: true,
    manualSortBy: true,
    setTableState: (state) => {
      setNumRendered(50);
      setTableState(state);
    },
  };

  const doneFetching =
    courses !== null && profs !== null
      ? courseSearch
        ? filteredCourses.length <= numRendered
        : filteredProfs.length <= numRendered
      : !!error;

  const results = () => (
    <SearchResultsContent>
      <Table
        {...tableProps}
        data={resultsToReturn.slice(0, numRendered)}
        columns={courseSearch ? courseColumns : profColumns}
        rightAlignIndex={courseSearch ? 2 : 1}
        showNoResults
        fetchMore={() =>
          setNumRendered(
            Math.min(
              numRendered + 50,
              courseSearch ? filteredCourses.length : filteredProfs.length,
            ),
          )
        }
        initialState={{
          sortBy: [{ id: 'ratings', desc: false }],
        }}
        doneFetching={doneFetching}
      />
    </SearchResultsContent>
  );

  return (
    <>
      <TabContainer
        tabList={[
          {
            onClick: () => setExploreTab(0),
            title: `Courses ${courses ? `(${filteredCourses.length})` : ''}`,
            render: results,
          },
          {
            onClick: () => setExploreTab(1),
            title: `Profs ${profs ? `(${filteredProfs.length})` : ''}`,
            render: results,
          },
        ]}
        initialSelectedTab={exploreTab}
        contentPadding="0"
      />
      {error && <ResultsError>{EXPLORE_COURSES_ERROR}</ResultsError>}
    </>
  );
};

export default SearchResults;
