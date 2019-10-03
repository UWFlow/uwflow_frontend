import styled from 'styled-components';

import { Heading2 , PageContent} from '../../../../constants/Mixins';

export const NotFoundPageWrapper = styled.div`
  min-height: 100%;
  padding-top: 200px;
  margin: auto;
  ${PageContent}
`;

export const NotFoundText = styled.div`
  ${Heading2}
  margin-bottom: 40px;
`;