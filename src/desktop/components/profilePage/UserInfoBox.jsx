import React from 'react';

/* Styled Components */
import {
  UserInfoBoxWrapper,
  UserPicture,
  UserInfo,
  UserName,
  UserProgram,
} from './styles/UserInfoBox';

const UserInfoBox = ({
  firstName,
  lastName,
  id,
  picture,
  program,
  programID,
  term,
}) => {
  return (
    <UserInfoBoxWrapper>
      <UserPicture />
      <UserInfo>
        <UserName>
          {firstName} {lastName}
        </UserName>
        <UserProgram>
          {term} {program}
        </UserProgram>
      </UserInfo>
    </UserInfoBoxWrapper>
  );
};

export default UserInfoBox;
