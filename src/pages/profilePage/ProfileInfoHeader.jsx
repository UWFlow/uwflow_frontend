import React, { useState } from 'react';
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
import EditEmailModal from '../../components/emailInputModals/EditEmailModal';

const ProfileInfoHeader = ({ user }) => {
  const [editEmailModalOpen, setEditEmailModalOpen] = useState(false);
  return (
    <>
      <ProfileInfoHeaderWrapper>
        <ProfileInfoSection>
          <UserPicture id={user.id} />
          <UserInfoWrapper>
            <UserName>{user.full_name}</UserName>
            <UserProgram>{user.program}</UserProgram>
            <UserEmailWrapper>
              <UserEmailText>Send notifications to</UserEmailText>
              <UserEmail onClick={() => setEditEmailModalOpen(true)}>
                {user.email}
              </UserEmail>
              <EditWrapper onClick={() => setEditEmailModalOpen(true)}>
                <Edit size={16} />
              </EditWrapper>
            </UserEmailWrapper>
          </UserInfoWrapper>
        </ProfileInfoSection>
      </ProfileInfoHeaderWrapper>
      <EditEmailModal
        email={user.email}
        isOpen={editEmailModalOpen}
        onClose={() => setEditEmailModalOpen(false)}
      />
    </>
  );
};

ProfileInfoHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfoHeader;
