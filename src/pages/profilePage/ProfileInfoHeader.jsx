import React from 'react';
import PropTypes from 'prop-types';
import { Edit } from 'react-feather';

/* Styled Components */
import {
  ProfileInfoHeaderWrapper,
  ProfileInfoSection,
  UserInfoWrapper,
  UserPicture,
  UserName,
  UserProgram,
  UserEmailWrapper,
  UserEmailText,
  UserEmail,
  EditWrapper,
} from './styles/ProfileInfoHeader';

const ProfileInfoHeader = ({ user }) => {
  return (
    <ProfileInfoHeaderWrapper>
      <ProfileInfoSection>
        <UserPicture id={user.id} />
        <UserInfoWrapper>
          <UserName>{user.full_name}</UserName>
          <UserProgram>{user.program}</UserProgram>
          <UserEmailWrapper>
            <UserEmailText>Send notifications to:</UserEmailText>
            <UserEmail>{user.email}</UserEmail>
            <EditWrapper>
              <Edit size={16} />
            </EditWrapper>
          </UserEmailWrapper>
        </UserInfoWrapper>
      </ProfileInfoSection>
    </ProfileInfoHeaderWrapper>
  );
};

ProfileInfoHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfoHeader;
