import React from 'react';
import styled from 'styled-components';

import LoadingSpinner from 'components/display/LoadingSpinner';

const PageLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
`;

// Full-page fallback shown while a route's lazy JS chunk is being fetched.
const PageLoading = () => (
  <PageLoadingWrapper>
    <LoadingSpinner />
  </PageLoadingWrapper>
);

export default PageLoading;
