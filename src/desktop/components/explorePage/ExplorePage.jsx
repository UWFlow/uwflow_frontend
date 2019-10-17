import React, { useState, useMemo, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

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

import { useSearchContext } from '../../../search/SearchProvider';

const NUM_COURSE_CODES = 5;

const ExplorePageContent = ({
  query,
  terms,
  courseTab,
  codeSearch,
  results
}) => {
  const [courseCodes, setCourseCodes] = useState(Array(NUM_COURSE_CODES).fill(true));
  const [numCourseRatings, setNumCourseRatings] = useState(0);
  const [numProfRatings, setNumProfRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);

  const courseResults = results !== null ? results.courseResults : [];
  const profResults = results !== null ? results.profResults : [];

  const computeRatingFilters = (results) => {
    let ratings = results !== null ? results.map(res => Number(res.ratings)) : [];
    ratings.sort((a, b) => a - b);

    let filters;
    if (ratings.length === 0) {
      filters = [0, 1];
    } else if (ratings.length === 1) {
      filters = [0, ratings[0]];
    } else {
      const ratingsPerFilter = Math.ceil(ratings.length / 10);
      filters = ratings.filter((_, idx) => {
        return idx % ratingsPerFilter === 0;
      });
    }

    return filters;
  }

  const courseRatingFilters = useMemo(() => computeRatingFilters(courseResults), [courseResults]);
  const profRatingFilters = useMemo(() => computeRatingFilters(profResults), [profResults]);
  
  const profCourses = useMemo(() => Array.from(
    new Set(profResults.reduce(
      (acc, prof) => acc.concat(prof.courses),
      ['any courses']
    ))
  ), [profResults]);

  const filterState = {
    courseCodes,
    numCourseRatings,
    numProfRatings,
    currentTerm,
    nextTerm,
    courseTaught
  }

  const resetCourseFilters = () => {
    setCourseCodes(Array(NUM_COURSE_CODES).fill(true));
    setNumCourseRatings(0);
    setCurrentTerm(false);
    setNextTerm(false);
  }

  const resetProfFilters = () => {
    setNumProfRatings(0);
    setCourseTaught(0);
  }

  if (results === null) {
    return <div>Loading...</div>
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
            courses={courseResults}
            profs={profResults}
            exploreTab={exploreTab}
            setExploreTab={setExploreTab}
            courseRatingFilters={courseRatingFilters}
            profRatingFilters={profRatingFilters}
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

const ExplorePage = ({ location }) => {
  const { searchWorker } = useSearchContext();
  const [results, setResults] = useState(null);

  useEffect(() => {
    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'search') {
        setResults(event.data.results);
      }
    });
  }, [searchWorker]);

  const { q: query, t: type, c: code } = queryString.parse(location.search);
  const courseTab = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;
  
  if (!codeSearch) {
    searchWorker.postMessage({ type: 'search', query });
  }

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

  console.log(results);

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        code={code}
        terms={terms}
        codeSearch={codeSearch}
        courseTab={courseTab}
        results={results}
      />
    </ExplorePageWrapper>
  )
};

export default withRouter(ExplorePage);
