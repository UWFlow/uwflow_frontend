import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import { SearchResultsContent, ResultsError } from './styles/SearchResults';

/* Child Components */
import Table from '../../components/display/Table';
import TabContainer from '../../components/display/TabContainer';
import { courseColumns, profColumns } from './ExploreTableData';

/* Utils */
import { getCurrentTermCode, getNextTermCode } from '../../utils/Misc';

/* Constants */
import { SEARCH_RESULTS_PER_PAGE } from '../../constants/Search';
import { EXPLORE_COURSES_ERROR } from '../../constants/Messages';

const currentTermCode = getCurrentTermCode();
const nextTermCode = getNextTermCode();

const numberSort = (a, b, desc) => (desc ? a - b : b - a);
const stringSort = (a, b, desc) =>
  desc ? b.localeCompare(a) : a.localeCompare(b);

const SearchResults = ({
  filterState,
  data,
  error,
  exploreTab,
  setExploreTab,
  ratingFilters,
  profCourses,
  loading,
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

    const newCourses = data.course.map(course =>
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
    );

    const newProfs = data.prof.map(prof =>
      Object({
        code_name: {
          code: prof.code,
          name: prof.name,
        },
        ratings: prof.rating ? prof.rating.filled_count : 0,
        liked: prof.rating ? prof.rating.liked : null,
        clear: prof.rating ? prof.rating.clear : null,
        engaging: prof.rating ? prof.rating.engaging : null,
        courses: prof.prof_courses.reduce(
          (acc, courseObj) => acc.add(courseObj.course.code),
          new Set(),
        ),
      }),
    );

    setCourses(newCourses);
    setProfs(newProfs);
  }, [data]);

  const courseCodeRegex = useMemo(() => {
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

  const filteredCourses = courses
    ? courses.filter(
        course =>
          courseCodeRegex.test(course.code) &&
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
      )
    : [];

  const filteredProfs = profs
    ? profs.filter(
        prof =>
          prof.ratings >= ratingFilters[filterState.numProfRatings] &&
          (filterState.courseTaught === 0 ||
            prof.courses.has(profCourses[filterState.courseTaught])),
      )
    : [];

  const courseSearch = exploreTab === 0;

  const resultsToReturn = () => {
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
    return filtered.slice(0, numRendered);
  };

  const tableProps = {
    cellPadding: '16px 0',
    loading,
    fetchOffset: 2000,
    sortable: true,
    manualSortBy: true,
    setTableState: state => {
      setNumRendered(50);
      setTableState(state);
    },
  };

  const doneFetching = courseSearch
    ? filteredCourses.length <= numRendered
    : filteredProfs.length <= numRendered;

  const results = () => (
    <SearchResultsContent>
      <Table
        {...tableProps}
        data={resultsToReturn()}
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

SearchResults.propTypes = {
  filterState: PropTypes.object.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  ratingFilters: PropTypes.arrayOf(PropTypes.number).isRequired,
  profCourses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResults;
