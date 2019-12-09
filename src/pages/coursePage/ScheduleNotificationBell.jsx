import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Bell } from 'react-feather';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

/* Styled Components */
import { NotificationBellWrapper } from './styles/ScheduleNotificationBell';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import {
  DELETE_SECTION_SUBSCRIPTION,
  INSERT_SECTION_SUBSCRIPTION
} from '../../graphql/mutations/SectionSubscription';
import { REFETCH_SECTION_SUBSCRIPTIONS } from '../../graphql/queries/course/Course';

import { splitCourseCode } from '../../utils/Misc';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ScheduleNotificationBell = ({
  isLoggedIn,
  sectionID,
  courseID,
  courseCode,
  initialState = false
}) => {
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [{
    query: REFETCH_SECTION_SUBSCRIPTIONS,
    variables: { course_id: courseID, user_id: userID }
  }];

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(initialState);
  const [insertSubscription] = useMutation(INSERT_SECTION_SUBSCRIPTION, { refetchQueries });
  const [deleteSubscription] = useMutation(DELETE_SECTION_SUBSCRIPTION, { refetchQueries });

  const notifyDelete = () => toast(`Unsubscribed from ${splitCourseCode(courseCode)} notifications`);
  const notifyInsert = () => toast(`Subscribed to ${splitCourseCode(courseCode)} notifications`);

  const toggleOnClick = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
      return;
    }

    if (!sectionID) {
      return;
    }

    if (selected) {
      deleteSubscription({ variables: { section_id: sectionID }}).then(() => notifyDelete());
    } else {
      insertSubscription({ variables: { user_id: userID, section_id: sectionID }}).then(() => notifyInsert());
    }
    setSelected(!selected);
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
