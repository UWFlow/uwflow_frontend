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

/* Utils */
import { getKittenFromID } from '../../utils/Kitten';
import withModal from '../../components/modal/withModal';

/* Constants */
import { EDIT_EMAIL_MODAL } from '../../constants/Modal';

const ProfileInfoHeader = ({ user, openModal }) => (
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
          </UserEmail>
          <EditWrapper
            onClick={() => openModal(EDIT_EMAIL_MODAL, { email: user.email })}
          >
            <Edit size={16} />
          </EditWrapper>
        </UserEmailWrapper>
      </UserInfoWrapper>
    </ProfileInfoSection>
  </ProfileInfoHeaderWrapper>
);

ProfileInfoHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withModal(ProfileInfoHeader);
