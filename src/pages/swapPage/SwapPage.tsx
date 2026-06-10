import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Lock } from 'react-feather';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';

import LoadingSpinner from 'components/display/LoadingSpinner';
import ScheduleUploadModalContent from 'components/upload/ScheduleUploadModalContent';
import { AUTH_MODAL } from 'constants/Modal';
import { RootState } from 'data/reducers/RootReducer';
import {
  GET_SECTIONS_BY_CLASS_NUMBERS,
  GetSectionsByClassNumbersQuery,
} from 'graphql/queries/course/SwapCourse';
import { GET_USER } from 'graphql/queries/user/User';
import useModal from 'hooks/useModal';
import { ParseOnlyScheduleResponse } from 'types/Api';

import {
  LockBody,
  LockCard,
  LockHeading,
  LockIconCircle,
  LoginButton,
  ScheduleImportCard,
  ScheduleImportOverlay,
  SwapPageWrapper,
} from './styles/SwapPage';
import DEMO_SCHEDULE from './demoSchedule';
import SwapCalendar from './SwapCalendar';

const SwapPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [openModal] = useModal();
  const [
    ephemeralParseData,
    setEphemeralParseData,
  ] = useState<ParseOnlyScheduleResponse | null>(null);

  const { loading, data, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(GET_USER, {
    variables: { id: Number(localStorage.getItem('user_id')) },
    skip: !isLoggedIn,
  });

  const { loading: sectionsLoading, data: sectionsData } = useQuery<
    GetSectionsByClassNumbersQuery
  >(GET_SECTIONS_BY_CLASS_NUMBERS, {
    variables: {
      classNumbers: ephemeralParseData?.Classes.map((c) => c.Number) ?? [],
      termId: ephemeralParseData?.TermId ?? 0,
    },
    skip: !ephemeralParseData || isLoggedIn,
  });

  const ephemeralSchedule = useMemo<
    UserScheduleFragment['schedule'] | null
  >(() => {
    if (!sectionsData?.course_section) return null;
    return sectionsData.course_section.map((section) => ({
      section,
    })) as UserScheduleFragment['schedule'];
  }, [sectionsData]);

  const user = isLoggedIn ? data?.user[0] : null;
  const schedule = isLoggedIn ? user?.schedule ?? [] : ephemeralSchedule ?? [];
  const hasSchedule = schedule.length > 0;
  // Logged-out visitors see a non-interactive sample schedule behind the
  // login lock card instead of an empty grid.
  const isDemo = !isLoggedIn && !hasSchedule;

  useEffect(() => {
    if (!hasSchedule) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasSchedule]);

  if (isLoggedIn && (loading || !data)) {
    return (
      <SwapPageWrapper>
        <Helmet>
          <title>Section Swap - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </SwapPageWrapper>
    );
  }

  if (!isLoggedIn && ephemeralParseData && sectionsLoading) {
    return (
      <SwapPageWrapper>
        <Helmet>
          <title>Section Swap - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </SwapPageWrapper>
    );
  }

  return (
    <SwapPageWrapper>
      <Helmet>
        <title>Section Swap - UW Flow</title>
        {hasSchedule && (
          <meta
            name="description"
            content="View your UW schedule and swap course sections."
          />
        )}
      </Helmet>
      <SwapCalendar
        schedule={isDemo ? DEMO_SCHEDULE : schedule}
        secretId={user?.secret_id}
        demoMode={isDemo}
        refetchAll={isLoggedIn ? refetch : undefined}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ScheduleImportOverlay visible={!hasSchedule}>
          <ScheduleImportCard>
            {isLoggedIn ? (
              <ScheduleUploadModalContent
                onAfterUploadSuccess={() =>
                  refetch({ id: Number(localStorage.getItem('user_id')) })
                }
                showSkipStepButton={false}
              />
            ) : (
              <LockCard>
                <LockIconCircle>
                  <Lock size={24} />
                </LockIconCircle>
                <LockHeading>Upload your schedule to swap</LockHeading>
                <LockBody>
                  Log in and paste your courses from Quest to start swapping
                  sections.
                </LockBody>
                <LoginButton onClick={() => openModal(AUTH_MODAL)}>
                  Log in to continue
                </LoginButton>
              </LockCard>
            )}
          </ScheduleImportCard>
        </ScheduleImportOverlay>
      </div>
    </SwapPageWrapper>
  );
};

export default SwapPage;
