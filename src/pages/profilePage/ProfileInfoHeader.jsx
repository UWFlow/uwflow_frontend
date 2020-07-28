import React from 'react';
import { Edit } from 'react-feather';
import PropTypes from 'prop-types';

import { EDIT_EMAIL_MODAL } from 'constants/Modal';
import useModal from 'hooks/useModal';
import { getKittenFromID } from 'utils/Kitten';

import {
  EditWrapper,
  ProfileInfoHeaderWrapper,
  ProfileInfoSection,
  UserEmail,
  UserEmailText,
  UserEmailWrapper,
  UserInfoWrapper,
  UserName,
  UserPicture,
  UserProgram,
} from './styles/ProfileInfoHeader';

const ProfileInfoHeader = ({ user }) => {
  const [openModal] = useModal();

  return (
    <ProfileInfoHeaderWrapper>
      <ProfileInfoSection>
        <UserPicture
          image={user.picture_url ? user.picture_url : getKittenFromID(user.id)}
        />
        <UserInfoWrapper>
          <UserName>{user.full_name}</UserName>
          <UserProgram>{user.program}</UserProgram>
          <UserEmailWrapper>
            <UserEmailText>Send notifications to</UserEmailText>
            <UserEmail
              onClick={() => openModal(EDIT_EMAIL_MODAL, { email: user.email })}
            >
              {user.email}
              <EditWrapper>
                <Edit size={16} />
              </EditWrapper>
            </UserEmail>
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
