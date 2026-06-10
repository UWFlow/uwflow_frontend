import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useQuery } from '@apollo/client';
import fuzzysort from 'fuzzysort';

import { COURSE_DROPDOWN_TERM_QUERY } from 'graphql/queries/course/SwapCourse';

import {
  DropdownCourseCode,
  DropdownCourseName,
  DropdownEmptyState,
  SwapDropdownItem,
  SwapDropdownList,
  SwapDropdownOverlay,
  SwapDropdownSearchInput,
  SwapDropdownWrapper,
} from './styles/SwapCalendar';

type CourseItem = { code: string; name: string };

type CourseDropdownQuery = {
  course: Array<{ code: string | null; name: string | null }>;
};

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
  return (
    <SwapDropdownItem
      style={style}
      isSelected={course.code === selectedCode}
      isEnrolled={false}
      onClick={() => onSelect(course.code)}
    >
      <DropdownCourseCode>{course.code.toUpperCase()}</DropdownCourseCode>
      <DropdownCourseName>{course.name}</DropdownCourseName>
    </SwapDropdownItem>
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
  }, []);

  const { data, loading } = useQuery<CourseDropdownQuery>(
    COURSE_DROPDOWN_TERM_QUERY,
    { variables: { termId } },
  );

  const allCourses: CourseItem[] = (data?.course ?? []).filter(
    (c): c is CourseItem => !!c.code && !!c.name,
  );

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
      return <DropdownEmptyState>Loading courses…</DropdownEmptyState>;
    }
    if (filteredCourses.length === 0) {
      return (
        <DropdownEmptyState>
          No courses found for &quot;{searchQuery}&quot;
        </DropdownEmptyState>
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
      <SwapDropdownOverlay onClick={onClose} />
      <SwapDropdownWrapper>
        <SwapDropdownSearchInput
          ref={inputRef}
          placeholder="Search courses…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SwapDropdownList>{renderBody()}</SwapDropdownList>
      </SwapDropdownWrapper>
    </>
  );
};

export default CourseSearchDropdown;
