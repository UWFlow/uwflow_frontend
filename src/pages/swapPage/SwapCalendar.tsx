import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, Download } from 'react-feather';
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
import { BACKEND_ENDPOINT, CALENDAR_EXPORT_ENDPOINT } from 'constants/Api';
import {
  GET_COURSE_FOR_SWAP,
  GetCourseForSwapQuery,
  GetCourseForSwapQueryVariables,
  SwapSection,
} from 'graphql/queries/course/SwapCourse';
import { cn } from 'lib/utils';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import CourseSearchDropdown from './CourseSearchDropdown';
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

type ScheduleEntry = UserScheduleFragment['schedule'][number];

// Bridge a fetched SwapSection into the schedule-entry shape. SwapSection
// carries every field the calendar mapping reads (id, section_name, meetings,
// course); the cast papers over nullable-vs-required differences in fields the
// page never touches.
const toScheduleEntry = (section: SwapSection, userId: number): ScheduleEntry =>
  ({ user_id: userId, section } as unknown as ScheduleEntry);

type SwapCalendarProps = {
  schedule: UserScheduleFragment['schedule'];
  // iCalendar export id of the logged-in user; null hides the Export button
  // (logged-out / ephemeral schedules have nothing to export).
  secretId?: string | null;
};

const SwapCalendar = ({ schedule, secretId = null }: SwapCalendarProps) => {
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
  const [selectedSwapCourseCode, setSelectedSwapCourseCode] = useState<
    string | null
  >(null);
  const [isSwapDropdownOpen, setIsSwapDropdownOpen] = useState(false);
  // Temporary client-side section swaps, keyed by term label. A swap replaces
  // the matching schedule entry in React state only — refreshing the page
  // restores the original schedule (no persistence, no mutations).
  const [overriddenByTerm, setOverriddenByTerm] = useState<
    Record<string, UserScheduleFragment['schedule']>
  >({});

  useEffect(() => {
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setIsSwapDropdownOpen(false);
  }, [selectedCourseCode]);

  const selectedTermCode =
    selectedTerm === nextTermLabel ? nextTermCode : thisTermCode;
  // Effective schedule for the term: temporary swaps take precedence.
  const termSections = useMemo(
    () => overriddenByTerm[selectedTerm] ?? termMap[selectedTerm] ?? [],
    [overriddenByTerm, termMap, selectedTerm],
  );

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

  const updatedAt = useMemo(
    () =>
      swapSections.length > 0
        ? moment.max(swapSections.map((s) => moment(s.updated_at)))
        : null,
    [swapSections],
  );

  const previewSection = hoveredSection;

  const handlePreviewChange = useCallback(
    (preview: SwapPreview | null) =>
      setHoveredSection(preview?.section ?? null),
    [],
  );

  // Term overrides persist while the page lives — only a refresh resets them.
  const handleTermChange = useCallback((termId: number) => {
    setSelectedTerm(termCodeToDate(termId));
    setSelectedCourseCode(null);
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setIsSwapDropdownOpen(false);
  }, []);

  const handleCourseChange = useCallback((courseCode: string | null) => {
    setSelectedSwapCourseCode(courseCode);
    setHoveredSection(null);
  }, []);

  // Temporarily swap a section into the schedule (React state only). The new
  // section replaces the selected course's entry of the same section type
  // (LEC↔LEC, TUT↔TUT), falling back to the course's first entry.
  const handleSwitchSection = useCallback(
    (sectionId: number) => {
      const newSection = swapSections.find((s) => s.id === sectionId);
      if (!newSection || !selectedCourseCode) return;

      const newType = newSection.section_name.split(' ')[0];
      const base = termSections;
      let replaceIndex = base.findIndex(
        (e) =>
          e.section.course.code === selectedCourseCode &&
          e.section.section_name.split(' ')[0] === newType,
      );
      if (replaceIndex === -1) {
        replaceIndex = base.findIndex(
          (e) => e.section.course.code === selectedCourseCode,
        );
      }
      if (replaceIndex === -1) return;

      const next = [...base];
      next[replaceIndex] = toScheduleEntry(
        newSection,
        base[replaceIndex].user_id,
      );
      setOverriddenByTerm((prev) => ({ ...prev, [selectedTerm]: next }));
      setHoveredSection(null);
      if (newSection.course.code !== selectedCourseCode) {
        // Follow the swapped-in course; the effect on selectedCourseCode also
        // clears the swap target so the panel shows the new enrolled section.
        setSelectedCourseCode(newSection.course.code);
      }
    },
    [swapSections, termSections, selectedCourseCode, selectedTerm],
  );

  // iCalendar export, same flow as ProfileCalendar's handleCalendarExport.
  const handleExport = useCallback(async () => {
    if (!secretId) return;
    const response = await fetch(
      `${BACKEND_ENDPOINT}${CALENDAR_EXPORT_ENDPOINT(secretId)}`,
    );
    window.location.assign(response.url);
  }, [secretId]);

  const handleClose = useCallback(() => {
    setSelectedCourseCode(null);
    setSelectedSwapCourseCode(null);
    setHoveredSection(null);
    setIsSwapDropdownOpen(false);
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

  const availableTerms = [
    { id: thisTermCode, label: thisTermLabel },
    { id: nextTermCode, label: nextTermLabel },
  ];
  const swapTargetCode = selectedSwapCourseCode ?? selectedCourseCode;

  return (
    <FadeInWrapper>
      <div className="mx-auto box-border flex w-full max-w-[1280px] flex-col px-8 pb-8 pt-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="m-0 font-anderson text-4xl font-extrabold text-dark1 tabletDown:text-3xl">
                Swap classes
              </h1>
              <span className="rounded bg-accent px-1.5 py-0.5 text-xs font-extrabold text-dark1">
                NEW
              </span>
            </div>
            <p className="mb-0 mt-1 font-inter text-md font-regular text-dark2">
              Click any class to see other sections or swap it for a different
              course.
            </p>
          </div>
          <div className="inline-flex shrink-0 rounded-lg border border-solid border-light3 bg-white p-1">
            {availableTerms.map((term) => (
              <button
                className={cn(
                  'h-8 cursor-pointer rounded-md border-none bg-transparent px-4 text-sm font-semibold text-dark3 transition-colors',
                  selectedTermCode === term.id && 'bg-light2 text-dark1',
                )}
                key={term.id}
                onClick={() => handleTermChange(term.id)}
                type="button"
              >
                {term.label}
              </button>
            ))}
          </div>
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

          <div className="flex w-[360px] shrink-0 flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-xl bg-white px-3 py-2.5 shadow-box">
                {selectedCourseCode ? (
                  <>
                    <span className="text-sm font-semibold text-dark1">
                      Swap
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-courses">
                      {formatCourseCode(selectedCourseCode)}
                    </span>
                    <span className="text-sm font-semibold text-dark1">
                      with
                    </span>
                    <div className="relative min-w-0">
                      <button
                        className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1.5 rounded-lg border-none bg-light2 px-2.5 text-sm font-semibold text-courses outline-none focus:ring-2 focus:ring-primary/20"
                        onClick={() => setIsSwapDropdownOpen((open) => !open)}
                        type="button"
                      >
                        <span className="truncate">
                          {formatCourseCode(
                            swapTargetCode ?? selectedCourseCode,
                          )}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className="shrink-0 text-dark2"
                          size={14}
                        />
                      </button>
                      {isSwapDropdownOpen && (
                        <CourseSearchDropdown
                          selectedCode={swapTargetCode}
                          onSelect={(code) => {
                            setIsSwapDropdownOpen(false);
                            handleCourseChange(code);
                          }}
                          onClose={() => setIsSwapDropdownOpen(false)}
                          termId={selectedTermCode}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <span className="text-sm text-dark3">
                    Select a class on your schedule
                  </span>
                )}
              </div>
              {secretId && (
                <button
                  aria-label="Export schedule"
                  title="Export schedule"
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border-none bg-primary text-white transition-colors hover:bg-primaryDark"
                  onClick={handleExport}
                  type="button"
                >
                  <Download aria-hidden="true" size={16} />
                </button>
              )}
            </div>
            {updatedAt && (
              <LastUpdatedSchedule
                updatedAt={updatedAt}
                fontSize="80%"
                margin="0"
              />
            )}
            <ScheduleSwapPanel
              selectedTermId={selectedTermCode}
              selectedCourseId={displayedCourse?.id ?? null}
              candidateCourses={candidateCourses}
              enrolledSectionIds={enrolledSectionIds}
              conflictSectionIds={conflictSectionIds}
              onPreviewChange={handlePreviewChange}
              onSwitchSection={handleSwitchSection}
              onClose={handleClose}
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
