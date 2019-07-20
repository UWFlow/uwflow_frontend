import React from 'react';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText
} from './styles/ProfileCalendar';

const ProfileCalendar = () => {
  return (
    <ProfileCalendarWrapper>
      <ProfileCalendarHeading>Import your class schedule</ProfileCalendarHeading>
      <ProfileCalendarText>
        To print, share, or export it to Google Calendar, Calendar.app, etc... It looks like:
      </ProfileCalendarText>
    </ProfileCalendarWrapper>
  );
};

export default ProfileCalendar;
