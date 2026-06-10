import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';

import LoadingSpinner from 'components/display/LoadingSpinner';
import ScheduleUploadModalContent from 'components/upload/ScheduleUploadModalContent';
import { RootState } from 'data/reducers/RootReducer';
import {
  GET_SECTIONS_BY_CLASS_NUMBERS,
  GetSectionsByClassNumbersQuery,
} from 'graphql/queries/course/SwapCourse';
import { GET_USER } from 'graphql/queries/user/User';
import { cn } from 'lib/utils';
import { ParseOnlyScheduleResponse } from 'types/Api';

import SwapCalendar from './SwapCalendar';

// PageWrapper mixin (min-height accounts for FOOTER_HEIGHT 70px +
// FOOTER_MARGIN_TOP 32px) on the app's light1 background, with a fade-in.
const swapPageWrapperClasses =
  'relative flex min-h-[calc(100vh-102px)] w-screen animate-[fadeIn_0.3s_ease] flex-col bg-light1 pb-8';

const SwapPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [ephemeralParseData, setEphemeralParseData] =
    useState<ParseOnlyScheduleResponse | null>(null);

  const { loading, data, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(GET_USER, {
    variables: { id: Number(localStorage.getItem('user_id')) },
    skip: !isLoggedIn,
  });

  const { loading: sectionsLoading, data: sectionsData } =
    useQuery<GetSectionsByClassNumbersQuery>(GET_SECTIONS_BY_CLASS_NUMBERS, {
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
    })) as unknown as UserScheduleFragment['schedule'];
  }, [sectionsData]);

  const user = isLoggedIn ? data?.user[0] : null;
  const schedule = isLoggedIn ? user?.schedule ?? [] : ephemeralSchedule ?? [];
  const hasSchedule = schedule.length > 0;

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
      <div className={swapPageWrapperClasses}>
        <Helmet>
          <title>Section Swap - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoggedIn && ephemeralParseData && sectionsLoading) {
    return (
      <div className={swapPageWrapperClasses}>
        <Helmet>
          <title>Section Swap - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={swapPageWrapperClasses}>
      <Helmet>
        <title>Section Swap - UW Flow</title>
        {hasSchedule && (
          <meta
            name="description"
            content="View your UW schedule and swap course sections."
          />
        )}
      </Helmet>
      <SwapCalendar schedule={schedule} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className={cn(
            'fixed inset-0 z-10 box-border flex items-start justify-center overflow-y-auto bg-white/55 backdrop-blur [transition:opacity_0.4s_ease]',
            !hasSchedule
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0',
          )}
        >
          <div className="mt-[150px] flex justify-center">
            <ScheduleUploadModalContent
              onAfterUploadSuccess={
                isLoggedIn
                  ? () =>
                      refetch({ id: Number(localStorage.getItem('user_id')) })
                  : (parseData) => parseData && setEphemeralParseData(parseData)
              }
              showSkipStepButton={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
