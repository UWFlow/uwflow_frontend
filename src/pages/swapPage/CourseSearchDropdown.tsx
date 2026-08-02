import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useQuery } from '@apollo/client';
import fuzzysort from 'fuzzysort';
import {
  CourseDropdownByTermQuery,
  CourseDropdownByTermQueryVariables,
} from 'generated/graphql';
import useOnClickOutside from 'use-onclickoutside';

import { COURSE_DROPDOWN_TERM_QUERY } from 'graphql/queries/course/SwapCourse';
import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

const dropdownEmptyStateClasses =
  'px-3.5 py-4 text-center text-[13px] text-dark3';

type CourseItem = CourseDropdownByTermQuery['course'][number];

type CourseSearchDropdownProps = {
  /** Code shown on the trigger (swap target, or enrolled course as fallback). */
  displayCode: string;
  /** Highlighted row in the list; null when still targeting the enrolled course. */
  selectedCode: string | null;
  onSelect: (code: string) => void;
  termId: number;
};

type RowData = {
  courses: CourseItem[];
  selectedCode: string | null;
  onSelect: (code: string) => void;
};

const ITEM_HEIGHT = 40;
const MAX_LIST_HEIGHT = 316;

const CourseRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<RowData>) => {
  const { courses, selectedCode, onSelect } = data;
  const course = courses[index];
  const isSelected = course.code === selectedCode;
  return (
    <button
      type="button"
      style={style}
      className={cn(
        'flex w-full cursor-pointer items-center border-0 border-b border-solid border-light2 px-3.5 py-2.5 text-left text-[13px] text-dark1 last:border-b-0 hover:bg-light1',
        isSelected ? 'bg-[#eef4ff]' : 'bg-transparent',
      )}
      onClick={() => onSelect(course.code)}
    >
      <span className="shrink-0 text-[13px] font-bold text-courses">
        {formatCourseCode(course.code)}
      </span>
      <span className="ml-2 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-dark3">
        {course.name}
      </span>
    </button>
  );
};

// Owns its own open state — same pattern as SearchBar / DropdownList.
const CourseSearchDropdown = ({
  displayCode,
  selectedCode,
  onSelect,
  termId,
}: CourseSearchDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    if (!open) {
      setSearchQuery('');
      return;
    }
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const { data, loading } = useQuery<
    CourseDropdownByTermQuery,
    CourseDropdownByTermQueryVariables
  >(COURSE_DROPDOWN_TERM_QUERY, {
    variables: { termId },
    skip: !open,
  });

  const allCourses: CourseItem[] = data?.course ?? [];

  // Course codes in the data are lowercase with no space ("cs135"), so a
  // query like "CS 135" matches the `code` key poorly. Run two passes —
  // a normalized query against codes and the raw query against names — and
  // merge, de-duplicated by code and ordered by best fuzzysort score.
  const trimmed = searchQuery.trim();
  let filteredCourses: CourseItem[] = allCourses;
  if (trimmed) {
    const searchOptions = { threshold: -10000, allowTypo: true };
    const codeResults = fuzzysort.go(
      trimmed.replace(/\s+/g, '').toLowerCase(),
      allCourses,
      { ...searchOptions, key: 'code' },
    );
    const nameResults = fuzzysort.go(trimmed, allCourses, {
      ...searchOptions,
      key: 'name',
    });

    const bestByCode = new Map<string, { course: CourseItem; score: number }>();
    for (const result of [...codeResults, ...nameResults]) {
      const existing = bestByCode.get(result.obj.code);
      if (!existing || result.score > existing.score) {
        bestByCode.set(result.obj.code, {
          course: result.obj,
          score: result.score,
        });
      }
    }
    filteredCourses = Array.from(bestByCode.values())
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.course);
  }

  const handleSelect = (code: string) => {
    onSelect(code);
    setOpen(false);
  };

  const itemData: RowData = {
    courses: filteredCourses,
    selectedCode,
    onSelect: handleSelect,
  };
  const listHeight = Math.min(
    filteredCourses.length * ITEM_HEIGHT,
    MAX_LIST_HEIGHT,
  );

  const renderBody = () => {
    if (loading) {
      return <div className={dropdownEmptyStateClasses}>Loading courses…</div>;
    }
    if (filteredCourses.length === 0) {
      return (
        <div className={dropdownEmptyStateClasses}>
          No courses found for &quot;{searchQuery}&quot;
        </div>
      );
    }
    return (
      <FixedSizeList
        height={listHeight}
        itemCount={filteredCourses.length}
        itemSize={ITEM_HEIGHT}
        width="100%"
        itemData={itemData}
      >
        {CourseRow}
      </FixedSizeList>
    );
  };

  return (
    <div className="relative min-w-0" ref={ref}>
      <button
        aria-expanded={open}
        className="flex h-8 min-w-0 max-w-full cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-inter text-sm font-semibold text-courses outline-none hover:underline"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="truncate">{formatCourseCode(displayCode)}</span>
        <ChevronDown
          aria-hidden="true"
          className="shrink-0 text-courses"
          size={14}
        />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-[200] flex max-h-[360px] min-w-[300px] flex-col overflow-hidden rounded border border-solid border-light3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <input
            ref={inputRef}
            className="box-border w-full shrink-0 border-0 border-b border-solid border-light2 bg-transparent px-3.5 py-2.5 font-inter text-sm font-normal outline-none placeholder:text-dark3"
            placeholder="Search courses…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex-1 overflow-y-auto">{renderBody()}</div>
        </div>
      )}
    </div>
  );
};

export default CourseSearchDropdown;
