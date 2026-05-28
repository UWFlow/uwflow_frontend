import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { UserScheduleFragment } from 'generated/graphql';

import LoadingSpinner from 'components/display/LoadingSpinner';
import ScheduleUploadModalContent from 'components/upload/ScheduleUploadModalContent';
import { RootState } from 'data/reducers/RootReducer';
import {
  GET_SECTIONS_BY_CLASS_NUMBERS,
  GET_USER_SCHEDULE,
} from 'graphql/queries/course/SwapCourse';
import { ParseOnlyScheduleResponse } from 'types/Api';

import SwapCalendar from './SwapCalendar';

type GetUserScheduleQuery = {
  user: Array<{ id: number; schedule: UserScheduleFragment['schedule'] }>;
};

const SwapPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [
    ephemeralParseData,
    setEphemeralParseData,
  ] = useState<ParseOnlyScheduleResponse | null>(null);

  const { loading, data, refetch } = useQuery<GetUserScheduleQuery>(
    GET_USER_SCHEDULE,
    {
      variables: { id: Number(localStorage.getItem('user_id')) },
      skip: !isLoggedIn,
    },
  );

  const { loading: sectionsLoading, data: sectionsData } = useQuery(
    GET_SECTIONS_BY_CLASS_NUMBERS,
    {
      variables: {
        classNumbers: ephemeralParseData?.Classes.map((c) => c.Number) ?? [],
        termId: ephemeralParseData?.TermId ?? 0,
      },
      skip: !ephemeralParseData || isLoggedIn,
    },
  );

  const ephemeralSchedule = useMemo<
    UserScheduleFragment['schedule'] | null
  >(() => {
    if (!sectionsData?.course_section) return null;
    return sectionsData.course_section.map((section: unknown) => ({
      section,
    })) as UserScheduleFragment['schedule'];
  }, [sectionsData]);

  const schedule = isLoggedIn
    ? data?.user[0]?.schedule ?? []
    : ephemeralSchedule ?? [];
  const hasSchedule = schedule.length > 0;

  useEffect(() => {
    document.body.style.overflow = hasSchedule ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hasSchedule]);

  const isLoading =
    (isLoggedIn && (loading || !data)) ||
    (!isLoggedIn && !!ephemeralParseData && sectionsLoading);

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <Helmet>
          <title>Section Swap - UW Flow</title>
        </Helmet>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50">
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
        schedule={schedule}
        refetchAll={
          isLoggedIn
            ? () => refetch({ id: Number(localStorage.getItem('user_id')) })
            : undefined
        }
      />

      {/* Upload overlay — shown when no schedule is available */}
      <div
        className={[
          'fixed inset-0 z-10 flex items-start justify-center overflow-y-auto transition-opacity duration-300',
          'bg-white/55 backdrop-blur-sm',
          hasSchedule ? 'pointer-events-none opacity-0' : 'opacity-100',
        ].join(' ')}
      >
        <div className="mt-36 flex justify-center">
          <ScheduleUploadModalContent
            onAfterUploadSuccess={
              isLoggedIn
                ? () => refetch({ id: Number(localStorage.getItem('user_id')) })
                : (parseData) => parseData && setEphemeralParseData(parseData)
            }
            showSkipStepButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default SwapPage;
