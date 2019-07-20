import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileInfoHeaderWrapper,
  ProfileInfoSection,
  UserInfoWrapper,
  UserPicture,
  UserName,
  UserProgram
} from './styles/ProfileInfoHeader';

const ProfileInfoHeader = ({ profile }) => {
  return (
    <ProfileInfoHeaderWrapper>
      <ProfileInfoSection>
        <UserPicture src={profile.picture_url} />
        <UserInfoWrapper>
          <UserName>{profile.name}</UserName>
          <UserProgram>{profile.program}</UserProgram>
        </UserInfoWrapper>
      </ProfileInfoSection>
    </ProfileInfoHeaderWrapper>
  );
};

ProfileInfoHeader.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileInfoHeader;
