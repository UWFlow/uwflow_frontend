import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { connect, useDispatch } from 'react-redux';
import { Bell } from 'react-feather';
import { useMutation } from 'react-apollo';
import { toast } from 'react-toastify';

/* Child Components */
import Tooltip from '../../components/display/Tooltip';
import CourseNotificationEmailModal from '../../components/emailInputModals/CourseNotificationEmailModal';

/* Styled Components */
import { NotificationBellWrapper } from './styles/ScheduleNotificationBell';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';
import { courseNotificationEmailModalOpen } from '../../data/actions/ModalActions';

/* GraphQL */
import {
  DELETE_SECTION_SUBSCRIPTION,
  INSERT_SECTION_SUBSCRIPTION,
} from '../../graphql/mutations/SectionSubscription';
import { REFETCH_SECTION_SUBSCRIPTIONS } from '../../graphql/queries/course/Course';
import { GET_USER_INFO } from '../../graphql/queries/user/User';

/* Constants */
import {
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_TOOLTIP,
} from '../../constants/Messages';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ScheduleNotificationBell = ({
  isLoggedIn,
  sectionID,
  courseID,
  initialState = false,
  userEmail,
}) => {
  const userID = localStorage.getItem('user_id');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const refetchQueries = [
    {
      query: REFETCH_SECTION_SUBSCRIPTIONS,
      variables: { course_id: courseID, user_id: userID },
    },
  ];

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(initialState);
  const [insertSubscription] = useMutation(INSERT_SECTION_SUBSCRIPTION, {
    refetchQueries,
  });
  const [deleteSubscription] = useMutation(DELETE_SECTION_SUBSCRIPTION, {
    refetchQueries,
  });

  const notifyDelete = () => toast(SUBSCRIPTION_SUCCESS.unsubscribed);
  const notifyInsert = email => toast(SUBSCRIPTION_SUCCESS.subscribed(email));

  const toggleOnClick = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
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
      console.log(userEmail);
      if (userEmail === '' || userEmail === null || userEmail === undefined) {
        // TODO: chain insertSubscription and setSelected to fire after user has entered email
        // dispatch(courseNotificationEmailModalOpen()); this is rekt rn we can't pass callbacks to the modal
        // TODO: Find way to pass callbacks to top level modal
        setIsEmailModalOpen(true);
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
      <Tooltip />
      <NotificationBellWrapper
        data-tip={
          selected
            ? SUBSCRIPTION_TOOLTIP.unsubscribe
            : SUBSCRIPTION_TOOLTIP.subscribe
        }
        selected={selected}
        onClick={toggleOnClick}
      >
        <Bell size={16} selected={selected} strokeWidth={3} />
      </NotificationBellWrapper>
      <div style={{ overflow: 'hidden' }}>
        <CourseNotificationEmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          onSuccess={email =>
            insertSubscription({
              variables: { user_id: userID, section_id: sectionID },
            })
              .then(() => {
                notifyInsert(email);
                setSelected(true);
              })
              .catch(() => {
                toast(SUBSCRIPTION_ERROR);
              })
          }
        />
      </div>
    </>
  );
};

export default connect(mapStateToProps)(ScheduleNotificationBell);
