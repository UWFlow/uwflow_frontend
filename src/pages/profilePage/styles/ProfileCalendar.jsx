import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Body, Heading2 } from '../../../constants/Mixins';

export const ProfileCalendarWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  margin-bottom: 32px;

  ${breakpoint('mobile', 'tablet')`
    padding: 24px 16px;
  `}
`;

export const ProfileCalendarHeading = styled.div`
  ${Heading2}
  font-size: 32px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.dark1};
`;

export const ProfileCalendarText = styled.div`
  ${Body}
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.dark2};
`;
