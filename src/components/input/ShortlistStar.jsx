import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import { ShortlistStarWrapper } from './styles/ShortlistStar';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import { DELETE_USER_SHORTLIST, INSERT_USER_SHORTLIST } from '../../graphql/mutations/user/Shortlist';
import { COURSE_SHORTLIST_REFETCH_QUERY } from '../../graphql/queries/course/Course';
import { USER_SHORTLIST_REFETCH_QUERY } from '../../graphql/queries/user/User';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ShortlistStar = ({ theme, courseID, isLoggedIn, initialState = false, size = 32 }) => {
  const userID = localStorage.getItem('user_id');
  const refetchQueries = [
    { query: COURSE_SHORTLIST_REFETCH_QUERY, variables: { user_id: userID, course_id: courseID } },
    { query: USER_SHORTLIST_REFETCH_QUERY, variables: { id: userID } },
  ];

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(initialState);
  const [insertShortlist] = useMutation(INSERT_USER_SHORTLIST, { refetchQueries });
  const [deleteShortlist] = useMutation(DELETE_USER_SHORTLIST, { refetchQueries });

  const onStarClicked = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    } 

    if (checked) {
      deleteShortlist({variables: { course_id: courseID }});
    } else {
      insertShortlist({ variables: { user_id: userID, course_id: courseID }});
    }
    setChecked(!checked);
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

export default withTheme(connect(mapStateToProps)(ShortlistStar));
