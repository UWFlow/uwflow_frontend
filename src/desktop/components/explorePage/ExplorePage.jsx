import React, { useState, useMemo, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { useQuery } from 'react-apollo';

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

import { EXPLORE_CODE_QUERY } from '../../../graphql/queries/explore/Explore';
import { useSearchContext } from '../../../search/SearchProvider';

const NUM_COURSE_CODES = 5;

const ExplorePageContent = ({
  query,
  terms,
  courseTab,
  courses,
  profs
}) => {
  const [courseCodes, setCourseCodes] = useState(Array(NUM_COURSE_CODES).fill(true));
  const [numRatings, setNumRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);
 /*
  const profCourses = courseTab
    ? []
    : Array.from(new Set(results.reduce(
      (acc, result) => acc.concat(result.courses),
      ['any courses']
    )));

  const computeRatingFilters = (results) => {
    let ratings = results.map(res => Number(res.ratings));
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

  const ratingFilters = useMemo(() => computeRatingFilters(results), [results]);

  const filterState = {
    courseCodes,
    numRatings,
    currentTerm,
    nextTerm,
    courseTaught
  }

  const resetFilters = () => {
    setCourseCodes(Array(NUM_COURSE_CODES).fill(true));
    setNumRatings(0);
    setCurrentTerm(false);
    setNextTerm(false);
    setCourseTaught(0);
  }

  return (
    <ExplorePageWrapper>
      <ExploreHeaderWrapper>
        <ExploreHeaderText>
          Showing {results.length} results for "{query}"
        </ExploreHeaderText>
      </ExploreHeaderWrapper>
      <ColumnWrapper>
        <Column1>
          <SearchResults
            filterState={filterState}
            results={results}
            courseSearch={courseSearch}
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
            setNumRatings={setNumRatings}
            setCurrentTerm={setCurrentTerm}
            setNextTerm={setNextTerm}
            setCourseTaught={setCourseTaught}
            resetFilters={resetFilters}
            ratingFilters={ratingFilters}
            courseSearch={courseSearch}
          />
        </Column2>
      </ColumnWrapper>
    </ExplorePageWrapper>
  );
  */
 return null;
}

const ExplorePage = ({ location }) => {
  const { searchWorker } = useSearchContext();
  const [courses, setCourses] = useState([]);
  const [profs, setProfs] = useState([]);

  useEffect(() => {
    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'code_search' || type === 'search') {
        const { courseResults, profResults } = event.data.results;
        setCourses(courseResults);
        setProfs(profResults);
      }
    });
  }, [searchWorker]);


  const { q: query, t: type, c: code } =   queryString.parse(location.search);
  const courseTab = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;

  searchWorker.postMessage({ type: codeSearch ? 'code_search' : 'search', query });

  const terms = [
    {
      id: '1195',
      text: 'This Term (Spring 2019)'
    },
    {
      id: '1199',
      text: 'Next Term (Fall 2019)'
    }
  ]

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        code={code}
        terms={terms}
        courseTab={courseTab}
        courses={courses}
        profs={profs}
      />
    </ExplorePageWrapper>
  )
};

export default withRouter(ExplorePage);
