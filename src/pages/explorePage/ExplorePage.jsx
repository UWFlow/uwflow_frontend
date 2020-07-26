import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';

/* Styled Components */
import {
  ExplorePageWrapper,
  ExploreHeaderWrapper,
  ExploreHeaderText,
  ColumnWrapper,
  Column1,
  Column2,
} from './styles/ExplorePage';

/* Child Components */
import SearchResults from './SearchResults';
import SearchFilter from './SearchFilter';

/* GraphQL */
import { buildExploreQuery } from '../../graphql/queries/explore/Explore';

/* Constants */
import { SEO_DESCRIPTIONS } from '../../constants/Messages';

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

const ExplorePage = ({ location }) => {
  const { q: query, t: type, c: code } = queryString.parse(location.search);
  const courseTab = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;

  const { data, error, loading } = useQuery(
    buildExploreQuery(query, codeSearch),
    {
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

export default withRouter(ExplorePage);
