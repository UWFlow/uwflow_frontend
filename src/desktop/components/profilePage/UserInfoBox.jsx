import React from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import {
  UserInfoBoxWrapper,
  UserPicture,
  UserInfo,
  UserName,
  UserProgram,
} from './styles/UserInfoBox';

/* Selectors */
import {
  getUserFirstName,
  getUserLastName,
  getUserID,
  getUserPicture,
  getUserProgram,
  getUserProgramID,
  getUserTerm,
} from '../../../data/reducers/UserReducer';

const mapStateToProps = state => ({
  firstName: getUserFirstName(state),
  lastName: getUserLastName(state),
  id: getUserID(state),
  picture: getUserPicture(state),
  program: getUserProgram(state),
  programID: getUserProgramID(state),
  term: getUserTerm(state),
});

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

export default connect(mapStateToProps)(UserInfoBox);
