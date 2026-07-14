import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GetUserQuery, GetUserQueryVariables } from 'generated/graphql';

import LoginPromptCard from 'components/auth/LoginPromptCard';
import LoadingSpinner from 'components/display/LoadingSpinner';
import PageOverlay from 'components/modal/PageOverlay';
import ScheduleUploadModalContent from 'components/upload/ScheduleUploadModalContent';
import { SWAP_TOUR_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import { GET_USER } from 'graphql/queries/user/User';
import useModal from 'hooks/useModal';

import DEMO_SCHEDULE from './demoSchedule';
import SwapCalendar, { getDisplayedTermPresence } from './SwapCalendar';

const SWAP_TOUR_DISMISSED_KEY = 'swap_tour_dismissed';

// PageWrapper mixin (min-height accounts for FOOTER_HEIGHT 70px +
// FOOTER_MARGIN_TOP 32px) on the app's light1 background. The fade-in lives on
// the SwapCalendar content (like the app's other pages wrap content in
// <FadeIn>), not here: a transform on this wrapper would re-anchor the always-
// mounted fixed login/upload overlay below.
const swapPageWrapperClasses =
  'relative flex min-h-[calc(100vh-102px)] w-screen flex-col bg-light1 pb-8';

const SwapPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [openModal, closeModal] = useModal();

  const { loading, data, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(GET_USER, {
    variables: { id: Number(localStorage.getItem('user_id')) },
    skip: !isLoggedIn,
  });

  const user = isLoggedIn ? data?.user[0] : null;
  const schedule = isLoggedIn ? user?.schedule ?? [] : [];
  // The calendar only shows the current + next term, so prompt for a Quest
  // import whenever neither of those terms has classes — not merely when the
  // schedule is empty (e.g. a returning user whose schedule is all past terms).
  const { thisHasData, nextHasData } = getDisplayedTermPresence(schedule);
  const hasDisplayedTermClasses = thisHasData || nextHasData;
  // Logged-out visitors see a non-interactive sample schedule behind the
  // login lock card instead of an empty grid.
  const isDemo = !isLoggedIn && !hasDisplayedTermClasses;

  useEffect(() => {
    if (!hasDisplayedTermClasses) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasDisplayedTermClasses]);

  // First visit with a loaded schedule: walk through the 3-step tour once.
  // Any dismissal (Skip, X, backdrop, or Done) persists the flag.
  useEffect(() => {
    if (
      hasDisplayedTermClasses &&
      !localStorage.getItem(SWAP_TOUR_DISMISSED_KEY)
    ) {
      openModal(SWAP_TOUR_MODAL, {
        onRequestClose: () => {
          localStorage.setItem(SWAP_TOUR_DISMISSED_KEY, '1');
          closeModal(SWAP_TOUR_MODAL);
        },
      });
    }
  }, [hasDisplayedTermClasses, openModal, closeModal]);

  if (isLoggedIn && (loading || !data)) {
    return (
      <div className={swapPageWrapperClasses}>
        <Helmet>
          <title>Swap Class - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={swapPageWrapperClasses}>
      <Helmet>
        <title>Swap Class - UW Flow</title>
        {hasDisplayedTermClasses && (
          <meta
            name="description"
            content="Simulate UW course section swaps to check they're possible before making the change in Quest."
          />
        )}
      </Helmet>
      <SwapCalendar
        schedule={isDemo ? DEMO_SCHEDULE : schedule}
        demoMode={isDemo}
      />
      <PageOverlay visible={!hasDisplayedTermClasses}>
        {isLoggedIn ? (
          <ScheduleUploadModalContent
            onAfterUploadSuccess={() =>
              refetch({ id: Number(localStorage.getItem('user_id')) })
            }
            showSkipStepButton={false}
          />
        ) : (
          <LoginPromptCard
            title="Upload your schedule to plan swaps"
            description="Log in and paste your courses from Quest to simulate section swaps and see which ones are possible. You make the actual swap in Quest."
          />
        )}
      </PageOverlay>
    </div>
  );
};

export default SwapPage;
