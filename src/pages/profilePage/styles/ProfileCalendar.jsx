import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link as RouterLink } from 'react-router-dom';
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
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.dark2};
`;

export const ProfileCalendarImg = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  width: 100%;
  height: 500px;
  background-color: ${({ theme }) => theme.dark3};
  border-radius: 3px;
`;

export const ProfileCalendarEventWrapper = styled.div`
  ${Body}
  font-size: 13px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

export const EventCourseSectionWrapper = styled.span`
  display: block;
  margin-top: 4px;
`;

export const CourseText = styled(RouterLink).attrs({
  target: '_blank'
})`
  font-weight: 600;
  color: white;
`;

export const SectionText = styled.span`
  
`;

export const LocationText = styled.span`
  margin-top: 4px;
`;
