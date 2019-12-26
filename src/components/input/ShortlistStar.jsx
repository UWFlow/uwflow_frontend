import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

/* Styled Components */
import {
  ShortlistStarWrapper,
  ShortlistStarButton,
} from './styles/ShortlistStar';

/* Child Components */
import Tooltip from '../display/Tooltip';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import {
  DELETE_USER_SHORTLIST,
  INSERT_USER_SHORTLIST,
} from '../../graphql/mutations/Shortlist';
import { REFETCH_COURSE_SHORTLIST } from '../../graphql/queries/course/Course';
import { REFETCH_USER_SHORTLIST } from '../../graphql/queries/user/User';

import { splitCourseCode } from '../../utils/Misc';
import { SHORTLIST_ERROR } from '../../constants/Messages';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ShortlistStar = ({
  theme,
  courseID,
  courseCode,
  isLoggedIn,
  initialState = false,
  size = 32,
}) => {
  const userID = localStorage.getItem('user_id');
  const refetchQueries = [
    {
      query: REFETCH_COURSE_SHORTLIST,
      variables: { user_id: userID, course_id: courseID },
    },
    { query: REFETCH_USER_SHORTLIST, variables: { id: userID } },
  ];

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(initialState);
  const [insertShortlist] = useMutation(INSERT_USER_SHORTLIST, {
    refetchQueries,
  });
  const [deleteShortlist] = useMutation(DELETE_USER_SHORTLIST, {
    refetchQueries,
  });

  const notifyDelete = () =>
    toast(`Removed ${splitCourseCode(courseCode)} from shortlist`);
  const notifyInsert = () =>
    toast(`Added ${splitCourseCode(courseCode)} to shortlist`);

  const onStarClicked = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    }

    if (!courseID) {
      return;
    }

    if (checked) {
      deleteShortlist({ variables: { course_id: courseID } })
        .then(() => notifyDelete())
        .catch(() => {
          toast(SHORTLIST_ERROR);
        });
    } else {
      insertShortlist({
        variables: { user_id: userID, course_id: courseID },
      })
        .then(() => notifyInsert())
        .catch(() => {
          toast(SHORTLIST_ERROR);
        });
    }
    setChecked(!checked);
  };

  return (
    <>
      <Tooltip />
      <ShortlistStarButton>
        <ShortlistStarWrapper
          data-tip={`Add ${splitCourseCode(courseCode)} to your shortlist`}
          onClick={onStarClicked}
          checked={checked}
          width={size}
          color={checked ? theme.dark3 : theme.light4}
          strokeWidth={2}
        />
      </ShortlistStarButton>
    </>
  );
};

export default withTheme(connect(mapStateToProps)(ShortlistStar));
