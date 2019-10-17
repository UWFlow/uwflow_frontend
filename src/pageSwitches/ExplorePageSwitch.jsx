import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo';
import queryString from 'query-string';

/* Selectors */
import { getIsBrowserDesktop } from '../data/reducers/BrowserReducer';

/* Child Components */
import DesktopExplorePage from '../desktop/components/explorePage/ExplorePage';
import MobileExplorePage from '../mobile/components/explorePage/ExplorePage';

import {
  buildExploreCodeQuery,
  buildExploreQuery
} from '../graphql/queries/explore/Explore';

const mapStateToProps = state => ({
  isDesktopPage: getIsBrowserDesktop(state),
});

export const ExplorePageSwitch = ({ isDesktopPage, location }) => {
  const { q: query, t: type, c: code } = queryString.parse(location.search);
  const courseTab = !type || type === 'course' || type === 'c';
  const codeSearch = !!code;

  const exploreQuery = codeSearch ? buildExploreCodeQuery : buildExploreQuery;

  const { data, fetchMore, loading } = useQuery(
    exploreQuery('{course_reviews_aggregate: {count: desc}}', query),
    {variables: { course_offset: 0, prof_offset: 0 }}
  );

  return isDesktopPage ? (
    <DesktopExplorePage
      query={query}
      codeSearch={codeSearch}
      courseTab={courseTab}
      data={data}
      fetchMore={fetchMore}
      loading={loading}
    />
  ) : (
    <MobileExplorePage
      query={query}
      codeSearch={codeSearch}
      courseTab={courseTab}
      data={data}
      fetchMore={fetchMore}
      loading={loading}
    />
  );
};

ExplorePageSwitch.propTypes = {
  isDesktopPage: PropTypes.bool,
};

export default compose(connect(mapStateToProps), withRouter)(ExplorePageSwitch);
