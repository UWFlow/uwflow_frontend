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
import { ParseOnlyScheduleResponse } from 'types/Api';

import {
  ScheduleImportCard,
  ScheduleImportOverlay,
  SwapPageWrapper,
} from './styles/SwapPage';
import SwapCalendar from './SwapCalendar';

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
      <SwapCalendar schedule={schedule} secretId={user?.secret_id} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ScheduleImportOverlay visible={!hasSchedule}>
          <ScheduleImportCard>
            <ScheduleUploadModalContent
              onAfterUploadSuccess={
                isLoggedIn
                  ? () =>
                      refetch({ id: Number(localStorage.getItem('user_id')) })
                  : (parseData) => parseData && setEphemeralParseData(parseData)
              }
              showSkipStepButton={false}
            />
          </ScheduleImportCard>
        </ScheduleImportOverlay>
      </div>
    </SwapPageWrapper>
  );
};

export default SwapPage;
