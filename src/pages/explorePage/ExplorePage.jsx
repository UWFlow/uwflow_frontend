import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo';
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

import {
  buildExploreCodeQuery,
  buildExploreQuery,
} from '../../graphql/queries/explore/Explore';

const NUM_COURSE_CODE_FILTERS = 5;
const RATING_FILTERS = [0, 10, 20, 50, 100, 250, 500, 1000];

const ExplorePageContent = ({
  query,
  codeSearch,
  courseTab,
  data,
  loading,
}) => {
  const [profCourses, setProfCourses] = useState(['any course']);
  const [courseCodes, setCourseCodes] = useState(
    Array(NUM_COURSE_CODE_FILTERS).fill(true),
  );
  const [numCourseRatings, setNumCourseRatings] = useState(0);
  const [numProfRatings, setNumProfRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);
  const [exploreTab, setExploreTab] = useState(courseTab ? 0 : 1);

  useEffect(() => {
    if (!data) {
      return;
    }
    const newProfCourses = data.prof.reduce(
      (acc, prof) => {
        return acc.concat(
          prof.prof_courses
            .filter(course => !!course.code)
            .map(course => course.code),
        );
      },
      ['any course'],
    );
    setProfCourses(newProfCourses);
  }, [data]);

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
            : query === ''
            ? `Showing all courses and professors`
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
            ratingFilters={RATING_FILTERS}
            profCourses={profCourses}
            loading={loading}
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

  const exploreQuery = codeSearch ? buildExploreCodeQuery : buildExploreQuery;

  const { data, loading } = useQuery(exploreQuery(query), {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query || ''}
        codeSearch={codeSearch || false}
        courseTab={courseTab}
        data={data}
        loading={loading}
      />
    </ExplorePageWrapper>
  );
};

export default withRouter(ExplorePage);
