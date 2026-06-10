import React, { useEffect, useMemo, useState } from 'react';
import { UserScheduleFragment } from 'generated/graphql';

import {
  Calendar,
  CalendarEvent,
  CalendarEventState,
  CalendarEventVariant,
} from 'components/calendar';
import { FadeInWrapper } from 'components/navigation/styles/Footer';
import { SwapSection } from 'graphql/queries/course/SwapCourse';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import {
  CourseCodeBadge,
  CourseSelectBadgeWrapper,
  CourseSelectTrigger,
  DropdownCourseCode,
  DropdownCourseName,
  SwapDropdownItem,
  SwapDropdownList,
  SwapDropdownOverlay,
  SwapDropdownWrapper,
  SwapLabelText,
  TermTab,
  TermTabGroup,
} from './styles/SwapCalendar';
import CourseSearchDropdown from './CourseSearchDropdown';
import SectionFinderPanel from './SectionFinderPanel';

const DAY_LETTERS = ['M', 'T', 'W', 'Th', 'F'];
// Visible hour range of the grid: 8am to 10pm.
const GRID_START_HOUR = 8;
const GRID_END_HOUR = 22;

const fmtWeekHeader = (d: Date) =>
  `${d.toLocaleDateString('en', {
    weekday: 'short',
  })} ${d.toLocaleDateString('en', { month: 'short' })} ${d.getDate()}`;

const getWeekDates = (): Date[] => {
  const today = new Date();
  const day = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

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
      return toDayIndexes(m.days as string[], m.start_seconds).map(
        (dayIndex) => ({
          id: `${courseCode}-${section.section_name}-${meetingIndex}-${dayIndex}`,
          dayIndex,
          startMinutes,
          endMinutes,
          variant,
          state,
          title: formatCourseCode(courseCode),
          subtitle: m.location
            ? `${section.section_name} · ${m.location}`
            : section.section_name,
          onClick: () => onToggleCourse(courseCode),
        }),
      );
    });
  });

// Ghost blocks for the candidate section hovered in the side panel.
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
  const [hoveredSection, setHoveredSection] = useState<SwapSection | null>(
    null,
  );
  const [selectedSwapCourseCode, setSelectedSwapCourseCode] = useState<
    string | null
  >(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedSwapCourseCode(null);
    setIsDropdownOpen(false);
    setIsSourceDropdownOpen(false);
    setHoveredSection(null);
  }, [selectedCourseCode]);

  const selectedTermCode =
    selectedTerm === nextTermLabel ? nextTermCode : thisTermCode;
  const termSections = termMap[selectedTerm] ?? [];

  const enrolledCourses = useMemo(() => {
    const seen = new Set<string>();
    return termSections
      .map((e) => ({
        code: e.section.course.code,
        name: e.section.course.name ?? '',
      }))
      .filter(({ code }) => {
        if (seen.has(code)) return false;
        seen.add(code);
        return true;
      });
  }, [termSections]);

  const events = useMemo(
    () => [
      ...buildEnrolledEvents(
        termSections,
        selectedCourseCode,
        hoveredSection !== null,
        (code) =>
          setSelectedCourseCode((prev) => (prev === code ? null : code)),
      ),
      ...buildPreviewEvents(hoveredSection),
    ],
    [termSections, selectedCourseCode, hoveredSection],
  );
  const weekDates = useMemo(getWeekDates, []);

  const selectedLabel = selectedCourseCode
    ? formatCourseCode(selectedCourseCode)
    : null;

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

        <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
          <TermTabGroup>
            {[thisTermLabel, nextTermLabel].map((term) => (
              <TermTab
                key={term}
                active={term === selectedTerm}
                onClick={() => {
                  setSelectedTerm(term);
                  setSelectedCourseCode(null);
                  setHoveredSection(null);
                }}
              >
                {term}
              </TermTab>
            ))}
          </TermTabGroup>

          <CourseSelectTrigger hasValue={!!selectedCourseCode} as="div">
            {selectedCourseCode ? (
              <>
                <SwapLabelText>Swap</SwapLabelText>
                <CourseSelectBadgeWrapper>
                  <CourseCodeBadge
                    role="button"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsSourceDropdownOpen((o) => !o)}
                  >
                    {selectedLabel} ▾
                  </CourseCodeBadge>
                  {isSourceDropdownOpen && (
                    <>
                      <SwapDropdownOverlay
                        onClick={() => setIsSourceDropdownOpen(false)}
                      />
                      <SwapDropdownWrapper>
                        <SwapDropdownList>
                          {enrolledCourses.map((c) => (
                            <SwapDropdownItem
                              key={c.code}
                              isSelected={c.code === selectedCourseCode}
                              isEnrolled
                              onClick={() => {
                                setSelectedCourseCode(c.code);
                                setIsSourceDropdownOpen(false);
                              }}
                            >
                              <DropdownCourseCode>
                                {formatCourseCode(c.code)}
                              </DropdownCourseCode>
                              <DropdownCourseName>{c.name}</DropdownCourseName>
                            </SwapDropdownItem>
                          ))}
                        </SwapDropdownList>
                      </SwapDropdownWrapper>
                    </>
                  )}
                </CourseSelectBadgeWrapper>
                <SwapLabelText>with</SwapLabelText>
                <CourseSelectBadgeWrapper>
                  <CourseCodeBadge
                    role="button"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsDropdownOpen((o) => !o)}
                  >
                    {selectedSwapCourseCode
                      ? formatCourseCode(selectedSwapCourseCode)
                      : selectedLabel}{' '}
                    ▾
                  </CourseCodeBadge>
                  {isDropdownOpen && (
                    <CourseSearchDropdown
                      selectedCode={selectedSwapCourseCode}
                      onSelect={(code) => {
                        setSelectedSwapCourseCode(code);
                        setHoveredSection(null);
                        setIsDropdownOpen(false);
                      }}
                      onClose={() => setIsDropdownOpen(false)}
                      termId={selectedTermCode}
                    />
                  )}
                </CourseSelectBadgeWrapper>
              </>
            ) : (
              'Select course from schedule'
            )}
          </CourseSelectTrigger>
        </div>

        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 overflow-hidden rounded-lg border border-solid border-light3 bg-white shadow-box">
            <Calendar
              showHeader={false}
              dayLabels={weekDates.map(fmtWeekHeader)}
              events={events}
              minHour={GRID_START_HOUR}
              maxHour={GRID_END_HOUR - 1}
            />
            <div className="flex gap-4 border-0 border-t border-solid border-light2 bg-light1 px-3 py-1.5 text-xs text-dark3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                Click any class to see sections
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-accentDark" />
                Hover a section for preview
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col self-stretch">
            <SectionFinderPanel
              selectedCourseCode={selectedCourseCode}
              swapTargetCourseCode={selectedSwapCourseCode}
              schedule={termSections}
              termId={selectedTermCode}
              onClose={() => {
                setSelectedCourseCode(null);
                setHoveredSection(null);
                setSelectedSwapCourseCode(null);
              }}
              onHoverSection={setHoveredSection}
            />
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default SwapCalendar;
