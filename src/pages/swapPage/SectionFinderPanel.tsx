import React from 'react';
import { AlertTriangle, CheckCircle, MousePointer } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UserScheduleFragment } from 'generated/graphql';
import moment from 'moment/moment';
import { getProfPageRoute } from 'Routes';

import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import LoadingSpinner from 'components/display/LoadingSpinner';
import {
  GET_COURSE_FOR_SWAP,
  GetCourseForSwapQuery,
  GetCourseForSwapQueryVariables,
  SwapMeeting,
  SwapSection,
} from 'graphql/queries/course/SwapCourse';
import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

const WEEKDAY_NAMES: { [key: string]: string } = {
  M: 'Mon',
  T: 'Tue',
  W: 'Wed',
  Th: 'Thu',
  F: 'Fri',
  S: 'Sat',
  Su: 'Sun',
};

// Styled with Tailwind (see tailwind.config.js for the GlobalTheme-derived
// tokens) as the starting point of the styled-components migration.
const PANEL_WRAPPER_CLASS =
  'flex w-[440px] flex-1 shrink-0 flex-col overflow-y-auto rounded-lg border border-solid border-light3 bg-white';

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
  if (meeting.start_seconds == null || meeting.end_seconds == null) {
    return days;
  }
  return `${days} · ${formatTime(meeting.start_seconds)}–${formatTime(
    meeting.end_seconds,
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
    const cmStart = cm.start_seconds;
    const cmEnd = cm.end_seconds;
    if (cmStart == null || cmEnd == null) return false;
    const cmDays = cm.days as string[];
    return cmDays.some((day) =>
      otherSections.some((e) =>
        e.section.meetings.some((em) => {
          const emDays = em.days as string[];
          return (
            emDays.includes(day) &&
            em.start_seconds != null &&
            em.end_seconds != null &&
            timesOverlap(cmStart, cmEnd, em.start_seconds, em.end_seconds)
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
      <div className={PANEL_WRAPPER_CLASS}>
        <div className="flex min-h-[360px] flex-1 flex-col items-center justify-center gap-3 p-8">
          <MousePointer
            size={32}
            className="text-light4"
            color="currentColor"
          />
          <div className="text-center font-anderson text-xl font-semibold text-dark2">
            Select a course
          </div>
          <div className="max-w-[220px] text-center text-sm leading-normal text-dark3">
            Click any class in your schedule to see sections and swap options.
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className={PANEL_WRAPPER_CLASS}>
        <LoadingSpinner />
      </div>
    );
  }

  const sections = data.course_section;
  const courseData = sections[0]?.course;

  if (!courseData) {
    return (
      <div className={PANEL_WRAPPER_CLASS}>
        <div className="flex min-h-[360px] flex-1 flex-col items-center justify-center gap-3 p-8">
          <div className="text-center font-anderson text-xl font-semibold text-dark2">
            Course not found
          </div>
        </div>
      </div>
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
      <div className={PANEL_WRAPPER_CLASS}>
        <div className="flex shrink-0 items-start justify-between border-0 border-b border-solid border-light2 px-4 py-3.5">
          <div className="flex-1">
            <span className="text-md font-bold text-courses">
              {formatCourseCode(courseData.code)}
            </span>
            <span className="ml-2 text-[13px] text-dark3">
              {sections.length} section
              {sections.length !== 1 ? 's' : ''}
            </span>
            <div className="mt-[3px] text-[13px] text-dark2">
              {courseData.name}
            </div>
          </div>
          <button
            type="button"
            className="ml-2 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded border border-solid border-light3 bg-light1 text-sm text-dark2 hover:bg-light2"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
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
              <div
                key={section.id}
                className={cn(
                  'border-0 border-b border-l-4 border-solid border-b-light2 border-l-transparent px-4 py-3 last:border-b-0',
                  isEnrolled && 'border-l-primary bg-[#f0f5ff]',
                  isDisabled && 'opacity-[0.55]',
                )}
                onMouseEnter={() => !isEnrolled && onHoverSection(section)}
                onMouseLeave={() => onHoverSection(null)}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="rounded bg-light2 px-2 py-0.5 text-xs font-bold text-dark1">
                    {section.section_name}
                  </span>
                  {isEnrolled && (
                    <span className="text-xs font-semibold text-primary">
                      <CheckCircle size={13} /> Enrolled
                    </span>
                  )}
                  {!isEnrolled && hasConflict && (
                    <span className="text-xs font-semibold text-red">
                      <AlertTriangle size={13} /> Conflicts
                    </span>
                  )}
                  {!isEnrolled && !hasConflict && isFull && (
                    <span className="text-xs font-semibold text-dark3">
                      Full
                    </span>
                  )}
                </div>

                {section.meetings.map((meeting, i) => {
                  const meetingDays = (meeting.days as string[]).filter(
                    (d) => ['M', 'T', 'W', 'Th', 'F'].indexOf(d) !== -1,
                  );
                  const isOnline = meeting.is_tba || meetingDays.length === 0;
                  if (isOnline) {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={i} className="mb-0.5 text-[13px] text-dark1">
                        ONLINE
                      </div>
                    );
                  }
                  const meetingForDisplay = { ...meeting, days: meetingDays };
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <React.Fragment key={i}>
                      <div className="mb-0.5 text-[13px] text-dark1">
                        {formatMeetingTime(meetingForDisplay as SwapMeeting)}
                      </div>
                      {meeting.location && (
                        <div className="mb-1.5 text-xs text-dark2">
                          {meeting.location}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {prof && (
                  <>
                    {prof.code ? (
                      <RouterLink
                        to={getProfPageRoute(prof.code)}
                        className="mb-0.5 inline-block text-[13px] font-semibold text-professors no-underline hover:underline"
                      >
                        {prof.name}
                      </RouterLink>
                    ) : (
                      <span className="mb-0.5 inline-block text-[13px] font-semibold text-dark2">
                        {prof.name}
                      </span>
                    )}
                    {(clearPct || engagingPct) && (
                      <div className="mb-2 text-xs text-dark3">
                        {clearPct && (
                          <>
                            <strong className="font-semibold text-dark2">
                              {clearPct}
                            </strong>{' '}
                            clear
                          </>
                        )}
                        {clearPct && engagingPct && '  '}
                        {engagingPct && (
                          <>
                            <strong className="font-semibold text-dark2">
                              {engagingPct}
                            </strong>{' '}
                            engaging
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'text-xs',
                      isFull ? 'font-bold text-red' : 'font-normal text-dark2',
                    )}
                  >
                    <strong>
                      {Math.max(
                        0,
                        section.enrollment_capacity - section.enrollment_total,
                      )}
                    </strong>{' '}
                    of {section.enrollment_capacity} open
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SectionFinderPanel;
