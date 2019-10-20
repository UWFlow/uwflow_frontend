import React, { useState, useMemo } from 'react';

import {
  ExplorePageWrapper,
  ExploreHeaderWrapper,
  ExploreHeaderText,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ExplorePage';

import SearchResults from './SearchResults';
import SearchFilter from './SearchFilter';

const NUM_COURSE_CODE_FILTERS = 5;
const ratingFilters = [0, 10, 20, 50, 100, 250, 500];

const ExplorePageContent = ({
  query,
  terms,
  codeSearch,
  courseTab,
  data,
  fetchMore,
  loading
}) => {
  const [courseCodes, setCourseCodes] = useState(Array(NUM_COURSE_CODE_FILTERS).fill(true));
  const [numCourseRatings, setNumCourseRatings] = useState(0);
  const [numProfRatings, setNumProfRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);

  let profCourses = !!data ? data.prof.reduce((acc, prof) => {
    return acc.concat(prof.prof_courses.map(course => course.code));
  }, ['any course']) : ['any course'];
  profCourses = profCourses.filter(code => !!code);

  console.log(data, profCourses);

  const filterState = {
    courseCodes,
    numCourseRatings,
    numProfRatings,
    currentTerm,
    nextTerm,
    courseTaught
  }

  const resetCourseFilters = () => {
    setCourseCodes(Array(NUM_COURSE_CODE_FILTERS).fill(true));
    setNumCourseRatings(0);
    setCurrentTerm(false);
    setNextTerm(false);
  }

  const resetProfFilters = () => {
    setNumProfRatings(0);
    setCourseTaught(0);
  }

  return (
    <ExplorePageWrapper>
      <ExploreHeaderWrapper>
        <ExploreHeaderText>
          {codeSearch
            ? `Showing all ${query.toUpperCase()} courses and professors`
            : `Showing results for "${query}"`}
        </ExploreHeaderText>
      </ExploreHeaderWrapper>
      <ColumnWrapper>
        <Column1>
          <SearchResults
            filterState={filterState}
            data={data}
            exploreTab={exploreTab}
            setExploreTab={setExploreTab}
            ratingFilters={ratingFilters}
            profCourses={profCourses}
            loading={loading}
            fetchMore={fetchMore}
          />
        </Column1>
        <Column2>
          <SearchFilter
            terms={terms}
            profCourses={profCourses}
            filterState={filterState}
            setCourseCodes={setCourseCodes}
            setNumRatings={exploreTab === 0 ? setNumCourseRatings : setNumProfRatings}
            setCurrentTerm={setCurrentTerm}
            setNextTerm={setNextTerm}
            setCourseTaught={setCourseTaught}
            ratingFilters={ratingFilters}
            resetFilters={exploreTab === 0 ? resetCourseFilters : resetProfFilters}
            courseSearch={exploreTab === 0}
          />
        </Column2>
    </ColumnWrapper>
    </ExplorePageWrapper>
  );
}

const ExplorePage = ({ query, codeSearch, courseTab, data, fetchMore, loading }) => {
  const terms = [
    {
      id: '1199',
      text: 'This Term (Fall 2019)'
    },
    {
      id: '1201',
      text: 'Next Term (Winter 2020)'
    }
  ]

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        terms={terms}
        codeSearch={codeSearch}
        courseTab={courseTab}
        data={data}
        fetchMore={fetchMore}
        loading={loading}
      />
    </ExplorePageWrapper>
  )
};

export default ExplorePage;
