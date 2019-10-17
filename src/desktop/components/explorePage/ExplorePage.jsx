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
const ratingFilters = [0, 10, 20, 30, 40, 50, 75, 100, 200, 500]

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

  const profCourses = !!data ? data.prof.map(prof => prof.prof_courses) : [];
  console.log(data);
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
          {codeSearch ? `Showing all ${query} courses` : `Showing results for "${query}"`}
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
          />
        </Column1>
        <Column2>
          <SearchFilter
            terms={terms}
            profCourses={profCourses}
            filterState={filterState}
            setCourseCodes={setCourseCodes}
            setNumCourseRatings={setNumCourseRatings}
            setNumProfRatings={setNumProfRatings}
            setCurrentTerm={setCurrentTerm}
            setNextTerm={setNextTerm}
            setCourseTaught={setCourseTaught}
            resetCourseFilters={resetCourseFilters}
            resetProfFilters={resetProfFilters}
            exploreTab={exploreTab}
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
