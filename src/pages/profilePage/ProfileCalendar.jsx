import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

/* Child Components */
import Button from '../../components/input/Button';

/* Styled Components */
import {
  ProfileCalendarWrapper,
  ProfileCalendarHeading,
  ProfileCalendarText,
  ProfileCalendarImg,
} from './styles/ProfileCalendar';

const ProfileCalendar = ({ theme }) => {
  return (
    <ProfileCalendarWrapper>
      <ProfileCalendarHeading>
        Import your class schedule
      </ProfileCalendarHeading>
      <ProfileCalendarText>
        To print, share, or export it to Google Calendar, Calendar.app, etc...
        It looks like:
      </ProfileCalendarText>
      <ProfileCalendarImg>
        <Button
          onClick={() => {}}
          margin="auto"
          borderColor={theme.dark3}
          hasShadow={false}
        >
          Import your schedule from Quest
        </Button>
      </ProfileCalendarImg>
    </ProfileCalendarWrapper>
  );
};

ProfileCalendar.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ProfileCalendar);
