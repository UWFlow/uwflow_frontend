import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { SEO_DESCRIPTIONS } from 'constants/Messages';
import { MAX_SEARCH_TERMS } from 'constants/Search';
import {
  EXPLORE_ALL_QUERY,
  EXPLORE_QUERY,
} from 'graphql/queries/explore/Explore';

import {
  Column1,
  Column2,
  ColumnWrapper,
  ExploreHeaderText,
  ExploreHeaderWrapper,
  ExplorePageWrapper,
} from './styles/ExplorePage';
import SearchFilter from './SearchFilter';
import SearchResults from './SearchResults';

const NUM_COURSE_CODE_FILTERS = 5;
const RATING_FILTERS = [0, 1, 5, 10, 20, 50, 75, 100, 200, 500];

const ExplorePageContent = ({
  query,
  codeSearch,
  courseTab,
  data,
  error,
  loading,
}) => {
  const [profCourses, setProfCourses] = useState(['all courses']);
  const [courseCodes, setCourseCodes] = useState(
    Array(NUM_COURSE_CODE_FILTERS).fill(true),
  );
  const [numCourseRatings, setNumCourseRatings] = useState(0);
  const [numProfRatings, setNumProfRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);

  const exploreAll = query === '';

  useEffect(() => {
    if (!data) {
      return;
    }

    const seenCourses = new Set();
    const allProfCourses = data[
      exploreAll ? 'prof_search_index' : 'search_profs'
    ]
      .reduce((acc, result) => {
        return acc.concat(
          result.course_codes
            .filter((code) => !seenCourses.has(code))
            .map((code) => {
              seenCourses.add(code);
              return code;
            }),
        );
      }, [])
      .sort((a, b) => a.localeCompare(b));

    setProfCourses(['all courses'].concat(allProfCourses));
  }, [data, exploreAll]);

  const filterState = {
    courseCodes,
    numCourseRatings,
    numProfRatings,
    currentTerm,
    nextTerm,
    courseTaught,
  };

  const resetCourseFilters = () => {
    setCourseCodes(Array(NUM_COURSE_CODE_FILTERS).fill(true));
    setNumCourseRatings(0);
    setCurrentTerm(false);
    setNextTerm(false);
  };

  const resetProfFilters = () => {
    setNumProfRatings(0);
    setCourseTaught(0);
  };

  return (
    <ExplorePageWrapper>
      <ExploreHeaderWrapper>
        <ExploreHeaderText>
          {codeSearch
            ? `Showing all ${query.toUpperCase()} courses and professors`
            : exploreAll
            ? `Showing all courses and professors`
            : `Showing results for "${query}"`}
        </ExploreHeaderText>
      </ExploreHeaderWrapper>
      <ColumnWrapper>
        <Column1>
          <SearchResults
            filterState={filterState}
            data={data}
            error={error}
            exploreTab={exploreTab}
            setExploreTab={setExploreTab}
            ratingFilters={RATING_FILTERS}
            profCourses={profCourses}
            loading={loading}
            exploreAll={exploreAll}
          />
        </Column1>
        <Column2>
          <SearchFilter
            profCourses={profCourses}
            filterState={filterState}
            setCourseCodes={setCourseCodes}
            setNumRatings={
              exploreTab === 0 ? setNumCourseRatings : setNumProfRatings
            }
            setCurrentTerm={setCurrentTerm}
            setNextTerm={setNextTerm}
            setCourseTaught={setCourseTaught}
            ratingFilters={RATING_FILTERS}
            resetFilters={
              exploreTab === 0 ? resetCourseFilters : resetProfFilters
            }
            courseSearch={exploreTab === 0}
          />
        </Column2>
      </ColumnWrapper>
    </ExplorePageWrapper>
  );
};

const processRawQuery = (query = '', codeOnly = false) => {
  if (query === '') {
    return '';
  }

  const queryTerms = query
    .toLowerCase()
    .replace('-', ' ')
    // remove all special characters for postgres ts_query
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '')
    .split(' ')
    .map((term) => term.trim())
    .filter((term) => term.length > 0)
    .slice(0, MAX_SEARCH_TERMS);

  return codeOnly ? query : queryTerms.map((term) => `${term}:*`).join(' & ');
};

const ExplorePage = () => {
  const location = useLocation();

  const { q: query, t: type, c: code } = queryString.parse(location.search);
  const courseTab = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;

  const processedQueryText = processRawQuery(query, codeSearch);
  const queryVariables =
    processedQueryText === ''
      ? {}
      : {
          query: processedQueryText,
          code_only: codeSearch,
        };

  const { data, error, loading } = useQuery(
    processedQueryText === '' ? EXPLORE_ALL_QUERY : EXPLORE_QUERY,
    {
      variables: queryVariables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: !query || query === '' ? 'no-cache' : 'cache-and-network',
    },
  );

  return (
    <ExplorePageWrapper>
      <Helmet>
        <title>Explore Courses - UW Flow</title>
        <meta name="description" content={SEO_DESCRIPTIONS.explore} />
        <meta property="og:title" content="Explore Courses - UW Flow" />
        <meta property="og:description" content={SEO_DESCRIPTIONS.explore} />
      </Helmet>
      <ExplorePageContent
        query={query || ''}
        codeSearch={codeSearch || false}
        courseTab={courseTab}
        data={data}
        error={!!error}
        loading={loading}
      />
    </ExplorePageWrapper>
  );
};

export default ExplorePage;
