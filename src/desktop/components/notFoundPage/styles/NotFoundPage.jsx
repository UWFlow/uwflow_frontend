import styled from 'styled-components';

import { PAGE_CONTENT_WIDTH } from '../../../../constants/PageConstants';

import { Heading2 } from '../../../../constants/Mixins';

export const NotFoundPageWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 200px 0;
  margin: auto;
  max-width: ${PAGE_CONTENT_WIDTH}px;
`;

export const NotFoundText = styled.div`
  ${Heading2}
  margin-bottom: 40px;
`;