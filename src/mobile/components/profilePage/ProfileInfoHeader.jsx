import React from 'react';
import PropTypes from 'prop-types';

/* Styled Components */
import {
  ProfileInfoHeaderWrapper,
  ProfileInfoSection,
  UserPicture,
  UserName,
  UserProgram
} from './styles/ProfileInfoHeader';

const placeholderImage
  = 'https://wiki.ideashop.iit.edu/images/7/7e/Placeholder.jpeg';

const ProfileInfoHeader = ({ user }) => {
  return (
    <ProfileInfoHeaderWrapper>
      <ProfileInfoSection>
        <UserPicture src={user.picture_url || placeholderImage} />
        <UserName>{user.full_name}</UserName>
        <UserProgram>{user.program}</UserProgram>
      </ProfileInfoSection>
    </ProfileInfoHeaderWrapper>
  );
};

ProfileInfoHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfoHeader;
