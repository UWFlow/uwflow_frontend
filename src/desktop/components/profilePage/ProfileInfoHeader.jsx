import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileInfoHeaderWrapper,
  ProfileInfoSection,
  UserPictureWrapper,
  UserPicture,
  UserName,
  UserProgram
} from './styles/ProfileInfoHeader';

const ProfileInfoHeader = ({ profile }) => {
  return (
    <ProfileInfoHeaderWrapper>
      <UserPictureWrapper>
        <UserPicture src={profile.picture_url} />
      </UserPictureWrapper>
      <ProfileInfoSection>
        <UserName>{profile.name}</UserName>
        <UserProgram>{profile.program}</UserProgram>
      </ProfileInfoSection>
    </ProfileInfoHeaderWrapper>
  );
};

ProfileInfoHeader.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileInfoHeader;
