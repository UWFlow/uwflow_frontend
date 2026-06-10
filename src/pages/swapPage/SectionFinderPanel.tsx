import React from 'react';
import { useQuery } from 'react-apollo';
import { AlertTriangle, CheckCircle, MousePointer } from 'react-feather';
import { UserScheduleFragment } from 'generated/graphql';
import moment from 'moment/moment';
import { getProfPageRoute } from 'Routes';
import { useTheme } from 'styled-components';

import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import LoadingSpinner from 'components/display/LoadingSpinner';
import {
  GET_COURSE_FOR_SWAP,
  GetCourseForSwapQuery,
  GetCourseForSwapQueryVariables,
  SwapMeeting,
  SwapSection,
} from 'graphql/queries/course/SwapCourse';
import { formatCourseCode } from 'utils/Misc';

import {
  ConflictBadge,
  EmptyStateSub,
  EmptyStateText,
  EmptyStateWrapper,
  EnrolledBadge,
  FullBadge,
  PanelCloseBtn,
  PanelCourseCode,
  PanelCourseInfo,
  PanelCourseName,
  PanelHeader,
  PanelSectionCount,
  PanelWrapper,
  ProfAnchor,
  ProfNameText,
  RatingsText,
  SeatsLabel,
  SectionCard,
  SectionCardBottom,
  SectionCardTop,
  SectionListScroll,
  SectionPill,
  SectionRoomText,
  SectionTimesText,
} from './styles/SectionFinderPanel';

const WEEKDAY_NAMES: { [key: string]: string } = {
  M: 'Mon',
  T: 'Tue',
  W: 'Wed',
  Th: 'Thu',
  F: 'Fri',
  S: 'Sat',
  Su: 'Sun',
};

const formatTime = (secs: number): string => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const ampm = h < 12 ? 'AM' : 'PM';
  const displayH = h % 12 || 12;
  return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const formatMeetingTime = (meeting: SwapMeeting): string => {
  const days = (meeting.days as string[])
    .map((d) => WEEKDAY_NAMES[d] || d)
    .join(' ');
  return `${days} · ${formatTime(meeting.start_seconds!)}–${formatTime(
    meeting.end_seconds!,
  )}`;
};

const timesOverlap = (s1: number, e1: number, s2: number, e2: number) =>
  s1 < e2 && s2 < e1;

const sectionConflictsWithSchedule = (
  candidate: SwapSection,
  schedule: UserScheduleFragment['schedule'],
  excludedCourseCode: string,
): boolean => {
  const otherSections = schedule.filter(
    (e) => e.section.course.code !== excludedCourseCode,
  );

  return candidate.meetings.some((cm) => {
    if (cm.start_seconds == null || cm.end_seconds == null) return false;
    const cmDays = cm.days as string[];
    return cmDays.some((day) =>
      otherSections.some((e) =>
        e.section.meetings.some((em) => {
          const emDays = em.days as string[];
          return (
            emDays.includes(day) &&
            em.start_seconds != null &&
            em.end_seconds != null &&
            timesOverlap(
              cm.start_seconds!,
              cm.end_seconds!,
              em.start_seconds,
              em.end_seconds,
            )
          );
        }),
      ),
    );
  });
};

const getEnrolledSectionId = (
  schedule: UserScheduleFragment['schedule'],
  courseCode: string,
): number | null => {
  const entry = schedule.find((e) => e.section.course.code === courseCode);
  return entry ? entry.section.id : null;
};

type SectionFinderPanelProps = {
  selectedCourseCode: string | null;
  swapTargetCourseCode: string | null;
  schedule: UserScheduleFragment['schedule'];
  termId: number;
  onClose: () => void;
  onHoverSection: (section: SwapSection | null) => void;
};

const SectionFinderPanel = ({
  selectedCourseCode,
  swapTargetCourseCode,
  schedule,
  termId,
  onClose,
  onHoverSection,
}: SectionFinderPanelProps) => {
  const theme = useTheme();

  const displayCode = swapTargetCourseCode ?? selectedCourseCode;

  const { loading, data } = useQuery<
    GetCourseForSwapQuery,
    GetCourseForSwapQueryVariables
  >(GET_COURSE_FOR_SWAP, {
    variables: { code: displayCode || '', termId },
    skip: !displayCode,
  });

  if (!displayCode) {
    return (
      <PanelWrapper>
        <EmptyStateWrapper>
          <MousePointer size={32} color={theme.light4} />
          <EmptyStateText>Select a course</EmptyStateText>
          <EmptyStateSub>
            Click any class in your schedule to see sections and swap options.
          </EmptyStateSub>
        </EmptyStateWrapper>
      </PanelWrapper>
    );
  }

  if (loading || !data) {
    return (
      <PanelWrapper>
        <LoadingSpinner />
      </PanelWrapper>
    );
  }

  const sections = data.course_section;
  const courseData = sections[0]?.course;

  if (!courseData) {
    return (
      <PanelWrapper>
        <EmptyStateWrapper>
          <EmptyStateText>Course not found</EmptyStateText>
        </EmptyStateWrapper>
      </PanelWrapper>
    );
  }

  const enrolledSectionId = getEnrolledSectionId(schedule, displayCode || '');
  const updatedAt = moment.max(sections.map((s) => moment(s.updated_at)));

  // Sort sections: enrolled first (query already orders by section_name)
  const sortedSections = [...sections].sort((a, b) => {
    if (a.id === enrolledSectionId) return -1;
    if (b.id === enrolledSectionId) return 1;
    return a.section_name.localeCompare(b.section_name);
  });

  return (
    <>
      <LastUpdatedSchedule
        updatedAt={updatedAt}
        fontSize="80%"
        margin="0 0 8px"
      />
      <PanelWrapper>
        <PanelHeader>
          <PanelCourseInfo>
            <PanelCourseCode>
              {formatCourseCode(courseData.code)}
            </PanelCourseCode>
            <PanelSectionCount>
              {sections.length} section
              {sections.length !== 1 ? 's' : ''}
            </PanelSectionCount>
            <PanelCourseName>{courseData.name}</PanelCourseName>
          </PanelCourseInfo>
          <PanelCloseBtn onClick={onClose} title="Close">
            ✕
          </PanelCloseBtn>
        </PanelHeader>
        <SectionListScroll>
          {sortedSections.map((section) => {
            const isEnrolled = section.id === enrolledSectionId;
            const isFull =
              section.enrollment_total >= section.enrollment_capacity;
            const hasConflict =
              !isEnrolled &&
              sectionConflictsWithSchedule(
                section,
                schedule,
                selectedCourseCode || '',
              );
            const isDisabled = !isEnrolled && (isFull || hasConflict);

            const primaryMeeting = section.meetings.find(
              (m) => (m.days as string[]).length > 0 && !m.is_cancelled,
            );

            const prof = primaryMeeting?.prof;
            const clearPct =
              prof?.rating?.clear != null
                ? `${Math.round(prof.rating.clear * 100)}%`
                : null;
            const engagingPct =
              prof?.rating?.engaging != null
                ? `${Math.round(prof.rating.engaging * 100)}%`
                : null;

            return (
              <SectionCard
                key={section.id}
                enrolled={isEnrolled}
                disabled={isDisabled}
                onMouseEnter={() => !isEnrolled && onHoverSection(section)}
                onMouseLeave={() => onHoverSection(null)}
              >
                <SectionCardTop>
                  <SectionPill>{section.section_name}</SectionPill>
                  {isEnrolled && (
                    <EnrolledBadge>
                      <CheckCircle size={13} /> Enrolled
                    </EnrolledBadge>
                  )}
                  {!isEnrolled && hasConflict && (
                    <ConflictBadge>
                      <AlertTriangle size={13} /> Conflicts
                    </ConflictBadge>
                  )}
                  {!isEnrolled && !hasConflict && isFull && (
                    <FullBadge>Full</FullBadge>
                  )}
                </SectionCardTop>

                {section.meetings.map((meeting, i) => {
                  const meetingDays = (meeting.days as string[]).filter(
                    (d) => ['M', 'T', 'W', 'Th', 'F'].indexOf(d) !== -1,
                  );
                  const isOnline = meeting.is_tba || meetingDays.length === 0;
                  if (isOnline) {
                    return <SectionTimesText key={i}>ONLINE</SectionTimesText>;
                  }
                  const meetingForDisplay = { ...meeting, days: meetingDays };
                  return (
                    <React.Fragment key={i}>
                      <SectionTimesText>
                        {formatMeetingTime(meetingForDisplay as SwapMeeting)}
                      </SectionTimesText>
                      {meeting.location && (
                        <SectionRoomText>{meeting.location}</SectionRoomText>
                      )}
                    </React.Fragment>
                  );
                })}

                {prof && (
                  <>
                    {prof.code ? (
                      <ProfAnchor to={getProfPageRoute(prof.code)}>
                        {prof.name}
                      </ProfAnchor>
                    ) : (
                      <ProfNameText>{prof.name}</ProfNameText>
                    )}
                    {(clearPct || engagingPct) && (
                      <RatingsText>
                        {clearPct && (
                          <>
                            <strong>{clearPct}</strong> clear
                          </>
                        )}
                        {clearPct && engagingPct && '  '}
                        {engagingPct && (
                          <>
                            <strong>{engagingPct}</strong> engaging
                          </>
                        )}
                      </RatingsText>
                    )}
                  </>
                )}

                <SectionCardBottom>
                  <SeatsLabel full={isFull}>
                    <strong>
                      {Math.max(
                        0,
                        section.enrollment_capacity - section.enrollment_total,
                      )}
                    </strong>{' '}
                    of {section.enrollment_capacity} open
                  </SeatsLabel>
                </SectionCardBottom>
              </SectionCard>
            );
          })}
        </SectionListScroll>
      </PanelWrapper>
    </>
  );
};

export default SectionFinderPanel;
