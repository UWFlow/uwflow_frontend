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
import { Nullable, SearchFilterState } from 'types/Common';

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

export const NUM_COURSE_CODE_FILTERS = 5;

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
      hasRoomAvailable: Boolean(pq.hasRoomAvailable) || false,
      hasOnlineSection: Boolean(pq.hasOnlineCourse) || false,
    };
  };

  const [filterState, setFilterState] = useState<SearchFilterState>(
    getDefaultFilterState(
      queryString.parse(location.search, {
        arrayFormat: 'comma',
      }),
    ),
  );
  const [profCourses, setProfCourses] = useState<string[]>(['all courses']);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);
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

  const mapFilterStateToURL = (
    sf: SearchFilterState,
  ): Nullable<SearchFilterState> => {
    return {
      courseCodes: sf.courseCodes.some((code) => !code) ? sf.courseCodes : [],
      numCourseRatings: sf.numCourseRatings !== 0 ? sf.numCourseRatings : null,
      numProfRatings: sf.numProfRatings !== 0 ? sf.numProfRatings : null,
      currentTerm: sf.currentTerm ? sf.currentTerm : null,
      nextTerm: sf.nextTerm ? sf.nextTerm : null,
      courseTaught: sf.courseTaught !== 0 ? sf.courseTaught : null,
      hasRoomAvailable: sf.hasRoomAvailable ? sf.hasRoomAvailable : null,
      hasOnlineSection: sf.hasOnlineSection ? sf.hasOnlineSection : null,
    };
  };

  useEffect(() => {
    const filterStateURL: Nullable<SearchFilterState> = mapFilterStateToURL(
      filterState,
    );

    // Add a comma to the end of the URL if there is only one filter, otherwise query-string can't parse single-element arrays
    const addComma = filterStateURL.courseCodes?.length === 1 ? ',' : '';

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
  }, [filterState]);

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
            profCourses={profCourses}
            loading={loading}
            exploreAll={exploreAll}
          />
        </Column1>
        <Column2>
          <SearchFilter
            profCourses={profCourses}
            filterState={filterState}
            setFilterState={setFilterState}
            resetFilters={() =>
              setFilterState(getDefaultFilterState(queryString.parse('')))
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
