import styled from 'styled-components';

import { Heading2 , PageContent} from '../../../../constants/Mixins';

export const NotFoundPageWrapper = styled.div`
  min-height: 100%;
  padding: 200px 0;
  margin: auto;
  ${PageContent}
`;

export const NotFoundText = styled.div`
  ${Heading2}
  margin-bottom: 40px;
`;