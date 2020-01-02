import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Bell } from 'react-feather';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

/* Child Components */
import Tooltip from '../../components/display/Tooltip';

/* Styled Components */
import { NotificationBellWrapper } from './styles/ScheduleNotificationBell';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';

/* GraphQL */
import {
  DELETE_SECTION_SUBSCRIPTION,
  INSERT_SECTION_SUBSCRIPTION,
} from '../../graphql/mutations/SectionSubscription';
import { REFETCH_SECTION_SUBSCRIPTIONS } from '../../graphql/queries/course/Course';

/* Utils */
import withModal from '../../components/modal/withModal';

/* Constants */
import {
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_TOOLTIP,
} from '../../constants/Messages';
import {
  AUTH_MODAL,
  COURSE_NOTIFICATION_EMAIL_MODAL,
} from '../../constants/Modal';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ScheduleNotificationBell = ({
  isLoggedIn,
  sectionID,
  courseID,
  initialState = false,
  userEmail,
  openModal,
}) => {
  const userID = localStorage.getItem('user_id');

  const refetchQueries = [
    {
      query: REFETCH_SECTION_SUBSCRIPTIONS,
      variables: { course_id: courseID, user_id: userID },
    },
  ];

  const [selected, setSelected] = useState(initialState);
  const [insertSubscription] = useMutation(INSERT_SECTION_SUBSCRIPTION, {
    refetchQueries,
  });
  const [deleteSubscription] = useMutation(DELETE_SECTION_SUBSCRIPTION, {
    refetchQueries,
  });

  const notifyDelete = () => toast(SUBSCRIPTION_SUCCESS.unsubscribed);
  const notifyInsert = () => toast(SUBSCRIPTION_SUCCESS.subscribed);
  const emailModalProps = {
    onSuccess: () =>
      insertSubscription({
        variables: { user_id: userID, section_id: sectionID },
      })
        .then(() => {
          notifyInsert();
          setSelected(true);
        })
        .catch(() => {
          toast(SUBSCRIPTION_ERROR);
        }),
  };

  const toggleOnClick = () => {
    if (!isLoggedIn) {
      openModal(AUTH_MODAL);
      return;
    }

    if (!sectionID) {
      return;
    }

    if (selected) {
      deleteSubscription({ variables: { section_id: sectionID } })
        .then(() => notifyDelete())
        .catch(() => {
          toast(SUBSCRIPTION_ERROR);
        });
      setSelected(false);
    } else {
      // Assume user data will be loaded by the time a notification bell is clicked
      if (userEmail === '' || userEmail === null || userEmail === undefined) {
        // TODO: chain insertSubscription and setSelected to fire after user has entered email
        // dispatch(courseNotificationEmailModalOpen()); this is rekt rn we can't pass callbacks to the modal
        // TODO: Find way to pass callbacks to top level modal
        openModal(COURSE_NOTIFICATION_EMAIL_MODAL, emailModalProps);
      } else {
        insertSubscription({
          variables: { user_id: userID, section_id: sectionID },
        })
          .then(() => {
            notifyInsert(userEmail);
            setSelected(true);
          })
          .catch(() => {
            toast(SUBSCRIPTION_ERROR);
          });
      }
    }
  };

  return (
    <>
      <Tooltip id={`${sectionID}${courseID}`} />
      <NotificationBellWrapper
        data-tip={
          selected
            ? SUBSCRIPTION_TOOLTIP.unsubscribe
            : SUBSCRIPTION_TOOLTIP.subscribe
        }
        data-for={`${sectionID}${courseID}`}
        selected={selected}
        onClick={toggleOnClick}
        onMouseDown={e => e.preventDefault()}
      >
        <Bell size={16} selected={selected} strokeWidth={3} />
      </NotificationBellWrapper>
    </>
  );
};

export default withModal(connect(mapStateToProps)(ScheduleNotificationBell));
