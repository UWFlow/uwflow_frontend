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
  getUserName,
  getUserID,
  getUserPicture,
  getUserProgram,
  getUserProgramID,
  getUserTerm,
} from '../../../data/reducers/UserReducer';

const mapStateToProps = state => ({
  name: getUserName(state),
  id: getUserID(state),
  picture: getUserPicture(state),
  program: getUserProgram(state),
  programID: getUserProgramID(state),
  term: getUserTerm(state),
});

const UserInfoBox = ({ name, id, picture, program, programID, term }) => {
  return (
    <UserInfoBoxWrapper>
      <UserPicture />
      <UserInfo>
        <UserName>{name}</UserName>
        <UserProgram>
          {term} {program} student
        </UserProgram>
      </UserInfo>
    </UserInfoBoxWrapper>
  );
};

export default connect(mapStateToProps)(UserInfoBox);
