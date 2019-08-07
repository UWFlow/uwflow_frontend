import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import {
  ExplorePageWrapper,
  ExploreHeaderWrapper,
  ExploreHeaderText,
  ColumnWrapper,
  Column1,
  Column2
} from './styles/ExplorePage';

import SearchResults from './SearchResults';
import SearchFilter from './SearchFilter';

const ExplorePageContent = ({ query, courseSearch, results }) => {
  const [numRatings, setNumRatings] = useState(0);
  const [currentTerm, setCurrentTerm] = useState(false);
  const [nextTerm, setNextTerm] = useState(false);
  const [courseTaught, setCourseTaught] = useState(0);

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
    numRatings,
    currentTerm,
    nextTerm,
    courseTaught
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
          <SearchResults results={results} courseSearch={courseSearch} />
        </Column1>
        <Column2>
          <SearchFilter
            filterState={filterState}
            setNumRatings={setNumRatings}
            setCurrentTerm={setCurrentTerm}
            setNextTerm={setNextTerm}
            setCourseTaught={setCourseTaught}
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
  const results = [{ratings: 0}, {ratings: 2}, {ratings: 5}, {ratings: 10}]
  
  const courseSearch = !t || t === 'course' || t === 'c';

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        courseSearch={courseSearch}
        results={results}
      />
    </ExplorePageWrapper>
  )
};

export default withRouter(ExplorePage);
