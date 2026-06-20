import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useQuery } from '@apollo/client';
import fuzzysort from 'fuzzysort';
import {
  CourseDropdownByTermQuery,
  CourseDropdownByTermQueryVariables,
} from 'generated/graphql';

import { COURSE_DROPDOWN_TERM_QUERY } from 'graphql/queries/course/SwapCourse';
import { cn } from 'lib/utils';
import { formatCourseCode } from 'utils/Misc';

const dropdownEmptyStateClasses =
  'px-3.5 py-4 text-center text-[13px] text-dark3';

type CourseItem = CourseDropdownByTermQuery['course'][number];

type CourseSearchDropdownProps = {
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onClose: () => void;
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

const CourseSearchDropdown = ({
  selectedCode,
  onSelect,
  onClose,
  termId,
}: CourseSearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Let keyboard users dismiss the dropdown with Escape, matching the
  // pointer-only backdrop click.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const { data, loading } = useQuery<
    CourseDropdownByTermQuery,
    CourseDropdownByTermQueryVariables
  >(COURSE_DROPDOWN_TERM_QUERY, { variables: { termId } });

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

  const itemData: RowData = {
    courses: filteredCourses,
    selectedCode,
    onSelect,
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
    <>
      <div className="fixed inset-0 z-[199]" onClick={onClose} />
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
    </>
  );
};

export default CourseSearchDropdown;
