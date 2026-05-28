import React, { useEffect, useMemo, useState } from 'react';
import { ApolloQueryResult } from 'apollo-client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';

import { SwapSection } from 'graphql/queries/course/SwapCourse';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';

import CourseSearchDropdown from './CourseSearchDropdown';
import SectionFinderPanel from './SectionFinderPanel';

const SWAP_HOUR_HEIGHT = 64;
const SWAP_GRID_START_HOUR = 8;
const SWAP_GRID_END_HOUR = 22;
const SWAP_TIME_COL_WIDTH = 56;
const TOTAL_HOURS = SWAP_GRID_END_HOUR - SWAP_GRID_START_HOUR;
const GRID_HEIGHT = TOTAL_HOURS * SWAP_HOUR_HEIGHT;

const DAY_LETTERS = ['M', 'T', 'W', 'Th', 'F'];

const fmtWeekHeader = (d: Date) =>
  `${d.toLocaleDateString('en', {
    weekday: 'short',
  })} ${d.toLocaleDateString('en', { month: 'short' })} ${d.getDate()}`;

const fmtHour = (h: number) =>
  h === 0 ? '12 am' : h === 12 ? '12 pm' : h < 12 ? `${h} am` : `${h - 12} pm`;

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')}${
    h < 12 ? 'am' : 'pm'
  }`;
};

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

type SectionColors = { fill: string; accent: string };

const getSectionColors = (sectionName: string): SectionColors => {
  const type = sectionName.split(' ')[0];
  if (type === 'LEC') return { fill: '#eef4ff', accent: '#0052cc' };
  if (type === 'LAB') return { fill: '#e6f2fb', accent: '#2b8fcd' };
  if (type === 'TUT') return { fill: '#efedf8', accent: '#6554c0' };
  if (type === 'MTG') return { fill: '#fff7e0', accent: '#e8b300' };
  return { fill: '#f4f5f7', accent: '#505f79' };
};

type EnrolledBlock = {
  courseCode: string;
  sectionName: string;
  location: string | null;
  colIndex: number;
  top: number;
  height: number;
  colors: SectionColors;
  startSeconds: number;
  endSeconds: number;
};

type BlockPos = { colIndex: number; top: number; height: number };

const toPositions = (days: string[], start: number, end: number): BlockPos[] =>
  days
    .map((d) => DAY_LETTERS.indexOf(d))
    .filter((col) => col !== -1)
    .map((colIndex) => ({
      colIndex,
      top: (start / 3600 - SWAP_GRID_START_HOUR) * SWAP_HOUR_HEIGHT,
      height: ((end - start) / 3600) * SWAP_HOUR_HEIGHT,
    }))
    .filter(({ top }) => top >= 0 && top <= GRID_HEIGHT);

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

const buildEnrolledBlocks = (
  termSections: UserScheduleFragment['schedule'],
): EnrolledBlock[] =>
  termSections.flatMap(({ section }) => {
    const colors = getSectionColors(section.section_name);
    return section.meetings.flatMap((m) => {
      if (m.start_seconds == null || m.end_seconds == null) return [];
      return toPositions(
        m.days as string[],
        m.start_seconds,
        m.end_seconds,
      ).map((pos) => ({
        ...pos,
        courseCode: section.course.code,
        sectionName: section.section_name,
        location: m.location ?? null,
        colors,
        startSeconds: m.start_seconds!,
        endSeconds: m.end_seconds!,
      }));
    });
  });

const buildGhostBlocks = (section: SwapSection | null): BlockPos[] =>
  section
    ? section.meetings.flatMap((m) => {
        if (m.start_seconds == null || m.end_seconds == null) return [];
        return toPositions(m.days as string[], m.start_seconds, m.end_seconds);
      })
    : [];

type SwapCalendarProps = {
  schedule: UserScheduleFragment['schedule'];
  refetchAll?: (
    variables?: GetUserQueryVariables,
  ) => Promise<ApolloQueryResult<GetUserQuery>>;
};

const SwapCalendar = ({ schedule, refetchAll }: SwapCalendarProps) => {
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

  const enrolledBlocks = useMemo(() => buildEnrolledBlocks(termSections), [
    termSections,
  ]);
  const ghostBlocks = useMemo(() => buildGhostBlocks(hoveredSection), [
    hoveredSection,
  ]);
  const weekDates = useMemo(getWeekDates, []);

  const blocksByCol: EnrolledBlock[][] = Array.from({ length: 5 }, () => []);
  enrolledBlocks.forEach((b) => blocksByCol[b.colIndex]?.push(b));
  const ghostByCol: BlockPos[][] = Array.from({ length: 5 }, () => []);
  ghostBlocks.forEach((b) => ghostByCol[b.colIndex]?.push(b));

  const selectedLabel = selectedCourseCode
    ? formatCourseCode(selectedCourseCode)
    : null;

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto px-8 py-6 w-full box-border">
      {/* Title row */}
      <div className="flex items-baseline justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 shrink-0 m-0">
          Your schedule
        </h1>
        <p className="text-sm text-gray-500 text-right m-0">
          Click any class to see other sections or swap it for a different
          course.
        </p>
      </div>

      {/* Header: term tabs + course selector */}
      <div className="flex items-center justify-end gap-2 mb-3 flex-wrap">
        {/* Term tabs */}
        <div className="flex border border-gray-200 rounded-md overflow-hidden mr-1">
          {[thisTermLabel, nextTermLabel].map((term) => (
            <button
              key={term}
              type="button"
              className={[
                'text-sm px-4 py-1.5 border-none border-r border-gray-200 last:border-r-0 cursor-pointer transition-colors',
                term === selectedTerm
                  ? 'font-semibold bg-white text-gray-900'
                  : 'font-normal bg-gray-50 text-gray-500 hover:bg-white',
              ].join(' ')}
              onClick={() => {
                setSelectedTerm(term);
                setSelectedCourseCode(null);
                setHoveredSection(null);
              }}
            >
              {term}
            </button>
          ))}
        </div>

        {/* Course swap selector */}
        <div
          className={[
            'flex items-center gap-2 border border-gray-200 rounded-lg bg-white cursor-pointer',
            selectedCourseCode
              ? 'px-5 py-2.5 text-base'
              : 'px-3 py-1.5 text-sm text-gray-400',
          ].join(' ')}
        >
          {selectedCourseCode ? (
            <>
              <span className="text-gray-500 text-base font-medium">Swap</span>
              {/* Source badge */}
              <div className="relative inline-flex">
                <span
                  role="button"
                  className="inline-flex items-center gap-1 bg-blue-600 text-white font-bold text-sm px-3 py-0.5 rounded-md cursor-pointer"
                  onClick={() => setIsSourceDropdownOpen((o) => !o)}
                >
                  {selectedLabel} ▾
                </span>
                {isSourceDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[199]"
                      onClick={() => setIsSourceDropdownOpen(false)}
                    />
                    <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-gray-200 rounded-md shadow-lg z-[200] min-w-[300px] max-h-[360px] overflow-hidden flex flex-col">
                      <ul className="overflow-y-auto m-0 p-0 list-none">
                        {enrolledCourses.map((c) => (
                          <li key={c.code}>
                            <button
                              type="button"
                              className={[
                                'flex items-center w-full px-3.5 py-2.5 border-none border-b border-gray-100 last:border-b-0 text-sm text-gray-900 cursor-pointer text-left hover:bg-gray-50',
                                c.code === selectedCourseCode
                                  ? 'bg-blue-50'
                                  : 'bg-transparent',
                              ].join(' ')}
                              onClick={() => {
                                setSelectedCourseCode(c.code);
                                setIsSourceDropdownOpen(false);
                              }}
                            >
                              <span className="font-bold text-[13px] text-blue-600 shrink-0">
                                {formatCourseCode(c.code)}
                              </span>
                              <span className="text-xs text-gray-400 flex-1 min-w-0 ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                {c.name}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              <span className="text-gray-500 text-base font-medium">with</span>

              {/* Target badge */}
              <div className="relative inline-flex">
                <span
                  role="button"
                  className="inline-flex items-center gap-1 bg-blue-600 text-white font-bold text-sm px-3 py-0.5 rounded-md cursor-pointer"
                  onClick={() => setIsDropdownOpen((o) => !o)}
                >
                  {selectedSwapCourseCode
                    ? formatCourseCode(selectedSwapCourseCode)
                    : selectedLabel}{' '}
                  ▾
                </span>
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
              </div>
            </>
          ) : (
            'Select course from schedule'
          )}
        </div>
      </div>

      {/* Main body: calendar + section finder */}
      <div className="flex items-start gap-4">
        {/* Calendar panel */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 min-w-0 rounded-lg overflow-hidden border border-gray-200">
            {/* Day headers */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              <div
                style={{ width: SWAP_TIME_COL_WIDTH }}
                className="shrink-0"
              />
              {weekDates.map((date, i) => (
                <div
                  key={i}
                  className="flex-1 text-center py-2 px-1 text-xs font-semibold text-gray-500 border-l border-gray-200"
                >
                  {fmtWeekHeader(date)}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex relative">
              {/* Time labels */}
              <div style={{ width: SWAP_TIME_COL_WIDTH }} className="shrink-0">
                {Array.from(
                  { length: TOTAL_HOURS + 1 },
                  (_, i) => SWAP_GRID_START_HOUR + i,
                ).map((h) => (
                  <div
                    key={h}
                    style={{ height: SWAP_HOUR_HEIGHT }}
                    className="flex items-start pt-0.5 pr-1.5 justify-end text-[11px] text-gray-400"
                  >
                    {fmtHour(h)}
                  </div>
                ))}
              </div>

              {/* Day columns area */}
              <div className="flex-1 flex border-l border-gray-200 relative">
                {/* Hour and half-hour lines */}
                {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                  <React.Fragment key={i}>
                    <div
                      style={{ top: i * SWAP_HOUR_HEIGHT }}
                      className="absolute left-0 right-0 h-px bg-gray-200 pointer-events-none"
                    />
                    <div
                      style={{
                        top: i * SWAP_HOUR_HEIGHT + SWAP_HOUR_HEIGHT / 2,
                      }}
                      className="absolute left-0 right-0 pointer-events-none border-t border-dashed border-gray-200"
                    />
                  </React.Fragment>
                ))}

                {/* Day columns */}
                {DAY_LETTERS.map((_, colIdx) => (
                  <div
                    key={colIdx}
                    style={{ height: GRID_HEIGHT }}
                    className="flex-1 relative border-r border-gray-200 last:border-r-0"
                  >
                    {/* Enrolled blocks */}
                    {blocksByCol[colIdx].map((block, i) => (
                      <div
                        key={i}
                        style={{
                          position: 'absolute',
                          left: 2,
                          right: 2,
                          top: block.top,
                          height: Math.max(block.height - 2, 18),
                          background: block.colors.fill,
                          borderLeft: `4px solid ${block.colors.accent}`,
                          opacity:
                            block.courseCode === selectedCourseCode &&
                            hoveredSection
                              ? 0.38
                              : 1,
                          outline:
                            block.courseCode === selectedCourseCode
                              ? `2px solid ${block.colors.accent}`
                              : 'none',
                          outlineOffset: 1,
                        }}
                        className="rounded-sm cursor-pointer overflow-hidden px-1 py-0.5 z-[1] transition-opacity duration-150 hover:brightness-95 hover:z-[2]"
                        onClick={() =>
                          setSelectedCourseCode((prev) =>
                            prev === block.courseCode ? null : block.courseCode,
                          )
                        }
                        title={`${formatCourseCode(block.courseCode)} – ${
                          block.sectionName
                        }`}
                      >
                        <div className="text-[11px] font-bold leading-tight overflow-hidden whitespace-nowrap text-ellipsis text-blue-700">
                          {formatCourseCode(block.courseCode)}
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight">
                          {block.sectionName}
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight">
                          {formatTime(block.startSeconds)} –{' '}
                          {formatTime(block.endSeconds)}
                        </div>
                        {block.location && (
                          <div className="text-[10px] text-gray-400 leading-tight">
                            {block.location}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Ghost (hover preview) blocks */}
                    {ghostByCol[colIdx].map((ghost, i) => (
                      <div
                        key={`ghost-${i}`}
                        style={{
                          position: 'absolute',
                          left: 2,
                          right: 2,
                          top: ghost.top,
                          height: Math.max(ghost.height - 2, 18),
                          background: 'rgba(255, 196, 0, 0.12)',
                          border: '2px dashed #e8b300',
                        }}
                        className="rounded-sm pointer-events-none z-[2]"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 px-3 py-1.5 border-t border-gray-200 bg-gray-50 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div
                  style={{ background: '#0052cc' }}
                  className="w-2.5 h-2.5 rounded-sm"
                />
                Click any class to see sections
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  style={{ background: '#e8b300' }}
                  className="w-2.5 h-2.5 rounded-sm"
                />
                Hover a section for preview
              </div>
            </div>
          </div>
        </div>

        {/* Section finder panel */}
        <div className="shrink-0 flex flex-col self-stretch">
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
  );
};

export default SwapCalendar;
