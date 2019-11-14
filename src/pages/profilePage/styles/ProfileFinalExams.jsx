import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Heading3 } from '../../../constants/Mixins';

export const ProfileFinalExamsWrapper = styled.div`
  ${Card('0 0 12px 0')}
  ${BoxShadow}
  margin-bottom: 16px;
`;

export const ProfileFinalExamsHeader = styled.div`
  padding: 24px 32px 16px 32px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};

  ${breakpoint('mobile', 'tablet')`
    padding: 16px;
  `}
`;

export const ProfileFinalExamsContent = styled.div`
  overflow-x: auto;
`;