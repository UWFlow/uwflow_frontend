import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import {
  ExplorePageWrapper,
  ExploreHeaderWrapper,
  ExploreHeaderText
} from './styles/ExplorePage';

const ExplorePage = ({ location }) => {
  const { q: query, t: type } =   queryString.parse(location.search);
  const results = []

  return (
    <ExplorePageWrapper>
      <ExploreHeaderWrapper>
        <ExploreHeaderText>
          Showing {results.length} results for "{query}"
        </ExploreHeaderText>
      </ExploreHeaderWrapper>
    </ExplorePageWrapper>
  );
};

export default withRouter(ExplorePage);
