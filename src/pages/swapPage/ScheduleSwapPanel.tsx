import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw, X } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import { UserScheduleFragment } from 'generated/graphql';
import { getProfPageRoute } from 'Routes';

import LoadingSpinner from 'components/display/LoadingSpinner';
import { Button } from 'components/ui/button';
import { SwapMeeting, SwapSection } from 'graphql/queries/course/SwapCourse';
import { cn } from 'lib/utils';
import {
  formatCourseCode,
  processRating,
  secsToTime,
  termCodeToDate,
  weekDayLetters,
} from 'utils/Misc';

import CourseSearchDropdown from './CourseSearchDropdown';

export type SwapPreview = {
  courseId: number;
  courseCode: string;
  replaceSectionId: number;
  section: SwapSection;
};

export type SwapCandidateCourse = {
  id: number;
  code: string;
  name: string;
  sections: SwapSection[];
};

export type ProfessorSwapStats = {
  clear?: number | null;
  engaging?: number | null;
  liked?: number | null;
  commentCount?: number | null;
};

export type ScheduleSwapPanelProps = {
  selectedTermId: number;
  availableTerms: Array<{ id: number; label?: string }>;
  selectedCourseId: number | null;
  currentScheduleSections: UserScheduleFragment['schedule'];
  candidateCourses: SwapCandidateCourse[];
  enrolledSectionIds: number[];
  conflictSectionIds: number[];
  onTermChange: (termId: number) => void;
  onCourseChange: (courseCode: string | null) => void;
  onPreviewChange: (preview: SwapPreview | null) => void;
  onSwitchSection: (sectionId: number) => void;
  onClose?: () => void;
  replaceSectionId?: number | null;
  sourceCourseId?: number | null;
  professorStatsById?: Record<number, ProfessorSwapStats | undefined>;
  isLoading?: boolean;
};

const getSectionType = (sectionName: string) => sectionName.split(' ')[0];

const getOpenSeats = (section: SwapSection) =>
  Math.max(section.enrollment_capacity - section.enrollment_total, 0);

const formatDays = (days: string[]) =>
  weekDayLetters.filter((day) => days.includes(day)).join(' ');

const isTargetWithin = (
  currentTarget: EventTarget & HTMLDivElement,
  relatedTarget: EventTarget | null,
) => relatedTarget instanceof Node && currentTarget.contains(relatedTarget);

const getMeetingTime = (meeting: SwapMeeting) => {
  if (meeting.is_cancelled) {
    return 'Cancelled';
  }
  if (
    meeting.is_tba ||
    meeting.start_seconds === null ||
    meeting.start_seconds === undefined ||
    meeting.end_seconds === null ||
    meeting.end_seconds === undefined
  ) {
    return 'TBA';
  }
  return `${secsToTime(meeting.start_seconds)}-${secsToTime(
    meeting.end_seconds,
  )}`;
};

const SectionBadge = ({
  sectionName,
  isEnrolled,
}: {
  sectionName: string;
  isEnrolled: boolean;
}) => (
  <span
    className={cn(
      'inline-flex h-6 items-center rounded border border-solid px-2 text-xs font-semibold',
      isEnrolled
        ? 'border-primary bg-primary text-white'
        : 'border-primary/20 bg-primary/10 text-primary',
    )}
  >
    {sectionName}
  </span>
);

const MeetingInstructor = ({
  meeting,
  professorStatsById,
}: {
  meeting: SwapMeeting;
  professorStatsById?: Record<number, ProfessorSwapStats | undefined>;
}) => {
  const professor = meeting.prof;
  if (!professor || !professor.name) {
    return <span className="text-dark3">Instructor TBA</span>;
  }

  const stats = professorStatsById?.[professor.id];

  return (
    <div className="min-w-0">
      {professor.code ? (
        <RouterLink
          className="font-semibold text-professors no-underline underline-offset-2 hover:underline"
          to={getProfPageRoute(professor.code)}
        >
          {professor.name}
        </RouterLink>
      ) : (
        <span className="font-semibold text-dark2">{professor.name}</span>
      )}
      {stats && (
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-dark2">
          {stats.clear !== undefined && stats.clear !== null && (
            <span>
              <strong className="text-dark1">
                {processRating(stats.clear)}
              </strong>{' '}
              clear
            </span>
          )}
          {stats.engaging !== undefined && stats.engaging !== null && (
            <span>
              <strong className="text-dark1">
                {processRating(stats.engaging)}
              </strong>{' '}
              engaging
            </span>
          )}
          {stats.liked !== undefined && stats.liked !== null && (
            <span>
              <strong className="text-dark1">
                {processRating(stats.liked)}
              </strong>{' '}
              liked
            </span>
          )}
          {stats.commentCount !== undefined && stats.commentCount !== null && (
            <span>
              <strong className="text-dark1">{stats.commentCount}</strong>{' '}
              review{stats.commentCount === 1 ? '' : 's'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const MeetingLine = ({
  meeting,
  professorStatsById,
}: {
  meeting: SwapMeeting;
  professorStatsById?: Record<number, ProfessorSwapStats | undefined>;
}) => (
  <div className="grid gap-1 text-sm text-dark2">
    <div className="text-dark2">
      <span>{formatDays(meeting.days) || 'No days listed'}</span>
      <span className="mx-1">|</span>
      <span>{getMeetingTime(meeting)}</span>
    </div>
    {meeting.location && <div>{meeting.location}</div>}
    <MeetingInstructor
      meeting={meeting}
      professorStatsById={professorStatsById}
    />
  </div>
);

const EmptyState = () => (
  <div className="flex min-h-[178px] flex-col items-center justify-center rounded border border-solid border-light3 bg-white px-6 py-8 text-center">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-light2 text-dark3">
      <RefreshCw aria-hidden="true" size={18} />
    </div>
    <div className="text-sm font-semibold text-dark1">Select a course</div>
    <div className="mt-2 max-w-[260px] text-sm leading-5 text-dark3">
      Click a class in your schedule to see other sections, prof ratings, and
      swap options.
    </div>
  </div>
);

const ScheduleSectionRow = ({
  course,
  section,
  isEnrolled,
  hasConflict,
  replaceSectionId,
  professorStatsById,
  onPreviewChange,
  onSwitchSection,
}: {
  course: SwapCandidateCourse;
  section: SwapSection;
  isEnrolled: boolean;
  hasConflict: boolean;
  replaceSectionId: number;
  professorStatsById?: Record<number, ProfessorSwapStats | undefined>;
  onPreviewChange: (preview: SwapPreview | null) => void;
  onSwitchSection: (sectionId: number) => void;
}) => {
  const showPreview = () =>
    onPreviewChange({
      courseId: course.id,
      courseCode: course.code,
      replaceSectionId,
      section,
    });

  const clearPreview = () => onPreviewChange(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!isTargetWithin(event.currentTarget, event.relatedTarget)) {
      clearPreview();
    }
  };

  return (
    <div
      className={cn(
        'border-0 border-l-4 border-solid border-transparent bg-white px-5 py-4 outline-none transition-colors',
        'focus-within:bg-light1 hover:bg-light1',
        isEnrolled && 'border-primary bg-primary/5',
        hasConflict && 'bg-light1/60 text-dark3',
      )}
      onBlur={handleBlur}
      onFocus={showPreview}
      onPointerEnter={showPreview}
      onPointerLeave={clearPreview}
      tabIndex={0}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <SectionBadge
          sectionName={section.section_name}
          isEnrolled={isEnrolled}
        />
        {isEnrolled && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            <CheckCircle aria-hidden="true" size={14} />
            Enrolled
          </span>
        )}
        {!isEnrolled && hasConflict && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red">
            <AlertTriangle aria-hidden="true" size={14} />
            Conflicts
          </span>
        )}
      </div>
      <div className="grid gap-3">
        {section.meetings.length === 0 ? (
          <div className="text-sm text-dark3">No meeting times listed</div>
        ) : (
          section.meetings.map((meeting, index) => (
            <MeetingLine
              key={`${section.id}-${index}`}
              meeting={meeting}
              professorStatsById={professorStatsById}
            />
          ))
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-sm text-dark2">
          <strong className="font-semibold text-dark1">
            {getOpenSeats(section)}
          </strong>{' '}
          of {section.enrollment_capacity} open
        </div>
        {!isEnrolled && !hasConflict && (
          <Button
            className="h-9 px-4"
            onClick={() => onSwitchSection(section.id)}
            size="sm"
            type="button"
          >
            Switch section
          </Button>
        )}
      </div>
    </div>
  );
};

const ScheduleSwapPanel = ({
  selectedTermId,
  availableTerms,
  selectedCourseId,
  currentScheduleSections,
  candidateCourses,
  enrolledSectionIds,
  conflictSectionIds,
  onTermChange,
  onCourseChange,
  onPreviewChange,
  onSwitchSection,
  onClose,
  replaceSectionId = null,
  sourceCourseId = null,
  professorStatsById,
  isLoading = false,
}: ScheduleSwapPanelProps) => {
  // The native <select> from the original panel cannot express server-backed
  // course search, so the trigger opens the existing CourseSearchDropdown
  // (fuzzy search across every course offered in the term) instead.
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);

  const selectedCourse =
    candidateCourses.find((course) => course.id === selectedCourseId) || null;
  const sourceScheduleSection =
    currentScheduleSections.find((entry) =>
      sourceCourseId !== null
        ? entry.section.course.id === sourceCourseId
        : selectedCourseId !== null
        ? entry.section.course.id === selectedCourseId
        : false,
    ) || currentScheduleSections[0];
  const resolvedReplaceSectionId =
    replaceSectionId ?? sourceScheduleSection?.section.id ?? 0;
  const sourceCourse = sourceScheduleSection?.section.course;
  const sourceCourseLabel = sourceCourse
    ? formatCourseCode(sourceCourse.code)
    : 'course';
  const sections = selectedCourse
    ? selectedCourse.sections
        .filter((section) => section.term_id === selectedTermId)
        .sort((a, b) => {
          const sectionTypeA = getSectionType(a.section_name);
          const sectionTypeB = getSectionType(b.section_name);
          if (sectionTypeA === sectionTypeB) {
            return a.section_name.localeCompare(b.section_name);
          }
          return sectionTypeA.localeCompare(sectionTypeB);
        })
    : [];

  useEffect(() => {
    onPreviewChange(null);
    return () => onPreviewChange(null);
  }, [onPreviewChange, selectedCourseId, selectedTermId]);

  const handleCourseSelect = (courseCode: string) => {
    setIsCourseDropdownOpen(false);
    onPreviewChange(null);
    onCourseChange(courseCode);
  };

  const handleClose = () => {
    onPreviewChange(null);
    onClose?.();
  };

  return (
    <aside className="w-full rounded border border-solid border-light3 bg-white shadow-sm tablet:max-w-[360px]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-0 border-b border-solid border-light3 px-4 py-3">
        <div className="inline-flex rounded border border-solid border-light3 bg-light1 p-1">
          {availableTerms.map((term) => (
            <button
              className={cn(
                'h-8 cursor-pointer rounded border-none bg-transparent px-3 text-sm font-semibold text-dark2 transition-colors',
                selectedTermId === term.id && 'bg-white text-dark1 shadow-sm',
              )}
              key={term.id}
              onClick={() => {
                onPreviewChange(null);
                onTermChange(term.id);
              }}
              type="button"
            >
              {term.label || termCodeToDate(term.id)}
            </button>
          ))}
        </div>
        {onClose && (
          <button
            aria-label="Close schedule swap panel"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-solid border-light3 bg-white text-dark2 hover:bg-light1 hover:text-dark1"
            onClick={handleClose}
            type="button"
          >
            <X aria-hidden="true" size={16} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 border-0 border-b border-solid border-light3 px-4 py-3">
        <span className="text-sm font-semibold text-dark1">Swap</span>
        <span className="whitespace-nowrap text-sm font-semibold text-courses">
          {sourceCourseLabel}
        </span>
        <span className="text-sm text-dark2">with</span>
        <div className="relative flex min-w-0 flex-1">
          <button
            className="h-9 min-w-0 flex-1 cursor-pointer rounded border border-solid border-light3 bg-white px-3 text-left text-sm font-semibold text-courses outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            onClick={() => setIsCourseDropdownOpen((open) => !open)}
            type="button"
          >
            {selectedCourse
              ? formatCourseCode(selectedCourse.code)
              : 'Select course'}{' '}
            ▾
          </button>
          {isCourseDropdownOpen && (
            <CourseSearchDropdown
              selectedCode={selectedCourse?.code ?? null}
              onSelect={handleCourseSelect}
              onClose={() => setIsCourseDropdownOpen(false)}
              termId={selectedTermId}
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="flex min-h-[178px] items-center justify-center p-4">
          <LoadingSpinner />
        </div>
      ) : !selectedCourse ? (
        <div className="p-4">
          <EmptyState />
        </div>
      ) : (
        <div>
          <div className="border-0 border-b border-solid border-light3 px-4 py-3">
            <div className="flex items-baseline gap-2">
              <h2 className="m-0 text-base font-semibold text-courses">
                {formatCourseCode(selectedCourse.code)}
              </h2>
              <span className="text-sm text-dark3">
                {sections.length} section{sections.length === 1 ? '' : 's'}
              </span>
            </div>
            <p className="mb-0 mt-1 text-sm text-dark3">
              {selectedCourse.name}
            </p>
          </div>
          {sections.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-dark3">
              No sections are listed for this term.
            </div>
          ) : (
            <div className="divide-y divide-solid divide-light3">
              {sections.map((section) => (
                <ScheduleSectionRow
                  course={selectedCourse}
                  hasConflict={conflictSectionIds.includes(section.id)}
                  isEnrolled={enrolledSectionIds.includes(section.id)}
                  key={section.id}
                  onPreviewChange={onPreviewChange}
                  onSwitchSection={onSwitchSection}
                  professorStatsById={professorStatsById}
                  replaceSectionId={resolvedReplaceSectionId}
                  section={section}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default ScheduleSwapPanel;
