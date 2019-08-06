import React, { useMemo } from 'react';
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

const ExplorePageContent = ({ query, type, results }) => {
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

  return (
    <ExplorePageWrapper>
      <ExploreHeaderWrapper>
        <ExploreHeaderText>
          Showing {results.length} results for "{query}"
        </ExploreHeaderText>
      </ExploreHeaderWrapper>
      <ColumnWrapper>
        <Column1>
          <SearchResults results={results} type={type} />
        </Column1>
        <Column2>
          <SearchFilter
            ratingFilters={ratingFilters}
            type={type}
          />
        </Column2>
      </ColumnWrapper>
    </ExplorePageWrapper>
  );
}

const ExplorePage = ({ location }) => {
  const { q: query, t } =   queryString.parse(location.search);
  const results = [{ratings: 0}, {ratings: 2}, {ratings: 5}, {ratings: 10}]
  
  const type = t || 'course';

  return (
    <ExplorePageWrapper>
      <ExplorePageContent
        query={query}
        type={type}
        results={results}
      />
    </ExplorePageWrapper>
  )
};

export default withRouter(ExplorePage);
