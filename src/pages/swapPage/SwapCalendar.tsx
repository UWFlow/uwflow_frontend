import React, { useEffect, useMemo, useState } from 'react';
import { Download } from 'react-feather';
import { ApolloQueryResult } from 'apollo-client';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserScheduleFragment,
} from 'generated/graphql';

import { FadeInWrapper } from 'components/navigation/styles/Footer';
import {
  BACKEND_ENDPOINT,
  CALENDAR_EXPORT_ENDPOINT,
  GOOGLE_CALENDAR_URL,
} from 'constants/Api';
import { SwapSection } from 'graphql/queries/course/SwapCourse';
import {
  formatCourseCode,
  getCurrentTermCode,
  getNextTermCode,
  termCodeToDate,
} from 'utils/Misc';
import { randString } from 'utils/Random';

import {
  BlockCode,
  BlockLoc,
  BlockSection,
  BlockTime,
  CalendarLegendBar,
  CalendarPanel,
  CalendarPanelContainer,
  CourseCodeBadge,
  CourseSelectBadgeWrapper,
  CourseSelectTrigger,
  DayCol,
  DayColumnsArea,
  DayHeaderCell,
  DayHeadersRow,
  DropdownCourseCode,
  DropdownCourseName,
  EventBlock,
  ExportButton,
  ExportMenu,
  ExportMenuItem,
  GhostEventBlock,
  GridBody,
  HalfHourLine,
  HourLineFull,
  LegendDot,
  LegendItem,
  NewBadge,
  SectionFinderContainer,
  SWAP_GRID_END_HOUR,
  SWAP_GRID_START_HOUR,
  SWAP_HOUR_HEIGHT,
  SwapBodyWrapper,
  SwapCalendarOuter,
  SwapDropdownItem,
  SwapDropdownList,
  SwapDropdownOverlay,
  SwapDropdownWrapper,
  SwapHeaderRow,
  SwapLabelText,
  SwapPageSubtitle,
  SwapPageTitle,
  SwapTitleRow,
  TermTab,
  TermTabGroup,
  TimeHeaderSpacer,
  TimeLabel,
  TimeLabelsCol,
} from './styles/SwapCalendar';
import CourseSearchDropdown from './CourseSearchDropdown';
import SectionFinderPanel from './SectionFinderPanel';

const DAY_LETTERS = ['M', 'T', 'W', 'Th', 'F'];
const TOTAL_HOURS = SWAP_GRID_END_HOUR - SWAP_GRID_START_HOUR;
const GRID_HEIGHT = TOTAL_HOURS * SWAP_HOUR_HEIGHT;

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
  /** Enables the calendar export menu; absent for ephemeral schedules. */
  secretId?: string;
  /** Renders a non-interactive sample schedule (logged-out lock state). */
  demoMode?: boolean;
  refetchAll?: (
    variables: GetUserQueryVariables,
  ) => Promise<ApolloQueryResult<GetUserQuery>>;
};

const SwapCalendar = ({
  schedule,
  secretId,
  demoMode = false,
  refetchAll,
}: SwapCalendarProps) => {
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
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleCalendarExport = async (download: boolean) => {
    if (!secretId) return;
    const response = await fetch(
      `${BACKEND_ENDPOINT}${CALENDAR_EXPORT_ENDPOINT(secretId)}`,
    );
    if (download) {
      window.location.assign(response.url);
    } else {
      // Replace https:// with webcal:// and append random query
      // parameter to avoid cache issues with Google Calendar
      const calendarUrl = response.url
        .replace(/^https:\/\//, 'webcal://')
        .concat(`?noCache=${randString()}`);
      window.open(`${GOOGLE_CALENDAR_URL}${calendarUrl}`, '_blank');
    }
  };

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
    <FadeInWrapper>
      <SwapCalendarOuter>
        <SwapTitleRow>
          <SwapPageTitle>
            Swap classes <NewBadge>New</NewBadge>
          </SwapPageTitle>
          <SwapPageSubtitle>
            Click any class to see other sections or swap it for a different
            course.
          </SwapPageSubtitle>
        </SwapTitleRow>

        <SwapHeaderRow>
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

          {secretId && (
            <CourseSelectBadgeWrapper>
              <ExportButton onClick={() => setIsExportOpen((o) => !o)}>
                <Download size={15} /> Export
              </ExportButton>
              {isExportOpen && (
                <>
                  <SwapDropdownOverlay onClick={() => setIsExportOpen(false)} />
                  <ExportMenu>
                    <ExportMenuItem
                      onClick={() => {
                        handleCalendarExport(false);
                        setIsExportOpen(false);
                      }}
                    >
                      Add to Google Calendar
                    </ExportMenuItem>
                    <ExportMenuItem
                      onClick={() => {
                        handleCalendarExport(true);
                        setIsExportOpen(false);
                      }}
                    >
                      Download .ics file
                    </ExportMenuItem>
                  </ExportMenu>
                </>
              )}
            </CourseSelectBadgeWrapper>
          )}
        </SwapHeaderRow>

        <SwapBodyWrapper>
          <CalendarPanelContainer>
            <CalendarPanel>
              <DayHeadersRow>
                <TimeHeaderSpacer />
                {weekDates.map((date, i) => (
                  <DayHeaderCell key={i}>{fmtWeekHeader(date)}</DayHeaderCell>
                ))}
              </DayHeadersRow>

              <GridBody>
                <TimeLabelsCol>
                  {Array.from(
                    { length: TOTAL_HOURS + 1 },
                    (_, i) => SWAP_GRID_START_HOUR + i,
                  ).map((h) => (
                    <TimeLabel key={h}>{fmtHour(h)}</TimeLabel>
                  ))}
                </TimeLabelsCol>

                <DayColumnsArea>
                  {Array.from({ length: TOTAL_HOURS }, (_, i) => (
                    <React.Fragment key={i}>
                      <HourLineFull offset={i * SWAP_HOUR_HEIGHT} />
                      <HalfHourLine
                        offset={i * SWAP_HOUR_HEIGHT + SWAP_HOUR_HEIGHT / 2}
                      />
                    </React.Fragment>
                  ))}

                  {DAY_LETTERS.map((_, colIdx) => (
                    <DayCol key={colIdx} style={{ height: GRID_HEIGHT }}>
                      {blocksByCol[colIdx].map((block, i) => (
                        <EventBlock
                          key={i}
                          top={block.top}
                          height={block.height}
                          fill={block.colors.fill}
                          accent={block.colors.accent}
                          selected={block.courseCode === selectedCourseCode}
                          dimmed={
                            !!selectedCourseCode &&
                            block.courseCode === selectedCourseCode &&
                            hoveredSection !== null
                          }
                          onClick={
                            demoMode
                              ? undefined
                              : () =>
                                  setSelectedCourseCode((prev) =>
                                    prev === block.courseCode
                                      ? null
                                      : block.courseCode,
                                  )
                          }
                          title={`${formatCourseCode(block.courseCode)} – ${
                            block.sectionName
                          }`}
                        >
                          <BlockCode>
                            {formatCourseCode(block.courseCode)}
                          </BlockCode>
                          <BlockSection>{block.sectionName}</BlockSection>
                          <BlockTime>
                            {formatTime(block.startSeconds)} –{' '}
                            {formatTime(block.endSeconds)}
                          </BlockTime>
                          {block.location && (
                            <BlockLoc>{block.location}</BlockLoc>
                          )}
                        </EventBlock>
                      ))}
                      {ghostByCol[colIdx].map((ghost, i) => (
                        <GhostEventBlock
                          key={`ghost-${i}`}
                          top={ghost.top}
                          height={ghost.height}
                        />
                      ))}
                    </DayCol>
                  ))}
                </DayColumnsArea>
              </GridBody>

              <CalendarLegendBar>
                <LegendItem>
                  <LegendDot color="#0052cc" />
                  Click any class to see sections
                </LegendItem>
                <LegendItem>
                  <LegendDot color="#e8b300" />
                  Hover a section for preview
                </LegendItem>
              </CalendarLegendBar>
            </CalendarPanel>
          </CalendarPanelContainer>

          <SectionFinderContainer>
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
          </SectionFinderContainer>
        </SwapBodyWrapper>
      </SwapCalendarOuter>
    </FadeInWrapper>
  );
};

export default SwapCalendar;
