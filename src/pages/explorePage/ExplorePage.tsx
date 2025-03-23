import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import {
  ExploreAllQuery,
  ExploreAllQueryVariables,
  ExploreQuery,
  ExploreQueryVariables,
} from 'generated/graphql';
import queryString, { ParsedQuery } from 'query-string';

import { SEO_DESCRIPTIONS } from 'constants/Messages';
import { MAX_SEARCH_TERMS } from 'constants/Search';
import {
  EXPLORE_ALL_QUERY,
  EXPLORE_QUERY,
} from 'graphql/queries/explore/Explore';
import { SearchFilterState, SearchFilterStateURL } from 'types/Common';

import { EXPLORE_PAGE_ROUTE } from '../../Routes';

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

type ExplorePageContentProps = {
  query: string;
  codeSearch: boolean;
  courseTab: boolean;
  error: boolean;
  loading: boolean;
  data?: ExploreAllQuery | ExploreQuery;
};

const ExplorePageContent = ({
  query,
  codeSearch,
  courseTab,
  data,
  error,
  loading,
}: ExplorePageContentProps) => {
  const location = useLocation();
  const getDefaultFilterState = (pq: ParsedQuery): SearchFilterState => {
    const courseCodes = Array(NUM_COURSE_CODE_FILTERS).fill(true);
    if (pq.exclude && pq.exclude instanceof Array) {
      pq.exclude.forEach((index) => {
        courseCodes[parseInt(index, 10)] = false;
      });
    }
    return {
      courseCodes,
      numCourseRatings: parseInt(pq.minCourseRatings as string, 10) || 0,
      numProfRatings: parseInt(pq.minProfRatings as string, 10) || 0,
      currentTerm: Boolean(pq.currentTerm) || false,
      nextTerm: Boolean(pq.nextTerm) || false,
      courseTaught: parseInt(pq.courseTaught as string, 10) || 0,
      hasPrereqs: pq.noPrereqs ? !pq.noPrereqs : true,
      hasRoomAvailable: Boolean(pq.hasRoomAvailable) || false,
    };
  };

  const defaultFilterState = getDefaultFilterState(
    queryString.parse(location.search, {
      arrayFormat: 'comma',
    }),
  );

  const [profCourses, setProfCourses] = useState<string[]>(['all courses']);
  const [courseCodes, setCourseCodes] = useState<boolean[]>(
    defaultFilterState.courseCodes,
  );
  const [numCourseRatings, setNumCourseRatings] = useState(
    defaultFilterState.numCourseRatings,
  );
  const [numProfRatings, setNumProfRatings] = useState(
    defaultFilterState.numProfRatings,
  );
  const [currentTerm, setCurrentTerm] = useState(
    defaultFilterState.currentTerm,
  );
  const [nextTerm, setNextTerm] = useState(defaultFilterState.nextTerm);
  const [courseTaught, setCourseTaught] = useState(
    defaultFilterState.courseTaught,
  );
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);
  const [hasPrereqs, setHasPrereqs] = useState(defaultFilterState.hasPrereqs);
  const [hasRoomAvailable, setHasRoomAvailable] = useState(
    defaultFilterState.hasRoomAvailable,
  );
  const exploreAll = query === '';

  useEffect(() => {
    if (data === undefined) {
      return;
    }

    const allProfs = exploreAll
      ? (data as ExploreAllQuery).prof_search_index
      : (data as ExploreQuery).search_profs;

    const seenCourses = new Set();
    const parsedProfCourses = allProfs
      .reduce((acc: string[], result) => {
        return acc.concat(
          result.course_codes
            .filter((code: string) => !seenCourses.has(code))
            .map((code: string) => {
              seenCourses.add(code);
              return code;
            }),
        );
      }, [])
      .sort((a, b) => a.localeCompare(b));

    setProfCourses(['all courses'].concat(parsedProfCourses));
  }, [data, exploreAll]);

  const filterState: SearchFilterState = {
    courseCodes,
    numCourseRatings,
    numProfRatings,
    currentTerm,
    nextTerm,
    courseTaught,
    hasPrereqs,
    hasRoomAvailable,
  };

  const mapFilterStateToURL = (fs: SearchFilterState): SearchFilterStateURL => {
    return {
      exclude: fs.courseCodes
        .map((bool, index) => (bool ? null : index))
        .filter((index) => index !== null),
      minCourseRatings: fs.numCourseRatings || null,
      minProfRatings: fs.numProfRatings || null,
      courseTaught: fs.courseTaught || null,
      currentTerm: fs.currentTerm || null,
      nextTerm: fs.nextTerm || null,
      noPrereqs: !fs.hasPrereqs || null,
      hasRoomAvailable: fs.hasRoomAvailable || null,
    };
  };

  useEffect(() => {
    const filterStateURL: SearchFilterStateURL = mapFilterStateToURL(
      filterState,
    );

    // Add a comma to the end of the URL if there is only one filter, otherwise query-string can't parse single-element arrays
    const addComma = filterStateURL.exclude.length === 1 ? ',' : '';

    window.history.replaceState(
      {},
      '',
      `${EXPLORE_PAGE_ROUTE}?${queryString.stringify(filterStateURL, {
        arrayFormat: 'comma',
        skipNull: true,
        sort: (a, b) => {
          if (a === 'exclude') return 1; // Always sort 'exclude' to the end
          if (b === 'exclude') return -1; // Always sort 'exclude' to the end
          return 0;
        },
      })}${addComma}`,
    );
  }, [
    filterState,
    courseCodes,
    numCourseRatings,
    currentTerm,
    nextTerm,
    courseTaught,
    hasPrereqs,
  ]);

  const resetCourseFilters = () => {
    setCourseCodes(Array(NUM_COURSE_CODE_FILTERS).fill(true));
    setNumCourseRatings(0);
    setCurrentTerm(false);
    setNextTerm(false);
    setHasPrereqs(true);
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
            setHasPrereqs={setHasPrereqs}
            setHasRoomAvailable={setHasRoomAvailable}
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
  const { q, t: type, c: code } = queryString.parse(location.search);

  const query: string = (q as string) || '';
  const courseTab: boolean = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;

  const processedQueryText = processRawQuery(query, codeSearch);
  const queryVariables =
    processedQueryText === ''
      ? {}
      : {
          query: processedQueryText,
          code_only: codeSearch,
        };

  const { data, error, loading } = useQuery<
    ExploreAllQuery | ExploreQuery,
    ExploreAllQueryVariables | ExploreQueryVariables
  >(processedQueryText === '' ? EXPLORE_ALL_QUERY : EXPLORE_QUERY, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: !query || query === '' ? 'no-cache' : 'cache-and-network',
  });

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
