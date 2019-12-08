import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Card, BoxShadow, Body } from '../../../constants/Mixins';

export const ProfileCalendarWrapper = styled.div`
  ${Card()}
  ${BoxShadow}
  margin-bottom: 64px;

  ${breakpoint('mobile', 'tablet')`
    padding: 24px 16px;
  `}
`;

export const ProfileCalendarHeading = styled.div`
  font-family: 'Anderson Grotesk';
  font-size: 32px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.dark1};
`;

export const ProfileCalendarText = styled.div`
  font-family: Inter;
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
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

export const EventCourseSectionWrapper = styled.span`
  display: block;
  margin-top: 4px;
`;

export const CourseText = styled.span`
  font-weight: 600;
  
`;

export const SectionText = styled.span`
  
`;

export const LocationText = styled.span`
  margin-top: 4px;
`;
