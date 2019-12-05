import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Bell } from 'react-feather';
import { useMutation } from 'react-apollo';

/* Styled Components */
import { NotificationBellWrapper } from './styles/ScheduleNotificationBell';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import { UPSERT_LIKED_REVIEW } from '../../graphql/mutations/Review';
import { REFETCH_RATINGS } from '../../graphql/queries/course/Course';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ScheduleNotificationBell = ({
  isLoggedIn,
  sectionID,
  initialState = false
}) => {
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [{
    query: REFETCH_RATINGS,
    variables: { section_id: sectionID, user_id: userID }
  }];

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(initialState);
  const [upsertLiked] = useMutation(UPSERT_LIKED_REVIEW, { refetchQueries });

  const toggleOnClick = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    }
    setSelected(!selected);

    if (!sectionID) {
      return;
    }
  }

  return (
    <NotificationBellWrapper
      selected={selected}
      onClick={toggleOnClick}
    >
      <Bell
        size={16}
        selected={selected}
        strokeWidth={3}
      />
    </NotificationBellWrapper>
  );
};

export default connect(mapStateToProps)(ScheduleNotificationBell);
