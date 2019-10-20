import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Table from '../../../sharedComponents/display/Table';
import TabContainer from '../../../sharedComponents/display/TabContainer';
import { courseColumns, profColumns } from './ExploreTableData';

const SearchResults = ({
  filterState,
  data,
  exploreTab,
  setExploreTab,
  ratingFilters,
  profCourses,
  loading,
  fecthMore
}) => {
  const courses = data ? data.course.map(course => Object({
    id: course.id,
    code: course.code,
    name: course.name,
    description: course.description,
    ratings: course.course_reviews_aggregate.aggregate.count,
    easy: course.course_reviews_aggregate.aggregate.avg.easy / 5,
    liked: course.course_reviews_aggregate.aggregate.avg.liked,
    useful: course.course_reviews_aggregate.aggregate.avg.useful / 5
  })) : [];

  const profs = data ? data.prof.map(prof => Object({
    id_name: {
      id: prof.id,
      name: prof.name,
    },
    ratings: prof.prof_reviews_aggregate.aggregate.count,
    clear: prof.prof_reviews_aggregate.aggregate.avg.clear / 5,
    engaging: prof.prof_reviews_aggregate.aggregate.avg.engaging / 5,
    liked: prof.course_reviews_aggregate.aggregate.avg.liked,
    courses: prof.prof_courses.map(course => course.code)
  })) : [];

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

  const filteredCourses = courses.filter(course => 
    courseCodeRegex().test(course.code)
      && course.ratings >= ratingFilters[filterState.numCourseRatings]
  );

  const filteredProfs = profs.filter(prof =>
    prof.ratings >= ratingFilters[filterState.numProfRatings]
      && (filterState.courseTaught === 0
          || prof.courses.includes(profCourses[filterState.courseTaught]))
  );

  const courseSearch = exploreTab === 0;
  const results = () => (
    <Table
      data={courseSearch ? filteredCourses : filteredProfs}
      columns={courseSearch ? courseColumns : profColumns}
      rightAlignIndex={courseSearch ? 2 : 1}
      sortable
      loading={loading}
    />
  );

  return (
    <TabContainer
      tabList={[
        {
          onClick: () => setExploreTab(0),
          title: `Courses ${data ? `(${data.course_aggregate.aggregate.count})` : ''}`,
          render: results
        },
        {
          onClick: () => setExploreTab(1),
          title: `Profs ${data ? `(${data.prof_aggregate.aggregate.count})` : ''}`,
          render: results
        },
      ]}
      initialSelectedTab={exploreTab}
      contentPadding="0"
    />
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
