import React from 'react';
import { useQuery } from 'react-apollo';
import { AlertTriangle, CheckCircle, MousePointer } from 'react-feather';
import { Link } from 'react-router-dom';
import { UserScheduleFragment } from 'generated/graphql';
import moment from 'moment/moment';
import { getProfPageRoute } from 'Routes';

import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import LoadingSpinner from 'components/display/LoadingSpinner';
import { Badge } from 'components/ui/badge';
import {
  GET_COURSE_FOR_SWAP,
  GetCourseForSwapQuery,
  GetCourseForSwapQueryVariables,
  SwapMeeting,
  SwapSection,
} from 'graphql/queries/course/SwapCourse';
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

const formatTime = (secs: number): string => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
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
      <div className="w-[440px] shrink-0 border border-gray-200 rounded-lg bg-white flex flex-col flex-1 min-h-[360px]">
        <div className="flex flex-col items-center justify-center flex-1 gap-3 p-8 text-center">
          <MousePointer size={32} className="text-gray-300" />
          <div className="text-lg font-semibold text-gray-500">
            Select a course
          </div>
          <div className="text-sm text-gray-400 max-w-[220px] leading-relaxed">
            Click any class in your schedule to see sections and swap options.
          </div>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="w-[440px] shrink-0 border border-gray-200 rounded-lg bg-white flex flex-col flex-1 min-h-[360px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const sections = data.course_section;
  const courseData = sections[0]?.course;

  if (!courseData) {
    return (
      <div className="w-[440px] shrink-0 border border-gray-200 rounded-lg bg-white flex flex-col flex-1 min-h-[360px]">
        <div className="flex flex-col items-center justify-center flex-1 gap-3 p-8">
          <div className="text-lg font-semibold text-gray-500">
            Course not found
          </div>
        </div>
      </div>
    );
  }

  const enrolledSectionId = getEnrolledSectionId(schedule, displayCode || '');
  const updatedAt = moment.max(sections.map((s) => moment(s.updated_at)));

  const sortedSections = [...sections].sort((a, b) => {
    if (a.id === enrolledSectionId) return -1;
    if (b.id === enrolledSectionId) return 1;
    return a.section_name.localeCompare(b.section_name);
  });

  return (
    <div className="flex flex-col self-stretch">
      <LastUpdatedSchedule
        updatedAt={updatedAt}
        fontSize="80%"
        margin="0 0 8px"
      />
      <div className="w-[440px] shrink-0 border border-gray-200 rounded-lg bg-white overflow-y-auto flex flex-col flex-1">
        {/* Panel header */}
        <div className="px-4 py-3.5 border-b border-gray-200 flex items-start justify-between shrink-0">
          <div className="flex-1">
            <span className="text-base font-bold text-blue-700">
              {formatCourseCode(courseData.code)}
            </span>
            <span className="text-[13px] text-gray-400 ml-2">
              {sections.length} section{sections.length !== 1 ? 's' : ''}
            </span>
            <div className="text-[13px] text-gray-500 mt-0.5">
              {courseData.name}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="border border-gray-200 bg-gray-50 rounded w-7 h-7 flex items-center justify-center cursor-pointer text-sm text-gray-500 shrink-0 ml-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Section list */}
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
                style={{
                  borderLeft: `4px solid ${
                    isEnrolled ? '#0052cc' : 'transparent'
                  }`,
                  background: isEnrolled ? '#f0f5ff' : 'transparent',
                  opacity: isDisabled ? 0.55 : 1,
                }}
                className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                onMouseEnter={() => !isEnrolled && onHoverSection(section)}
                onMouseLeave={() => onHoverSection(null)}
              >
                {/* Section name + status badges */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold bg-gray-100 rounded px-2 py-0.5 text-gray-900">
                    {section.section_name}
                  </span>
                  {isEnrolled && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle size={13} /> Enrolled
                    </Badge>
                  )}
                  {!isEnrolled && hasConflict && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle size={13} /> Conflicts
                    </Badge>
                  )}
                  {!isEnrolled && !hasConflict && isFull && (
                    <Badge variant="secondary">Full</Badge>
                  )}
                </div>

                {/* Meeting times */}
                {section.meetings.map((meeting, i) => {
                  const meetingDays = (meeting.days as string[]).filter(
                    (d) => ['M', 'T', 'W', 'Th', 'F'].indexOf(d) !== -1,
                  );
                  const isOnline = meeting.is_tba || meetingDays.length === 0;
                  if (isOnline) {
                    return (
                      <div key={i} className="text-[13px] text-gray-700 mb-0.5">
                        ONLINE
                      </div>
                    );
                  }
                  return (
                    <React.Fragment key={i}>
                      <div className="text-[13px] text-gray-700 mb-0.5">
                        {formatMeetingTime({
                          ...meeting,
                          days: meetingDays,
                        } as SwapMeeting)}
                      </div>
                      {meeting.location && (
                        <div className="text-xs text-gray-500 mb-1.5">
                          {meeting.location}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}

                {/* Prof */}
                {prof && (
                  <>
                    {prof.code ? (
                      <Link
                        to={getProfPageRoute(prof.code)}
                        className="text-[13px] font-semibold text-blue-600 no-underline hover:underline block mb-0.5"
                      >
                        {prof.name}
                      </Link>
                    ) : (
                      <span className="text-[13px] font-semibold text-gray-600 block mb-0.5">
                        {prof.name}
                      </span>
                    )}
                    {(clearPct || engagingPct) && (
                      <div className="text-xs text-gray-400 mb-2">
                        {clearPct && (
                          <>
                            <strong className="text-gray-600 font-semibold">
                              {clearPct}
                            </strong>{' '}
                            clear
                          </>
                        )}
                        {clearPct && engagingPct && '  '}
                        {engagingPct && (
                          <>
                            <strong className="text-gray-600 font-semibold">
                              {engagingPct}
                            </strong>{' '}
                            engaging
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Enrollment count */}
                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`text-xs ${
                      isFull ? 'text-red-500 font-bold' : 'text-gray-500'
                    }`}
                  >
                    {section.enrollment_total}/{section.enrollment_capacity}{' '}
                    Enrolled
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionFinderPanel;
