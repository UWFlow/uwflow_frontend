import React, { useState, useMemo } from 'react';
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

const ExplorePageContent = ({
  query,
  terms,
  courseSearch,
  results
}) => {
  const [courseCodes, setCourseCodes] = useState(Array(5).fill(true));
  const [numRatings, setNumRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);

  const profCourses = courseSearch
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
    setCourseCodes(Array(5).fill(true));
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
}

const ExplorePage = ({ location }) => {
  const { q: query, t } =   queryString.parse(location.search);
  const courseSearch = !t || t === 'course' || t === 'c';

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

  // TODO fetch actual data
  const results = useMemo(() => courseSearch ? [
    {
      code: 'ECE 105',
      name: 'Electricity and Magnetism',
      ratings: 1295,
      useful: '22%',
      easy: '5%',
      liked: '15%',
      offered: ['1199']
    },
    {
      code: 'MATH 239',
      name: 'Introduction to Combinatorics',
      ratings: 568,
      useful: '89%',
      easy: '32%',
      liked: '65%',
      offered: ['1195', '1199']
    }
  ] : [
    {
      name: 'Firas Mansour',
      ratings: 125,
      clear: '22%',
      engaging: '5%',
      liked: '15%',
      courses: ['ECE 105']
    },
    {
      name: 'Karen Yeats',
      ratings: 249,
      clear: '89%',
      engaging: '32%',
      liked: '65%',
      courses: ['MATH 239']
    }
  ], [courseSearch]);

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        terms={terms}
        courseSearch={courseSearch}
        results={results}
      />
    </ExplorePageWrapper>
  )
};

export default withRouter(ExplorePage);
