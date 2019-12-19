import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Heading3 } from '../../../constants/Mixins';

export const ProfileFinalExamsWrapper = styled.div`
  ${Card('0')}
  ${BoxShadow}
`;

export const ProfileFinalExamsHeader = styled.div`
  padding-left: 32px;
  padding-top: 32px;
  ${Heading3}
  color: ${({ theme }) => theme.dark1};

  ${breakpoint('mobile', 'tablet')`
    padding: 16px;
  `}
`;

export const ProfileFinalExamsContent = styled.div`
  padding: ${({ hasExams }) => (hasExams ? '32px 0' : '32px 0 0 0')};
  overflow-x: auto;
`;
