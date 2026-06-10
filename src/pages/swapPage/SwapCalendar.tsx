import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { UserScheduleFragment } from 'generated/graphql';
import moment from 'moment/moment';

import {
  Calendar,
  CalendarEvent,
  CalendarEventState,
  CalendarEventVariant,
} from 'components/calendar';
import LastUpdatedSchedule from 'components/common/LastUpdatedSchedule';
import { FadeInWrapper } from 'components/navigation/styles/Footer';
import {
  GET_COURSE_FOR_SWAP,
  GetCourseForSwapQuery,
  GetCourseForSwapQueryVariables,
  SwapSection,
} from 'graphql/queries/course/SwapCourse';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import ScheduleSwapPanel, {
  ProfessorSwapStats,
  SwapCandidateCourse,
  SwapPreview,
} from './ScheduleSwapPanel';

const DAY_LETTERS = ['M', 'T', 'W', 'Th', 'F'];
const DAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
// Visible hour range of the grid: 8am to 10pm.
const GRID_START_HOUR = 8;
const GRID_END_HOUR = 22;

// 24-hour "HH:MM" from seconds since midnight (`secsToTime` is 12-hour).
const secsTo24hTime = (secs: number) =>
  `${`${Math.floor(secs / 3600)}`.padStart(2, '0')}:${`${Math.floor(
    (secs % 3600) / 60,
  )}`.padStart(2, '0')}`;

const getSectionVariant = (sectionName: string): CalendarEventVariant => {
  const type = sectionName.split(' ')[0];
  if (type === 'LEC') return 'lecture';
  if (type === 'LAB') return 'lab';
  if (type === 'TUT') return 'tutorial';
  return 'other';
};

// Mon-Fri day columns for a meeting, keeping only meetings that start within
// the visible hour range.
const toDayIndexes = (days: string[], startSeconds: number): number[] => {
  const startHour = startSeconds / 3600;
  if (startHour < GRID_START_HOUR || startHour > GRID_END_HOUR) return [];
  return days.map((d) => DAY_LETTERS.indexOf(d)).filter((col) => col !== -1);
};

const getTermLabel = (dateStr: string): string => {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1;
  return `${m >= 9 ? 'Fall' : m >= 5 ? 'Spring' : 'Winter'} ${d.getFullYear()}`;
};

const groupScheduleByTerm = (schedule: UserScheduleFragment['schedule']) => {
  const map: { [term: string]: UserScheduleFragment['schedule'] } = {};
  for (const entry of schedule) {
    const meeting = entry.section.meetings.find((m) =>
      (m.days as string[]).some((d) => DAY_LETTERS.includes(d)),
    );
    const term = meeting ? getTermLabel(meeting.start_date) : 'Other';
    if (!map[term]) map[term] = [];
    map[term].push(entry);
  }
  return map;
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

// Map the term's enrolled sections onto generic calendar events. The selected
// course renders gold (`selected`), or fades to `dimmed` while a candidate
// section is being previewed from the side panel.
const buildEnrolledEvents = (
  termSections: UserScheduleFragment['schedule'],
  selectedCourseCode: string | null,
  isPreviewing: boolean,
  onToggleCourse: (code: string) => void,
): CalendarEvent[] =>
  termSections.flatMap(({ section }) => {
    const courseCode = section.course.code;
    const variant = getSectionVariant(section.section_name);
    const isSelectedCourse = courseCode === selectedCourseCode;
    let state: CalendarEventState = 'default';
    if (isSelectedCourse) state = isPreviewing ? 'dimmed' : 'selected';

    return section.meetings.flatMap((m, meetingIndex) => {
      if (m.start_seconds == null || m.end_seconds == null) return [];
      const startMinutes = m.start_seconds / 60;
      const endMinutes = m.end_seconds / 60;
      const timeLabel = `${secsTo24hTime(m.start_seconds)}–${secsTo24hTime(
        m.end_seconds,
      )}`;
      return toDayIndexes(m.days as string[], m.start_seconds).map(
        (dayIndex) => ({
          id: `${courseCode}-${section.section_name}-${meetingIndex}-${dayIndex}`,
          dayIndex,
          startMinutes,
          endMinutes,
          variant,
          state,
          title: formatCourseCode(courseCode),
          timeLabel,
          location: m.location,
          subtitle: section.section_name,
          onClick: () => onToggleCourse(courseCode),
        }),
      );
    });
  });

// Ghost blocks for the candidate section previewed from the side panel.
const buildPreviewEvents = (section: SwapSection | null): CalendarEvent[] =>
  section
    ? section.meetings.flatMap((m, meetingIndex) => {
        if (m.start_seconds == null || m.end_seconds == null) return [];
        const startMinutes = m.start_seconds / 60;
        const endMinutes = m.end_seconds / 60;
        return toDayIndexes(m.days as string[], m.start_seconds).map(
          (dayIndex) => ({
            id: `preview-${meetingIndex}-${dayIndex}`,
            dayIndex,
            startMinutes,
            endMinutes,
            variant: getSectionVariant(section.section_name),
            state: 'preview' as const,
          }),
        );
      })
    : [];

type SwapCalendarProps = {
  schedule: UserScheduleFragment['schedule'];
};

const SwapCalendar = ({ schedule }: SwapCalendarProps) => {
  const termMap = useMemo(() => groupScheduleByTerm(schedule), [schedule]);

  const thisTermCode = getCurrentTermCode();
  const nextTermCode = getNextTermCode();
  const thisTermLabel = termCodeToDate(thisTermCode);
  const nextTermLabel = termCodeToDate(nextTermCode);

  const [selectedTerm, setSelectedTerm] = useState<string>(() => {
    const thisHasData = !!termMap[thisTermLabel]?.length;
    const nextHasData = !!termMap[nextTermLabel]?.length;
    return !nextHasData || thisHasData ? thisTermLabel : nextTermLabel;
  });
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>(
    null,
  );
  // Ghost preview while the pointer is over a section row in the panel.
  const [hoveredSection, setHoveredSection] = useState<SwapSection | null>(
    null,
  );
  // Section chosen via "Switch section": kept on the calendar as a persistent
  // preview (there is no backend mutation for changing enrolled sections).
  const [pinnedSection, setPinnedSection] = useState<SwapSection | null>(null);
  const [selectedSwapCourseCode, setSelectedSwapCourseCode] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setPinnedSection(null);
  }, [selectedCourseCode]);

  const selectedTermCode =
    selectedTerm === nextTermLabel ? nextTermCode : thisTermCode;
  const termSections = termMap[selectedTerm] ?? [];

  // Sections of the course shown in the panel: the chosen swap target, or the
  // course selected on the calendar while no target is chosen yet.
  const displayCode = selectedSwapCourseCode ?? selectedCourseCode;
  const { loading: sectionsLoading, data: sectionsData } = useQuery<
    GetCourseForSwapQuery,
    GetCourseForSwapQueryVariables
  >(GET_COURSE_FOR_SWAP, {
    variables: { code: displayCode || '', termId: selectedTermCode },
    skip: !displayCode,
  });

  const swapSections = useMemo(
    () => (displayCode ? sectionsData?.course_section ?? [] : []),
    [displayCode, sectionsData],
  );
  const displayedCourse = swapSections[0]?.course;

  // Bridge the panel's id-based API with this page's course-code state.
  const candidateCourses = useMemo<SwapCandidateCourse[]>(
    () =>
      displayedCourse
        ? [
            {
              id: displayedCourse.id,
              code: displayedCourse.code,
              name: displayedCourse.name ?? '',
              sections: swapSections,
            },
          ]
        : [],
    [displayedCourse, swapSections],
  );

  const enrolledSectionIds = useMemo(
    () => termSections.map((e) => e.section.id),
    [termSections],
  );

  const conflictSectionIds = useMemo(
    () =>
      swapSections
        .filter(
          (section) =>
            !enrolledSectionIds.includes(section.id) &&
            sectionConflictsWithSchedule(
              section,
              termSections,
              selectedCourseCode || '',
            ),
        )
        .map((section) => section.id),
    [swapSections, enrolledSectionIds, termSections, selectedCourseCode],
  );

  const professorStatsById = useMemo(() => {
    const stats: Record<number, ProfessorSwapStats | undefined> = {};
    for (const section of swapSections) {
      for (const meeting of section.meetings) {
        if (meeting.prof?.rating) {
          stats[meeting.prof.id] = {
            clear: meeting.prof.rating.clear,
            engaging: meeting.prof.rating.engaging,
          };
        }
      }
    }
    return stats;
  }, [swapSections]);

  const sourceCourseId =
    termSections.find((e) => e.section.course.code === selectedCourseCode)
      ?.section.course.id ?? null;

  const updatedAt = useMemo(
    () =>
      swapSections.length > 0
        ? moment.max(swapSections.map((s) => moment(s.updated_at)))
        : null,
    [swapSections],
  );

  const previewSection = hoveredSection ?? pinnedSection;

  const handlePreviewChange = useCallback(
    (preview: SwapPreview | null) =>
      setHoveredSection(preview?.section ?? null),
    [],
  );

  const handleTermChange = useCallback((termId: number) => {
    setSelectedTerm(termCodeToDate(termId));
    setSelectedCourseCode(null);
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setPinnedSection(null);
  }, []);

  const handleCourseChange = useCallback((courseCode: string | null) => {
    setSelectedSwapCourseCode(courseCode);
    setHoveredSection(null);
    setPinnedSection(null);
  }, []);

  const handleSwitchSection = useCallback(
    (sectionId: number) => {
      const section = swapSections.find((s) => s.id === sectionId) ?? null;
      setPinnedSection(section);
    },
    [swapSections],
  );

  const handleClose = useCallback(() => {
    setSelectedCourseCode(null);
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setPinnedSection(null);
  }, []);

  const events = useMemo(
    () => [
      ...buildEnrolledEvents(
        termSections,
        selectedCourseCode,
        previewSection !== null,
        (code) =>
          setSelectedCourseCode((prev) => (prev === code ? null : code)),
      ),
      ...buildPreviewEvents(previewSection),
    ],
    [termSections, selectedCourseCode, previewSection],
  );

  return (
    <FadeInWrapper>
      <div className="mx-auto box-border flex w-full max-w-[1280px] flex-col px-8 pb-8 pt-6">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h1 className="shrink-0 font-anderson text-4xl font-extrabold text-dark1 tabletDown:text-3xl">
            Swap classes
          </h1>
          <p className="text-right font-inter text-md font-regular text-dark2">
            Click any class to see other sections or swap it for a different
            course.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-solid border-light3 bg-white shadow-box">
            <Calendar
              showHeader={false}
              dayLabels={DAY_LABELS}
              events={events}
              minHour={GRID_START_HOUR}
              maxHour={GRID_END_HOUR - 1}
            />
          </div>

          <div className="flex w-[360px] shrink-0 flex-col">
            {updatedAt && (
              <LastUpdatedSchedule
                updatedAt={updatedAt}
                fontSize="80%"
                margin="0 0 8px"
              />
            )}
            <ScheduleSwapPanel
              selectedTermId={selectedTermCode}
              availableTerms={[
                { id: thisTermCode, label: thisTermLabel },
                { id: nextTermCode, label: nextTermLabel },
              ]}
              selectedCourseId={displayedCourse?.id ?? null}
              currentScheduleSections={termSections}
              candidateCourses={candidateCourses}
              enrolledSectionIds={enrolledSectionIds}
              conflictSectionIds={conflictSectionIds}
              onTermChange={handleTermChange}
              onCourseChange={handleCourseChange}
              onPreviewChange={handlePreviewChange}
              onSwitchSection={handleSwitchSection}
              onClose={handleClose}
              sourceCourseId={sourceCourseId}
              professorStatsById={professorStatsById}
              isLoading={sectionsLoading}
            />
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default SwapCalendar;
