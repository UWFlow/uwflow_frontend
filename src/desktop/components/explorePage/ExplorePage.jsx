import React from 'react';
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
          <SearchFilter type={type} />
        </Column2>
      </ColumnWrapper>
    </ExplorePageWrapper>
  );
}

const ExplorePage = ({ location }) => {
  const { q: query, t } =   queryString.parse(location.search);
  const results = []
  
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
