import React from 'react';
import { connect } from 'react-redux';

/* Styled Components */
import { UserNameBoxWrapper } from './styles/ProfilePage';

/* Selectors */
import {
  getUserName,
  getUserID,
  getUserProgram,
  getUserPicture,
} from '../../../data/reducers/UserReducer';

const mapStateToProps = state => ({
  userName: getUserName(state),
  userID: getUserID(state),
  userProgram: getUserProgram(state),
  userPicture: getUserPicture(state),
});

const UserNameBox = () => {
  return <UserNameBoxWrapper>User Name Box</UserNameBoxWrapper>;
};

export default connect(mapStateToProps)(UserNameBox);
