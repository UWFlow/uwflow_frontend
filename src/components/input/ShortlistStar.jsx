import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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

/* GraphQL */
import {
  DELETE_USER_SHORTLIST,
  INSERT_USER_SHORTLIST,
} from '../../graphql/mutations/Shortlist';
import { REFETCH_COURSE_SHORTLIST } from '../../graphql/queries/course/Course';
import { REFETCH_USER_SHORTLIST } from '../../graphql/queries/user/User';

/* Utils */
import { formatCourseCode } from '../../utils/Misc';
import withModal from '../modal/withModal';
import { getUserId } from '../../utils/Auth';

/* Constants */
import { SHORTLIST_ERROR } from '../../constants/Messages';
import { AUTH_MODAL } from '../../constants/Modal';

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
  openModal,
}) => {
  const userID = getUserId();
  const refetchQueries = [
    {
      query: REFETCH_COURSE_SHORTLIST,
      variables: { code: courseCode, user_id: userID },
    },
    { query: REFETCH_USER_SHORTLIST, variables: { id: userID } },
  ];

  const [checked, setChecked] = useState(initialState);
  const [insertShortlist] = useMutation(INSERT_USER_SHORTLIST, {
    refetchQueries,
  });
  const [deleteShortlist] = useMutation(DELETE_USER_SHORTLIST, {
    refetchQueries,
  });

  useEffect(() => setChecked(initialState), [initialState]);

  const notifyDelete = () =>
    toast(`Removed ${formatCourseCode(courseCode)} from favourites`);
  const notifyInsert = () =>
    toast(`Added ${formatCourseCode(courseCode)} to favourites`);

  const onStarClicked = () => {
    if (!isLoggedIn) {
      openModal(AUTH_MODAL);
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
    <Tooltip content={`Add ${formatCourseCode(courseCode)} to your favourites`}>
      <ShortlistStarButton
        onClick={onStarClicked}
        data-for={`${courseID}`}
        data-offset="{'top': 70}"
        onMouseDown={e => e.preventDefault()}
      >
        <ShortlistStarWrapper
          checked={checked}
          width={size}
          color={checked ? theme.dark3 : theme.light4}
          strokeWidth={2}
        />
      </ShortlistStarButton>
    </Tooltip>
  );
};

export default withModal(withTheme(connect(mapStateToProps)(ShortlistStar)));
