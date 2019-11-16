import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import { ShortlistStarWrapper } from './styles/ShortlistStar';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* Mutations */
import { DELETE_USER_SHORTLIST, INSERT_USER_SHORTLIST } from '../../graphql/mutations/user/Shortlist';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ShortlistStar = ({ theme, courseID, isLoggedIn, initialState = false, size = 32 }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(initialState);
  const [insertShortlist] = useMutation(INSERT_USER_SHORTLIST);
  const [deleteShortlist] = useMutation(DELETE_USER_SHORTLIST);

  const onStarClicked = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
    } else {
      const userID = localStorage.getItem('user_id');
      const mutationVariables = { variables: { user_id: userID, course_id: courseID } };
      if (checked) {
        deleteShortlist(mutationVariables);
      } else {
        insertShortlist(mutationVariables);
      }
      setChecked(!checked);
    }
  }

  return (
    <ShortlistStarWrapper
      onClick={onStarClicked}
      checked={checked}
      width={size}
      color={checked ? theme.dark3 : theme.light4}
      strokeWidth={2}
    />
  );
};

ShortlistStar.propTypes = {
  theme: PropTypes.object.isRequired,
  courseID: PropTypes.number.isRequired,
  initialState: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

export default withTheme(connect(mapStateToProps)(ShortlistStar));
