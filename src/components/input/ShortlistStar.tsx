import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import Tooltip from 'components/display/Tooltip';
import withModal from 'components/modal/withModal';
import { SHORTLIST_ERROR } from 'constants/Messages';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import {
  DELETE_USER_SHORTLIST,
  INSERT_USER_SHORTLIST,
} from 'graphql/mutations/Shortlist';
import { REFETCH_COURSE_SHORTLIST } from 'graphql/queries/course/Course';
import { REFETCH_USER_SHORTLIST } from 'graphql/queries/user/User';
import { getUserId } from 'utils/Auth';
import { formatCourseCode } from 'utils/Misc';

import {
  ShortlistStarButton,
  ShortlistStarWrapper,
} from './styles/ShortlistStar';

type ShortlistStarProps = {
  courseID: number;
  courseCode: string;
  openModal: any;
  initialState?: boolean;
  size?: number;
};

const ShortlistStar = ({
  courseID,
  courseCode,
  initialState = false,
  size = 32,
  openModal,
}: ShortlistStarProps) => {
  const theme = useTheme();
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
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
        onMouseDown={(e) => e.preventDefault()}
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

export default withModal(ShortlistStar);
